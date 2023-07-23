import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { partnerApi } from '../../../store/Api'
import { partnerAdd } from '../../../store/PartnerAuth'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function PartnerLogin() {
const dispatch=useDispatch()
const navigate=useNavigate()

const [email,setEmail]=useState("")
const[password,setPassword]=useState("")
// const[error,setError]=useState(null)


const handleSubmit=(e)=>{

e.preventDefault()
axios.post(`${partnerApi}partnerSignin`,{email,password},{withCredentials:true}).then((response)=>{

 const result=response.data.partnerLogin

 if(result.status){
  dispatch(partnerAdd({token:result.token}))
  navigate('/partner/dashboard')
 }

}).catch((error)=>{toast.error(error.response.data.error,{position: "top-center"})
console.log(error.response.data.error);})

}


  return (
    <div>
      <ToastContainer autoClose={3000} />
      <div className="partner-login-body">
        <div className="partner-card">
        <img
        className='mx-auto mt-2'
            src="https://www.pngall.com/wp-content/uploads/8/Rudder-PNG-Picture.png" // Replace with the URL or path to your image
            alt=""
            style={{ width: '80px', height: '80px', marginRight: '8px' }}
          />
          <h3 className='text-center italic font-serif text-white'>Cruise</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="partner-label">Email</label>
              <input
              required
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="partner-label">Password</label>
              <input
                required
                type='password'
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                name="password"
                className="form-control"
              />
            </div>

            <div className="partner-btn-div">
            <button type="submit" className="adminlogin-btn rounded-3xl shadow hover:bg-[#e48291]">
                Sign in
              </button>
            </div>
          </form>

          <div  style={{display:"flex",justifyContent:"center",fontWeight:"500"}}>
                      <p >become a partner?</p>
                     <Link style={{textDecoration:"none",color:"blue"}} to={'/partner/signUp'}>Sign Up</Link>
                    </div>
        </div>
      </div>
    </div>
  )
}

export default PartnerLogin
