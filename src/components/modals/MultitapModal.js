import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import './modal.css';

import tapImg from '../../assets/images/tap.png';
import dollar from '../../assets/images/dollar.png';
import { formatBalanceShort } from '../../utils/formatBalance';

function MultitapModal({ modal, toggleModal, nextMultiTapLevel }) {
  return (
    <Modal isOpen={modal} toggle={toggleModal} className="task-modal">
      <ModalHeader toggle={toggleModal}></ModalHeader>
      <ModalBody>
        <div className="modal-title">
          <p>Multitap</p>
        </div>
        <div className="boost-details d-flex flex-column align-items-center">
          <img src={tapImg} alt="Multitap" width={150} />
          <p>Increase the amount of points you earn per tap</p>
          <p>+{nextMultiTapLevel.tap} point per tap</p>
          <span className="boost-cost">
            <img src={dollar} alt="" width={35} height={35} />{' '}
            {formatBalanceShort(nextMultiTapLevel.cost)}{' '}
            <span style={{ fontSize: '12px', color: 'gray' }}>
              . lvl {nextMultiTapLevel.level}
            </span>
          </span>
        </div>
      </ModalBody>
      <ModalFooter className='justify-content-center'>
        <Button className='boost-btn'>Boost</Button>
      </ModalFooter>
    </Modal>
  );
}

// Prop types validation
MultitapModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  nextMultiTapLevel: PropTypes.shape({
    tap: PropTypes.number.isRequired,
    cost: PropTypes.number.isRequired,
    level: PropTypes.number.isRequired,
  }).isRequired,
};

export default MultitapModal;
