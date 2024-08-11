import React, { useEffect, useState } from 'react';
import './main-nav.css';
import { Container } from 'reactstrap';

import dollar from '../../../assets/images/dollar.png';
import { formatBalanceShort } from '../../../utils/formatBalance';
import { useCurrentUser } from '../../../hooks/telegram';
import { getLevels } from '../../../lib/server';

function MainNav() {
  const [levels, setLevels] = useState([]);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const resp = await getLevels();
        setLevels(resp);
      } catch (error) {
        console.error('Failed to fetch levels.');
      }
    };

    fetchLevels();
  }, []);

  // Find the current level's information
  const currentLevel = levels.find((lvl) => lvl.level === currentUser.level);
  const tokensRequiredForLevel = currentLevel
    ? currentLevel.tokensRequiredForLevel
    : 0;

  // Calculate progress percentage
  const progress = (currentUser.balance / tokensRequiredForLevel) * 100;

  return (
    <header>
      <Container>
        <div className="nav-card d-flex align-items-center justify-content-between mt-2">
          <div className="user-avatar align-items-center justify-content-between card-item">
            <span className="main-avatar">O</span>
            <div className="level d-flex flex-column">
              <span className="">LV {currentUser.level}</span>
              <div className="progress-bar-container">
                <div
                  className="bar-progress"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
          <div className="vertical-line" />
          <div className="per-hour d-flex flex-column card-item">
            <span className="label">Token per Hour</span>
            <span className="main-value">
              <img src={dollar} alt="" width={30} height={30} />{' '}
              {currentUser.earning_per_hour}{' '}
            </span>
          </div>
          <div className="vertical-line" />
          <div className="total-earned d-flex flex-column card-item">
            <span className="label">Total Earnings</span>
            <span className="main-value">
              <img src={dollar} alt="" width={30} height={30} />{' '}
              {formatBalanceShort(currentUser.total_balance)}{' '}
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
}

export default MainNav;
