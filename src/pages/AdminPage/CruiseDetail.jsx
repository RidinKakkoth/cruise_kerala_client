import React from 'react'
import Sidebar from '../../components/Shared/Sidebar/Sidebar'
import CruiseData from '../../components/Admin/CruiseDatas/CruiseData'

function CruiseDetail() {
  return (
    <div style={{display:"flex"}} >
      <Sidebar userType="admin"  />
      <CruiseData status={true}/>
    </div>
  )
}

export default CruiseDetail
