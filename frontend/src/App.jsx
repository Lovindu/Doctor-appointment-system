import React from 'react';
import './App.css';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Search from './pages/Search';
import {BrowserRouter, Routes, Route} from 'react-router';
import Login from './pages/Login';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import Appointments from './pages/Appointments';
import ConfirmAppointment from './pages/ConfirmAppointment';
import DoctorDetails from "./pages/DoctorDetails";
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import Admindoc from "./admin/Admindoc";
import MyAppointments from './pages/MyAppointments';
import DoctorList from './admin/DoctorList';
import AddDoctor from './admin/AddDoctor';
import AdminSchedule from './admin/AdminSchedule';
import AdminPatient from './admin/Adminpatient';
import AdminDoc from './admin/Admindoc';
import AdminUsers from './admin/AdminUsers';
import Success from './pages/Success';
import Error from './pages/Error';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/search' element={<Search />}/>
          <Route path="/doctordetails/:doctorid" element={<DoctorDetails />} />
          <Route path='/contactus' element={<Contact />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/appointment/:id' element={<Appointments />} />
          <Route path='/confirmappointment/:id' element={<ConfirmAppointment />} />
          <Route path='/success' element={<Success />} />
          <Route path='/error' element={<Error />} />
          <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/myappointments' element={<MyAppointments />} />
          <Route path='/admin/doctorlist' element={<DoctorList />} />
          <Route path='/admin/adddoctor' element={<AddDoctor />} />
          <Route path='/admin/adminschedule' element={<AdminSchedule />} />
          <Route path='/admin/patient' element={<AdminPatient />} />
          <Route path='/admin/doctor' element={<AdminDoc />} />          
          <Route path='/admin/users' element={<AdminUsers/> }/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
