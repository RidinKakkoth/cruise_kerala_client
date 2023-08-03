import React from 'react'
import Cruise from '../../components/User/Cruise/Cruise'
import Footer from '../../components/Shared/Footer/Footer'
import Navbar from '../../components/Shared/Navbar/Navbar'
import ChatBot from '../../../src/components/Shared/ChatBot';
import { useSelector } from 'react-redux';
function CruiseCards() {
  const user=useSelector(state=>state.User.userToken)
 
  return (
    <div>
           <Navbar />
           {/* {user&&<ChatBot/>} */}
           <ChatBot/>
      <Cruise/>
      <Footer/>
    </div>
  )
}

export default CruiseCards
