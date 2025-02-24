import React, { useState } from "react";
import "./Adminpatient.css";
import AdminNav from '../components/AdminNav';
import AdminSidebar from '../components/AdminSidebar';
import { useNavigate } from "react-router";
import useFetch from "../hooks/useFetch";

const AdminPatient = () => {
  const [activeTab, setActiveTab] = useState("patient");
  const [searchQuery, setSearchQuery] = useState("");

  const {data, error, loading} = useFetch("http://localhost:3000/api/appointment/allappointments");

  const navigate = useNavigate();

  const handleTabSwitch = () => {
      navigate("/admin/doctor");
  };

/* 
  const filteredSessions = Sessions.filter((session) =>
    session.name.toLowerCase().includes(searchQuery.toLowerCase())
  ); */

  return (
    <div className="container">
      <AdminNav />
      <div className="admin-patient-container">
        <AdminSidebar active="Appointment"/>
        <div className="admin-patient-container-right">

          <h2 className="heading">Sessions</h2>

          {/* Tabs */}
          <div className="tabs">
            <button
              className={`tab-button ${activeTab !== "patient" ? "active" : ""}`}
              onClick={handleTabSwitch}
            >
              By Doctor
            </button>
            <button
              className={`tab-button ${activeTab === "patient" ? "active" : ""}`}
            >
              By Patient
            </button>
          </div>

          {/* Search Bar */}
          <div className="search-bar">
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Type doctor's name"
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <img src="/search.png" alt="Search" className="search-icon" />
            </div>
          </div>

          {/* Table */}
          <table className="sessions-table">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Number</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((appointment) => {
                  return <PatientCard 
                    key={appointment._id}
                    patientId={appointment.userId}
                    number={appointment.appointmentNumber}
                    doctorId={appointment.doctorId}
                    sesId={appointment.sessionId}
                  />
                })
              }
            </tbody>
          </table>
        </div>
      </div>



    </div>
  );
};

export default AdminPatient;


const PatientCard = ({patientId, number, doctorId, sesId}) => {
  const {data: userData} = useFetch(`http://localhost:3000/api/user/getuser/${patientId}`);
  const {data: doctorData} = useFetch(`http://localhost:3000/api/doctor/specificdoctor/${doctorId}`);
  const {data: sessionData} = useFetch(`http://localhost:3000/api/session/getsinglesession/${sesId}`);

  return (
  <tr>
    <td>
      <div className="patient-info">
{/*         <img
          src={patient.image}
          alt={patient.name}
          className="patient-image"
        /> */}
        {userData.name}
      </div>
    </td>
    <td>{doctorData.name}</td>
    <td>{sessionData.date}</td>
    <td>{number}</td>
    <td className={`payment-status`}>
      Done
    </td>
  </tr>
  )
}

