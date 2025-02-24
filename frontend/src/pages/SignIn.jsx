import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router'
import Logo from '../assets/boc.png';
import arrow from '../assets/down.png';
import google from '../assets/download.png';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const SignIn = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: undefined,
    password: undefined,
    passwordConfirm: undefined
  })

  const {user, error, loading, dispatch} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserCredentials(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleSignIn = async (e) => {
    e.preventDefault();
    dispatch({type: 'LOGIN_START'});
    try {
      const response = await axios.post("http://localhost:3000/api/auth/createuser", userCredentials);
      dispatch({type: "LOGIN_SUCCESS", payload: response.data});
      navigate("/");
    }catch(err) {
      console.log(err)
      dispatch({type:"LOGIN_ERROR", payload: err.response.data});
    }
  }

  console.log(userCredentials);
  console.log(user)

  return (
    <div className='login--main'>
      <div className="cover">
          <div className="arrow-logo-container">
          <div className="arrow" 
            >
              <NavLink to='/'>
                <img src={arrow} alt="Back Arrow" className="arrow-icon" />
              </NavLink>
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
            name='email'
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="form-input"
            name='password'
            onChange={handleChange}
          />
            <input
            type="password"
            placeholder="Re enter Password"
            className="form-input"
            name='passwordConfirm'
            onChange={handleChange}
          />
         
          <button type="submit" className="login-btn" onClick={handleSignIn}>
            Sign Up
          </button>
        </form>
        <div className="divider">
          <span>or</span>
        </div>
{/*         <button className="google-btn">
          <img src={google} alt="Google" className="google-icon" />
          Sign in with Google
        </button> */}
        <p className="signup-text">
          Already have an account? <NavLink to="/login">Sign In</NavLink>
        </p>
      </div>
    </div>
  )
}

export default SignIn
