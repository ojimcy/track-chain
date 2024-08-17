// src/pages/Mine.js

import React, { useEffect, useState } from 'react';
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
import { getUserCards } from '../lib/server';
import data from '../hooks/demo_data';
import LoadingSpinner from '../components/common/LoadingSpinner';
import TelegramBackButton from '../components/navs/TelegramBackButton';

function Mine() {
  const currentUser = useCurrentUser();
  const [activeTab, setActiveTab] = useState('1');
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  const mockCards = data.cards;

  useEffect(() => {
    const fetchCards = async () => {
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
    };

    fetchCards();
  }, []);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

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
              Time Remaining: <span className="countdown">24:00:00</span>
            </p>
          </div>
          <Row className="combos mt-4 d-flex justify-content-between align-items-center">
            <Col xs={4}>
              <div className="combo-card">
                <img src={comboHolder} alt="" />
              </div>
            </Col>
            <Col xs={4}>
              <div className="combo-card">
                <img src={comboHolder} alt="" />
              </div>
            </Col>
            <Col xs={4}>
              <div className="combo-card">
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
                <CardContainer cards={cards} category="Tokenization" />
              )}
            </TabPane>
            <TabPane tabId="2">
              <h2>Marketplace</h2>
              {loading ? (
                <LoadingSpinner />
              ) : (
                <CardContainer cards={cards} category="Marketplace" />
              )}
            </TabPane>
            <TabPane tabId="3">
              <h2>Web3</h2>
              {loading ? (
                <LoadingSpinner />
              ) : (
                <CardContainer cards={cards} category="Web3" />
              )}
            </TabPane>
            <TabPane tabId="4">
              <h2>Track</h2>
              {loading ? (
                <LoadingSpinner />
              ) : (
                <CardContainer cards={cards} category="Track" />
              )}
            </TabPane>
          </TabContent>
        </div>
      </div>
    </Container>
  );
}

export default Mine;
