import React from 'react'
import Chatbox from '../../components/User/Chatbox/Chatbox'
import Navbar from '../../components/Shared/Navbar/Navbar'
import Footer from '../../components/Shared/Footer/Footer'

function ChatboxPage() {
  return (
    <div>
         <Navbar/>
      <Chatbox/>
      <Footer/>
    </div>
  )
}

export default ChatboxPage
