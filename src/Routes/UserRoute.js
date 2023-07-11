import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserHome from '../pages/User/UserHome';
import CruiseCards from '../pages/User/CruiseCards';

function UserRoute() {
  return (
    <>
    <Routes> 
      <Route path='/' element={<UserHome />} />
      <Route path='/cruises' element={<CruiseCards />} />
      
      </Routes>
    </>
  );
}

export default UserRoute;
