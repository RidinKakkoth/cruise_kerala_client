import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { userAdd } from '../../../store/UserAuth'
import './UserSignin.css'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userSignin } from '../../../config/UserEndpoints';
import EmailModal from '../../Shared/EmailModal/EmailModal';
import {useCookies} from 'react-cookie';


function UserSignin() {
const dispatch=useDispatch()
const navigate=useNavigate()

const [cookies, setCookie] = useCookies(['']);

const [email,setEmail]=useState("")
const[password,setPassword]=useState("")
const [emailModalOpen, setEmailModalOpen] = useState(false);

const handleForgot=()=>{
    setEmailModalOpen(true)
}


const handleSubmit = async (e) => {
  e.preventDefault();

  const data = await userSignin(email, password);
  const result = data?.userLogin;
  if (data.status === "failed") {
    toast.error(data.message, { position: "top-center" });
  } else if (result.status) {

    const ageInMinutes = 60; 

    const currentDate = new Date();
    const expirationDate = new Date(currentDate.getTime() + ageInMinutes * 60 * 1000);
    setCookie("userCookie", result.token, { path: '/', expires: expirationDate });
    dispatch(userAdd({ token: result.token, userName: result.name }));
    
    navigate('/');
  }
};


  return (
    <div>
      <ToastContainer autoClose={3000} />
      <div className="user-login-body ">
        <div className="user-card">
        <img
        className='mx-auto mt-2'
            src="https://www.pngall.com/wp-content/uploads/8/Rudder-PNG-Picture.png" 
            alt=""
            style={{ width: '80px', height: '80px', marginRight: '8px' }}
          />
          <h3 className='text-center italic font-serif text-white'>Cruise</h3>
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
            <button type="submit" className="adminlogin-btn rounded-3xl shadow">
                Sign in
              </button>
              
            </div>
          </form>
                <div className='flex justify-center mb-2'>
                  <p className='cursor-pointer' onClick={handleForgot}>forgot password</p>
                </div>
          <div  style={{display:"flex",justifyContent:"center",fontWeight:"500"}}>
                      <p >become a user?</p>
                     <Link style={{textDecoration:"none",color:"blue"}} to={'/signUp'}>Sign Up</Link>
                    </div>
        </div>
        <EmailModal role={"user"} isOpen={emailModalOpen} onRequestClose={() => setEmailModalOpen(false)} handleForgot={handleForgot}  />

      </div>
    </div>
  )
}

export default UserSignin
