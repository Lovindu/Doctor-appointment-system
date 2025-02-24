import React, { useState } from "react";
import "./Admindoc.css";
import { useNavigate } from "react-router";
import AdminNav from "../components/AdminNav";
import AdminSidebar from "../components/AdminSidebar";
import useFetch from "../hooks/useFetch";

const Admindoc = () => {
  const [activeTab, setActiveTab] = useState("doctor");
  const [searchQuery, setSearchQuery] = useState("");

  const {data, error, loading} = useFetch("http://localhost:3000/api/session/allsessions");

  const navigate = useNavigate();

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    if(tab==="patient"){
      navigate("/admin/patient");
    }
  };

  const sessions = [
    
  ];

  // Filter sessions based on the search query
  const filteredSessions = sessions.filter((session) =>
    session.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
        <AdminNav></AdminNav>
        <div className="admin-doctor-container">
            <AdminSidebar active="Appointment"/>
            <div className="admin-doctor-details">

              <h2 className="heading">Sessions</h2>

              {/* Tabs */}
              <div className="tabs">
                <button
                  className={`tab-button ${activeTab === "doctor" ? "active" : ""}`}
                >
                  By Doctor
                </button>
                <button
                  className={`tab-button ${activeTab === "patient" ? "active" : ""}`}
                  onClick={() => handleTabSwitch("patient")}
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
                  <img src="/images/search.png" alt="Search" className="search-icon" />
                </div>
              </div>

              {/* Table */}
              <table className="sessions-table">
                <thead>
                  <tr>
{/*                     <th>ID</th> */}
                    <th>Doctor's name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>No of appointments</th>
                  </tr>
                </thead>
                <tbody>

                  {data.map((session) => {
                    return <DoctorSessions 
                      key={session._id}
                      docId={session.doctorId}
                      time={session.time}
                      date={session.date}
                      appointments={session.numberOfAppointments}
                    />
                  })}
                </tbody>
              </table>
            </div>
        </div>
    </div>
  );
};

export default Admindoc;

const DoctorSessions = ({docId, date, time, appointments}) => {
  const {data: doctorData} = useFetch(`http://localhost:3000/api/doctor/specificdoctor/${docId}`)

  return(
    <tr>
      <td>
        <div className="doctor-info">
          {/* <img
            src={session.image}
            alt={session.name}
            className="doctor-image"
          /> */}
          {doctorData.name}
        </div>
      </td>
      <td>{date}</td>
      <td>{time}</td>
      <td>{appointments}</td>      
    </tr>
  )
}