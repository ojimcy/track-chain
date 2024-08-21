import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MainNav from './header/MainNav';
import Footer from './footer/Footer';
import { WebappContext } from '../../context/telegram';
import { getUserByTelegramID } from '../../lib/server';
import { useTelegramUser } from '../../hooks/telegram';
import { Spinner } from 'reactstrap';
import { FaRedo } from 'react-icons/fa';

const Layout = ({ children }) => {
  const {
    webapp,
    setUser,
    loadingPageIsVissible,
    hideLoadingPage,
    showLoadingPage,
  } = useContext(WebappContext);
  const telegramUser = useTelegramUser();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);

  useEffect(() => {
    if (!telegramUser) {
      hideLoadingPage();
      return;
    }

    showLoadingPage();

    const fn = async () => {
      console.log('telegramUser', telegramUser);
      if (webapp.expand) webapp.expand();
      let user = await getUserByTelegramID(telegramUser.id);
      console.log('logged in user', user);
      if (!user || !user.id) {
        setIsUserLoggedIn(false);
        hideLoadingPage();
        return;
      }
      setUser(user);
      hideLoadingPage();
    };

    fn();
  }, [telegramUser]);

  const reloadTelegramApp = () => {
    window.location.href = 'https://t.me/TrackChain_Shrek_bot/app';
  };

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
        <div className="page-content">
          <main className="content">
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: '100vh' }}
            >
              {isUserLoggedIn ? (
                <Spinner
                  style={{ width: '3rem', height: '3rem' }}
                  color="primary"
                />
              ) : (
                <div className="text-center">
                  <p>Something went wrong. Reload the app</p>
                  <FaRedo
                    onClick={reloadTelegramApp}
                    size={40}
                    style={{ cursor: 'pointer', color: '#007bff' }}
                  />
                </div>
              )}
            </div>
          </main>
        </div>
      )}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
