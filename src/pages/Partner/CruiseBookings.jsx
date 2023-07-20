import React from 'react'
import Sidebar from '../../components/Shared/Sidebar/Sidebar'
import BookingData from '../../components/Partner/BookingDatas/BookingData'

function CruiseBookings() {
  return (
    <div style={{display:"flex"}} >
        <div className='fixed md:static '>

    <Sidebar userType={"partner"}   />
        </div>
    <BookingData/>
  </div>
  )
}


export default CruiseBookings
