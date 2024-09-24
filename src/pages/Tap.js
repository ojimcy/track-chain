import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useRef,
} from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FaBolt } from 'react-icons/fa';
import { toast } from 'react-toastify';

import './tap.css';
import dollar from '../assets/images/dollar.png';
import cal from '../assets/images/cal.png';
import reward from '../assets/images/reward.png';
// import rocket from '../assets/images/rocket.png';
import puzzle from '../assets/images/puzzle.png';
import checks from '../assets/images/check.jpg';

import DailyRewardModal from '../components/modals/DailyRewardModal';
import ClaimTokensModal from '../components/modals/ClaimMinedTokensModal';
import CountdownTimer from '../components/common/CountdownTimer';
import CustomConfetti from '../components/common/CustomConfetti';

import { useCurrentUser, useTelegramUser } from '../hooks/telegram';
import { WebappContext } from '../context/telegram';
import {
  claimTokens,
  getMinedTokens,
  getUserByTelegramID,
  saveTaps,
} from '../lib/server';
import { formatBalance } from '../utils/formatBalance';
import data from '../hooks/demo_data';

function Tap() {
  const { levels } = data;
  const { setUser } = useContext(WebappContext);
  const currentUser = useCurrentUser();
  const telegramUser = useTelegramUser();
  const { taps, setTaps } = useContext(WebappContext);

  const [balance, setBalance] = useState(currentUser.balance);
  const [animatedBalance, setAnimatedBalance] = useState(currentUser.balance);
  const [energy, setEnergy] = useState(currentUser.energyLimit);
  const [rewardModal, setRewardModal] = useState(false);
  const [claimModal, setClaimModal] = useState(false);
  const [minedTokens, setMinedTokens] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const scoreRef = useRef(0);
  const duration = 24 * 60 * 60 * 1000;
  const puzzleDuration = 72 * 60 * 60 * 1000;

  const currentLevel = levels.find((lvl) => lvl.level === currentUser.levelId);

  const fetchUserData = useCallback(async () => {
    try {
      const user = await getUserByTelegramID(telegramUser.id);
      setUser(user);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  }, [telegramUser, setUser]);

  const fetchMinedTokens = useCallback(async () => {
    setLoading(true);
    try {
      const { minedTokens } = await getMinedTokens();
      setMinedTokens(minedTokens);
    } catch (error) {
      console.error('Error fetching mined tokens:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMinedTokens();
  }, [fetchMinedTokens]);

  const handleTap = (event) => {
    const touches = event.touches || [
      { clientX: event.clientX, clientY: event.clientY },
    ];
    const energyRequired = touches.length * currentUser.multiTap;

    if (energy >= energyRequired) {
      const newTaps = touches.map((touch, index) => {
        const rect = event.target.getBoundingClientRect();
        return {
          id: Date.now() + index,
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top,
          progress: 0,
        };
      });

      const newBalance = balance + energyRequired;
      animateBalanceIncrease(balance, newBalance);
      setBalance(newBalance);
      scoreRef.current += energyRequired;
      setEnergy(energy - energyRequired);
      setTaps((prevTaps) => [...prevTaps, ...newTaps]);
      saveScores(scoreRef.current);
      newTaps.forEach((tap) => animateTap(tap.id));
    }
  };

  const animateTap = (tapId) => {
    const animationDuration = 1000;
    const startTime = performance.now();

    const updateAnimation = (currentTime) => {
      const progress = Math.min(
        (currentTime - startTime) / animationDuration,
        1
      );
      setTaps((prevTaps) =>
        prevTaps.map((tap) => (tap.id === tapId ? { ...tap, progress } : tap))
      );
      if (progress < 1) {
        requestAnimationFrame(updateAnimation);
      } else {
        setTaps((prevTaps) => prevTaps.filter((tap) => tap.id !== tapId));
      }
    };

    requestAnimationFrame(updateAnimation);
  };

  const saveScores = async (score) => {
    if (score >= 20 * currentUser.multiTap && energy > 0) {
      try {
        await saveTaps(score);
        scoreRef.current = 0;
      } catch (error) {
        console.error('Error saving taps:', error.response.data);
      }
    }
  };

  useEffect(() => {
    if (energy < currentUser.energyLimit) {
      const energyRefill = setInterval(() => {
        setEnergy((prevEnergy) =>
          Math.min(prevEnergy + 3, currentUser.energyLimit)
        );
      }, 1000);

      return () => clearInterval(energyRefill);
    }
  }, [energy, currentUser.energyLimit]);

  useEffect(() => {
    if (currentUser.hmr > 0) {
      setClaimModal(true);
    }
  }, [currentUser.hmr]);

  const animateBalanceIncrease = (start, end) => {
    const duration = 2000;
    const startTime = performance.now();

    const updateBalance = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const newBalance = start + progress * (end - start);
      setAnimatedBalance(newBalance.toFixed(0));

      if (progress < 1) {
        requestAnimationFrame(updateBalance);
      }
    };

    requestAnimationFrame(updateBalance);
  };

  const handleClaimTokens = async () => {
    setLoading(true);
    try {
      await claimTokens();
      fetchUserData();
      const newBalance = balance + minedTokens;
      animateBalanceIncrease(balance, newBalance);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      setClaimModal(false);
    } catch (error) {
      console.error('Error claiming tokens:', error);
      toast.error('Failed to claim tokens');
    } finally {
      setLoading(false);
    }
  };

  const isCheckinToday =
    new Date(currentUser.lastCheckinDate).toDateString() ===
    new Date().toDateString();

  return (
    <div className="mining-page mt-3">
      <Container>
        <div className="mining-content">
          {showConfetti && <CustomConfetti />}
          <div className="balance d-flex align-items-center">
            <img src={dollar} alt="Dollar Icon" width={50} />
            <span className="earnings">{formatBalance(animatedBalance)}</span>
          </div>

          <Row className="top-links d-flex justify-content-between">
            <Col>
              <Link
                to="#"
                className={`top-link ${
                  isCheckinToday && 'daily-task-completed'
                }`}
                onClick={() => setRewardModal(!rewardModal)}
              >
                <div className="link-content d-flex align-items-center">
                  <img src={reward} alt="Daily Rewards" />
                  <span className="link-title">Daily Rewards</span>
                  <span className="timer">
                    <CountdownTimer duration={duration} />
                  </span>
                  {isCheckinToday && (
                    <div className="green-tick">
                      <img src={checks} alt="check" />
                    </div>
                  )}
                </div>
              </Link>
            </Col>
            <Col>
              <Link onClick={() => toast.info('Coming soon!!!')}>
                <div className="link-content d-flex align-items-center">
                  <img src={puzzle} alt="Word Puzzle" />
                  <span className="link-title">Word Puzzle</span>
                  <span className="timer">
                    <CountdownTimer duration={puzzleDuration} />
                  </span>
                </div>
              </Link>
            </Col>
            <Col>
              <Link to="/mine">
                <div className="link-content d-flex align-items-center">
                  <img src={cal} alt="Daily Combo" />
                  <span className="link-title">Daily Combo</span>
                  <span className="timer">
                    <CountdownTimer duration={puzzleDuration} />
                  </span>
                </div>
              </Link>
            </Col>
          </Row>

          <div
            className="tap-area"
            onTouchStart={handleTap}
            onClick={handleTap}
          >
            <img src={currentLevel?.icon} alt="Current Level Icon" />
            {taps.map((tap) => (
              <div
                key={tap.id}
                className="multi-tap-animation"
                style={{
                  position: 'absolute',
                  left: `${tap.x}px`,
                  top: `${tap.y}px`,
                  transform: `scale(${1 + tap.progress})`,
                  opacity: 1 - tap.progress,
                }}
              />
            ))}
          </div>

          <div className="energy d-flex align-items-center justify-content-center">
            <FaBolt size={30} color="#FFC107" />
            <span className="energy-label">{energy}</span>
          </div>
        </div>

        <DailyRewardModal
          isOpen={rewardModal}
          toggle={() => setRewardModal(!rewardModal)}
          onRewardClaim={fetchUserData}
        />

        <ClaimTokensModal
          isOpen={claimModal}
          toggle={() => setClaimModal(!claimModal)}
          minedTokens={minedTokens}
          onClaim={handleClaimTokens}
          loading={loading}
        />
      </Container>
    </div>
  );
}

export default Tap;
