import React from 'react'
import Dashboard from '../../components/Partner/PartnerDashboard/Dashboard'
import Sidebar from '../../components/Partner/Sidebar/Sidebar'


function PartnerDashboard() {
  return (
    <div style={{display:"flex"}} >
      <Sidebar />
      <Dashboard/>
    </div>
  )
}

export default PartnerDashboard
