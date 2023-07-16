import React from 'react'
import Navbar from '../../components/Shared/Navbar/Navbar'
import Footer from '../../components/Shared/Footer/Footer'
import BookingDetail from '../../components/User/Account/BookingDetail'

function BookingDetailPage() {
  return (
    <div>
        <Navbar/>
        <BookingDetail  />
        <Footer/>
    </div>
  )
}

export default BookingDetailPage
