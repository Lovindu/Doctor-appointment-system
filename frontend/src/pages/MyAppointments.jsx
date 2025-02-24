import React, { useContext, useEffect, useState } from 'react';
import Nav from '../components/Nav'; 
import Footer  from '../components/Footer';
import './MyAppointments.css'; 
import HomePersonImg from "../assets/home-person.png";
import { NavLink } from 'react-router'; 
import useFetch from "../hooks/useFetch";
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const MyAppointments = () => {

  const {user} = useContext(AuthContext);

  const {data, loading, error} = useFetch(`http://localhost:3000/api/appointment/userappointments/${user._id}`);

  console.log(data);

  const [appointments, setAppointments] = useState(data);

  return (
    <div>
      <Nav /> 
      <main>
        <aside className="aside-20">
          <ul className="aside-ul-20">
            <li>
              <NavLink to="/profile" activeClassName="active-20">
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="/myappointments" activeClassName="active-20">
                My Appointments
              </NavLink>
            </li>
          </ul>
        </aside>
        <section className="appointments-section-20">
          <h2 className="appointments-title-20">My Appointments</h2>
          {data.map((item) => (
              <MyAppointmentsCard
                key={item._id}
                docID={item.doctorId}
                appId={item._id}
                number={item.appointmentNumber}
                sessionId={item.sessionId}
              />
          ))}
        </section>
      </main>
      <Footer/>
    </div>
  );
};

export default MyAppointments;

const MyAppointmentsCard = ({number, appId, docID, sessionId}) => {

  const {data: sessionData} = useFetch(`http://localhost:3000/api/session/getsinglesession/${sessionId}`);
  const {data: doctorData} = useFetch(`http://localhost:3000/api/doctor/specificdoctor/${docID}`);

  console.log(sessionData)
  console.log(doctorData)

  const handleCancel = async () => {
    try{
      const response = axios.delete(`http://localhost:3000/api/appointment/deleteappointment/${appId}`);
      console.log(response);
      alert("Appointment cancelled successfully");
      window.location.reload(false);
    } catch(error){
      console.log(error.message);
    }
  }

  return(
    <div className="appointment-20">
              <img
                src="/images/doctor.png"
                alt="Doctor"
                className="doctor-image-20"
              />
    <div className="details-20">
      <h3>Dr.{doctorData.name}</h3>
      <p id="doctor-details-20"></p>
      <p>Date: {sessionData.date}</p>
      <p>Amount paid: {sessionData.fee}</p>
    </div>
    <div className="right-side-20">
      <p>Number</p>
      <h3>{number}</h3>
      <button className="cancel-button-20" onClick={handleCancel}>Cancel Appointment</button>
    </div>
  </div>
  )
}
