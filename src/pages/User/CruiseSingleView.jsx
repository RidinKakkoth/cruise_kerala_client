import React from 'react'
import CruiseSingle from '../../components/User/Cruise/CruiseSingle'
import Navbar from '../../components/Shared/Navbar/Navbar'
import Footer from '../../components/Shared/Footer/Footer'

function CruiseSingleView() {
  return (
    <div>
        <Navbar/>
      <CruiseSingle />
      <Footer/>
    </div>
  )
}

export default CruiseSingleView
