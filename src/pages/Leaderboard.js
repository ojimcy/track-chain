import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Button } from 'reactstrap';
import { Separator } from '../components/common/Seperator';
import { formatBalanceShort } from '../utils/formatBalance';
import { getLeaderboard } from '../lib/server';
import './leaderboard.css';
import TelegramBackButton from '../components/navs/TelegramBackButton';

function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [showAll, setShowAll] = useState(false);

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
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return <span>{position}</span>;
    }
  };

  // Limit the displayed users to the top 100 unless 'showAll' is true
  const displayedUsers = showAll ? users : users.slice(0, 100);

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

        {displayedUsers.length > 0 && (
          <>
            <p className="mt-4">Leaderboard ({users.length} Users)</p>
            <Row>
              {displayedUsers.map((user, index) => (
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
            <div className="text-center mt-4">
              <Button onClick={() => setShowAll(!showAll)}>
                {showAll ? 'Show Top 100' : 'Show All'}
              </Button>
            </div>
          </>
        )}
      </Container>
    </div>
  );
}

export default Leaderboard;
