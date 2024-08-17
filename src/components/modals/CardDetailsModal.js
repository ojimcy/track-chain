import React, { useCallback, useContext, useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import './modal.css';
import { Separator } from '../common/Seperator';

import dollar from '../../assets/images/dollar.png';
import { formatBalance } from '../../utils/formatBalance';
import { getUserByTelegramID, upgradeCard } from '../../lib/server';
import { toast } from 'react-toastify';
import { useCurrentUser, useTelegramUser } from '../../hooks/telegram';
import { WebappContext } from '../../context/telegram';

const CardDetailsModal = ({ isOpen, toggle, card }) => {
  const currentUser = useCurrentUser();
  const { setUser } = useContext(WebappContext);
  const telegramUser = useTelegramUser();

  const [showConfetti, setShowConfetti] = useState(false);

  if (!card) return null;

  const insufficientBalance =
    currentUser.balance < (card.upgradeCost || card.initialUpgradeCost);

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

  const handleCardUpgrade = async () => {
    try {
      const res = await upgradeCard(card.id);
      console.log('upgraded card', res);
      toast.success(`${card.name} upgraded to level ${card.level + 1}`, {
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
      console.error('Error while upgrading card', error);
      toast.error('Failed to upgrade card', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
      });
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
            <img src={dollar} alt="" width={35} /> +
            {card.hmr ? card.hmr : card.initialHMR}
          </span>
        </div>
        <Button
          color="primary"
          className={`mt-3 w-100 ${insufficientBalance ? 'insufficient' : ''}`}
          onClick={handleCardUpgrade}
          disabled={insufficientBalance}
        >
          <img src={dollar} alt="" width={35} />{' '}
          {insufficientBalance ? (
            'Insufficient Balance'
          ) : (
            <>
              {formatBalance(
                card.upgradeCost ? card.upgradeCost : card.initialUpgradeCost
              )}{' '}
              Points
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
};

export default CardDetailsModal;
