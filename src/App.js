import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminRoute from './Routes/AdminRoute';
import PartnerRoute from './Routes/PartnerRoute';

import UserRoute from './Routes/UserRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/*'  element={<UserRoute />} />
        <Route path="/admin/*" element={<AdminRoute />} />
        <Route path="/partner/*" element={<PartnerRoute />} />
      </Routes>
    </Router>
  );
}

export default App;
