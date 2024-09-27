import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaTasks, FaUsers, FaTrophy, FaGem } from 'react-icons/fa';
import './Footer.css';

import level from '../../../assets/images/level7.png';

function Footer() {
  const location = useLocation();

  return (
    <footer className="footer">
      <Container>
        <div className="footer-bottom">
          <Row>
            <Col className="d-flex flex-column align-items-center">
              <div className="footer-content">
                <ul className="footer-links list-unstyled">
                  <li>
                    <Link
                      to="/home"
                      className={`d-flex flex-column align-items-center ${
                        location.pathname === '/home' ? 'active' : ''
                      }`}
                    >
                      <img
                        className="tap-footer-img"
                        src={level}
                        alt=""
                        width={30}
                      />
                      <span>Tap</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/home/earn"
                      className={`d-flex flex-column align-items-center ${
                        location.pathname === '/home/earn' ? 'active' : ''
                      }`}
                    >
                      <FaTasks size={28} />
                      <span className="mt-1">Earn</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/home/mine"
                      className={`d-flex flex-column align-items-center ${
                        location.pathname === '/home/mine' ? 'active' : ''
                      }`}
                    >
                      <FaGem size={28} />
                      <span className="mt-1">Mine</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/home/leaderboard"
                      className={`d-flex flex-column align-items-center ${
                        location.pathname === '/home/leaderboard'
                          ? 'active'
                          : ''
                      }`}
                    >
                      <FaTrophy size={28} />
                      <span className="mt-1">Leaders</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/home/frens"
                      className={`d-flex flex-column align-items-center ${
                        location.pathname === '/home/frens' ? 'active' : ''
                      }`}
                    >
                      <FaUsers size={28} />
                      <span className="mt-1">Frens</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
