import React from 'react'
import Dashboard from '../../components/Admin/AdminDashboard/Dashboard'
import Sidebar from '../../components/Shared/Sidebar/Sidebar'
import { AppBar } from '@mui/material'

function AdminDashboard() {
  return (
    <div style={{display:"flex"}} >
      <Sidebar userType="admin"  />
      <Dashboard/>
   
    </div>
  )
}

export default AdminDashboard
