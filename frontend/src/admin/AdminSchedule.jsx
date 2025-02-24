import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminNav from "../components/AdminNav";
import "./AddDoctor.css";
import useFetch from "../hooks/useFetch";
import axios from "axios";

function AdminSchedule() {
    const [details, setDetails] = useState({
        doctorId: undefined,
        maximumAppointmentCount: undefined,
        time: undefined,
        date: undefined
    })

    const [search, setSearch] = useState("");
    const [doctorName, setDoctorName] = useState("");

    const {data, error, loading} = useFetch("http://localhost:3000/api/doctor/alldoctors");
    console.log(data);

    const handleChange = (e) => {
        setDetails(prev => ({...prev, [e.target.name]: e.target.value}));

        if(e.target.name === "name") {
            setSearch(e.target.value);
        }
    }

    console.log(details)

    const filterDoctors = (searchString, doctors) => {
        if(!searchString) return doctors;
        return doctors.filter((doctor) =>
          doctor.name.toLowerCase().includes(searchString.toLowerCase())
        );
      }
    
    const filteredDoctors = filterDoctors(search, data);
    console.log(search);

    const handleDoctorId = (id, name) => {
        setDetails({doctorId: id});
        setSearch("");
        setDoctorName(name);
    }

    const handleSubmit = async () => {
        try{
            const response = await axios.post("http://localhost:3000/api/session/createsession", details);
            alert("Form submitted successfully!!");
            console.log("Form submitted successfully with data:", response);
        } catch(err) {
            console.log(err.message);
        }
    }

  return (
    <div>
        <AdminNav/>
        <div className="app-container">
            <AdminSidebar active="Schedule"/>
            <div className="content">
                <header className="header">
                    <h2>Schedule appointments</h2>
                </header>
                <main>
                <div className="form-container">
                    <form className="appointment-form">
                    <div className="form-row">
                        <div className="form-group form--group-doctor-search">
                            <label>Doctor</label>
                            <input type="text" placeholder="Doctor Name" name="name" defaultValue={doctorName ? doctorName : ""} onChange={handleChange} />
                            <div className="form-group-selector">
                                {search !== "" ? filteredDoctors.map((doc) => {
                                    return<div onClick={() => handleDoctorId(doc._id, doc.name)} key={doc._id}>
                                            <img src={doc.image ? doc.image : "/images/doctor.png"} alt="doctor-image" />
                                            <h3>Dr. {doc.name}</h3>
                                        </div>
                                })
                                    : ""
                                }
                                {/* <div>
                                    <img src="/images/doctor.png" alt="doctor-image" />
                                    <h3>Dr. Name</h3>
                                </div> */}
                            </div>
                        </div>
                        <div className="form-group">
                        <label>Maximum appointments</label>
                        <input type="number" placeholder="Enter max appointments" name="maximumAppointmentCount" onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                        <label>Time</label>
                        <input type="time" name="time" onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                        <label>Date</label>
                        <input type="date" name="date" onChange={handleChange}/>
                        </div>
                    </div>
                    <button type="submit" className="submit-button" onClick={handleSubmit}>
                        Create appointment
                    </button>

                    <p className="selected--doctor-name">{doctorName ? `Selected doctor: Dr.${doctorName}` : ""}</p>
                    </form>
                </div>
                </main>
            </div>
        </div>
    </div>
  );
}

export default AdminSchedule;