import React from 'react';
import './DoctorList.css';
import AdminNav from '../components/AdminNav';
import AdminSidebar from '../components/AdminSidebar';
import HomePersonImg from '../assets/home-person.png';
import useFetch from "../hooks/useFetch";


const DoctorList = () => {
  const {data, error, loading} = useFetch("http://localhost:3000/api/doctor/alldoctors");

  console.log(data);

  return (
    <div className="dashboard-container">
      <AdminNav />
      <div className="dashboard-content">
        <section className="dashboard-main">
          <div className="content-container">
            <h2>Doctors List</h2>
            <div className="container">
              <div className="header">
                <input type="text" placeholder="Search" />
                <select>
                  <option value="">Select Category</option>
                </select>
              </div>
              <table> 
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Upcoming Sessions</th>
                    <th>Sessions Done</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.map((doctor) => {
                      return <TableRow 
                        key={doctor._id}
                        name={doctor.name}
                        docId={doctor._id}
                        image= {doctor.image}
                      />
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <aside className="dashboard-sidebar">
          <AdminSidebar active="DoctorList" />
        </aside>
      </div>
    </div>
  );
};

export default DoctorList;


const TableRow = ({name, docId, image}) => {
  const {data: activeSessions} = useFetch(`http://localhost:3000/api/session/getactivesessions/${docId}`);
  const {data: oldSessions} = useFetch(`http://localhost:3000/api/session/getoldsessions/${docId}`);
  
  return (
    <tr>
                        <td>
                          <img
                            src={image ? image : "/images/doctor.png"}
                            alt="Doctor"
                            className="doctor-img"
                          />
                          Dr. {name}
                        </td>
                        <td>{oldSessions}</td>
                        <td>{activeSessions}</td>
                        <td>
                          <button className="view-more-btn">View more</button>
                        </td>
                      </tr>
  )

}
