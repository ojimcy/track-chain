import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from 'reactstrap';

import './modal.css';
import tapImg from '../../assets/images/tap.png';
import dollar from '../../assets/images/dollar.png';
import { formatBalanceShort } from '../../utils/formatBalance';

function MultitapModal({
  modal,
  toggleModal,
  nextMultiTapLevel,
  handleBoost,
  loading,
  user,
}) {
  const isInsufficientFunds = nextMultiTapLevel.cost > user?.balance;

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
          <p>+{nextMultiTapLevel.taps} points per tap</p>
          <span className="boost-cost">
            <img src={dollar} alt="" width={35} height={35} />{' '}
            {formatBalanceShort(nextMultiTapLevel.cost)}{' '}
            <span style={{ fontSize: '12px', color: 'gray' }}>
              . lvl {nextMultiTapLevel.level}
            </span>
          </span>
        </div>
      </ModalBody>
      <ModalFooter className="justify-content-center">
        <Button
          onClick={!isInsufficientFunds ? handleBoost : null}
          className="boost-btn"
          disabled={loading || isInsufficientFunds}
        >
          {loading ? (
            <Spinner size="sm" />
          ) : isInsufficientFunds ? (
            'Insufficient funds'
          ) : (
            'Boost'
          )}
        </Button>
      </ModalFooter>
    </Modal>
  );
}

// Prop types validation
MultitapModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  handleBoost: PropTypes.func.isRequired,
  nextMultiTapLevel: PropTypes.shape({
    taps: PropTypes.number.isRequired,
    cost: PropTypes.number.isRequired,
    level: PropTypes.number.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    balance: PropTypes.number,
    tapLevel: PropTypes.number,
    energyLevel: PropTypes.number,
  }),
};

export default MultitapModal;
