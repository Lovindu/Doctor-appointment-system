import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router"; 
import "../pages/DoctorDetails.css"; 
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Image from '../images/doctor_image.png';
import useFetch from "../hooks/useFetch";
 
const DoctorDetails = () => {
  const {doctorid} = useParams();
  console.log(doctorid);

  const {error, loading, data} = useFetch(`http://localhost:3000/api/doctor/specificdoctor/${doctorid}`);
  console.log(data);

  return (
    <div className="doctor-details">
      <Nav />

      <div className="doctor-details-container">
        <div className="doctordetails-left">
          <div className="doctordetails-image">
            <img src={Image} alt="" />
          </div>
          <h3>Dr. {data.name}</h3>
          <p>Specialization: {data.speciality}</p>
          <NavLink to={`/appointment/${doctorid}`} className="doctordetails-button"><button>Book an appointment</button></NavLink>
        </div>

        <div className="doctordetails-right">
          <div>
            <h3>Description:</h3>
            <p>{data.about}</p>
          </div>

          <div>
            <h3>Qualifications</h3>
            <p>{data.education}</p>
          </div>

          <div>
            <h3>Experience:</h3>
            <p>{data.experience} years</p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default DoctorDetails;
