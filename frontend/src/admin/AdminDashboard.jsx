import React, { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import AdminSidebar from "../components/AdminSidebar";
import Image from "../assets/home-person.png";
import useFetch from "../hooks/useFetch";

const AdminDashboard = () => {
  const {loading: loading1, error: error1, data: docCount} = useFetch("http://localhost:3000/api/doctor/getdoctorcount");
  const {loading: loading2, error: error2, data: userCount} = useFetch("http://localhost:3000/api/user/usercount");
  const {loading: loading3, error: error3, data: appointmentCount} = useFetch("http://localhost:3000/api/appointment/appointmentcount");
  const {loading: loadingToday, error: errorToday, data: todaysSessions} = useFetch("http://localhost:3000/api/session/sessionstoday");
  const {loading :loadingTomorrow, error: errorTomorrow, data: tomorrowSessions} = useFetch("http://localhost:3000/api/session/sessionstomorrow");
  
  console.log(docCount)
  console.log(userCount)
  console.log(appointmentCount)
  if(!loadingToday) console.log(todaysSessions)
  console.log(tomorrowSessions)

  return (
    <div className="admin--dashboard">
      <AdminNav />

      <div className="dashboard--container">
        <AdminSidebar active={"Dashboard"}/>

        <div className="dashboard--container-right">
          <h1>Dashboard</h1>
          <div className="dashboard--container-cards">
            <DashboardCard 
              count={docCount.doctorCount}
              text={"Current Doctor Count"}
            />
            <DashboardCard 
              count={appointmentCount.appointmentsCount}
              text={"Current Appointment Count"}
            />
            <DashboardCard 
              count={userCount.usersCount}
              text={"Current User Count"}
            />
          </div>

          <div className="dashboard--container-appointments">
            <div className="dashboard--container-apps">
              <h3>Appointmnts Today</h3>
              <p>No of appointments</p>

              <div className="dashboard--container-apps-items">
                {todaysSessions.map(item => {
                  return <DashboardAppointment
                    key={item._id}
                    docId={item.doctorId}
                    count={item.numberOfAppointments}
                    time={item.time}
                  />

                })}
              </div>
            </div>

            <div className="dashboard--container-apps">
              <h3>Appointments Tomorrow</h3>
              <p>No of appointments</p>

              <div className="dashboard--container-apps-items">
              {tomorrowSessions.map(item => {
                  return <DashboardAppointment
                    key={item._id}
                    docId={item.doctorId}
                    count={item.numberOfAppointments}
                    time={item.time}
                  />

                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

const DashboardCard = ({count, text}) => {
  return (
    <div className="dashboardCard">
      <img src="/images/current-users.png" alt="icon" />
      <p className="dashboardCard--count">{count}</p>
      <p className="dashboardCard--description">{text}</p>
    </div>
  );
};

const DashboardAppointment =  ({docId, time, count}) => {
  const [id, setID] = useState(docId);
  const [doctorData, setDoctorData] = useState();

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch(`http://localhost:3000/api/doctor/specificdoctor/${docId}`);
              const result = await response.json();
              setDoctorData(result);
          } catch (error) {
              console.error('Error fetching doctor data:', error);
          }
      };

      if (docId) {
          setID(docId);
          fetchData();
      }
  }, [docId]);

  return (
    <div className="dashboard--app-card">
      <div className="dashboard--app-card-left">
        <div className="dashboard--app-card-img">
          <img src={Image} alt="doctor-image" />
        </div>

        <div className="dashboard--app-card-text">
          <p>Dr. {doctorData ? doctorData.name: "Name not available"}</p>
          <p>Time: {time}</p>
        </div>
      </div>

      <div className="dashboard--app-card-right">
        <p>{count}</p>
      </div>
    </div>
  );
};
