import "./Login.css";
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { adminAdd } from "../../../store/AdminAuth";
import React, { useState } from "react";
import { adminApi } from "../../../store/Api";
import axios from 'axios'



function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch=useDispatch()
  const navigate=useNavigate()


  const handleSubmit = (e) => {
    
    e.preventDefault()
    axios.post(`${adminApi}adminSignin`,{email,password},{withCredentials:true}).then((response)=>{
      const result=response.data.adminLogin

      if(result.status){
        
        dispatch(adminAdd({token:result.token}))
        navigate('/admin/dashboard')
      }

    })

  };

  return (
    <div>
      <div className="admin-login-body">
        <div className="admin-card">
          <h1 className="admin-login">Log In</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="admin-label">Email</label>
              <input
                type="email"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="admin-label">Password</label>
              <input
                type="password"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                name="password"
                className="form-control"
              />
            </div>

            <div className="admin-btn-div">
              <button type="submit" className="adminlogin-btn">
                Log In
              </button>
            </div>
          </form>

          <p>{error}</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
