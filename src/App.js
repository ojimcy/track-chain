import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import WOW from 'wowjs';
// import Tap from './pages/Tap';
import Earn from './pages/Earn';
import Frens from './pages/Frens';
import Layout from './components/layout/Layout';
import Boost from './pages/Boosts';
import Mine from './pages/Mine';
import MineLayout from './components/layout/MineLayout';
import Leaderboard from './pages/Leaderboard';
import LeaguePage from './pages/League';
import TapLayout from './components/layout/TapLayout';
import LoadingPage from './components/common/LoadingPage';
import Tap from './pages/Tap';

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
            path="/"
            element={
              <Routes>
                <Route index element={<LoadingPage />} />
              </Routes>
            }
          />
          <Route
            path="/home"
            element={
              <TapLayout>
                <Routes>
                  <Route index element={<Tap />} />
                </Routes>
              </TapLayout>
            }
          />
          <Route
            path="/home/*"
            element={
              <Layout>
                <Routes>
                  {/* <Route index element={<Tap />} /> */}
                  <Route path="earn" element={<Earn />} />
                  <Route path="frens" element={<Frens />} />
                  <Route path="boost" element={<Boost />} />
                  <Route path="leaderboard" element={<Leaderboard />} />
                  <Route path="league" element={<LeaguePage />} />
                </Routes>
              </Layout>
            }
          />
          <Route
            path="/home/mine"
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
