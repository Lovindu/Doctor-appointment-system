import React from "react";
import Arrow from "../assets/arrow.png";
import "../pages/Home.css";

const HomeCategory = ({ category, description, imageUrl }) => {
  return (
    <div className="home-category--card">
      <div>
        <h2>{category}</h2>
        <p>{description}</p>
      </div>

      <div className="home-category--card-bottom">
        <button>
          <img src={Arrow} alt="arrow" />
        </button>
        <img src={imageUrl} alt="category-icon" />
      </div>
    </div>
  );
};

export default HomeCategory;
