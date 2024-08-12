// src/pages/Mine.js

import React, { useState } from 'react';
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
import data from '../hooks/demo_data';
import { Separator } from '../components/common/Seperator';

import card1 from '../assets/images/lock-1.png';
import card2 from '../assets/images/insurance.png';
import card3 from '../assets/images/card3.png';
import comboHolder from '../assets/images/q-mark.png';
import CardContainer from '../components/mining/CardContainer';

const mockData = [
  {
    name: 'Token security',
    earningsPerHour: 600,
    cost: 100000,
    image: card1,
    requirements: null,
    level: 0,
    category: 'Asset Tokenization',
    canUpgrade: true,
  },
  {
    name: 'Token-issuance',
    earningsPerHour: 5000,
    cost: 1000000,
    image: card2,
    requirements: null,
    level: 0,
    category: 'Asset Tokenization',
    canUpgrade: true,
  },
  {
    name: 'Crypto Exchange 1',
    earningsPerHour: 1500,
    cost: 150000,
    image: card3,
    requirements: 'Requires Investor lvl 10',
    level: 0,
    category: 'Marketplace',
    canUpgrade: false,
  },
  {
    name: 'Special Miner 1',
    earningsPerHour: 500,
    cost: 5000,
    image: card3,
    requirements: null,
    level: 0,
    category: 'Track',
    canUpgrade: true,
  },
];

function Mine() {
  const { user } = data;
  const [cards, setCards] = useState(mockData);
  const [activeTab, setActiveTab] = useState('1');

  const handleUpgrade = (index) => {
    setCards((prevCards) =>
      prevCards.map((card, i) => {
        if (
          i === index &&
          (card.requirements === null || checkRequirements(card.requirements))
        ) {
          return {
            ...card,
            level: card.level + 1,
            earningsPerHour: card.earningsPerHour * 1.2, // Increase earnings by 20%
            cost: card.cost * 1.5, // Increase cost by 50%
          };
        }
        return card;
      })
    );
  };

  const checkRequirements = () => {
    // Logic to check if requirements are met
    return true;
  };

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <Container>
      <div className="mine-page">
        <div className="mine-header">
          <div className="balance">
            <span>
              <img src={dollar} alt="" /> {formatBalance(user.total_balance)}
            </span>
            <p>
              Earning per hour{' '}
              <span className="token-balance">
                +{formatBalance(user.earning_per_hour)}
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
              <CardContainer
                cards={cards}
                category="Asset Tokenization"
                onUpgrade={handleUpgrade}
              />
            </TabPane>
            <TabPane tabId="2">
              <h2>Marketplace</h2>
              <CardContainer
                cards={cards}
                category="Marketplace"
                onUpgrade={handleUpgrade}
              />
            </TabPane>
            <TabPane tabId="3">
              <h2>Web3</h2>
              <CardContainer
                cards={cards}
                category="Web3"
                onUpgrade={handleUpgrade}
              />
            </TabPane>
            <TabPane tabId="4">
              <h2>Track</h2>
              <CardContainer
                cards={cards}
                category="Track"
                onUpgrade={handleUpgrade}
              />
            </TabPane>
          </TabContent>
        </div>
      </div>
    </Container>
  );
}

export default Mine;
