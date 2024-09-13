import React, { useEffect, useState, useCallback, useContext } from 'react';
import './mine.css';
import dollar from '../assets/images/dollar.png';
import {
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
import { getDailyCombo, getUserCards } from '../lib/server';
import data from '../hooks/demo_data';
import LoadingSpinner from '../components/common/LoadingSpinner';
import TelegramBackButton from '../components/navs/TelegramBackButton';
import CountdownTimer from '../components/common/CountdownTimer';
import TrackCardContainer from '../components/mining/TrackCardContainer';
import { WebappContext } from '../context/telegram';

function Mine() {
  const currentUser = useCurrentUser();
  const [activeTab, setActiveTab] = useState('1');
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const { dailyCombo, setDailyCombo } = useContext(WebappContext);

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

  const fetchDailyCombo = async () => {
    try {
      const res = await getDailyCombo();
      setDailyCombo(res);
    } catch (error) {
      console.error('Error fetching daily combo', error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  useEffect(() => {
    fetchDailyCombo();
  }, []);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  console.log('daily initial', dailyCombo);

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
            <Col xs={4}>
              <div className="combo-card">
                {/* if combo is selected, show the selected combo image */}
                <img src={comboHolder} alt="" />
              </div>
            </Col>
            <Col xs={4}>
              <div className="combo-card">
                {/* if combo is selected, show the selected combo image */}
                <img src={comboHolder} alt="" />
              </div>
            </Col>
            <Col xs={4}>
              <div className="combo-card">
                {/* if combo is selected, show the selected combo image */}
                <img src={comboHolder} alt="" />
              </div>
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
