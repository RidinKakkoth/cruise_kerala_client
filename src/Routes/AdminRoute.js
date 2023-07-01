import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import AdminLogin from '../pages/AdminPage/AdminLogin'
import AdminDashboard from '../pages/AdminPage/AdminDashboard'


function AdminRoute() {
  return (
    <>
 
        <Routes>
            <Route path='/' element={<AdminLogin/>}/>
            <Route path='/dashboard' element={<AdminDashboard/>}/>
        </Routes>

    </>
  )
}

export default AdminRoute
