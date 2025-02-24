import React, { useContext, useState } from 'react';
import Nav from '../components/Nav'; 
import Footer from '../components/Footer';
import './Profile.css'; 
import profile from '../assets/profile.png'
import { NavLink, useFetcher } from 'react-router'
import { AuthContext } from '../context/AuthContext';
import axios from "axios";
import useFetch from "../hooks/useFetch";

const Profile = () => {
  const {user} = useContext(AuthContext);

  const {data, loading, error} = useFetch(`http://localhost:3000/api/user/getuser/${user._id}`)
  console.log(data)

  const [updateCredentials, setUpdateCredentials] = useState({
    name: data.name || undefined,
    contactNumber: data.contactNumber || undefined,
    email: data.email || undefined,
    nic: data.nic || undefined,
    address: data.address || undefined
  })


/*   const [changedPassword, setChangedPassword] = useState({
    password: undefined,
    newPassword: undefined,
  })

  const [newPassword, setNewPassword] = useState(""); */

  console.log(updateCredentials);

  const handleChange = (e) => {
    setUpdateCredentials(prev => ({...prev, [e.target.name]: e.target.value}));
  }

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/user/updateuser/${user._id}`, updateCredentials);
      console.log(response);
      alert("Your profile data updated successfully");
      window.location.reload(false);
    } catch(err) {
      console.log(err.message);
    }
  }

/*   const handleCurrentPassword = (e) => {
    setChangedPassword({
      password: e.target.value
    })
  }

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  }
  
  const handleConfirmPassword = (e) => {
    if(newPassword == e.target.value) {
      setChangedPassword({
        newPassword: e.target.value
      })
    }
  }

  console.log(setChangedPassword) */

  return (
    <div>
      <Nav />
      <main className="profile-main">
        <aside className="profile-sidebar">
          <ul>
            <li>
              <a href="#" className="active-20">Profile</a>
            </li>
            <li>
            <NavLink to="/myappointments" className="active-20">My Appointments</NavLink>
            </li>
          </ul>
        </aside>
        <section className="profile-section-20">
          <div className="profile-image-20">
            <img src={profile} alt="Profile" />
            <button className="profile-button-20">Edit image</button>
          </div>
          <form className="form-20">
            <div className="personal-info-border-20">
              <div className="personal-info-20">
                <h2>Personal Information</h2>
                <div className="input-group-20">
                  <div className="input-box-20">
                    <label htmlFor="name">Name</label>
                    <input className='profile-input' type="text" id="name" name='name' defaultValue={data.name || ""}  onChange={handleChange}/>
                  </div>
                  <div className="input-box-20">
                    <label htmlFor="contact">Contact Number</label>
                    <input className='profile-input' type="text" id="contact" name='contactNumber' defaultValue={data.contactNumber || ""} onChange={handleChange} />
                  </div>
                </div>
                <div className="input-group-20">
                  <div className="input-box-20">
                    <label htmlFor="email">Email</label>
                    <input className='profile-input' type="email" id="email" name='email' defaultValue={data.email || ""} onChange={handleChange} />
                  </div>
                  <div className="input-box-20">
                    <label htmlFor="nic">NIC</label>
                    <input className='profile-input' type="text" id="nic" name='nic' defaultValue={data.nic || ""} onChange={handleChange} />
                  </div>
                </div>
                <div className="input-box-20">
                  <label htmlFor="address">Address</label>
                  <input
                    className='profile-input'
                    type="text"
                    id="address"
                    name='address'
                    defaultValue={data.address || ""}
                    style={{ width: '100%' }}
                    onChange={handleChange}
                  />
                <button className="update-btn" onClick={updateProfile}>Update Personal Information</button>
                </div>
              </div>
            </div>
            <div className="security-info-20">
              <h2>Security</h2>
              <div className="input-box-20">
                <label htmlFor="current-password">Current password</label>
                <input className='profile-input' type="password" id="current-password"/>
                <label htmlFor="new-password">New password</label>
                <input className='profile-input' type="password" id="new-password"/>
                <label htmlFor="confirm-password">Confirm password</label>
                <input className='profile-input' type="password" id="confirm-password"/>
              </div>
              <button className="update-btn" >Update Password</button>
            </div>
          </form>
        </section>
      </main>
      <Footer/>
    </div>
  );
};

export default Profile;
