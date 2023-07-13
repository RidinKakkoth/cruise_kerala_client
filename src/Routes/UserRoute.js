import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import UserHome from '../pages/User/UserHome';
import CruiseCards from '../pages/User/CruiseCards';
import CruiseSingleView from '../pages/User/CruiseSingleView';
import { useCookies } from 'react-cookie'
import UserSignupPage from '../pages/User/UserSignupPage';
import UserSigninPage from '../pages/User/UserSigninPage';
import { useDispatch } from 'react-redux';
import { userAdd } from '../store/UserAuth';

function UserRoute() {

const[cookies]=useCookies(['userCookie'])
const dispatch=useDispatch()

useEffect(()=>{
  if(cookies.userCookie){
    console.log(cookies.userCookie,"cccccccccccc");
    dispatch(userAdd({userName:cookies.userCookie?.userName,token:cookies.userCookie?.token}))
  }
},[cookies,dispatch])


  return (
    <>
    <Routes> 
      <Route path='/' element={<UserHome />} />
      <Route path='/signup' element={<UserSignupPage />} />
      <Route path='/signin' element={<UserSigninPage />} />
      <Route path='/cruises' element={<CruiseCards />} />
      {/* <Route path='/cruises/single-view' element={<CruiseSingleView />} /> */}
      <Route path='/cruises/:id' element={<CruiseSingleView />} />

      
      </Routes>
    </>
  );
}

export default UserRoute;
