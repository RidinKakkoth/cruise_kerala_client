import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import PartnerLogin from '../pages/Partner/PartnerLogin';
import PartnerDashboard from '../pages/Partner/PartnerDashboard';
import PartnerSignUp from '../pages/Partner/PartnerSignUp';
import Cruises from '../pages/Partner/Cruises';
import PartnerAccount from '../pages/Partner/PartnerAccount';
import CruiseBookings from '../pages/Partner/CruiseBookings';
import Offers from '../pages/Partner/Offers';
// import AddCruises from '../components/Partner/Cruises/AddCruises';
import AddCruiseForm from '../components/Partner/Cruises/AddCruiseForm';
import EditCruiseForm from '../components/Partner/Cruises/EditCruiseForm';
import { useDispatch, useSelector } from 'react-redux';
import { partnerAdd } from '../store/PartnerAuth';
import NotFound from '../404';



function PartnerRoute() {

  const [cookies] = useCookies(['partnerCookie']);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPartnerToken() {
      if (cookies.partnerCookie) {
        dispatch(partnerAdd({ token: cookies.partnerCookie?.token }));
      }
      setIsLoading(false); 
    }
    fetchPartnerToken();
  }, [cookies, dispatch]);

  const partnerToken = useSelector((state) => state?.Partner?.partnerToken);

  if (isLoading) {
    return <p>Loading...</p>;
  }
 

  return (
    <>
      <Routes>
        <Route path="/" element={<PartnerLogin />} />
        <Route path="/signUp" element={<PartnerSignUp />} />

        <Route path="/dashboard" element={partnerToken?<PartnerDashboard />:<Navigate to="/partner" />} />

        <Route path="/cruises" element={partnerToken?<Cruises />:<Navigate to="/partner" />} />
        <Route path="/add-cruise" element={partnerToken?<AddCruiseForm />:<Navigate to="/partner" />} />
        <Route path="/edit-cruise" element={partnerToken?<EditCruiseForm />:<Navigate to="/partner" />} />
        {/* <Route path="/add-cruise" element={<AddCruises />} /> */}
        <Route path="/account" element={partnerToken?<PartnerAccount />:<Navigate to="/partner" />} />
        <Route path="/bookings" element={partnerToken?<CruiseBookings />:<Navigate to="/partner" />} />
        <Route path="/offers" element={partnerToken?<Offers />:<Navigate to="/partner" />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </>
  );
}

export default PartnerRoute;
