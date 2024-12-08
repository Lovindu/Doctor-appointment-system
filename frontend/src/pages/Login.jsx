import React from 'react'
import { NavLink } from 'react-router'
import "./Login.css"
import Logo from '../assets/boc.png';
import arrow from '../assets/down.png';
import google from '../assets/download.png';
const Login = () => {
  return (
    <div className="cover">
        <div className="arrow-logo-container">
        <div className="arrow">
          <img src={arrow} alt="Back Arrow" className="arrow-icon" />
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
        />
        <input
          type="password"
          placeholder="Password"
          className="form-input"
        />
        <div className="forgot-password">
          <a href="#">Forgot password?</a>
        </div>
        <button type="submit" className="login-btn">
          Sign In
        </button>
      </form>
      <div className="divider">
        <span>or</span>
      </div>
      <button className="google-btn">
        <img src={google} alt="Google" className="google-icon" />
        Sign in with Google
      </button>
      <p className="signup-text">
        Don't have an account? <NavLink to="/signin">Sign up </NavLink>
      </p>
    </div>
  )
}

export default Login
