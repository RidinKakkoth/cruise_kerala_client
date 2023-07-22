import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
import { chatApi, messageApi } from '../../../store/Api';
import InputEmoji from "react-input-emoji";
import SyncLoader from 'react-spinners/SyncLoader'

function Chatbox() {
  const [adminChats, setAdminChats] = useState(null);
  const [isChatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [adminMessage, setAdminMessage] = useState(null);
  const [messageLoading, setMessageLoading] = useState(false);
  const [messageError, setMessageError] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    setChatLoading(true);
    setChatError(null);
    axios
      .get(`${chatApi}adminChat`, { withCredentials: true })
      .then((res) => {
        setAdminChats(res.data);
        console.log(res.data);
        setChatLoading(false);
        // Set the initial chat to the first chat in the adminChats array

      })
      .catch((err) => {
        setChatError(err);
      });
  }, []);

  useEffect(() => {
    setMessageLoading(true);
    setMessageError(null);
    if (currentChat) {
      axios
        .get(`${messageApi}${currentChat._id}`, { withCredentials: true })
        .then((res) => {
          setAdminMessage(res.data);
          setMessageLoading(false);
        })
        .catch((err) => {
          setMessageError(err);
        });
    }
  }, [currentChat]);

  const messageContainerRef = useRef(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      // Scroll to the bottom of the message container
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [adminMessage]);

  const open = () => {
    axios
      .post(`${chatApi}`, {}, { withCredentials: true })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const sendMessage = () => {
    if (newMessage === '') {
      console.log('Type something before sending.');
      return;
    }

    axios
      .post(
        `${messageApi}`,
        {
          senderId: currentChat.adminId,
          chatId: currentChat._id,
          text: newMessage,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log('Message sent successfully.');
        setNewMessage('');
        setAdminMessage((prevMessages) => [...prevMessages, res.data]);
      })
      .catch((err) => {
        console.log('Failed to send message.', err);
      });
  };

  const clickUser = (chat) => {
    setCurrentChat(chat);
  };

  
    return (
      <div className="container mt-12 mb-6">
        <div>

        <h3 className='mb-5'>Users Chats  </h3>
        </div>




        {adminChats?.length < 1 ? null : (
          <div className="grid grid-cols-4 gap-2">
        <div className="col-span-1 rounded-xl  bg-gray-200 shadow">
            <div className='flex justify-center mt-3 rounded-2xl gap-5 items-center text-white h-10 bg-[#011742]'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
</svg>

            <h5 className='items-center'>Chats</h5>

            </div>
            {isChatLoading && <SyncLoader color='#36D7b7'/>}
            {adminChats?.map((chat, index) => (
              <div className='bg-[#36D7b7] ml-2 me-2 justify-around text-white h-10 text-center flex mt-2 mb-2 rounded-2xl text-lg font-semibold items-center cursor-pointer'  onClick={() => clickUser(chat)} key={index}>
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>
 {chat.userId.name}
              </div>
            ))}
          </div>


{currentChat?            <div className="col-span-3 bg-gray-200 border rounded-3xl px-5 py-3">                
               <div ref={messageContainerRef} className="message max-h-[300px] overflow-y-auto">
               
                {adminMessage &&
                  adminMessage.map((message, index) =>
                    message.senderId === currentChat.adminId ? (


                     <>

                    <div className="min-h-[50px] ml-auto bg-green-100 text-sm px-2 shadow w-[70%] rounded-lg me-3" key={index}>
                        <div className="flex flex-wrap">
                          <span className="mt-2 font-medium">{message.text}</span>
                        </div>
                      </div>
                        <div className="mb-3 text-right">
                          <span className="text-xs text-gray-400">
                            {moment(message.createdAt).tz('Asia/Kolkata').format('MMMM Do YYYY, h:mm:ss a')}
                          </span>
                        </div>
                     </>
                    ) : (
                      <>

                      <div   className="min-h-[50px]  bg-white  text-sm px-2 shadow w-[70%] rounded-lg " key={index}>

                         <div className="flex flex-wrap">
                           <span className="mt-2 font-medium">{message.text}</span>
                         </div>
                       </div>
                         <div className="mb-3 ">
                           <span className="text-xs text-gray-400">
                             {moment(message.createdAt).tz('Asia/Kolkata').format('MMMM Do YYYY, h:mm:ss a')}
                           </span>
                         </div>
                      </>
                    )
                  )}
              </div>


              <div className="flex mt-4">
                <InputEmoji
                  value={newMessage}
                  onChange={setNewMessage}
                  fontFamily="nunito"
                  placeholder="Type a message"
                  borderColour="rgba(72, 112, 223, 0.2)"
                />
                <button onClick={sendMessage} className="flex ml-auto mt-3 text-green-500">
                  <span className="text-white rounded-lg w-24 font-semibold bg-blue-950">Send</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 ml-2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </button>
              </div>
            </div>:
            <div className='flex relative  w-[100vw]'>

              <img className='ms-3 rounded-2xl shadow' src="https://cdn.pixabay.com/animation/2022/11/16/11/48/11-48-15-802_512.gif" alt="" />
              <h4 className='left-12 bottom-5 text-gray-500  absolute'>Open chats to  view messages...</h4>
              </div>}


          </div>
        )}
      </div>
    );
  }


export default Chatbox;
