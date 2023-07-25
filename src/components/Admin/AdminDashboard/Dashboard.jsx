import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getNotification } from '../../../config/AdminEndpoints';

function Dashboard() {

  const[count,setCount]=useState()

  useEffect(()=>{
    async function invoke(){
      const data=await getNotification()      
      setCount(data.data.length)
    }
    invoke()
  },[])

const navigate=useNavigate()
const handleChat=()=>{
    navigate('/admin/chatbox')
}
const handleNotification=()=>{
  navigate("/admin/notification")
}

  return (
    <div className='flex ml-auto gap-2 mt-2 me-2'>
      <button onClick={handleChat} className='bg-cyan-300 flex justify-center items-center gap-2 text-white rounded h-10 w-24 '><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
</svg>
chat </button>
      <button onClick={handleNotification} className='bg-indigo-500 px-2 text-white gap-2 rounded h-10 flex justify-center items-center'><span className='rounded-full w-6 h-6 ms-2 text-sm text-white-600 bg-red-500'>{count>0?count:""}</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
</svg> 
 Notification </button>
    </div>
  )
}

export default Dashboard
