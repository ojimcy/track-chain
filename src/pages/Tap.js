import React, { useState, useEffect, useCallback, useContext } from 'react';
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
import { useCurrentUser } from '../hooks/telegram';
import { WebappContext } from '../context/telegram';
import { saveTaps } from '../lib/server';
import { formatBalance } from '../utils/formatBalance';

function Tap() {
  const { levels } = data;
  const currentUser = useCurrentUser();
  const { taps, setTaps } = useContext(WebappContext);
  const [balance, setBalance] = useState(currentUser.balance);
  const [energy, setEnergy] = useState(currentUser.energyLimit);
  const [rewardModal, setRewardModal] = useState(false);
  const [score, setScore] = useState(0);

  const currentLevel = levels.find((lvl) => lvl.level === currentUser.levelId);

  // Throttle time for user inactivity (3 seconds)
  const inactivityTimeout = 3000;
  let inactivityTimer = null;

  const toggleRewardModal = useCallback(() => {
    setRewardModal((prev) => !prev);
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
        const newTapId = Date.now() + i; // Unique ID for each touch

        // Add tap to the array
        newTaps.push({ id: newTapId, x, y, progress: 0 });

        // Update balance and score for each tap
        energyUsed += currentUser.multiTap;
      }

      // Apply updates in bulk for performance
      setBalance((prevBalance) => prevBalance + energyUsed);
      setScore((prevScore) => prevScore + energyUsed);
      setEnergy((prevEnergy) => prevEnergy - energyUsed);
      setTaps((prevTaps) => [...prevTaps, ...newTaps]);

      // Start animations for each touch point
      newTaps.forEach((tap) => animateTap(tap.x, tap.y, tap.id));

      // Reset inactivity timer
      resetInactivityTimer();
    }
  };

  const animateTap = (x, y, tapId) => {
    const animationDuration = 1000; // 1 second
    const startTime = performance.now();

    const updateAnimation = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / animationDuration, 1);

      // Update the animation state
      setTaps((prevTaps) =>
        prevTaps.map((tap) => (tap.id === tapId ? { ...tap, progress } : tap))
      );

      if (progress < 1) {
        requestAnimationFrame(updateAnimation);
      } else {
        // Remove the tap after the animation completes
        setTaps((prevTaps) => prevTaps.filter((tap) => tap.id !== tapId));
      }
    };

    requestAnimationFrame(updateAnimation);
  };

  const saveScores = useCallback(
    async (score) => {
      if (score > 0) {
        try {
          await saveTaps(parseInt(score));
          setScore(0);
        } catch (error) {
          console.error('Error saving taps:', error.response.data);
        }
      }
    },
    [score]
  );

  const resetInactivityTimer = () => {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }
    inactivityTimer = setTimeout(() => {
      saveScores(score);
    }, inactivityTimeout);
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
    const handlePageUnload = () => {
      saveScores(score);
    };

    window.addEventListener('beforeunload', handlePageUnload);

    return () => {
      clearTimeout(inactivityTimer);
      window.removeEventListener('beforeunload', handlePageUnload);
      saveScores(score);
    };
  }, [saveScores]);

  return (
    <div className="mining-page mt-3">
      <Container>
        <div className="mining-content">
          <div className="balance d-flex align-items-center">
            <img src={dollar} alt="Dollar Icon" width={50} />
            <span className="earnings">
              {balance && formatBalance(balance)}
            </span>
          </div>

          <Row className="top-links d-flex justify-content-between">
            <Col>
              <Link to="#" className="top-link" onClick={toggleRewardModal}>
                <div className="link-content d-flex align-items-center">
                  <img src={reward} alt="Daily Rewards" />
                  <span className="link-title">Daily Rewards</span>
                  <span className="timer">23:07:58</span>
                </div>
              </Link>
            </Col>
            <Col>
              <Link to="/daily-combo" className="top-link">
                <div className="link-content d-flex align-items-center">
                  <img src={puzzle} alt="Daily Combo" />
                  <span className="link-title">Word Puzzle</span>
                  <span className="timer">14:52:59</span>
                </div>
              </Link>
            </Col>
            <Col>
              <Link to="/daily-combo" className="top-link">
                <div className="link-content d-flex align-items-center">
                  <img src={cal} alt="Daily Combo" />
                  <span className="link-title">Daily Combo</span>
                  <span className="timer">14:52:59</span>
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
    </div>
  );
}

export default Tap;