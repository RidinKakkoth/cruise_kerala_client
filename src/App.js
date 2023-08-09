import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminRoute from './Routes/AdminRoute';
import PartnerRoute from './Routes/PartnerRoute';
import UserRoute from './Routes/UserRoute';
import NotFound from './404'; 
import Error500 from './Error500'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<UserRoute />} />
        <Route path="/admin/*" element={<AdminRoute />} />
        <Route path="/partner/*" element={<PartnerRoute />} />
        <Route path="/500" element={<Error500 />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
