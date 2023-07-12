import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserHome from '../pages/User/UserHome';
import CruiseCards from '../pages/User/CruiseCards';
import CruiseSingleView from '../pages/User/CruiseSingleView';

function UserRoute() {
  return (
    <>
    <Routes> 
      <Route path='/' element={<UserHome />} />
      <Route path='/cruises' element={<CruiseCards />} />
      <Route path='/cruises/single-view' element={<CruiseSingleView />} />
      
      </Routes>
    </>
  );
}

export default UserRoute;
