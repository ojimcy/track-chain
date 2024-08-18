import React, { useState, useEffect, useCallback } from 'react';
import Confetti from 'react-confetti';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, Button, Spinner } from 'reactstrap';
import { toast } from 'react-toastify';
import { getMinedTokens, claimTokens } from '../../lib/server';
import { formatBalance } from '../../utils/formatBalance';

import './modal.css';
import dollar from '../../assets/images/dollar.png';

const ClaimTokensModal = ({ isOpen, toggle, userData }) => {
  const [loading, setLoading] = useState(false);
  const [minedTokens, setMinedTokens] = useState(0);
  const [loadingClaim, setLoadingClaim] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

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
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      setMinedTokens(0);
      userData();
      toggle();
    } catch (error) {
      console.error('Error claiming tokens:', error);
      toast.error('Failed to claim tokens');
    } finally {
      setLoadingClaim(false);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="main-modal">
      {showConfetti && (
        <Confetti
          drawShape={(ctx) => {
            ctx.beginPath();
            for (let i = 0; i < 22; i++) {
              const angle = 0.35 * i;
              const x = (0.2 + 1.5 * angle) * Math.cos(angle);
              const y = (0.2 + 1.5 * angle) * Math.sin(angle);
              ctx.lineTo(x, y);
            }
            ctx.stroke();
            ctx.closePath();
          }}
        />
      )}
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
  userData: PropTypes.func.isRequired,
  telegramUser: PropTypes.object.isRequired,
};

export default ClaimTokensModal;
