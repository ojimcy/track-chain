import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Link, useLocation } from 'react-router-dom';
import {  FaTasks, FaUsers, FaHammer } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  const location = useLocation();

  return (
    <footer className="footer">
      <div className="footer-area">
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
                        <FaHammer size={28} />
                        <span className="mt-1">Mining</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/task"
                        className={`d-flex flex-column align-items-center ${
                          location.pathname === '/task' ? 'active' : ''
                        }`}
                      >
                        <FaTasks size={28} />
                        <span className="mt-1">Task</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/squad"
                        className={`d-flex flex-column align-items-center ${
                          location.pathname === '/squad' ? 'active' : ''
                        }`}
                      >
                        <FaUsers size={28} />
                        <span className="mt-1">Squad</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;
