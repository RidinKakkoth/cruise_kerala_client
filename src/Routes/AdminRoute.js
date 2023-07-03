import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import AdminLogin from '../pages/AdminPage/AdminLogin'
import AdminDashboard from '../pages/AdminPage/AdminDashboard'
import PartnerData from '../pages/AdminPage/PartnerData'
import PartnerProfile from '../components/Admin/PartnerProfile/PartnerProfile'


function AdminRoute() {
  return (
    <>
 
        <Routes>
            <Route path='/' element={<AdminLogin/>}/>
            <Route path='/dashboard' element={<AdminDashboard/>}/>
            <Route path='/partners' element={<PartnerData/>}/>
            <Route path='/partner-profile' element={<PartnerProfile/>}/>
        </Routes>

    </>
  )
}

export default AdminRoute
