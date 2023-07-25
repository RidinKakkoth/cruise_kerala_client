import React from 'react'
import CruiseSingle from '../../components/User/Cruise/CruiseSingle'
import Navbar from '../../components/Shared/Navbar/Navbar'
import Footer from '../../components/Shared/Footer/Footer'
import ChatBot from '../../../src/components/Shared/ChatBot';
import { useSelector } from 'react-redux';


function CruiseSingleView() {
  const user=useSelector(state=>state.User.userToken)
  return (
    <div>
        <Navbar/>
        {user&&<ChatBot/>}
      <CruiseSingle />
      <Footer/>
    </div>
  )
}

export default CruiseSingleView
