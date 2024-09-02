import React, { useEffect, useState } from 'react';
import { FaCog } from 'react-icons/fa';
import './main-nav.css';
import { Col, Container, Row } from 'reactstrap';

import dollar from '../../../assets/images/dollar.png';
import shrek from '../../../assets/images/lvl1.png';
import { formatBalanceShort } from '../../../utils/formatBalance';
import { useCurrentUser } from '../../../hooks/telegram';
import { getLevels } from '../../../lib/server';
import { Link } from 'react-router-dom';

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
  const nextLevel = levels.find((lvl) => {
    return lvl.level === Number(currentUser.levelId + 1);
  });

  const requiredTokens = nextLevel && nextLevel.requiredTokens;

  // Calculate progress percentage
  const progress = (currentUser.totalBalance / requiredTokens) * 100;

  return (
    <header>
      <Container>
        <div className="nav-card d-flex align-items-center justify-content-between mt-2">
          <Link className="nav-card-link" to="#">
            <div className="user-avatar align-items-center justify-content-between card-item">
              <span className="main-avatar">
                {currentUser.username.charAt(0)}
              </span>
              <div className="level d-flex flex-column">
                <span className="">LV {currentUser.levelId}</span>
                <div className="progress-bar-container">
                  <div
                    className="bar-progress"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </Link>

          <Row className="hmr-links d-flex justify-content-between align-items-center">
            <Col xs={3} className="links-image">
              <img src={shrek} alt="" width={35} />
            </Col>
            <Col xs={6} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <div className="vertical-line" />
              <div className="per-hour d-flex flex-column align-items-center justify-content-center card-item">
                <span className="label">HMR</span>
                <span className="main-value">
                  <img src={dollar} alt="" width={15} height={15} />{' '}
                  <div className="mx-1">
                    {`+ ${currentUser && formatBalanceShort(currentUser.hmr)}`}{' '}
                  </div>
                </span>
              </div>
            </Col>
            <Col xs={3}>
              <div className="vertical-line" />
              <div className="settings-icon card-item">
                <FaCog />
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </header>
  );
}

export default MainNav;
