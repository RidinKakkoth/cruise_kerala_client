import React, { useEffect, useState } from 'react';
import chatbotgif from '../../assets/bot.gif';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';

function ChatBot() {
  const [userCookie] = useCookies(['userCookie']);
  const [isUser, setIsUser] = useState(false);
  const userToken = useSelector((state) => state?.User?.userToken);

  useEffect(() => {
    const invoke = () => {
      const cookieToken = userCookie?.userCookie?.token;
      const isUserCookieExists = cookieToken === userToken;
      if (isUserCookieExists) {
        setIsUser(true);
      } else {
        setIsUser(false);
      }
    };
    invoke();
  }, [userCookie, userToken]); // Add userCookie and userToken to the dependency array

  const navigate = useNavigate();

  return (
    <>
      {isUser && (
        <div className='fixed bottom-0 right-0 mb-4 mr-4 z-50'>
          <img
            onClick={() => {
              navigate('/chatbox');
            }}
            className='w-[8rem] cursor-pointer me-3'
            src={chatbotgif}
            alt='ChatBot'
          />
        </div>
      )}
    </>
  );
}

export default ChatBot;
