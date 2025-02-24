import React from 'react';
import './Footer.css';
import Logo from '../assets/logo.png';
import { NavLink } from 'react-router';

const Footer = () => {
  return (
    <div className='footer'>
        <div>
            <div className='footer--details'>
                <img src={Logo} alt="logo" />
                <p>BookMyDoc simplifies healthcare by allowing you to easily find and book appointments with trusted doctors. Whether it's a general checkup or specialized care, manage your health conveniently from anywhere, anytime. Your health, our priority.</p>
            </div>

            <div className='footer--links-right'> 
                <div className='footer--links'>
                    <h3>Pages</h3>
                    <NavLink to='/' className="footer--link">Home</NavLink>
                    <NavLink to='/search' className="footer--link">Search</NavLink>
                    <NavLink to='/contactus' className="footer--link">Contact Us</NavLink>
                </div>

                <div className='footer--contact'>
                    <h3>Contact</h3>
                    <a href="">+94 76 1234567</a>
                    <a href="mailto:bookmydoc@gmail.com">bookmydoc@gmail.com</a>
                </div>
            </div>
        </div>
        <p className='footer-copyrights'>Copyright © 2024 - All Rights Reserved</p>
    </div>
  )
}

export default Footer
