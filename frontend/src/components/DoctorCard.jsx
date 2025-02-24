import React, { useEffect, useState } from "react";
import { NavLink } from "react-router"; 
import DoctorImage from "../images/doctor_image.png"; 
import axios from "axios";
 
const DoctorCard = ({name, Speciality, docID, image}) => {
  const [id, setID] = useState(docID);

/*   useEffect(() => {
    const fetchData = () => {
      try {
        let results = axios.get(`http://localhost:3000/api/doctor//specificdoctor/${id}`);
        setData(results);
      } catch(err) {
        console.log(err);
      }
    }

    fetchData();
  }, [docID]) */

  return (
    <div className={`doctor-card`}>
      <div className="doctor-card-image">
        <img src={image ? image : "/images/doctor.png"} alt="doctor-image" />
      </div>
      <h4>{name}</h4>
      <p>{Speciality}</p>
      
      <NavLink to={`/appointment/${id}`} className="view-details">
        View Details
      </NavLink>
    </div>
  );
};

export default DoctorCard;

