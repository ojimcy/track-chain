import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { formatBalanceShort } from '../../utils/formatBalance';
import { Separator } from '../common/Seperator';

import CardDetailsModal from '../modals/CardDetailsModal';

import dollar from '../../assets/images/dollar.png';
import lock from '../../assets/images/lock.png';
import { Col, Row } from 'reactstrap';

const CardContainer = ({ cards, category }) => {
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

  return (
    <Row className="mine-card-row">
      {filteredCards.map((card) => (
        <Col xs={6} className='mb-4' key={card.id}>
          <div
            className={`mine-card ${
              card.canUpgrade ? 'can-upgrade' : 'cannot-upgrade'
            }`}
            onClick={() => handleCardClick(card)}
            style={{ cursor: card.canUpgrade ? 'pointer' : 'not-allowed' }}
          >
            <div className="mine-card-header">
              {card.canUpgrade ? (
                <img src={card.image} alt="" />
              ) : (
                <img src={lock} alt="" />
              )}
              <h5>{card.name}</h5>
            </div>
            <div className="mine-card-body">
              <span
                className={`mb-4 ${
                  card.canUpgrade
                    ? 'earn-per-hour-upgrade'
                    : 'earn-per-hour-no-upgrade'
                }`}
              >
                Earn/Hr:{' '}
                <span className="earnings-per-hour">
                  +{formatBalanceShort(card.initialHMR)}
                </span>
              </span>
              <div style={{ marginTop: '5px', marginLeft: '11px' }}>
                <Separator />
              </div>
              <div
                className={`card-level mt-3 d-flex justify-content-between align-items-center ${
                  card.canUpgrade
                    ? 'card-level-upgrade'
                    : 'card-level-no-upgrade'
                }`}
              >
                <div className="level">Lvl {card.level}</div>
                {card.canUpgrade ? (
                  <div>
                    <img src={dollar} alt=" " width={25} />
                    {formatBalanceShort(card.initialUpgradeCost)}
                  </div>
                ) : (
                  <div>{card.requirements}</div>
                )}
              </div>
            </div>
          </div>
        </Col>
      ))}

      <CardDetailsModal
        isOpen={isModalOpen}
        toggle={toggleModal}
        card={selectedCard}
      />
    </Row>
  );
};

CardContainer.propTypes = {
  cards: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
};

export default CardContainer;
