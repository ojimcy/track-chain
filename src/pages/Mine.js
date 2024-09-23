import React, { useEffect, useState, useCallback, useContext } from 'react';
import './mine.css';
import dollar from '../assets/images/dollar.png';
import {
  Button,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from 'reactstrap';
import classnames from 'classnames';
import { formatBalance } from '../utils/formatBalance';
import { Separator } from '../components/common/Seperator';
import { useCurrentUser } from '../hooks/telegram';
import comboHolder from '../assets/images/q-mark.png';
import CardContainer from '../components/mining/CardContainer';
import { getUserCards, submitCombo } from '../lib/server';
import data from '../hooks/demo_data';
import LoadingSpinner from '../components/common/LoadingSpinner';
import TelegramBackButton from '../components/navs/TelegramBackButton';
import CountdownTimer from '../components/common/CountdownTimer';
import TrackCardContainer from '../components/mining/TrackCardContainer';
import { WebappContext } from '../context/telegram';
import { toast } from 'react-toastify';

function Mine() {
  const currentUser = useCurrentUser();
  const { selectedComboCard } = useContext(WebappContext);
  const [activeTab, setActiveTab] = useState('1');
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  const mockCards = data.cards;
  const duration = 24 * 60 * 60 * 1000;

  const fetchCards = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getUserCards();

      // Map cards to include the image from mockCards
      const cardsWithImages = res.map((card) => {
        const mockCard = mockCards.find((mock) => mock.id === card.id);
        return { ...card, image: mockCard ? mockCard.image : '' };
      });

      setCards(cardsWithImages);
    } catch (error) {
      console.error('Error fetching cards', error);
    } finally {
      setLoading(false);
    }
  }, [mockCards]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  // Filter the cards whose id is in selectedComboCard
  const selectedCards = cards.filter((card) =>
    selectedComboCard.includes(card.id)
  );

  // Handle the combo submission logic
  const handleComboSubmission = async () => {
    if (selectedComboCard.length === 3) {
      setLoading(true);
      try {
        const comboData = [
          selectedComboCard[0],
          selectedComboCard[1],
          selectedComboCard[2],
        ];
        await submitCombo(comboData);

        toast.success('Combo successfully completed!', {
          position: 'top-right',
          autoClose: 3000,
        });
      } catch (error) {
        console.error('Failed to submit combo', error);
        toast.error(error.response?.data?.error || 'Failed to submit combo', {
          position: 'top-right',
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  selectedComboCard && console.log('Selected combo', selectedComboCard);

  return (
    <Container>
      <TelegramBackButton />
      <div className="mine-page">
        <div className="mine-header">
          <div className="balance">
            <span>
              <img src={dollar} alt="" /> {formatBalance(currentUser.balance)}
            </span>
            <p>
              Hourly Mining Rate{' '}
              <span className="token-balance">
                +{formatBalance(currentUser.hmr)}
              </span>{' '}
            </p>
          </div>
          <div className="combo">
            <p className="mb-2">
              Find 3 cards combination today to claim 5M points
            </p>
            <Separator />
            <p className="mt-2">
              Time Remaining: <CountdownTimer duration={duration} />
            </p>
          </div>
          <Row className="combos mt-4 d-flex justify-content-between align-items-center">
            {selectedCards.map((card, index) => (
              <Col xs={4} key={index}>
                <div className="combo-card">
                  <img src={card.image || comboHolder} alt="" />
                </div>
              </Col>
            ))}
            {/* If there are less than 3 cards, fill the remaining slots */}
            {Array(3 - selectedCards.length)
              .fill(null)
              .map((_, index) => (
                <Col xs={4} key={`placeholder-${index}`}>
                  <div className="combo-card">
                    <img src={comboHolder} alt="" />
                  </div>
                </Col>
              ))}
          </Row>
          {/* Submit Combo Button */}
          <Row>
            <Col>
              <Button
                className="combo-btn w-100"
                onClick={handleComboSubmission}
              >
                Submit Combo
              </Button>
            </Col>
          </Row>
        </div>
        <div className="card-container">
          <Nav tabs className="tab">
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => {
                  toggle('1');
                }}
              >
                Tokenization
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => {
                  toggle('2');
                }}
              >
                Marketplace
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '3' })}
                onClick={() => {
                  toggle('3');
                }}
              >
                Web3
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '4' })}
                onClick={() => {
                  toggle('4');
                }}
              >
                Track
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <h2>Asset Tokenization</h2>
              {loading ? (
                <LoadingSpinner />
              ) : (
                <CardContainer
                  cards={cards}
                  category="Tokenization"
                  fetchCards={fetchCards}
                />
              )}
            </TabPane>
            <TabPane tabId="2">
              <h2>Marketplace</h2>
              {loading ? (
                <LoadingSpinner />
              ) : (
                <CardContainer
                  cards={cards}
                  category="Marketplace"
                  fetchCards={fetchCards}
                />
              )}
            </TabPane>
            <TabPane tabId="3">
              <h2>Web3</h2>
              {loading ? (
                <LoadingSpinner />
              ) : (
                <CardContainer
                  cards={cards}
                  category="Web3"
                  fetchCards={fetchCards}
                />
              )}
            </TabPane>
            <TabPane tabId="4">
              <h2>Track</h2>
              {loading ? (
                <LoadingSpinner />
              ) : (
                <TrackCardContainer
                  cards={cards}
                  category="Track"
                  fetchCards={fetchCards}
                />
              )}
            </TabPane>
          </TabContent>
        </div>
      </div>
    </Container>
  );
}

export default Mine;
