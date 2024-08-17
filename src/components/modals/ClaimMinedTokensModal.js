import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, Button, Spinner } from 'reactstrap';
import { toast } from 'react-toastify';
import { getMinedTokens, claimTokens } from '../../lib/server';
import { formatBalance } from '../../utils/formatBalance';
import './modal.css';

import dollar from '../../assets/images/dollar.png';

const ClaimTokensModal = ({ isOpen, toggle }) => {
  const [loading, setLoading] = useState(false);
  const [minedTokens, setMinedTokens] = useState(0);
  const [loadingClaim, setLoadingClaim] = useState(false);

  // Fetch the total mined tokens when the modal opens
  const fetchMinedTokens = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getMinedTokens();
      setMinedTokens(response.minedTokens);
      console.log('to claim', response);
    } catch (error) {
      console.error('Error fetching mined tokens:', error);
      toast.error('Failed to fetch mined tokens');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchMinedTokens();
    }
  }, [isOpen, fetchMinedTokens]);

  // Handle claiming the tokens
  const handleClaimTokens = async () => {
    try {
      setLoadingClaim(true);
      await claimTokens();
      toast.success('Tokens claimed successfully');
      setMinedTokens(0); // Reset mined tokens after claiming
      toggle(); // Close the modal after claiming
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
  toggle: PropTypes.func.isRequired,
  telegramUser: PropTypes.object.isRequired,
};

export default ClaimTokensModal;
