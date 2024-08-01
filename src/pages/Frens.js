import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import { Separator } from '../components/common/Seperator';
import { formatBalance } from '../utils/formatBalance';

import './frens.css'

function Frens() {
  const friends = [
    {
      id: 1,
      username: 'JaneDoe',
      level: 'Gold',
      balance: 150000,
      profilePic: null, 
    },
    {
      id: 2,
      username: 'JohnSmith',
      level: 'Silver',
      balance: 200000,
      profilePic: null, 
    },
    {
      id: 3,
      username: 'EmilyRose',
      level: 'Bronze',
      balance: 300000,
      profilePic: null, 
    },
  ];

  return (
    <div className="frens-page">
      <Container>
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

        <p className='mt-4'>Friends list ({friends.length})</p>
        <Row>
          {friends.map((friend) => (
            <React.Fragment key={friend.id}>
              <Col xs={12}>
                <Link
                  to="#"
                  className="frens-card d-flex justify-content-between align-items-center mt-2"
                >
                  <div className="frens-info d-flex align-items-center">
                    <div className="frens-icon d-flex align-items-center justify-content-center">
                      {friend.profilePic ? (
                        <img src={friend.profilePic} alt={friend.username} />
                      ) : (
                        <span>{friend.username.charAt(0)}</span>
                      )}
                    </div>
                    <div className="info d-flex flex-column">
                      <span className="frens-title">{friend.username}</span>
                      <span className="frens-level">{friend.level}</span>
                    </div>
                  </div>
                  <div className="balance">{formatBalance(friend.balance)}</div>
                </Link>
              </Col>
              <Separator />
            </React.Fragment>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Frens;
