import React, { useContext } from 'react';
import Logo from '../assets/logo.png';
import '../admin/Admin.css';
import { AdminAuthContext } from '../context/AdminAuthContext';
import { useNavigate } from 'react-router';

const AdminNav = () => {

  const {admin, dispatch} = useContext(AdminAuthContext);
  const navigate = useNavigate();

  const handleAdminLogout = () => {
    if(admin) {
      dispatch({type: "LOGOUT"});
      navigate("/admin/login");
    } else {
      console.log("no admin found")
    }
  }

  return (
    <div className='adminNav'>
        <div className='admin-navbar'>
            <div>
                <img src={Logo} alt="" />
                <p>Admin</p>
            </div>

            <button onClick={handleAdminLogout}>Logout</button>
        </div>
    </div>
  )
}

export default AdminNav
