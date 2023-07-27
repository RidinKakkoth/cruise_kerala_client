import React from 'react'
import Dashboard from '../../components/Partner/PartnerDashboard/Dashboard'
import Sidebar from '../../components/Shared/Sidebar/Sidebar'

function PartnerDashboard() {
  return (
    <div style={{ display: "flex" }}>

    <div >
      <Sidebar userType="partner" />
    </div>

    <div className='overflow-auto h-[100vh] w-[100vw]'>
      <Dashboard />
    </div>
  </div>
  )
}

export default PartnerDashboard
