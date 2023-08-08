import React from 'react'
import BookingData from '../../components/Admin/BookingDatas/BookingData'
import Sidebar from '../../components/Shared/Sidebar/Sidebar'

function Bookings() {
  return (

  <div className='w-[100%]' style={{display:"flex"}} >
  <div className='' >

  <Sidebar userType="admin"  />
  </div>
  <div className='overflow-y-auto h-[100vh] w-[100vw]'>

    <BookingData/>
  </div>
</div>
  )
}

export default Bookings
