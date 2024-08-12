import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import WOW from 'wowjs';
import Tap from './pages/Tap';
import Earn from './pages/Earn';
import Frens from './pages/Frens';
import Layout from './components/layout/Layout';
import Boost from './pages/Boosts';
import Mine from './pages/Mine';
import MineLayout from './components/layout/MineLayout';
import Leaderboard from './pages/Leaderboard';

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
                  <Route path="boost" element={<Boost />} />
                  <Route path="leaderboard" element={<Leaderboard />} />
                </Routes>
              </Layout>
            }
          />

          <Route
            path="/mine"
            element={
              <MineLayout>
                <Routes>
                  <Route index element={<Mine />} />
                </Routes>
              </MineLayout>
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
