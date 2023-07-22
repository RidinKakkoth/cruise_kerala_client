import React from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {


const navigate=useNavigate()
const handleChat=()=>{
    navigate('/admin/chatbox')
}

  return (
    <div className='flex ml-auto'>
      <button onClick={handleChat} className='bg-green-600 text-white rounded h-10 w-24 '>chat </button>
    </div>
  )
}

export default Dashboard
