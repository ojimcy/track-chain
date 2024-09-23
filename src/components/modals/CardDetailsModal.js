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
  const { dailyCombo, selectedComboCard, setSelectedComboCard } =
    useContext(WebappContext);

  const [showConfetti, setShowConfetti] = useState(false);
  const [loading, setLoading] = useState(false);

  const insufficientBalance =
    card && (card.upgradeCost || card.initialUpgradeCost) > currentUser.balance;
  const hmr = (card && card.hmr) || (card && card.initialHMR);
  const upgradeCost =
    (card && card.upgradeCost) || (card && card.initialUpgradeCost);

  // Check if the card is part of the daily combo
  const isPartOfCombo =
    dailyCombo &&
    (card.id === dailyCombo.trackCard ||
      card.id === dailyCombo.otherCard1 ||
      card.id === dailyCombo.otherCard2);

  // Handle the combo submission logic
  const handleComboSubmission = async () => {
    setLoading(true);
    try {
      const res = await submitCombo(selectedComboCard);
      console.log('combos res', res, selectedComboCard);

      toast.success('Combo successfully completed!', {
        position: 'top-right',
        autoClose: 3000,
      });

      // Clear the selected combo after successful submission
      setSelectedComboCard([]);
      await fetchUserData(); // Refresh user data if necessary
    } catch (error) {
      console.error('Failed to submit combo', error);
      toast.error(error.response?.data?.error || 'Failed to submit combo', {
        position: 'top-right',
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  console.log(selectedComboCard.length);

  useEffect(() => {
    if (selectedComboCard.length === 3) {
      handleComboSubmission();
    }
  }, [selectedComboCard]);

  // Handle card upgrade
  const handleCardUpgrade = async () => {
    setLoading(true);
    try {
      await upgradeCard(card.id);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      toast.success(`${card.name} upgraded to level ${card.level + 1}`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
      });

      // If the card is part of the daily combo, add it to the selected cards
      if (isPartOfCombo) {
        setSelectedComboCard((prev) =>
          prev.includes(card.id) ? prev : [...prev, card.id]
        );
      }

      // Refresh user data and close the modal
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
  card: PropTypes.object.isRequired,
  fetchUserData: PropTypes.func.isRequired,
};

export default CardDetailsModal;
