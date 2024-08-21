import React from 'react';
import { Container, Progress } from 'reactstrap';
import Slider from 'react-slick';
import data from '../hooks/demo_data';
import { useCurrentUser } from '../hooks/telegram';

import { formatBalance } from '../utils/formatBalance';
import { TelegramShareButton } from 'react-share';

const LeagueSlider = () => {
  const currentUser = useCurrentUser();

  const { levels } = data;

  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Container className="d-flex justify-content-center">
      <TelegramShareButton />

      <Slider {...settings}>
        {levels.map((level) => (
          <div key={level.level}>
            <div className="leageue-head">
              <h2>{level.name}</h2>
              <p>
                Your number of points determines the level you are. The higher
                the level, the more juicy the rewards.
              </p>
            </div>

            <div className="league-detail">
              <img
                src={level.icon}
                alt={`${level.name} icon`}
                style={{ width: '100px', height: '100px' }}
              />
              <p>From {formatBalance(level.tokensRequiredForLevel)}</p>

              {currentUser.levelId === level.level && (
                <div>
                  <Progress
                    value={Math.min(
                      (currentUser.tokens / level.tokensRequiredForLevel) * 100,
                      100
                    )}
                    color="purple"
                    style={{ height: '5px', marginTop: '20px' }}
                  />
                  <p className="progress-amount">
                    {formatBalance(currentUser.balance)} /{' '}
                    {formatBalance(level.tokensRequiredForLevel)}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </Container>
  );
};

export default LeagueSlider;
