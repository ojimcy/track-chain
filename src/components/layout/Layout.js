import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import MainNav from './header/MainNav';
import Footer from './footer/Footer';
import { WebappContext } from '../../context/telegram';
import { getUserByTelegramID } from '../../lib/server';
import { useTelegramUser } from '../../hooks/telegram';
import { Spinner } from 'reactstrap';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';

const Layout = ({ children }) => {
  const {
    webapp,
    setUser,
    loadingPageIsVissible,
    hideLoadingPage,
    showLoadingPage,
  } = useContext(WebappContext);
  const telegramUser = useTelegramUser();

  useEffect(() => {
    if (!telegramUser) {
      return;
    }
    showLoadingPage();

    const fn = async () => {
      console.log('telegramUser', telegramUser);
      if (webapp.expand) webapp.expand();
      let user = await getUserByTelegramID(telegramUser.id);
      console.log('logged in user', user);
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
      setUser(user);
      hideLoadingPage();
    };

    fn();
  }, [telegramUser]);

  return (
    <div className="page-content">
      {!loadingPageIsVissible && (
        <>
          <MainNav />
          <main className="content">{children}</main>
          <Footer />
        </>
      )}

      {loadingPageIsVissible && (
        <div className="page-content loading-page">
          <main className="content">
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: '80vh' }}
            >
              <Spinner
                style={{ width: '3rem', height: '3rem' }}
                color="primary"
              />
            </div>
          </main>

          {/* Social Links */}
          <div className="social-links">
            <Link
              to="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
