import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import {baseApi} from '../../../store/Api'


function Account() {
const[userName,setUserName]=useState("")
const[phone,setPhone]=useState("")
const[email,setEmail]=useState("")
// const[image,setImage]=useState("")

  useEffect(()=>{
    axios.get(`${baseApi}getUserData`,{withCredentials:true}).then((res)=>{
        setUserName(res.data.userData.name)
        setEmail (res.data.userData.email)
        setPhone (res.data.userData.phone)
    }).catch((error)=>console.log(error))
  })

    let{subpage}=useParams()

    if(subpage===undefined){
        subpage='profile'
    }

    function activeClass(type=null){
        let classes='py-2 px-6 no-underline text-black '

        if(type===subpage){
            classes+=' bg-[#011742] text-white no-underline rounded-full hover:bg-[#011742]'
        }
        return classes
    }


  return (
    <div className='mt-24 container  '>
      <nav className='w-full flex justify-center gap-2 font-medium  ' >
        <Link className={activeClass('profile')} to={"/account/profile"}>My Profile</Link>
        <Link className={activeClass('bookings')} to={"/account/bookings"}>My bookings</Link>
        {/* <Link to={}>My bookings</Link> */}
      </nav>
      {
        subpage==='profile'&&(
<div className='flex justify-center'>
<div className='flex-col text-center mt-5 w-[30%] '>

<img src="" className='' alt="profile img" />
<input className='mt-4 border h-10 w-64 bg-gray-200 rounded-lg pl-4'  value={userName} disabled type="text" />
<input className='mt-4 border h-10 w-64 bg-gray-200 rounded-lg pl-4' value={email} disabled type="text" />
<input className='mt-4 border h-10 w-64 bg-gray-200 rounded-lg pl-4' value={phone} disabled type="text" />


</div>
</div>



        )
      }
    </div>
  )
}

export default Account
