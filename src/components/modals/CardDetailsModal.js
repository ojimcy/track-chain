import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import './modal.css';
import { Separator } from '../common/Seperator';

import dollar from '../../assets/images/dollar.png';
import { formatBalance } from '../../utils/formatBalance';

const CardDetailsModal = ({ isOpen, toggle, card, upgradeCard }) => {
  if (!card) return null;

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
        <div className="card-earnings">
          <span className="earnings-label">
            {' '}
            <img src={dollar} alt="" width={35} /> +{card.hmr? card.hmr : card.initialHMR}
          </span>
        </div>
        <Button color="primary" className="mt-3 w-100" onClick={upgradeCard}>
          <img src={dollar} alt="" width={35} />{' '}
          {formatBalance(
            card.upgradeCost ? card.upgradeCost : card.initialUpgradeCost
          )}{' '}
          Points
        </Button>
      </ModalBody>
    </Modal>
  );
};

CardDetailsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  upgradeCard: PropTypes.func.isRequired,
  card: PropTypes.object,
};

export default CardDetailsModal;
