import React from 'react'
import Sidebar from '../../components/Shared/Sidebar/Sidebar'
import CruiseData from '../../components/Admin/CruiseDatas/CruiseData'

function CruiseRequest() {
  return (
    <div style={{display:"flex"}} >
      <Sidebar userType="admin"  />
      <CruiseData status={false}/>
    </div>
  )
}

export default CruiseRequest
