import React from 'react'
import { BrowserRouter as  Routes, Route } from 'react-router-dom'
import PartnerLogin from '../pages/Partner/PartnerLogin'
import PartnerDashboard from '../pages/Partner/PartnerDashboard'
import PartnerSignUp from '../pages/Partner/PartnerSignUp'
import Cruises from '../pages/Partner/Cruises'
import PartnerAccount from '../pages/Partner/PartnerAccount'
import CruiseBookings from '../pages/Partner/CruiseBookings'
import Offers from '../pages/Partner/Offers'
import AddCruises from '../components/Partner/Cruises/AddCruises'

function PartnerRoute() {
  return (
    <>
      
      <Routes>
        <Route path="/" element={<PartnerLogin />} />
        <Route path="/signUp" element={<PartnerSignUp />} />
        <Route path="/dashboard" element={<PartnerDashboard />} />
        <Route path="/cruises" element={<Cruises />} />
        <Route path="/add-cruise" element={<AddCruises />} />
        <Route path="/account" element={<PartnerAccount />} />
        <Route path="/bookings" element={<CruiseBookings />} />
        <Route path="/offers" element={<Offers />} />
      </Routes>
    </>
  )
}

export default PartnerRoute
