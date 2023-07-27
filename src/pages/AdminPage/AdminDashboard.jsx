import React from 'react'
import Dashboard from '../../components/Admin/AdminDashboard/Dashboard'
import Sidebar from '../../components/Shared/Sidebar/Sidebar'
import { AppBar } from '@mui/material'

function AdminDashboard() {
  return (
    <div style={{ display: "flex" }}>

    <div >
      <Sidebar userType="admin" />
    </div>

    <div className='overflow-auto h-[100vh] w-[100vw]'>
      <Dashboard />
    </div>
  </div>
  )
}

export default AdminDashboard
