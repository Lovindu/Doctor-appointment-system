import React from 'react';
import "./Success&Error.css";
import {NavLink} from "react-router";

const Error = () => {
  return (
    <div className='payment--error'>
        <div className='error--container'>
            <img src="/images/error.png" alt="error icon" />
            <h1>Error in Payment!</h1>
            <NavLink className="back--to-home-link" to="/">
                <button className='back--to-home'>Back to home</button>
            </NavLink>
        </div>
    </div>
  )
}

export default Error
