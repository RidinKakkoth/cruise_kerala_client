import React from 'react'
import PartnerTable from '../../components/Admin/PartnerTable/PartnerTable'
import Sidebar from '../../components/Shared/Sidebar/Sidebar'

function PartnerData() {
  return (
    <div style={{display:"flex"}} >
      <Sidebar userType={"admin"}   />
      <PartnerTable status={true}/>
    </div>
  )
}

export default PartnerData
