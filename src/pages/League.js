import React from 'react';
import { Container, Progress } from 'reactstrap';
import Slider from 'react-slick';
import data from '../hooks/demo_data';
import { useCurrentUser } from '../hooks/telegram';

import { formatBalance } from '../utils/formatBalance';

const LeagueSlider = () => {
  const currentUser = useCurrentUser();

  const { levels } = data;

  // Slider settings
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {levels.map((level) => (
        <div key={level.level}>
          <h2>{level.name}</h2>
          <p>
            Your number of points determines the level you are. The higher the
            level, the more juicy the rewards.
          </p>
          <Container className="text-center">
            <img
              src={level.name}
              alt={`${level.name} icon`}
              style={{ width: '100px', height: '100px' }}
            />
            <p>From {formatBalance(level.requiredTokens)}</p>

            {currentUser.levelId === level.level && (
              <div>
                <Progress
                  value={Math.min(
                    (currentUser.tokens / level.requiredTokens) * 100,
                    100
                  )}
                  color="purple"
                  style={{ height: '5px', marginTop: '20px' }}
                />
                <p>
                  {formatBalance(currentUser.tokens)} /{' '}
                  {formatBalance(level.requiredTokens)}
                </p>
              </div>
            )}
          </Container>
        </div>
      ))}
    </Slider>
  );
};

export default LeagueSlider;
