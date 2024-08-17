/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Modal, ModalHeader, ModalBody, Spinner } from 'reactstrap';
import './daily-reward.css';

import calendar from '../../assets/images/calendar-check.png';
import dollar from '../../assets/images/dollar.png';
import { formatBalanceShort } from '../../utils/formatBalance';
import { FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Confetti from 'react-confetti';
import { useCurrentUser, useTelegramUser } from '../../hooks/telegram';
import { claimDailyReward, getUserByTelegramID } from '../../lib/server';
import { WebappContext } from '../../context/telegram';
import { toast } from 'react-toastify';

const dailyRewards = [
  { day: 1, amount: '500' },
  { day: 2, amount: '1000' },
  { day: 3, amount: '2500' },
  { day: 4, amount: '5000' },
  { day: 5, amount: '15000' },
  { day: 6, amount: '25000' },
  { day: 7, amount: '50000' },
  { day: 8, amount: '100000' },
  { day: 9, amount: '250000' },
  { day: 10, amount: '500000' },
  { day: 11, amount: '1000000' },
  { day: 12, amount: '2000000' },
  { day: 13, amount: '2500000' },
  { day: 14, amount: '3500000' },
  { day: 15, amount: '5000000' },
];

function DailyRewardModal({ isOpen, toggle }) {
  const { setUser } = useContext(WebappContext);
  const telegramUser = useTelegramUser();
  const currentUser = useCurrentUser();
  const [checkedIn, setCheckedIn] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [loading, setLoading] = useState(false);

  // Calculate current day in the streak based on currentUser's streak
  const currentDay = currentUser.streak;

  const fetchUserData = useCallback(async () => {
    try {
      const user = await getUserByTelegramID(telegramUser.id);
      setUser(user);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  }, [telegramUser, setUser]);

  useEffect(() => {
    if (telegramUser) {
      fetchUserData();
    }
  }, [telegramUser, fetchUserData]);

  useEffect(() => {
    const lastCheckinDate = new Date(currentUser.lastCheckinDate);
    const today = new Date();
    const isSameDay = lastCheckinDate.toDateString() === today.toDateString();

    setCheckedIn(isSameDay);
  }, [currentUser.lastCheckinDate]);

  const handleCheckIn = async (day) => {
    if (day !== currentDay || checkedIn) return;

    setLoading(true);
    try {
      await claimDailyReward();
      setCheckedIn(true);
      toast.success('Checked in successful, come back tomorrow!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
      });
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      await fetchUserData();
      toggle();
    } catch (error) {
      console.error('Check-in failed:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="daily-reward-modal">
      {showConfetti && (
        <Confetti
          drawShape={(ctx) => {
            ctx.beginPath();
            for (let i = 0; i < 22; i++) {
              const angle = 0.35 * i;
              const x = (0.2 + 1.5 * angle) * Math.cos(angle);
              const y = (0.2 + 1.5 * angle) * Math.sin(angle);
              ctx.lineTo(x, y);
            }
            ctx.stroke();
            ctx.closePath();
          }}
        />
      )}
      <ModalHeader toggle={toggle}></ModalHeader>
      <ModalBody>
        <div className="daily-reward-header">
          <img src={calendar} alt="Daily Reward Icon" />
          <h3>Daily reward</h3>
          <p>
            Keep your streak going! Log in daily to claim your rewards. Miss a
            day, and you&apos;ll have to start over.
          </p>
        </div>
        <div className="daily-reward-list mt-5">
          {dailyRewards.map((reward, index) => (
            <div
              key={index}
              className={`daily-reward-item ${
                index + 1 <= currentDay && checkedIn ? 'active' : ''
              }`}
            >
              <div className="day">Day {reward.day}</div>
              <div className="">
                {index + 1 <= currentDay && checkedIn ? (
                  <FaCheck color="green" size={24} />
                ) : (
                  <img src={dollar} alt="" width={25} />
                )}
              </div>
              <div className="amount">
                <span className="reward-amount">
                  {formatBalanceShort(reward.amount)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <Link
          to="#"
          className={`claim-button ${loading ? 'disabled' : ''}`}
          onClick={() => handleCheckIn(currentDay)}
        >
          {checkedIn ? (
            <span className="come-back">COME BACK TOMORROW</span>
          ) : loading ? (
            <Spinner />
          ) : (
            'Claim'
          )}
        </Link>
      </ModalBody>
    </Modal>
  );
}

export default DailyRewardModal;
