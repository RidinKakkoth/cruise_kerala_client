import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import AdminLogin from '../pages/AdminPage/AdminLogin'
import AdminDashboard from '../pages/AdminPage/AdminDashboard'
import PartnerData from '../pages/AdminPage/PartnerData'


function AdminRoute() {
  return (
    <>
 
        <Routes>
            <Route path='/' element={<AdminLogin/>}/>
            <Route path='/dashboard' element={<AdminDashboard/>}/>
            <Route path='/partners' element={<PartnerData/>}/>
        </Routes>

    </>
  )
}

export default AdminRoute
