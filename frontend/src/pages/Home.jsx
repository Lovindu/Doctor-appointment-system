import React, { useContext, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { NavLink, useNavigate } from "react-router";
import HomePersonImg from "../assets/home-person.png";
import "./Home.css";
import HomeCategory from "../components/HomeCategory";
import cardData from "../data.json";
import useFetch from "../hooks/useFetch";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const {data, error, loading} = useFetch("http://localhost:3000/api/doctor/gettopdoctors");

  const {user} = useContext(AuthContext);
  console.log(data);

  return (
    <div>
      <Nav />

      <div className="home--top">
        <div>
          <h1>
            Your Health, <br /> Just a Click Away
          </h1>

          <div className="home--top-list">
            <p>Find and book the best doctors near you in minutes</p>

            <p>✔️ Hassle-Free Scheduling</p>
            <p>✔️ Verified Medical Experts</p>
            <p>✔️ Personalized Care Options</p>
          </div>

          <NavLink to="/search">
            <button className="home--top-button">Book an appointment</button>
          </NavLink>
        </div>

        <div className="home--top-right">
          <img src={HomePersonImg} alt="home-person" />
        </div>
      </div>

      <div className="home--category">
        <h1>Top Specialist Categories</h1>
        <hr />

        <div className="home--category-container">
          {cardData.map((data) => {
            return (
              <HomeCategory
                key={data.id}
                category={data.title}
                description={data.description}
                imageUrl={data.image}
              />
            );
          })}
        </div>
      </div>

      <div className="home--topdoctors">
        <h1>Top Doctors</h1>
        <hr />

        <div className="home--topdoctors-container">
          {data.map((item => {
            return <TopDoctors 
              key={item._id}
              name={item.name}
              itemID={item._id}
              category={item.speciality}
              image={item.image}
            />
          }))}
{/*           <TopDoctors />
          <TopDoctors />
          <TopDoctors />
          <TopDoctors />
          <TopDoctors />
          <TopDoctors />
          <TopDoctors /> */}
        </div>
      </div>

      {
        user ? "" : 
        <section className="home--createaccount">
        <div className="home--createaccount-details">
          <h1>Create Your Account for Seamless Healthcare</h1>
          <p>
            Join us to easily book appointments, manage your health records, and
            stay connected with trusted doctors. <br />
            Start your journey to better health today!
          </p>

          <NavLink to="/signin">
            <button className="home--createaccount-details-btn">
              Create an account
            </button>
          </NavLink>
        </div>

        <img src="/images/createaccount-img.png" alt="" />
      </section>
      }
      {/* Home page */}
      <Footer />
    </div>
  );
};

export default Home;

const TopDoctors = ({name, category, itemID, image}) => {
  const navigate = useNavigate();
  const [id, setID] = useState(itemID);

  const handleNavigate = () => {
    navigate(`/doctordetails/${id}`);
  }

  return (
    <div className="home--topdoctors-card" onClick={handleNavigate}>
      <div>
        <img src={image ? image : "/images/doctor.png"} alt="" />
        <input type="hidden"/>
      </div>

      <h3>{name}</h3>
      <p>{category}</p>
    </div>
  );
};
