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
import CheckoutPage from '../pages/User/CheckoutPage';
import AccountPage from '../pages/User/AccountPage';
import ConfirmationPage from '../pages/User/ConfirmationPage';
import BookingDetail from '../components/User/Account/BookingDetail';
import BookingDetailPage from '../pages/User/BookingDetailPage';

function UserRoute() {

const[cookies]=useCookies(['userCookie'])
const dispatch=useDispatch()

useEffect(()=>{
  if(cookies.userCookie){

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
      <Route path='/checkout' element={<CheckoutPage />} />
      <Route path='/account/:subpage?' element={<AccountPage />} />
      <Route path='/account/:subpage?/:id' element={<BookingDetailPage />} />
      <Route path='/confirmation' element={<ConfirmationPage />} />
      

      
      </Routes>
    </>
  );
}

export default UserRoute;
