import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { baseApi } from '../../../store/Api'
import { userAdd } from '../../../store/UserAuth'
import './UserSignin.css'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function UserSignin() {
const dispatch=useDispatch()
const navigate=useNavigate()

const [email,setEmail]=useState("")
const[password,setPassword]=useState("")
// const[error,setError]=useState(null)


const handleSubmit=(e)=>{

e.preventDefault()
axios.post(`${baseApi}userSignin`,{email,password},{withCredentials:true}).then((response)=>{

 const result=response.data.userLogin

 if(result.status){
  dispatch(userAdd({token:result.token,userName:result.name}))
  navigate('/')
 }

}).catch((error)=>{toast.error(error.response.data.error,{position: "top-center"})
console.log(error.response.data.error);})

}


  return (
    <div>
      <ToastContainer autoClose={3000} />
      <div className="user-login-body">
        <div className="user-card">
          <h1 className="user-login">user LogIn</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="user-label">Email</label>
              <input
              // required
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="user-label">Password</label>
              <input
                // required
                type='password'
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                name="password"
                className="form-control"
              />
            </div>

            <div className="user-btn-div">
              <button type="submit" className="userlogin-btn">
                LogIn
              </button>
            </div>
          </form>

          <div  style={{display:"flex",justifyContent:"center",fontWeight:"500"}}>
                      <p >become a user?</p>
                     <Link style={{textDecoration:"none",color:"blue"}} to={'/signUp'}>Sign Up</Link>
                    </div>
        </div>
      </div>
    </div>
  )
}

export default UserSignin
