import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Container, Row } from 'reactstrap';
import { Separator } from '../components/common/Seperator';
import { formatBalance } from '../utils/formatBalance';

import './frens.css';
import InviteModal from '../components/modals/InviteModal';
import { toast } from 'react-toastify';
import {
  useCurrentUser,
  useReferralLink,
  useTelegramUser,
  useWebApp,
} from '../hooks/telegram';
import { WebappContext } from '../context/telegram';
import { getMyDownlines, getUserByTelegramID } from '../lib/server';
import { TelegramShareButton } from 'react-share';

function Frens() {
  const referralLink = useReferralLink(useCurrentUser);
  const webapp = useWebApp();
  const [modalOpen, setModalOpen] = useState(false);
  const { setUser } = useContext(WebappContext);
  const currentUser = useCurrentUser();
  const telegramUser = useTelegramUser();
  const [downlines, setDownlines] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (!telegramUser) return;
    const fn = async () => {
      try {
        let user = await getUserByTelegramID(telegramUser.id);
        setUser(user);
        const initialDownlines = await getMyDownlines(20);
        setDownlines(initialDownlines);
      } catch (error) {
        console.error('Failed to fetch user or downlines:', error);
      }
    };
    fn();
  }, [setUser, telegramUser]);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement('textarea');
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
  }

  async function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(text);
      return;
    }
    await navigator.clipboard.writeText(text);
  }

  const copyReferralLink = async () => {
    try {
      await copyTextToClipboard(referralLink);
      toast.success('Referral link copied!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
      });
    } catch (error) {
      toast.error('Failed to copy link', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
      });
    }
  };

  const share = () => {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
      referralLink
    )}&text=${encodeURIComponent('Mine free RAIN token on Telegram')}`;
    webapp.openTelegramLink(telegramUrl);
  };

  const loadAllDownlines = async () => {
    try {
      const allDownlines = await getMyDownlines();
      setDownlines(allDownlines);
      setShowAll(true);
    } catch (error) {
      console.error('Failed to fetch all downlines:', error);
    }
  };
  return (
    <div className="frens-page">
      <Container>
        <TelegramShareButton />
        <Row>
          <div className="page-header">
            <div className="title">
              <h3>Invite Friends</h3>
            </div>
            <div className="sub-title">
              <h6>
                You and your friends earn bonuses when you invite them. You and
                your invitee earn 25,000 points when you invite them.
              </h6>
            </div>
          </div>
        </Row>

        {currentUser && (
          <>
            <p className="mt-4">Friends list ({downlines.length})</p>
            <Row>
              {downlines.map((downline) => (
                <React.Fragment key={downline.id}>
                  <Col xs={12}>
                    <Link
                      to="#"
                      className="frens-card d-flex justify-content-between align-items-center mt-2"
                    >
                      <div className="frens-info d-flex align-items-center">
                        <div className="frens-icon d-flex align-items-center justify-content-center">
                          {downline.profilePic ? (
                            <img
                              src={downline.profilePic}
                              alt={downline.username}
                            />
                          ) : (
                            <span>{downline.username.charAt(0)}</span>
                          )}
                        </div>
                        <div className="info d-flex flex-column">
                          <span className="frens-title">
                            {downline.username}
                          </span>
                          <span className="frens-level">{downline.level}</span>
                        </div>
                      </div>
                      <div className="balance">
                        {formatBalance(downline.balance)}
                      </div>
                    </Link>
                  </Col>
                  <Separator />
                </React.Fragment>
              ))}
            </Row>
          </>
        )}

        {!showAll && downlines.length === 20 && (
          <div className="d-flex justify-content-center mt-4">
            <Button onClick={loadAllDownlines} color="secondary">
              Show All
            </Button>
          </div>
        )}

        <div className="ref-action mt-5">
          <Link to="#" className="prim-btn" onClick={toggleModal}>
            Invite a Fren
          </Link>
        </div>
      </Container>
      {modalOpen && (
        <InviteModal
          modal={modalOpen}
          toggleModal={toggleModal}
          handleCopy={copyReferralLink}
          handleShare={share}
        />
      )}
    </div>
  );
}

export default Frens;
