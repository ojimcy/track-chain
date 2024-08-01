// src/components/Tap.js

import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FaBolt, FaRocket } from 'react-icons/fa';

import './tap.css';
import dollar from '../assets/images/dollar.png';
import data from '../hooks/demo_data';
import { formatBalance } from '../utils/formatBalance';

function Tap() {
  const { user, levels } = data;

  const [balance, setBalance] = useState(user.balance);
  const [energy, setEnergy] = useState(user.energy_limit);
  const [taps, setTaps] = useState([]);
  const [tapId, setTapId] = useState(0);

  const currentLevel = levels.find((lvl) => lvl.level === user.level);

  const handleTap = (event) => {
    if (energy > user.multi_tap) {
      const x = event.clientX;
      const y = event.clientY;
      const newTapId = tapId + 1;

      setBalance((prevBalance) => prevBalance + user.multi_tap);
      setEnergy((prevEnergy) => prevEnergy - user.multi_tap);
      setTaps([...taps, { id: newTapId, x, y }]);
      setTapId(newTapId);

      setTimeout(() => {
        setTaps((taps) => taps.filter((tap) => tap.id !== newTapId));
      }, 1000); // Remove animation after 1 second
    }
  };

  useEffect(() => {
    if (energy < user.energy_limit) {
      const energyRefill = setInterval(() => {
        setEnergy((prevEnergy) => Math.min(prevEnergy + 1, user.energy_limit));
      }, 1000);

      return () => clearInterval(energyRefill);
    }
  }, [energy, user.energy_limit]);

  return (
    <div className="mining-page mt-3">
      <Container className="mining-container">
        <div className="balance d-flex align-items-center">
          <img src={dollar} alt="Dollar Icon" />
          <span className="earnings">{formatBalance(balance)}</span>
        </div>

        <div className="tap-area" onClick={handleTap}>
          <img src={currentLevel.icon} alt="Current Level Icon" />
          {taps.map((tap) => (
            <div
              key={tap.id}
              className="multi-tap-animation"
            >
              +{user.multi_tap}
            </div>
          ))}
        </div>

        <div className="boost-area">
          <div className="energy d-flex flex-column align-items-center">
            <FaBolt className="lightning-icon" size={35} />
            <span className="mt-2">
              {energy}/{user.energy_limit}
            </span>
          </div>

          <div className="booster d-flex flex-column align-items-center">
            <FaRocket size={35} />
            <Link className="mt-2" to="/boost">
              <span style={{ color: '#ffffff' }}>Boost</span>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Tap;
