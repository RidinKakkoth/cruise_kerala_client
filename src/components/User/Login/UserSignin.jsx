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
          <h1 className="partner-login">Partner LogIn</h1>
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
              <button type="submit" className="partnerlogin-btn">
                LogIn
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
