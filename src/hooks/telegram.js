import { useContext, useEffect, useState } from 'react';
import { WebappContext } from '../context/telegram';
import moment from 'moment';

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

export const computeTokensToCliam = (currentUser) => {
  if (!currentUser) return 0;
  // Calculate tokens based on mining rate (assuming rate is per hour and max claim window of one hour)
  let lastClaimAt =
    new Date().getTime() - new Date(currentUser.lastClaimAt).getTime();
  const milisecondsPerhour = 60 * 60 * 1000;
  const totalClaimPeriod = currentUser.miningFrequency * milisecondsPerhour;
  if (lastClaimAt > totalClaimPeriod) {
    lastClaimAt = totalClaimPeriod;
  }

  const claimAmount = currentUser.miningRate * (lastClaimAt / totalClaimPeriod);

  const nextClaimTime = moment(
    new Date(currentUser.lastClaimAt).getTime() + totalClaimPeriod
  );
  // Calculate the duration from the example time to now
  const duration = moment.duration(nextClaimTime.diff(moment()));

  const hours = String(Math.floor(duration.asHours())).padStart(2, '0');
  const minutes = String(duration.minutes()).padStart(2, '0');
  const seconds = String(duration.seconds()).padStart(2, '0');

  const formattedDuration = `${hours}:${minutes}:${seconds}`;

  return { claimAmount, timeLeft: formattedDuration };
};

export const useReferralLink = (currentUser) => {
  if (!currentUser) return '';
  return `https://t.me/track_chains_bot?start=${currentUser.telegramId}`;
};
