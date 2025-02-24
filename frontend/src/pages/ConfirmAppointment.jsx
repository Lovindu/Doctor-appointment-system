import React, { useContext, useEffect, useState } from 'react'
import Nav from '../components/Nav'
import Person from '../assets/home-person.png';
import "./Appointments.css";
import { redirect, useNavigate, useParams } from 'react-router';
import useFetch from '../hooks/useFetch';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const ConfirmAppointment = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    console.log(id);
    const {data, error, loading} = useFetch(`http://localhost:3000/api/session/getsinglesession/${id}`);
    console.log(data);
    const [doctorData, setDoctorData] = useState([]);
    const {user} = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (data.doctorId) {
                    const results = await axios.get(`http://localhost:3000/api/doctor/specificdoctor/${data.doctorId}`);
                    setDoctorData(results.data);
                }
            } catch (err) {
                console.log("Something went wrong!!", err);
            }
        };
        if (data) fetchData();
    }, [data]);

    const handlePay = () => {
        fetch("http://localhost:3000/api/payments/create-checkout-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: data._id,
                doctorId: doctorData._id,
                userId: user._id,
            })
        }).then(res => {
            if(res.ok) return res.json()
            return res.json().then(json => Promise.reject(json))
        }).then(({url}) => {
            window.location = url;
        }).catch(e => {
            console.error(e.error);
        })
    }

  return (
    <div className='confirmAppo'>
        <Nav />
        
        <div className='confirmAppo--details'>
            <div>
                <h1>Confirm Appointment</h1>
                <hr />
            </div>

             <div className='confirmAppo--container'>
                <div className='confirmAppo--container-left'>
                    <div>
                        <img src={Person} alt="" />
                    </div>

                    <h2>Dr. {doctorData.name}</h2>
                    <p>({doctorData.education})</p>
                    <p>Specialization: {doctorData.speciality}</p>
                </div>

                <div className='confirmAppo--container-right'>
                    <p>Date: <span className='confirmAppo-normal'>{data?.date?.split("T")[0]}</span></p>
                    <p>Time: <span className='confirmAppo-normal'>{data.time}</span></p>
                    <p>Number: <span className='confirmAppo-green'>{data.numberOfAppointments + 1}</span></p>
                    <p>Fee: <span className='confirmAppo-red'>Rs. {data.fee}</span></p>

                    <button onClick={handlePay}>Pay now</button>
                </div>
             </div>
        </div>
    </div>
  )
}

export default ConfirmAppointment
