/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import './daily-reward.css';

import calendar from '../../assets/images/calendar-check.png';
import dollar from '../../assets/images/dollar.png';
import { formatBalanceShort } from '../../utils/formatBalance';
import { FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Confetti from 'react-confetti';

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
  { day: 16, amount: '10000000' },
];

function DailyRewardModal({ isOpen, toggle }) {
  const [checkedIn, setCheckedIn] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const currentDay = 2;

  const handleCheckIn = (day) => {
    if (day === currentDay) {
      setCheckedIn(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
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
            Accrue coins for logging into the game daily without skipping. If
            you miss a day, you start all over again
          </p>
        </div>
        <div className="daily-reward-list mt-5">
          {dailyRewards.map((reward, index) => (
            <div
              key={index}
              className={`daily-reward-item ${
                currentDay === reward.day ? 'active' : ''
              }`}
            >
              <div className="day">Day {reward.day}</div>
              <div className="amount d-flex flex-row align-items-center">
                <img src={dollar} alt="" width={30} />
                <span className="reward-amount">
                  {formatBalanceShort(reward.amount)}
                </span>
              </div>
              <div className="">
                {checkedIn && currentDay === reward.day ? (
                  <FaCheck color="green" size={24} />
                ) : (
                  <Link
                    to="#"
                    className="claim-button"
                    onClick={(event) => handleCheckIn(currentDay, event)}
                  >
                    Claim
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </ModalBody>
    </Modal>
  );
}

export default DailyRewardModal;
