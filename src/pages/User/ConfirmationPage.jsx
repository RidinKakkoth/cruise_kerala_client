import React from 'react'
import Navbar from '../../components/Shared/Navbar/Navbar'
import Footer from '../../components/Shared/Footer/Footer'
import Confirmation from '../../components/User/Checkout/Confirmation'

function ConfirmationPage() {
  return (
    <div>
      <Navbar/>
      <Confirmation/>
      <Footer/>
    </div>
  )
}

export default ConfirmationPage
