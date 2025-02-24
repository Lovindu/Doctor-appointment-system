import React, { useContext, useEffect, useState } from 'react';
import Logo from '../assets/logo.png';
import '../App.css';
import { NavLink, useNavigate } from 'react-router';
import MenuIcon from '../assets/menu.png';
import ProfileIcon from '../assets/profile.png';
import DownIcon from '../assets/down-icon.png';
import CloseIcon from '../assets/close.png';
import { AuthContext } from '../context/AuthContext';

const Nav = () => {
  const [loggedin, setLoggedin] = useState(false);
  const [email, setEmail] = useState("");

  const [toggle, setToggle] = useState(false);

  const { user, loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if(user) {
      setLoggedin(true);
      setEmail(user.email);
    }
  }, [user]);

  const toggleNav = () => {
    setToggle(prevToggle => !prevToggle);
  }

  const handleLogout = () => {
    if(user) {
      dispatch({type: "LOGOUT"});
      navigate("/");
    } else {
      console.log("no user found")
    }
  }

  return (
    <nav className='nav'>
      <NavLink to="/">
        <img src={Logo} alt="log" className='nav--logo'/>
      </NavLink>

      <div className={toggle ?'nav--section-2 nav--section-2-active': 'nav--section-2'}>
        <div className='nav--right-mobile-inside' onClick={toggleNav}>
          <img src={CloseIcon} alt="menu-icon" />
        </div>
        
        <div className='nav--links'>
          <div>
            <NavLink to="/" className="nav--link nav--link-active" >Home</NavLink>
            {/* <hr /> */}
          </div>

          <div>
            <NavLink to="/search" className="nav--link">Search</NavLink>
            {/* <hr /> */}
          </div>

          <div>
            <NavLink to="/contactus" className="nav--link">Contact Us</NavLink>
            {/* <hr /> */}
          </div>
        </div>

        <div className='nav--right'>
          {loggedin == true ? 
            <div className='nav--loggedin'>
                <NavLink to='/profile' className="navbar--to-profile">
                  <img src={ProfileIcon} alt="profile--icon" />
                  <span>{email.split("@")[0]}</span>
                </NavLink>
                <button><img src={DownIcon} alt="down-icon"/></button>
                

              <div className='nav--loggedin-options'>
                <NavLink className="nav--loggedin-options-link" to="/profile">Profile</NavLink>
                <NavLink className="nav--loggedin-options-link" to="/profile">My Appointments</NavLink>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
            :
            <div className='nav--default'>
              <button className='nav--default-login'><NavLink className="nav--default-link link--login" to="/login">Login</NavLink></button>
              <button className='nav--default-create'><NavLink className="nav--default-link link--create" to="signin">Create an account</NavLink></button>
            </div>
          }
          
        </div>
      </div>

      <div className='nav--right-mobile' onClick={toggleNav}>
        <img src={MenuIcon} alt="menu-icon" />
      </div>
    </nav>
  )
}

export default Nav
