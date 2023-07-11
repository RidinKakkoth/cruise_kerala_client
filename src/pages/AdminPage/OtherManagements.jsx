import React from 'react'
import OtherSettings from '../../components/Admin/Other/OtherSettings'
import Sidebar from '../../components/Shared/Sidebar/Sidebar'

function OtherManagements() {
  return (
    <div style={{display:"flex"}} >
    <Sidebar userType={"admin"}   />
    <OtherSettings/>
  </div>

  )
}

export default OtherManagements
