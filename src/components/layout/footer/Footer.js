import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaTasks, FaUsers, FaTrophy, FaGem } from 'react-icons/fa';
import './Footer.css';

import level from '../../../assets/images/lvl1.jpeg';

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
                      to="/"
                      className={`d-flex flex-column align-items-center ${
                        location.pathname === '/' ? 'active' : ''
                      }`}
                    >
                      <img className='tap-footer-img' src={level} alt="" width={30} />
                      <span>Tap</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/earn"
                      className={`d-flex flex-column align-items-center ${
                        location.pathname === '/earn' ? 'active' : ''
                      }`}
                    >
                      <FaTasks size={28} />
                      <span className="mt-1">Earn</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/mine"
                      className={`d-flex flex-column align-items-center ${
                        location.pathname === '/mine' ? 'active' : ''
                      }`}
                    >
                      <FaGem size={28} />
                      <span className="mt-1">Mine</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/leaderboard"
                      className={`d-flex flex-column align-items-center ${
                        location.pathname === '/leaderboard' ? 'active' : ''
                      }`}
                    >
                      <FaTrophy size={28} />
                      <span className="mt-1">Leaders</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/frens"
                      className={`d-flex flex-column align-items-center ${
                        location.pathname === '/frens' ? 'active' : ''
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
