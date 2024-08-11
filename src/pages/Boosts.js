import React, { useState } from 'react';
import { Col, Container, Row } from 'reactstrap';

import dollar from '../assets/images/dollar.png';
import { formatBalanceShort } from '../utils/formatBalance';
import data from '../hooks/demo_data';
import tapImg from '../assets/images/tap.png';
import energyImg from '../assets/images/energy.png';

import './boosts.css';
import { FaGreaterThan } from 'react-icons/fa';
import MultitapModal from '../components/modals/MultitapModal';
import EnergyModal from '../components/modals/EnergyModal';
import TelegramBackButton from '../components/navs/TelegramBackButton';

function Boost() {
  const { user, multiTap, boosts } = data;

  // State for managing modal visibility and selected boost
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [energyModalOpen, setEnergyModalOpen] = useState(false);

  // Find the next level upgrade based on the user's current tap level
  const nextMultiTapLevel = multiTap.find(
    (mt) => mt.level === user.tap_level + 1
  );

  // Find the next energy limit upgrade based on the user's current energy level
  const nextEnergyLevel = boosts.find(
    (boost) => boost.level === user.energy_level + 1
  );

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleEnergyModal = () => {
    setEnergyModalOpen(!energyModalOpen);
  };

  return (
    <div className="boost-page">
      <TelegramBackButton />
      <Container>
        <div className="page-header d-flex flex-column align-items-center">
          <p>Points Balance</p>
          <span className="user-balance">
            <img src={dollar} alt="" width={40} height={40} />{' '}
            {formatBalanceShort(user.total_balance)}{' '}
          </span>
        </div>
        <Row>
          <div className="boosts mt-5">
            <h3>UPGRADES</h3>

            {/* Multi-tap Upgrade */}
            <Col xs={12}>
              {nextMultiTapLevel ? (
                <div
                  className="boost-card d-flex justify-content-between align-items-center mt-4"
                  onClick={() => toggleModal()}
                >
                  <div className="boost-info d-flex align-items-center">
                    <div className="boost-icon">
                      <img src={tapImg} alt="" width={45} />
                    </div>
                    <div className="info d-flex flex-column">
                      <span className="boost-title">Multi-tap</span>
                      <span className="boost-cost">
                        <img src={dollar} alt="" width={35} height={35} />{' '}
                        {formatBalanceShort(nextMultiTapLevel.cost)}{' '}
                        <span style={{ fontSize: '12px', color: 'gray' }}>
                          . lvl {nextMultiTapLevel.level}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="boost-status">
                    <FaGreaterThan color="gray" />
                  </div>
                </div>
              ) : (
                <div className="boost-card d-flex justify-content-between align-items-center mt-4">
                  <div className="boost-info d-flex align-items-center">
                    <div className="boost-icon">
                      <img src={tapImg} alt="" width={45} />
                    </div>
                    <div className="info d-flex flex-column">
                      <span className="boost-title">
                        Max Multi-tap Level Reached
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </Col>

            {/* Energy Limit Upgrade */}
            <Col xs={12}>
              {nextEnergyLevel ? (
                <div
                  className="boost-card d-flex justify-content-between align-items-center mt-4"
                  onClick={() => toggleEnergyModal()}
                >
                  <div className="boost-info d-flex align-items-center">
                    <div className="boost-icon">
                      <img src={energyImg} alt="" width={45} />
                    </div>
                    <div className="info d-flex flex-column">
                      <span className="boost-title">Energy Limit</span>
                      <span className="boost-cost">
                        <img src={dollar} alt="" width={35} height={35} />{' '}
                        {formatBalanceShort(nextEnergyLevel.cost)}{' '}
                        <span style={{ fontSize: '12px', color: 'gray' }}>
                          . lvl {nextEnergyLevel.level}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="boost-status">
                    <FaGreaterThan color="gray" />
                  </div>
                </div>
              ) : (
                <div className="boost-card d-flex justify-content-between align-items-center mt-4">
                  <div className="boost-info d-flex align-items-center">
                    <div className="boost-icon">
                      <img src={energyImg} alt="" width={45} />
                    </div>
                    <div className="info d-flex flex-column">
                      <span className="boost-title">
                        Max Energy Level Reached
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </Col>
          </div>
        </Row>
      </Container>

      {/* Modal for Boost Details */}
      {isModalOpen && (
        <MultitapModal
          modal={isModalOpen}
          toggleModal={toggleModal}
          nextMultiTapLevel={nextMultiTapLevel}
        />
      )}
      
      {energyModalOpen && (
        <EnergyModal
          modal={energyModalOpen}
          toggleModal={toggleEnergyModal}
          nextMultiTapLevel={nextEnergyLevel}
        />
      )}
    </div>
  );
}

export default Boost;
