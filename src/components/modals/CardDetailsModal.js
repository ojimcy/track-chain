import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, Button, Spinner } from 'reactstrap';
import './modal.css';
import { Separator } from '../common/Seperator';
import dollar from '../../assets/images/dollar.png';
import { formatBalance } from '../../utils/formatBalance';
import { upgradeCard } from '../../lib/server';
import { toast } from 'react-toastify';
import Confetti from 'react-confetti';

const CardDetailsModal = ({ isOpen, toggle, card, fetchUserData }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [loading, setLoading] = useState(false);

  const insufficientBalance =
    card && (card.upgradeCost || card.initialUpgradeCost) > card.balance;
  const hmr = (card && card.hmr) || (card && card.initialHMR);
  const upgradeCost =
    (card && card.upgradeCost) || (card && card.initialUpgradeCost);

  const handleCardUpgrade = async () => {
    try {
      setLoading(true);
      await upgradeCard(card.id);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      toast.success(`${card.name} upgraded to level ${card.level + 1}`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
      });
      await fetchUserData();
      toggle();
    } catch (error) {
      console.error('Error while upgrading card', error);
      toast.error('Failed to upgrade card', {
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
    <Modal isOpen={isOpen} toggle={toggle} className="main-modal">
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
      <ModalHeader toggle={toggle} className="card-modal-header"></ModalHeader>
      <ModalBody className="text-center">
        <div className="card-image-wrapper mb-3">
          <img src={card.image} alt={card.name} className="card-image" />
        </div>
        <h4>{card.name}</h4>
        <p className="card-description">{card.description}</p>
        <Separator />
        <div
          className={`card-earnings ${
            insufficientBalance ? 'insufficient' : ''
          }`}
        >
          <span className="earnings-label">
            {' '}
            <img src={dollar} alt="" width={35} /> +{hmr * 0.5}
          </span>
        </div>
        <Button
          color="primary"
          className={`mt-3 w-100 ${insufficientBalance ? 'insufficient' : ''}`}
          onClick={handleCardUpgrade}
          disabled={insufficientBalance || loading}
        >
          {loading ? (
            <Spinner size="sm" color="light" />
          ) : (
            <>
              <img src={dollar} alt="" width={35} />{' '}
              {insufficientBalance ? (
                'Insufficient Balance'
              ) : (
                <>{formatBalance(upgradeCost / 2)} Points</>
              )}
            </>
          )}
        </Button>
      </ModalBody>
    </Modal>
  );
};

CardDetailsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  card: PropTypes.object,
  fetchUserData: PropTypes.func.isRequired, // Add prop types for fetchUserData
};

export default CardDetailsModal;
