import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, Button, Spinner } from 'reactstrap';
import './modal.css';
import { Separator } from '../common/Seperator';
import dollar from '../../assets/images/dollar.png';
import { formatBalance } from '../../utils/formatBalance';
import { upgradeCard, submitCombo } from '../../lib/server';
import { toast } from 'react-toastify';
import CustomConfetti from '../common/CustomConfetti';
import { useCurrentUser } from '../../hooks/telegram';
import { WebappContext } from '../../context/telegram';

const CardDetailsModal = ({ isOpen, toggle, card, fetchUserData }) => {
  const currentUser = useCurrentUser();
  const { comboCards, setComboCards, dailyCombo } = useContext(WebappContext);
  console.log('updated', dailyCombo);

  const [showConfetti, setShowConfetti] = useState(false);
  const [loading, setLoading] = useState(false);

  const insufficientBalance =
    card && (card.upgradeCost || card.initialUpgradeCost) > currentUser.balance;
  const hmr = (card && card.hmr) || (card && card.initialHMR);
  const upgradeCost =
    (card && card.upgradeCost) || (card && card.initialUpgradeCost);

  // Check if the card is part of the daily combo
  const isPartOfCombo =
    Array.isArray(dailyCombo) && dailyCombo.includes(card.id);

  // Handle combo submission when all 3 correct cards are selected
  const checkComboCompletion = async () => {
    if (comboCards.length === 3) {
      try {
        await submitCombo(comboCards);
        toast.success('Combo successfully completed!', {
          position: 'top-right',
          autoClose: 3000,
        });
        setComboCards([]);
      } catch (error) {
        toast.error('Failed to submit combo', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    }
  };

  useEffect(() => {
    checkComboCompletion();
  }, [comboCards]);

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

      if (isPartOfCombo) {
        // Add card to comboCards if it's part of the daily combo
        setComboCards((prev) => [...prev, card.id]);
      }

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

  console.log('daily combos', dailyCombo);

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="main-modal">
      {showConfetti && <CustomConfetti />}
      <ModalHeader toggle={toggle} className="card-modal-header"></ModalHeader>
      <ModalBody className="text-center">
        <div className="card-image-wrapper mb-3">
          <img src={card.image} alt={card.name} className="card-modal-image" />
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
                <>{formatBalance(upgradeCost)} Points</>
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
  fetchUserData: PropTypes.func.isRequired,
};

export default CardDetailsModal;
