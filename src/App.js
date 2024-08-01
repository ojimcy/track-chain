import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import WOW from 'wowjs';
import Tap from './pages/Tap';
import Earn from './pages/Earn';
import Frens from './pages/Frens';
import Layout from './components/layout/Layout';

const App = () => {
  try {
    useEffect(() => {
      const wow = new WOW.WOW();
      wow.init();
    }, []);

    return (
      <Router>
        <Routes>
          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route index element={<Tap />} />
                  <Route path="earn" element={<Earn />} />
                  <Route path="frens" element={<Frens />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </Router>
    );
  } catch (error) {
    console.log(error);
    return (
      <>
        <p>{JSON.stringify(error)}</p>
      </>
    );
  }
};

export default App;
