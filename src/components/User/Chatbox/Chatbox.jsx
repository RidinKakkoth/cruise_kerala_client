import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
import { chatApi, messageApi } from '../../../store/Api';
import InputEmoji from 'react-input-emoji';
import SyncLoader from 'react-spinners/SyncLoader'
import { useSelector } from 'react-redux';
import {io} from "socket.io-client"


function Chatbox() {
  const [userChats, setUSerChats] = useState(null);
  const [isChatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [userMessage, setUserMessage] = useState(null);
  const [messageLoading, setMessageLoading] = useState(false);
  const [messageError, setMessageError] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  // const [socket, setSocket] = useState(null);
  
  //initialise socket

  const user = useSelector((state) => state.User.userToken);

  const socket = useRef(null);

useEffect(()=>{
   socket.current=io("http://localhost:8080");
 

  socket.current.on('message',(message)=>{
    setUserMessage((prevMessages)=>[...prevMessages,message])
  })
return()=>{
  socket.current.disconnect()
}

},[currentChat,setUserMessage])




  useEffect(() => {
    setChatLoading(true);
    setChatError(null);
    axios
      .get(`${chatApi}userChat`, { withCredentials: true })
      .then((res) => {
        setUSerChats(res.data);

        setChatLoading(false);
        // Set the initial chat to the first chat in the userChats array
        if (res.data.length > 0) {
          setCurrentChat(res.data[0]);
        }
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
          setUserMessage(res.data);
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
  }, [userMessage]);

  const open = () => {
    axios
      .post(`${chatApi}`, {}, { withCredentials: true })
      .then((res) =>//check if error comes
       setUSerChats(res.data))
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
          senderId: currentChat.userId,
          chatId: currentChat._id,
          text: newMessage,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log('Message sent successfully.');
        setNewMessage('');
        // setUserMessage((prevMessages) => [...prevMessages, res.data]);
       
        //emit message
        socket.current.emit('message',{
          senderId:currentChat.userId,
          chatId:currentChat._id,
          text:newMessage
        })
      })
      .catch((err) => {
        console.log('Failed to send message.', err);
      });

  };

  
    return (
      <div className="container mt-24 mb-6">
        <h3 className='mb-3'>Chat with us </h3>
  
        {userChats?.length < 1 ? 
        (
          <div className='flex justify-center '>
            <div >
            <img className='w-[30%]' src="https://www.carprolive.com/hubfs/Contact_Us_Animation.gif" alt="" />
              <button onClick={open} className='sm:mb-32 ms-4  rounded-2xl h-10 bg-[#182eff] text-white font-semibold w-10  sm:w-48 cursor-pointer '> Start </button>
            </div>
          </div>
        )
        : (
          <div className="grid grid-cols-4">
            <div className="col-span-3 bg-gray-200 min-h-[350px] border rounded-3xl px-5 py-3">
              {/* Use 'max-h-[300px]' class to set a maximum height for the message container */}

            
            {!messageLoading?
             ( <div ref={messageContainerRef} className="message max-h-[300px] overflow-y-auto">
                {userMessage &&
                  userMessage.map((message, index) =>
                    message.senderId === currentChat.userId ? (
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

                      <div   className="min-h-[50px]  bg-white  text-sm px-2 shadow w-[70%] rounded-lg" key={index}>

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

):<SyncLoader color='#36D7b7'/>}

              <div className="flex mt-4">
                <InputEmoji
                  value={newMessage}
                  onChange={setNewMessage}
                  placeholder="Type a message"
                  fontFamily="nunito"
                  borderColour="rgba(72, 112, 223, 0.2)"
                />
                <button onClick={sendMessage} className="flex ml-auto mt-2 text-green-500">
                  {/* <span className="text-white rounded-lg w-24 font-semibold bg-blue-950">Send</span> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-8 h-8 "
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }


export default Chatbox;
