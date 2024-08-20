import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import dollar from '../../assets/images/dollar.png'; // Assuming you have this image

const TrackCardContainer = ({ cards }) => {
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
      {cards.map((card) => (
        <Col xs={6} className="mb-4" key={card.id}>
          <div
            className={`track-card ${getCardBackground(card.id)}`}
            style={{ borderRadius: '20px', padding: '15px' }}
          >
            <div className="track-card-header text-center">
              <img
                src={card.image}
                alt=""
                style={{ borderRadius: '15px', width: '100%' }}
              />
            </div>
            <div className="track-card-body text-center">
              <h5 className="card-title mt-3">{card.name}</h5>
              <p className="card-text">
                Profit per hour{' '}
                <span className="earnings-per-hour">+{card.profitPerHour}</span>
              </p>
              <hr
                style={{ width: '100%', margin: '10px 0', borderColor: '#ccc' }}
              />
              <div className="card-level mt-3 d-flex align-items-center justify-content-between">
                <div className="level">Lvl {card.level}</div>
                <div
                  style={{
                    borderLeft: '1px solid #000',
                    height: '20px',
                    margin: '0 10px',
                  }}
                ></div>
                <div className="d-flex align-items-center">
                  {card.canUpgrade ? (
                    <>
                      <img src={dollar} alt=" " width={20} />
                      <span className="ml-2">{card.upgradeCost}</span>
                    </>
                  ) : (
                    <span>{card.upgradeDisabledReason}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
};

TrackCardContainer.propTypes = {
  cards: PropTypes.array.isRequired,
};

export default TrackCardContainer;
