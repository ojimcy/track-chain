import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

import './modal.css';
import { Link } from 'react-router-dom';

function InviteModal({ modal, toggleModal, handleShare, handleCopy }) {
  return (
    <Modal isOpen={modal} toggle={toggleModal} className="task-modal">
      <ModalHeader toggle={toggleModal}></ModalHeader>
      <ModalBody>
        <div className="modal-title">
          <p>Invite Frens</p>
        </div>
        <div className="invite-actions d-flex flex-column align-items-center justify-content-center w-100">
          <Link to="#" className="share-btn" onClick={handleShare}>
            Send in Telegram
          </Link>
          <Link to="#" className="copy-btn" onClick={handleCopy}>
            Copy Link
          </Link>
        </div>
      </ModalBody>
    </Modal>
  );
}

// Prop types validation
InviteModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  handleShare: PropTypes.func.isRequired,
  handleCopy: PropTypes.func.isRequired,
};

export default InviteModal;
