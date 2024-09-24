import React from 'react';
import { createContext, useEffect, useState } from 'react';
import { getDailyCombo } from '../lib/server';

export const WebappContext = createContext(undefined);

// eslint-disable-next-line react/prop-types
export const WebappProvider = ({ children }) => {
  const [webapp, setWebapp] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingPageIsVissible, setLoadingPageIsVisible] = useState(true);
  const [taps, setTaps] = useState([]);
  const [dailyCombo, setDailyCombo] = useState([]);
  const [selectedComboCard, setSelectedComboCard] = useState([]);

  useEffect(() => {
    if (!window.Telegram || !window.Telegram.WebApp) return;
    setWebapp(window.Telegram.WebApp);
    window.Telegram.WebApp.ready();
  }, [window.Telegram.WebApp]);

  const showLoadingPage = () => {
    setLoadingPageIsVisible(true);
  };

  const hideLoadingPage = () => {
    setLoadingPageIsVisible(false);
  };

  useEffect(() => {
    const fetchDailyCombo = async () => {
      try {
        const res = await getDailyCombo();

        setDailyCombo(res);
      } catch (error) {
        console.error('Error fetching daily combo', error);
      }
    };

    fetchDailyCombo();
  }, [user]);

  return (
    <WebappContext.Provider
      value={{
        webapp,
        webApp: webapp,
        user,
        setUser,
        loadingPageIsVissible,
        showLoadingPage,
        hideLoadingPage,
        taps,
        setTaps,
        dailyCombo,
        setDailyCombo,
        selectedComboCard,
        setSelectedComboCard,
      }}
    >
      {children}
    </WebappContext.Provider>
  );
};
