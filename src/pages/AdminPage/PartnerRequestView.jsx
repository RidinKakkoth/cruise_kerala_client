import React from 'react'
import PartnerTable from '../../components/Admin/PartnerTable/PartnerTable'
import Sidebar from '../../components/Shared/Sidebar/Sidebar'

function PartnerRequestView() {
  return (
    <div>
    <div style={{display:"flex"}} >
      <Sidebar userType={"admin" }  />
      <PartnerTable status={false}/>
    </div>
    </div>
  )
}

export default PartnerRequestView
