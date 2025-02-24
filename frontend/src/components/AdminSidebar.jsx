import React, { useState } from 'react';
import Back from '../assets/back.png';
import {NavLink} from 'react-router';

const AdminSidebar = ({active}) => {
  const [activeTab, setActiveTab] = useState(active);
  return (
    <div className='dashboard--sidebar'>
        <button className='dashboard--sidebar-collaps'><img src={Back} alt="collaps-icon" /></button>

        <div className='sidebar--items-container'>
          <div className={activeTab == "Dashboard" ? `dashboard--sidebar-item sidebar--active` : "dashboard--sidebar-item"}>
            <div></div>
            <NavLink className={active == "Dashboard" ? "dashboard--sidebar-link sidebar--active-text" : "dashboard--sidebar-link"} to="/admin/dashboard">Dashboard</NavLink>
          </div>

          <div className={activeTab == "DoctorList" ? `dashboard--sidebar-item sidebar--active` : "dashboard--sidebar-item"}>
          <div></div>
            <NavLink className={active == "DoctorList" ? "dashboard--sidebar-link sidebar--active-text" : "dashboard--sidebar-link"} to="/admin/doctorlist">Doctor List</NavLink>
          </div>

          <div className={activeTab == "AddDoctor" ? `dashboard--sidebar-item sidebar--active` : "dashboard--sidebar-item"}>
            <div></div>
            <NavLink className={active == "AddDoctor" ? "dashboard--sidebar-link sidebar--active-text" : "dashboard--sidebar-link"} to="/admin/adddoctor">Add Doctor</NavLink>
          </div>

          <div className={activeTab == "Appointment" ? `dashboard--sidebar-item sidebar--active` : "dashboard--sidebar-item"}>
            <div></div>
            <NavLink className={active == "Appointment" ? "dashboard--sidebar-link sidebar--active-text" : "dashboard--sidebar-link"} to="/admin/patient">Appointments</NavLink>
          </div>

          <div className={activeTab == "Users" ? `dashboard--sidebar-item sidebar--active` : "dashboard--sidebar-item"}>
            <div></div>
            <NavLink className={active == "Users" ? "dashboard--sidebar-link sidebar--active-text" : "dashboard--sidebar-link"} to="/admin/users">Users</NavLink>
          </div>

          <div className={activeTab == "Schedule" ? `dashboard--sidebar-item sidebar--active` : "dashboard--sidebar-item"}>
            <div></div>
            <NavLink className={active == "Schedule" ? "dashboard--sidebar-link sidebar--active-text" : "dashboard--sidebar-link"} to="/admin/adminschedule">Schedule Appointments</NavLink>
          </div>
        </div>

    </div>
  )
}

export default AdminSidebar

