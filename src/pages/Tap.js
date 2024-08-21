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

import './tap.css';
import dollar from '../assets/images/dollar.png';
import cal from '../assets/images/cal.png';
import reward from '../assets/images/reward.png';
import rocket from '../assets/images/rocket.png';
import puzzle from '../assets/images/puzzle.png';
import data from '../hooks/demo_data';
import DailyRewardModal from '../components/modals/DailyRewardModal';
import { useCurrentUser, useTelegramUser } from '../hooks/telegram';
import { WebappContext } from '../context/telegram';
import {
  claimTokens,
  getMinedTokens,
  getUserByTelegramID,
  saveTaps,
} from '../lib/server';
import { formatBalance } from '../utils/formatBalance';
import CountdownTimer from '../components/common/CountdownTimer';
import ClaimTokensModal from '../components/modals/ClaimMinedTokensModal';
import { toast } from 'react-toastify';
import CustomConfetti from '../components/common/CustomConfetti';

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

  const scoreRef = useRef(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [minedTokens, setMinedTokens] = useState(0);
  const [loading, setLoading] = useState(false);

  const currentLevel = levels.find((lvl) => lvl.level === currentUser.levelId);
  const duration = 24 * 60 * 60 * 1000;
  const puzzleDuration = 72 * 60 * 60 * 1000;

  const fetchUserData = useCallback(async () => {
    try {
      const user = await getUserByTelegramID(telegramUser.id);
      setUser(user);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  }, [telegramUser, setUser]);

  const fetchMinedTokens = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getMinedTokens();
      setMinedTokens(response.minedTokens);
    } catch (error) {
      console.error('Error fetching mined tokens:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMinedTokens();
  }, [fetchMinedTokens]);

  const toggleRewardModal = useCallback(() => {
    setRewardModal((prev) => !prev);
  }, []);

  const toggleClaimModal = useCallback(() => {
    setClaimModal((prev) => !prev);
  }, []);

  const handleTap = (event) => {
    const touches = event.touches;

    if (energy >= touches?.length * currentUser.multiTap) {
      const newTaps = [];
      let energyUsed = 0;

      for (let i = 0; i < touches?.length; i++) {
        const touch = touches[i];
        const rect = event.target.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        const newTapId = Date.now() + i;

        newTaps.push({ id: newTapId, x, y, progress: 0 });
        energyUsed += currentUser.multiTap;
      }

      // Calculate the new balance based on energy used
      const newBalance = balance + energyUsed;

      // Animate the balance increase
      animateBalanceIncrease(balance, newBalance, 2000);

      // Update the state with the new values
      setBalance(newBalance);
      scoreRef.current = scoreRef.current + energyUsed;
      setEnergy(energy - energyUsed);
      setTaps((prevTaps) => [...prevTaps, ...newTaps]);
      saveScores(scoreRef.current);
      newTaps.forEach((tap) => animateTap(tap.x, tap.y, tap.id));
    }
  };

  const animateTap = (x, y, tapId) => {
    const animationDuration = 1000;
    const startTime = performance.now();

    const updateAnimation = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / animationDuration, 1);

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
    if (score < 20 * currentUser.multiTap || energy == 0) {
      return;
    }

    if (score > 0) {
      try {
        const currentScore = parseInt(score);
        scoreRef.current = 0;
        await saveTaps(currentScore);
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
    currentUser.hmr > 0 && setClaimModal(true);
  }, []);

  const animateBalanceIncrease = (start, end, duration) => {
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const newBalance = start + progress * (end - start);

      setAnimatedBalance(newBalance.toFixed(0));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const handleClaimTokens = async () => {
    try {
      setLoading(true);
      await claimTokens();
      fetchUserData();

      const newBalance = balance + minedTokens;
      animateBalanceIncrease(balance, newBalance, 2000);

      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      toggleClaimModal();
    } catch (error) {
      console.error('Error claiming tokens:', error);
      toast.error('Failed to claim tokens');
    } finally {
      setLoading(false);
    }
  };

  const handlePuzzleClick = () => {
    toast.info(`Coming soon!!!`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
    });
  };

  return (
    <div className="mining-page mt-3">
      {showConfetti && <CustomConfetti />}
      <Container>
        <div className="mining-content">
          <div className="balance d-flex align-items-center">
            <img src={dollar} alt="Dollar Icon" width={50} />
            <span className="earnings">
              {animatedBalance && formatBalance(animatedBalance)}
            </span>
          </div>

          <Row className="top-links d-flex justify-content-between">
            <Col>
              <Link to="#" className="top-link" onClick={toggleRewardModal}>
                <div className="link-content d-flex align-items-center">
                  <img src={reward} alt="Daily Rewards" />
                  <span className="link-title">Daily Rewards</span>
                  <span className="timer">
                    <CountdownTimer duration={duration} />
                  </span>
                </div>
              </Link>
            </Col>
            <Col>
              <Link onClick={handlePuzzleClick} className="top-link">
                <div className="link-content d-flex align-items-center">
                  <img src={puzzle} alt="Daily Combo" />
                  <span className="link-title">Word Puzzle</span>
                  <span className="timer">
                    <CountdownTimer duration={puzzleDuration} />
                  </span>
                </div>
              </Link>
            </Col>
            <Col>
              <Link onClick={handlePuzzleClick} className="top-link">
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
                  opacity: 1 - tap.progress,
                  transform: `scale(${1 + tap.progress * 2})`,
                  transition: 'opacity 1s, transform 1s',
                }}
              >
                +{currentUser.multiTap}
              </div>
            ))}
          </div>

          <div className="boost-area">
            <div className="energy d-flex flex-row align-items-center">
              <FaBolt className="lightning-icon" size={25} />
              <span>
                {energy}/{currentUser.energyLimit}
              </span>
            </div>

            <div className="booster d-flex flex-row align-items-center">
              <Link className="" to="/boost">
                <img src={rocket} alt="" />
                <span style={{ color: '#ffffff' }}>Boost</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>

      {rewardModal && (
        <DailyRewardModal isOpen={rewardModal} toggle={toggleRewardModal} />
      )}

      {claimModal && (
        <ClaimTokensModal
          isOpen={claimModal}
          toggle={toggleClaimModal}
          handleClaim={handleClaimTokens}
          minedTokens={minedTokens}
          loading={loading}
        />
      )}
    </div>
  );
}

export default Tap;
