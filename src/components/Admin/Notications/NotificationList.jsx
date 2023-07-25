import React, { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { deleteNotifications, getNotification } from '../../../config/AdminEndpoints';

function NotificationList() {
    
    
    const [refresh,setRefresh]=useState(false)
    const [notifications,setNotifications]=useState([])

    useEffect(()=>{
      async function invoke(){
        const data=await getNotification() 
        setNotifications(data.data)     
      }
      invoke()
    },[refresh])


    const deleteNotification = async(id) => {
      await deleteNotifications(id)
      setRefresh(!refresh);
    };  
    
    return (
        <>
          <div className="flex flex-col overflow-x-auto h-full px-8 mt-5">
          <h2  className='mb-12 mt-4'>Notification</h2>
            <ToastContainer />
          {notifications?.map((notif,index) => (
            <>
             {notif?.status === "success" && (
                <div key={index}  className="flex shadow justify-between bg-white rounded-lg mb-5 ">
                  <div className="sm:px-6  flex   sm:mt-0 ml-4 sm:ml-0 items-center justify-center bg-green-400 sm:rounded-tl sm:rounded-bl w-12 h-12 sm:h-auto sm:w-auto text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-black"
                      viewBox="0 0 24 24"
                      width={40}
                      height={40}
                      fill="currentColor"
                    >
                      <path
                        className="heroicon-ui"
                        d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col justify-center xl:-ml-4 pl-4 xl:pl-1 sm:w-3/5 pt-4 sm:pb-4 pb-2">
                    <p className="text-lg text-gray-800 dark:text-gray-700 font-semibold pb-1">
                      {notif?.message} 
                    </p>
                    <p className="text-sm text-sky-600 font-normal">
                    {notif?.notification} 
                    </p>
                  </div>
                  <div className="flex sm:flex-col sm:justify-center sm:border-l dark:border-gray-700 items-center border-gray-300 sm:w-1/6 pl-4 sm:pl-0">
                    <div onClick={()=>deleteNotification(notif?._id)} className="sm:pt-4 pb-4 flex sm:justify-center w-full cursor-pointer">
                      <span className="sm:text-sm text-xs text-red-600 font-semibold cursor-pointer">
                        Dismiss
                      </span>
                    </div>
                  </div>
                </div>
               )} 
    
              {notif?.status === "warning" && (
                <div  className="flex justify-between bg-white rounded-lg mb-5">
                  <div className="sm:px-6 flex mt-4 sm:mt-0 ml-4 sm:ml-0 items-center justify-center bg-yellow-300 sm:rounded-tl sm:rounded-bl w-12 h-12 sm:h-auto sm:w-auto text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={40}
                      height={40}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 5.177l8.631 15.823h-17.262l8.631-15.823zm0-4.177l-12 22h24l-12-22zm-1 9h2v6h-2v-6zm1 9.75c-.689 0-1.25-.56-1.25-1.25s.561-1.25 1.25-1.25 1.25.56 1.25 1.25-.561 1.25-1.25 1.25z" />
                    </svg>
                  </div>
                  <div className="flex flex-col justify-center xl:-ml-4 pl-4 xl:pl-1 sm:w-3/5 pt-4 sm:pb-4 pb-2">
                    <p className="text-lg text-gray-800 dark:text-gray-700 font-semibold pb-1">
                    {notif?.message} 
                    </p>
                    <p className="text-sm text-sky-600 font-normal">
                     {notif?.notification} 
                    </p>
                  </div>
                  <div className="flex sm:flex-col sm:justify-center sm:border-l dark:border-gray-700 items-center border-gray-300 sm:w-1/6 pl-4 sm:pl-0">
                    <div onClick={()=>deleteNotification(notif?._id)} className="sm:pt-4 pb-4 flex sm:justify-center w-full cursor-pointer">
                      <span className="sm:text-sm text-xs text-red-600 font-semibold cursor-pointer">
                        Dismiss
                      </span>
                    </div>
                  </div>
                </div>
            )} 
    
              {notif?.status === "danger" && (
                <div  className="flex justify-between bg-white rounded-lg mb-5">
                  <div className="sm:px-6  flex mt-4 sm:mt-0 ml-4 sm:ml-0 items-center justify-center bg-red-500 sm:rounded-tl sm:rounded-bl w-12 h-12 sm:h-auto sm:w-auto text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={40}
                      height={40}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5 15.538l-3.592-3.548 3.546-3.587-1.416-1.403-3.545 3.589-3.588-3.543-1.405 1.405 3.593 3.552-3.547 3.592 1.405 1.405 3.555-3.596 3.591 3.55 1.403-1.416z" />
                    </svg>
                  </div>
                  <div className="flex flex-col justify-center xl:-ml-4 pl-4 xl:pl-1 sm:w-3/5 pt-4 sm:pb-4 pb-2">
                    <p className="text-lg text-gray-800 dark:text-gray-500 font-semibold pb-1">
                   {notif?.message} 
                    </p>
                    <p className="text-sm text-sky-600 font-normal">
                    {notif?.notification} 
                    </p>
                  </div>
                  <div className="flex sm:flex-col sm:justify-center sm:border-l dark:border-gray-700 items-center border-gray-300 sm:w-1/6 pl-4 sm:pl-0">
                    <div onClick={()=>deleteNotification(notif?._id)} className="sm:pt-4 pb-4 flex sm:justify-center w-full cursor-pointer">
                      <span className="sm:text-sm text-xs text-red-600 cursor-pointe hover:text-red-900">
                        Dismiss
                      </span>
                    </div>
                  </div>
                </div>
              )} 
            </>
          ))}
        </div>
        
        </>
      )
    }
    


export default NotificationList
