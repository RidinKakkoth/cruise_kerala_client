import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from '../pages/AdminPage/AdminLogin';
import AdminDashboard from '../pages/AdminPage/AdminDashboard';
import PartnerData from '../pages/AdminPage/PartnerData';
import PartnerProfile from '../components/Admin/PartnerProfile/PartnerProfile';
import PartnerRequestView from '../pages/AdminPage/PartnerRequestView';
import CruiseDetail from '../pages/AdminPage/CruiseDetail';
import CruiseRequest from '../pages/AdminPage/CruiseRequest';
import CruiseSingle from '../pages/AdminPage/CruiseSingle';
import OtherManagements from '../pages/AdminPage/OtherManagements';
import Bookings from '../pages/AdminPage/Bookings';
import UserDetail from '../pages/AdminPage/UserDetail';
import ChatBox from '../pages/AdminPage/ChatBox';
import Notification from '../pages/AdminPage/Notification';
import NotFound from '../404';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { adminAdd } from '../store/AdminAuth';

function AdminRoute() {

  const [cookies] = useCookies(['adminCookie']);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAdminToken() {
      if (cookies.adminCookie) {
        dispatch(adminAdd({ token: cookies.adminCookie?.token }));
      }
      setIsLoading(false); 
    }
    fetchAdminToken();
  }, [cookies, dispatch]);

  const adminToken = useSelector((state) => state?.Admin?.adminToken);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<AdminLogin />} />

        <Route path="/dashboard" element={adminToken?<AdminDashboard />:<Navigate to="/admin" />} />
        <Route path="/partners" element={adminToken?<PartnerData />:<Navigate to="/admin" />} />
        <Route path="/partner-request" element={adminToken?<PartnerRequestView />:<Navigate to="/admin" />} />
        <Route path="/partner-profile" element={adminToken?<PartnerProfile />:<Navigate to="/admin" />} />
        <Route path="/cruises" element={adminToken?<CruiseDetail />:<Navigate to="/admin" />} />
        <Route path="/users" element={adminToken?<UserDetail />:<Navigate to="/admin" />} />
        <Route path="/cruise-request" element={adminToken?<CruiseRequest />:<Navigate to="/admin" />} />
        <Route path="/cruises-single" element={adminToken?<CruiseSingle />:<Navigate to="/admin" />} />
        <Route path="/bookings" element={adminToken?<Bookings />:<Navigate to="/admin" />} />
        <Route path="/other" element={adminToken?<OtherManagements />:<Navigate to="/admin" />} />
        <Route path="/chatbox" element={adminToken?<ChatBox />:<Navigate to="/admin" />} />
        <Route path="/notification" element={adminToken?<Notification />:<Navigate to="/admin" />} />

        {/* This route will catch all other undefined routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default AdminRoute;
