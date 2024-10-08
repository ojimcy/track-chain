import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import MainNav from './header/MainNav';
import Footer from './footer/Footer';
import { WebappContext } from '../../context/telegram';
import { getUserByTelegramID } from '../../lib/server';
import {
  useTelegramUser,
  // useCurrentUser,
  // useInitData,
} from '../../hooks/telegram';
import { Spinner } from 'reactstrap';
import { toast } from 'react-toastify';

const TapLayout = ({ children }) => {
  //const initData = useInitData();
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
      // hideLoadingPage();
      return;
    }
    // if (currentUser) return;
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
    <div
      className="page-content"
      style={{ background: 'linear-gradient(180deg, #152701 0%, #67b60d 81%)' }}
    >
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
              <Spinner
                style={{ width: '3rem', height: '3rem' }}
                color="primary"
              />
              {/* You can change 'primary' to any other color theme like secondary, success, info, etc. */}
            </div>
          </main>
        </div>
      )}
    </div>
  );
};

TapLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TapLayout;
