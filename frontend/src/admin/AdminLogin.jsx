import React, { useContext, useState } from 'react';
import Logo from '../assets/logo.png';
import "./AdminLogin.css";
import { AdminAuthContext } from '../context/AdminAuthContext';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined
  })

  const {loading, error, dispatch} = useContext(AdminAuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials(prev => ({...prev, [e.target.name]: e.target.value}));
  }

  console.log(credentials);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    dispatch({type: "LOGIN_START"});
    try {
      const response = await axios.post("http://localhost:3000/api/auth/adminlogin", credentials);
      dispatch({type: "LOGIN_SUCCESS", payload:response.data});
      navigate("/admin/dashboard");
    } catch(err) {
      alert(err.response.data.message);
      dispatch({type: "LOGIN_FAILURE", payload: err.response.data});
    }
  }

  return (
    <div className='admin--login'>
        <div className='admin--login-form'>
            <img src={Logo} alt="logo" />
            <h2>Admin Login</h2>

            <div className='admin--login-input'>
                <p>Email</p>
                <input type="text" placeholder='Type email' name="email" onChange={handleChange}/>
            </div>
            

            <div className='admin--login-input'>
                <p>Password</p>
                <input type="password" placeholder='Type your password' name='password' onChange={handleChange}/>
            </div>
            
            <br />
            <button type='submit' className='admin--login-btn' onClick={handleAdminLogin}>Login</button>

            <NavLink to="/" className="admin--login-backtohome">Back to home page</NavLink>
        </div>
    </div>
  )
}

export default AdminLogin
