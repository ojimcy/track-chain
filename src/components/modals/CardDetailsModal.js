import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import './modal.css';
import { Separator } from '../common/Seperator';

import dollar from '../../assets/images/dollar.png';
import { formatBalance } from '../../utils/formatBalance';
import { upgradeCard } from '../../lib/server';
import { toast } from 'react-toastify';
import { useCurrentUser } from '../../hooks/telegram';

const CardDetailsModal = ({ isOpen, toggle, card }) => {
  const currentUser = useCurrentUser();

  const insufficientBalance =
    currentUser.balance < (card.upgradeCost || card.initialUpgradeCost);
  const hmr = card.hmr || card.initialHMR;
  const upgradeCost = card.upgradeCost || card.initialUpgradeCost;

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
            <img src={dollar} alt="" width={35} /> +{hmr}
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
            <>{formatBalance(upgradeCost)} Points</>
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
