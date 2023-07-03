import React from 'react'
import Dashboard from '../../components/Partner/PartnerDashboard/Dashboard'
import Sidebar from '../../components/Shared/Sidebar/Sidebar'

function PartnerDashboard() {
  return (
    <div style={{display:"flex"}} >
      <Sidebar userType="partner"  />
      <Dashboard/>
    </div>
  )
}

export default PartnerDashboard
