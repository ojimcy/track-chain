import React from 'react';
import { createContext, useEffect, useState } from 'react';

export const WebappContext = createContext(undefined);

// eslint-disable-next-line react/prop-types
export const WebappProvider = ({ children }) => {
  const [webapp, setWebapp] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingPageIsVissible, setLoadingPageIsVisible] = useState(true);
  const [taps, setTaps] = useState([]);
  const [comboCards, setComboCards] = useState([]);
  const [dailyCombo, setDailyCombo] = useState([]);

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
        comboCards,
        setComboCards,
        dailyCombo,
        setDailyCombo,
      }}
    >
      {children}
    </WebappContext.Provider>
  );
};
