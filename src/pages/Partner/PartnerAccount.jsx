import React from 'react'
import Sidebar from '../../components/Shared/Sidebar/Sidebar'
import Account from '../../components/Partner/Account/Account'
function PartnerAccount() {
  return (
    <div style={{display:"flex"}} >
      <Sidebar userType="partner"  />
      <Account/>
    </div>
  )
}

export default PartnerAccount
