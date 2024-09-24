import React from 'react';
import { createContext, useEffect, useState } from 'react';
import { getDailyCombo, getUserComboCard } from '../lib/server';

export const WebappContext = createContext(undefined);

// eslint-disable-next-line react/prop-types
export const WebappProvider = ({ children }) => {
  const [webapp, setWebapp] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingPageIsVissible, setLoadingPageIsVisible] = useState(true);
  const [taps, setTaps] = useState([]);
  const [dailyCombo, setDailyCombo] = useState([]);
  const [selectedComboCard, setSelectedComboCard] = useState([]);
  const [comboCard, setComboCard] = useState([]);

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

  const fetchUserComboCard = async () => {
    try {
      const combo = await getUserComboCard();
      if (combo) {
        setComboCard([combo.trackCard, combo.otherCard1, combo.otherCard2]);
      }
    } catch (error) {
      console.error('Failed to fetch combo card', error);
    }
  };

  const fetchDailyCombo = async () => {
    try {
      const res = await getDailyCombo();
      setDailyCombo(res);
    } catch (error) {
      console.error('Error fetching daily combo', error);
    }
  };

  useEffect(() => {
    fetchDailyCombo();
    fetchUserComboCard();
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
        comboCard,
        setComboCard,
      }}
    >
      {children}
    </WebappContext.Provider>
  );
};
