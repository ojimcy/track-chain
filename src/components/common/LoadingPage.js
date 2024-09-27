import React, { useContext, useEffect } from 'react';
import './loading-page.css';
import { Col, Container, Row, Spinner } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { WebappContext } from '../../context/telegram';
import { useTelegramUser } from '../../hooks/telegram';
import { getUserByTelegramID } from '../../lib/server';
import { toast } from 'react-toastify';
import { FaTelegram, FaTwitter, FaYoutube } from 'react-icons/fa';

const LoadingPage = () => {
  const navigate = useNavigate();
  const { webapp, setUser, hideLoadingPage } = useContext(WebappContext);
  const telegramUser = useTelegramUser();

  useEffect(() => {
    if (!telegramUser) {
      return;
    }

    const loadUser = async () => {
      if (webapp.expand) webapp.expand();

      // Fetch user by Telegram ID
      let user = await getUserByTelegramID(telegramUser.id);

      // Check if the user exists, otherwise show an error
      if (!user || !user.id) {
        toast.error(
          'Please open @TrackChain_Shrek_bot on Telegram to get started',
          {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
          }
        );
        return;
      }

      // Set the user data
      setUser(user);

      // Ensure the loading screen is visible for at least 2 seconds
      setTimeout(() => {
        hideLoadingPage();
        navigate('/home');
      }, 2000);
    };

    loadUser();
  }, [telegramUser]);

  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center loading-container"
      style={{ height: '100vh' }}
    >
      <div className="overlay"></div>
      <Row className="justify-content-center">
        <Col className="text-center">
          <Spinner
            style={{
              width: '5rem',
              height: '5rem',
            }}
            color="primary"
          />
        </Col>
      </Row>
      <div className="social-links">
        <Link
          to="https://t.me/Trackchain_Shrek"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTelegram />
        </Link>
        <Link
          to="https://x.com/TrackchainShrek"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter />
        </Link>
        <Link
          to="https://youtube.com/@trackchainshrek"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaYoutube />
        </Link>
      </div>
    </Container>
  );
};

export default LoadingPage;
