import React from 'react';
import "./Success&Error.css";
import { NavLink } from 'react-router';

const Success = () => {
  return (
    <div className='payment--success'>
        <div className='success--container'>
            <img src="/images/success.png" alt="" />
            <h2>Payment is Successfull!</h2>
            <NavLink className="back--to-home-link" to="/">
                <button className='back--to-home-sc'>Back to home page</button>
            </NavLink>
        </div>
    </div>
  )
}

export default Success
