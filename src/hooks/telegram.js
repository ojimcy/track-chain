import { useContext, useEffect, useState } from 'react';
import { WebappContext } from '../context/telegram';

// import demoData from './demo_data';

export const useWebApp = () => {
  const { webapp } = useContext(WebappContext);

  return webapp;
};

export const useInitData = () => {
  const webApp = useWebApp();

  const [data, setData] = useState();

  useEffect(() => {
    if (!webApp) {
      // setData(demoData);
      return;
    }
    setData(webApp.initDataUnsafe);
  });

  return data;
};

export const useTelegramUser = () => {
  // const webApp = useWebApp();
  const data = useInitData();

  const [user, setUser] = useState();

  useEffect(() => {
    if (!data) return;
    // if(!verifyInitData(webApp.initData)) return;
    // TODO: verify init data with hash from telegram
    setUser(data.user);
  });

  return user;
};

export const useCurrentUser = () => {
  const { user } = useContext(WebappContext);
  return user;
};

export const useReferralLink = (currentUser) => {
  if (!currentUser) return '';
  return `https://t.me/t.me/track_chain_bot?start=${currentUser.telegramId}`;
};
