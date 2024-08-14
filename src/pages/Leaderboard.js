import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Separator } from '../components/common/Seperator';
import { formatBalanceShort } from '../utils/formatBalance';
import { getLeaderboard } from '../lib/server'; 
import './leaderboard.css';
import goldMedalIcon from '../assets/images/gold.png'; 
import silverMedalIcon from '../assets/images/silver.png';
import bronzeMedalIcon from '../assets/images/bronze.png';
import TelegramBackButton from '../components/navs/TelegramBackButton';

function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const leaderboardData = await getLeaderboard(); 
        setUsers(leaderboardData);
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
      }
    };
    fetchLeaderboard();
  }, []);

  const getMedalIcon = (position) => {
    switch (position) {
      case 1:
        return <img src={goldMedalIcon} alt="Gold Medal" />;
      case 2:
        return <img src={silverMedalIcon} alt="Silver Medal" />;
      case 3:
        return <img src={bronzeMedalIcon} alt="Bronze Medal" />;
      default:
        return <span>{position}</span>;
    }
  };

  return (
    <div className="leaderboard-page">
      <TelegramBackButton />
      <Container>
        <Row>
          <div className="page-header">
            <div className="title">
              <h3>Leaderboard</h3>
            </div>
            <div className="sub-title">
              <h6>See the top users with the highest balances.</h6>
            </div>
          </div>
        </Row>

        {users.length > 0 && (
          <>
            <p className="mt-4">Leaderboard ({users.length} Users)</p>
            <Row>
              {users.map((user, index) => (
                <React.Fragment key={user.id}>
                  <Col xs={12}>
                    <div className="leaderboard-card d-flex justify-content-between align-items-center mt-2">
                      <div className="leaderboard-info d-flex align-items-center">
                        <div className="leaderboard-icon d-flex align-items-center justify-content-center">
                          {user.profilePic ? (
                            <img src={user.profilePic} alt={user.username} />
                          ) : (
                            <span>{user.username.charAt(0)}</span>
                          )}
                        </div>
                        <div className="info d-flex flex-column">
                          <span className="leaderboard-title">
                            {user.username}
                          </span>
                          <span className="leaderboard-balance">
                            {formatBalanceShort(user.balance)}
                          </span>
                        </div>
                      </div>
                      <div className="position">{getMedalIcon(index + 1)}</div>
                    </div>
                  </Col>
                  <Separator />
                </React.Fragment>
              ))}
            </Row>
          </>
        )}
      </Container>
    </div>
  );
}

export default Leaderboard;
