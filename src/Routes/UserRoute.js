import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserHome from '../pages/User/UserHome';
import CruiseCards from '../pages/User/CruiseCards';
import CruiseSingleView from '../pages/User/CruiseSingleView';

import UserSignupPage from '../pages/User/UserSignupPage';
import UserSigninPage from '../pages/User/UserSigninPage';

function UserRoute() {
  return (
    <>
    <Routes> 
      <Route path='/' element={<UserHome />} />
      <Route path='/signup' element={<UserSignupPage />} />
      <Route path='/signin' element={<UserSigninPage />} />
      <Route path='/cruises' element={<CruiseCards />} />
      <Route path='/cruises/single-view' element={<CruiseSingleView />} />
      
      </Routes>
    </>
  );
}

export default UserRoute;
