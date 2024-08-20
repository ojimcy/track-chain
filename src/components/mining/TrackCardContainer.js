import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { formatBalanceShort } from '../../utils/formatBalance';
import CardDetailsModal from '../modals/CardDetailsModal';
import dollar from '../../assets/images/dollar.png';
import lock from '../../assets/images/lock.png';
import { Col, Row } from 'reactstrap';

import './card-container.css';

const CardContainer = ({ cards, category, fetchCards }) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleCardClick = (card) => {
    if (card.canUpgrade) {
      setSelectedCard(card);
      toggleModal();
    }
  };

  const filteredCards = cards.filter((card) => card.category === category);

  const getCardBackground = (id) => {
    switch (id) {
      case 26:
        return 'bg-orange';
      case 27:
        return 'bg-blue';
      case 28:
        return 'bg-green';
      default:
        return 'bg-default';
    }
  };

  return (
    <Row className="track-card-row">
      {filteredCards.map((card) => (
        <Col xs={6} className="mb-4 track-card-col" key={card.id}>
          <div
            className={`track-card ${
              card.canUpgrade ? 'can-upgrade' : 'cannot-upgrade'
            } ${getCardBackground(card.id)}`}
            onClick={() => handleCardClick(card)}
            style={{ cursor: card.canUpgrade ? 'pointer' : 'not-allowed' }}
          >
            <div className="track-card-header p-1">
              <div className="track-card-image">
                {card.canUpgrade ? (
                  <img src={card.image} alt="" />
                ) : (
                  <img src={lock} alt="" />
                )}
              </div>

              <h5>{card.name}</h5>
            </div>
            <div className="track-card-body">
              <span
                className={`mb-4 ${
                  card.canUpgrade
                    ? 'earn-per-hour-upgrade'
                    : 'earn-per-hour-no-upgrade'
                }`}
              >
                Earn/Hr:{' '}
                <span className="earnings-per-hour">
                  +
                  {formatBalanceShort(
                    card.hmr ? card.hmr * 0.5 : card.initialHMR * 0.5
                  )}
                </span>
              </span>

              <hr
                style={{
                  width: '100%',
                  margin: '10px 0',
                  borderColor: '#699635',
                }}
              />
              <div
                className={`card-level mt-1 d-flex align-items-center justify-content-center ${
                  card.canUpgrade
                    ? 'card-level-upgrade'
                    : 'card-level-no-upgrade'
                }`}
              >
                <div className="level">Lvl {card.level}</div>

                {/* Vertical Line Separator */}
                <div
                  className="v-line"
                  style={{
                    borderLeft: '1px solid #699635',
                    height: '15px',
                    margin: '0 10px',
                  }}
                />

                {card.canUpgrade ? (
                  <div className="d-flex align-items-center justify-content-between">
                    <img src={dollar} alt=" " width={20} />
                    {formatBalanceShort(
                      card.upgradeCost
                        ? card.upgradeCost
                        : card.initialUpgradeCost
                    )}
                  </div>
                ) : (
                  <div className="upgrade-cost">
                    {card.upgradeDisabledReason}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Col>
      ))}

      {selectedCard && (
        <CardDetailsModal
          isOpen={isModalOpen}
          toggle={toggleModal}
          card={selectedCard}
          fetchUserData={fetchCards}
        />
      )}
    </Row>
  );
};

CardContainer.propTypes = {
  cards: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
  fetchCards: PropTypes.func.isRequired,
};

export default CardContainer;
