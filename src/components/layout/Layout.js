import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Footer from './footer/Footer';
import { WebappContext } from '../../context/telegram';
import { createAccount, getUserByTelegramID } from '../../lib/server';
import {
  useTelegramUser,
  // useCurrentUser,
  useInitData,
} from '../../hooks/telegram';
import MiningNav from './header/MainNav';

const Layout = ({ children }) => {
  const initData = useInitData();
  const { setUser } = useContext(WebappContext);
  // const currentUser = useCurrentUser();
  const telegramUser = useTelegramUser();
  //const toast = useToast();

  useEffect(() => {
    if (!telegramUser) return;
    // if (currentUser) return;
    const fn = async () => {
      let user = await getUserByTelegramID(telegramUser.id);
      if (!user || !user.id) {
        user = await handleCreateAccount();
      }
      setUser(user);
    };

    fn();
  }, [telegramUser]);

  const handleCreateAccount = async () => {
    const userData = {
      telegramId: telegramUser.id,
      username: telegramUser.username,
      pin: '0000',
      uplineId: parseInt(initData.start_param) || 0,
    };

    const user = await createAccount(userData);
    if (user && user.id) {
      setUser(user);
    } else {
      //toast.error('Error in creating');
    }
  };

  return (
    <div className="page-content">
      <MiningNav />
      <main className="main-layout-content">{children}</main>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
