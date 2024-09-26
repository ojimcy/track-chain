import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import data from '../hooks/demo_data';
import { useCurrentUser } from '../hooks/telegram';
import { formatBalance } from '../utils/formatBalance';
import TelegramBackButton from '../components/navs/TelegramBackButton';

import dollar from '../assets/images/dollar.png';

import './league.css';
import { Link } from 'react-router-dom';

const LeaguePage = () => {
  const { levels } = data;
  const currentUser = useCurrentUser();

  const currentLevel = levels.find((lvl) => {
    return lvl.level === Number(currentUser.levelId);
  });

  // Find the current level's information
  const nextLevel = levels.find((lvl) => {
    return lvl.level === Number(currentUser.levelId + 1);
  });

  return (
    <Container className="level-page">
      <TelegramBackButton />
      {/* Top Section: Current Level Info */}
      <Row className="current-level-info">
        <Col>
          <div className="level-badge">
            <img src={currentLevel.icon} alt={currentLevel.name} />
          </div>
          <div className="level-details">
            <h3>{currentLevel.name} Leage</h3>
            {nextLevel ? (
              <div className="d-flex justify-content-between">
                <span>Next Level: {currentUser.levelId + 1}</span>
                <span>
                  <img src={dollar} alt=" " width={25} height={25} />
                  {formatBalance(nextLevel.tokensRequiredForLevel)} (
                  {formatBalance(
                    nextLevel.tokensRequiredForLevel - currentUser.totalBalance
                  )}{' '}
                  more)
                </span>
              </div>
            ) : (
              <div className="d-flex justify-content-between">
                <span>
                  {' '}
                  <Link to="loading">Congratulations</Link> , you are at the
                  highest level!
                </span>
              </div>
            )}
          </div>
        </Col>
      </Row>

      {/* List of Levels */}
      <Row className="levels-list">
        {levels.map((level) => (
          <Col
            key={level.level}
            xs="12"
            className={`level-item ${
              level.level === currentUser.levelId ? 'current-level' : ''
            }`}
          >
            <div className="level-name d-flex align-items-center">
              <div className="level-icon">
                <img src={level.icon} alt="" width={50} height={50} />
              </div>
              <div className="d-flex flex-column align-items-start">
                <strong>{level.name}</strong>
                <span>
                  <img src={dollar} alt=" " width={25} height={25} />
                  {formatBalance(level.tokensRequiredForLevel)}
                </span>
              </div>
            </div>
            <div className="level-number">{level.level}</div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default LeaguePage;
