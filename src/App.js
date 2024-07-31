import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import WOW from 'wowjs';
import Mining from './pages/Mining';
import Task from './pages/Task';
import Squad from './pages/Squad';
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
                  <Route index element={<Mining />} />
                  <Route path="task" element={<Task />} />
                  <Route path="squad" element={<Squad />} />
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
