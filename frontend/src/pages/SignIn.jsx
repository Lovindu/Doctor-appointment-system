import React from 'react'
import { NavLink } from 'react-router'
import Logo from '../assets/boc.png';
import arrow from '../assets/down.png';
import google from '../assets/download.png';

const SignIn = () => {
  return (
    <div className="cover">
          <div className="arrow-logo-container">
          <div className="arrow" 
            >
            <img src={arrow} alt="Back Arrow" className="arrow-icon" />
          </div>
  
          
        <div className="logo-section">
          <img src={Logo} alt="BookMyDoc Logo" className="logo" />
          </div>
        </div>
        <h2 className="form-heading">Create an account</h2>
        <p className="subtitle">Enter your credentials to create an account</p>
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
            <input
            type="password"
            placeholder="Re enter Password"
            className="form-input"
          />
         
          <button type="submit" className="login-btn">
            Sign Up
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
          Already have an account? <NavLink to="/login">Sign In</NavLink>
        </p>
      </div>
  )
}

export default SignIn
