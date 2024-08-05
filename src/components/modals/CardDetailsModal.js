import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import './modal.css';
import { Separator } from '../common/Seperator';

import dollar from '../../assets/images/dollar.png';

const CardDetailsModal = ({ isOpen, toggle, card }) => {
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
            <img src={dollar} alt="" width={35} /> +{card.earningsPerHour}
          </span>
        </div>
        <Button color="primary" className="mt-3" onClick={toggle}>
          <img src={dollar} alt="" width={35} /> {card.cost} Points
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
