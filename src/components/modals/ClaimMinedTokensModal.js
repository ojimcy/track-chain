/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, Button, Spinner } from 'reactstrap';
import { toast } from 'react-toastify';
import { formatBalance } from '../../utils/formatBalance';

import './modal.css';
import dollar from '../../assets/images/dollar.png';

const ClaimTokensModal = ({
  isOpen,
  toggle,
  onClaimSuccess,
  loading,
  minedTokens,
}) => {
  const [loadingClaim, setLoadingClaim] = useState(false);

  // Handle claiming the tokens
  const handleClaimTokens = async () => {
    try {
      setLoadingClaim(true);
      toggle();
      onClaimSuccess();
    } catch (error) {
      console.error('Error claiming tokens:', error);
      toast.error('Failed to claim tokens');
    } finally {
      setLoadingClaim(false);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="main-modal">
      <ModalHeader toggle={toggle}>Offline Earnings</ModalHeader>
      <ModalBody className="text-center">
        {loading ? (
          <Spinner color="primary" />
        ) : (
          <>
            <p>
              The bot keeps earning for you upto 3 hours while you are offline
            </p>
            <p className="token-amount">
              {' '}
              <img src={dollar} alt="" width={35} /> +
              {formatBalance(minedTokens)}
            </p>

            <Button
              color="primary"
              className="mt-3 w-100 p-3"
              onClick={handleClaimTokens}
              disabled={loadingClaim || minedTokens === 0}
            >
              {loadingClaim ? (
                <Spinner size="sm" color="light" />
              ) : (
                'Claim Tokens'
              )}
            </Button>
          </>
        )}
      </ModalBody>
    </Modal>
  );
};

ClaimTokensModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  onClaimSuccess: PropTypes.func.isRequired,
  telegramUser: PropTypes.object.isRequired,
};

export default ClaimTokensModal;
