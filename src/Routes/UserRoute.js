import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import UserHome from '../pages/User/UserHome';
import CruiseCards from '../pages/User/CruiseCards';
import CruiseSingleView from '../pages/User/CruiseSingleView';
import { useCookies } from 'react-cookie'
import UserSignupPage from '../pages/User/UserSignupPage';
import UserSigninPage from '../pages/User/UserSigninPage';
import { useDispatch, useSelector } from 'react-redux';
import { userAdd } from '../store/UserAuth';
import CheckoutPage from '../pages/User/CheckoutPage';
import AccountPage from '../pages/User/AccountPage';
import ConfirmationPage from '../pages/User/ConfirmationPage';
import BookingDetailPage from '../pages/User/BookingDetailPage';
import ChatboxPage from '../pages/User/ChatboxPage';
import NotFound from '../404';


function UserRoute() {

const[cookies]=useCookies(['userCookie'])
const dispatch=useDispatch()

useEffect(()=>{
  if(cookies.userCookie){
    dispatch(userAdd({userName:cookies.userCookie?.userName,token:cookies.userCookie?.token}))
  }
},[cookies,dispatch])

const userToken = useSelector((state) => state?.User?.userToken);

  return (
    <>
    <Routes> 
      <Route path='/' element={<UserHome />} />
      <Route path='/signup' element={userToken? <Navigate to="/" />:<UserSignupPage />} />
      <Route path='/signin' element={userToken?<Navigate to="/" />:<UserSigninPage />} />
      
      <Route path='/cruises' element={<CruiseCards />} />
      <Route path='/cruises/:id' element={<CruiseSingleView />} />
      <Route path='/checkout' element={<CheckoutPage />} />

      <Route path='/account/:subpage?' element={userToken?<AccountPage />:<Navigate to="/" />} />
      <Route path='/account/:subpage?/:id' element={userToken?<BookingDetailPage />:<Navigate to="/" />} />
      <Route path='/confirmation' element={userToken?<ConfirmationPage />:<Navigate to="/" />} />
      <Route path='/chatbox' element={userToken?<ChatboxPage />:<Navigate to="/" />} />
      <Route path="*" element={<NotFound />} />


      </Routes>
    </>
  );
}

export default UserRoute;
