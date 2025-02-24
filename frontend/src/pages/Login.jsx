import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router'
import "./Login.css"
import Logo from '../assets/boc.png';
import arrow from '../assets/down.png';
import google from '../assets/download.png';
import { AuthContext } from '../context/AuthContext';
import axios from "axios";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined
  })

  const {loading, error, dispatch} = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setCredentials(prev => ({...prev, [event.target.name]: event.target.value}))
  }


  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({type: "LOGIN_START"});
    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", credentials);
      dispatch({type: "LOGIN_SUCCESS", payload:response.data});
      navigate("/");
    } catch(err) {
      dispatch({type: "LOGIN_FAILURE", payload: err.response.data});
    }
  }

  return (
    <div className='login--main'>
        <div className="cover">
          <div className="arrow-logo-container">
          <div className="arrow">
            <NavLink to="/">
              <img src={arrow} alt="Back Arrow" className="arrow-icon" />
            </NavLink>
          </div>

          
        <div className="logo-section">
          <img src={Logo} alt="BookMyDoc Logo" className="logo" />
          </div>
        </div>
        <h2 className="form-heading">Login to book appointments</h2>
        <p className="subtitle">Enter your credentials to log in</p>
        <form className="form">
        
          <input
          
            type="text"
            placeholder="Email"
            className="form-input"
            name='email'
            id='email'
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name='password'
            id='password'
            className="form-input"
            onChange={handleChange}
          />
          <div className="forgot-password">
          <NavLink to="/profile">Forgot password?</NavLink>
          </div>
          <button disabled={loading} type="submit" className="login-btn" onClick={handleLogin}>
            Login

          </button>
          {error && <span>{error.message}</span>}
        </form>
        <div className="divider">
          <span>or</span>
        </div>
{/*         <button className="google-btn">
          <img src={google} alt="Google" className="google-icon" />
          Login in with Google
        </button> */}
        <p className="signup-text">
          Don't have an account? <NavLink to="/signin">Sign up </NavLink>
        </p>
      </div>
    </div>
  )
}

export default Login
