import React, { useState } from 'react';
import './Appointments.css';
import Nav from '../components/Nav';
import Person from '../assets/home-person.png';
import { NavLink, useNavigate, useParams } from 'react-router';
import AppointmentCard from '../components/AppointmentCard';
import Footer from '../components/Footer';
import useFetch from '../hooks/useFetch';

const Appointments = () => {
  let {id} = useParams();
  console.log(id)

  const {error, loading, data} = useFetch(`http://localhost:3000/api/doctor/specificdoctor/${id}`);
  console.log(data);

  const {error: error2, loading: loading2, data: sessionData} = useFetch(`http://localhost:3000/api/session/getrelatedsessions/${id}`);
  console.log(sessionData);

  const {erro: error3, loading: loading3, data: relatedDoctors} = useFetch(`http://localhost:3000/api/doctor//getdoctorbyspeciality/${data.speciality}`);
  console.log(relatedDoctors);

  return (
    <div>
      <Nav/>

      <section className="appointment--top">
         <div className='appointment--top-doctor'>
            <div className='appointment--doctor-image'>
              <img src={data.image ? data.image : Person} alt='doctor-image' />
            </div>

            <div className='appointment--doctor-details'>
              <h3>{data.name}</h3>
              <p>{data.education}</p>

              <p>Specialization: {data.speciality}</p>

              <NavLink to={`/doctordetails/${id}`}>
                <button className='appointment--doctor-details-btn'>View Profile</button>
              </NavLink>
              
              <p className='appointment--sessionsLeft'>Session this week: 04</p>  
            </div>
            
         </div>

         <div className='appointment--top-sessions'>
            <h1>Sessions</h1>
            <hr />
            {
              sessionData.length > 0 ? sessionData.map((item) => {
                return <AppointmentCard 
                  key={item._id}
                  sessionID={item._id}
                  fee={item.fee}
                  time={item.time}
                  date={item.date}
                  noOfAppointments={item.numberOfAppointments}
                />
              }) 
              :
              <p>No sessions available</p>
            }
         </div>

      </section>

      <section className='appointment--relatedDocs'>
        <h1>Related Doctors</h1>
        <hr />

        <div className='appointment--relatedDocs-container'>
          {
            relatedDoctors.map((doctor) => {
              if(doctor._id != data._id) {
              return <RelatedDoctor 
                key={doctor._id}
                docId={doctor._id}
                name={doctor.name}
                speciality={doctor.speciality}
                image={doctor.image}
              />
              }
            })
          }
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Appointments

const RelatedDoctor = ({name, speciality, docId, image}) => {
  const [id, setId] = useState(docId);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/doctordetails/${id}`)
  }

  return(
    <div className='relatedDoctor' onClick={handleNavigate}>
      <div>
        <img src={image ? image : Person} alt="doctor image" />
      </div>
      
      <h3>{name}</h3>
      <p>{speciality}</p>
    </div>
  )
}