import React, { useContext, useState } from 'react';
import '../pages/Appointments.css';
import { NavLink } from 'react-router';
import { AuthContext } from '../context/AuthContext';

const AppointmentCard = ({time, fee, noOfAppointments, date, sessionID}) => {
  const [id, setID] = useState(sessionID);
  const dateTime = date;
  const dateOnly = dateTime.split("T")[0];
  const {user} = useContext(AuthContext);

  return (
    <div className='appointment--card'>
        <span></span>

        <p id='first-text'>Monday, <br /> {dateOnly}</p>

        <p>Time <br /> <span className='appointment--card-green'>{time}</span></p>

        <p>Current appointments <br /> <span className='appointment--card-green'>{noOfAppointments}</span></p>

        <p>Fee <br /> <span className='appointment--card-red'>Rs.{fee}</span></p>

        <NavLink to={user ? `/confirmappointment/${id}` : "/login"}>
            <button className='appointment--card-btn'>Book</button>
        </NavLink>
        
    </div>
  )
}

export default AppointmentCard
