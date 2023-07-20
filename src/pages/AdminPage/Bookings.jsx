import React from 'react'
import BookingData from '../../components/Admin/BookingDatas/BookingData'
import Sidebar from '../../components/Shared/Sidebar/Sidebar'

function Bookings() {
  return (
    <div style={{display:"flex"}} >
        <div className='fixed md:static '>

    <Sidebar userType={"admin"}   />
        </div>
    <BookingData/>
  </div>
  )
}

export default Bookings
