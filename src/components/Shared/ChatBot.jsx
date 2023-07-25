import React from 'react';
import chatbotgif from '../../assets/bot.gif';
import { useNavigate } from 'react-router-dom';

function ChatBot() {

    const navigate=useNavigate()
  return (
    <div className='fixed bottom-0 right-0 mb-4 mr-4 z-50'>
      <img onClick={()=>{navigate('/chatbox')}} className='w-[8rem] cursor-pointer me-3' src={chatbotgif} alt="ChatBot" />
    </div>
  );
}

export default ChatBot;
