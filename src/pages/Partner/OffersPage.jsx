import React from 'react'
import Sidebar from '../../components/Shared/Sidebar/Sidebar'
import Offers from '../../components/Partner/Offers/Offers'
function OffersPage() {
  return (
    // <div style={{display:"flex"}} >
    //   <Sidebar userType="partner"  />
    //   <Offers/>
    // </div>
    <div style={{ display: "flex" }}>

    <div >
      <Sidebar userType="partner" />
    </div>

    <div className='overflow-auto h-[100vh] w-[100vw]'>
    <Offers/>
    </div>
  </div>
  )
}

export default OffersPage
