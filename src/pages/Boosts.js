import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Col, Container, Row } from 'reactstrap';
import dollar from '../assets/images/dollar.png';
import { formatBalanceShort } from '../utils/formatBalance';
import tapImg from '../assets/images/tap.png';
import energyImg from '../assets/images/energy.png';
import './boosts.css';
import { FaGreaterThan } from 'react-icons/fa';
import MultitapModal from '../components/modals/MultitapModal';
import EnergyModal from '../components/modals/EnergyModal';
import TelegramBackButton from '../components/navs/TelegramBackButton';
import { toast } from 'react-toastify';
import {
  boostEnergy,
  boostTaps,
  getEnergyLevels,
  getMtultiTapLevels,
  getUserByTelegramID,
} from '../lib/server';
import { useCurrentUser, useTelegramUser } from '../hooks/telegram';
import { WebappContext } from '../context/telegram';

function Boost() {
  const { setUser } = useContext(WebappContext);
  const currentUser = useCurrentUser();
  const telegramUser = useTelegramUser();
  const [multTapLevels, setMultiTapLevels] = useState([]);
  const [energyLevels, setEnergyLevels] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [energyModalOpen, setEnergyModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchLevels = useCallback(async () => {
    try {
      setLoading(true);
      const [tapResp, energyRes] = await Promise.all([
        getMtultiTapLevels(),
        getEnergyLevels(),
      ]);
      setMultiTapLevels(tapResp);
      setEnergyLevels(energyRes);
    } catch (error) {
      console.error('Failed to fetch levels', error.response?.data);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUserData = useCallback(async () => {
    try {
      const user = await getUserByTelegramID(telegramUser.id);
      setUser(user);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  }, [telegramUser, setUser]);

  useEffect(() => {
    fetchLevels();
  }, [fetchLevels]);

  useEffect(() => {
    if (telegramUser) {
      fetchUserData();
    }
  }, [telegramUser, fetchUserData]);

  const nextMultiTapLevel = multTapLevels.find(
    (mt) => mt.level === currentUser.tapLevel + 1
  );

  const nextEnergyLevel = energyLevels.find(
    (boost) => boost.level === currentUser.energyLevel + 1
  );

  const toggleModal = () => setIsModalOpen((prev) => !prev);
  const toggleEnergyModal = () => setEnergyModalOpen((prev) => !prev);

  const handleBoost = async (boostFunction, toggleModalFunction) => {
    try {
      setLoading(true);
      await boostFunction();
      await fetchUserData();
      await fetchLevels();
      toggleModalFunction();
    } catch (error) {
      console.error('Error boosting', error.response?.data);
      toast.error('Failed to boost', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="boost-page">
      <TelegramBackButton />
      <Container>
        <div className="page-header d-flex flex-column align-items-center">
          <p>Points Balance</p>
          <span className="user-balance">
            <img src={dollar} alt="" width={40} height={40} />{' '}
            {currentUser && formatBalanceShort(currentUser.balance)}{' '}
          </span>
        </div>
        <Row>
          <div className="boosts mt-5">
            <h3>UPGRADES</h3>
            {!loading && (
              <>
                <Col xs={12}>
                  {nextMultiTapLevel ? (
                    <div
                      className="boost-card d-flex justify-content-between align-items-center mt-4"
                      onClick={toggleModal}
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

                <Col xs={12}>
                  {nextEnergyLevel ? (
                    <div
                      className="boost-card d-flex justify-content-between align-items-center mt-4"
                      onClick={toggleEnergyModal}
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
              </>
            )}
          </div>
        </Row>
      </Container>

      {isModalOpen && (
        <MultitapModal
          modal={isModalOpen}
          toggleModal={toggleModal}
          nextMultiTapLevel={nextMultiTapLevel}
          handleBoost={() => handleBoost(boostTaps, toggleModal)}
          loading={loading}
          user={currentUser}
        />
      )}

      {energyModalOpen && (
        <EnergyModal
          modal={energyModalOpen}
          toggleModal={toggleEnergyModal}
          nextMultiTapLevel={nextEnergyLevel}
          handleBoost={() => handleBoost(boostEnergy, toggleEnergyModal)}
          loading={loading}
          user={currentUser}
        />
      )}
    </div>
  );
}

export default Boost;
