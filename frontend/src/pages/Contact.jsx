import React from 'react'
import Nav from '../components/Nav'; 
import Footer from '../components/Footer';
import "./Contact.css"


const Contact = () => {
    return (
      <div>
        <Nav />
  
     
        <div className="contact-page">
          {/* Contact Information */}
          <div className="contact-info">
            <div className="contact-item">
              <img src="src/assets/phone.png" alt="Phone Icon" className="icon" />
              <div className="contact-text">
                <h1>Contact Number</h1>
                <p>+94 77 1234567</p>
              </div>
            </div>
            <div className="contact-item">
              <img src="src/assets/email.png" alt="Email Icon" className="icon" />
              <div className="contact-text">
                <h1>Email</h1>
                <p>info@bookmydoc.com</p>
              </div>
            </div>
            <div className="contact-item">
              <img src="src/assets/map.png" alt="Map Icon" className="icon" />
              <div className="contact-text">
                <h1>Address</h1>
                <p>123/A, Street, City</p>
              </div>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509147!2d144.95373501531594!3d-37.81627944202113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577ed9f58e259ba!2s123%20Example%20St%2C%20City!5e0!3m2!1sen!2sus!4v1691514997368!5m2!1sen!2sus"
              width="100%"
              height="150"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Location"
            ></iframe>
          </div>
  
          {/* Contact Form */}
          <div className="contact-form">
            <h2>Contact Us</h2>
            <form className='contactus--form'>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input className='contact-input' type="text" id="name" name="name" placeholder="" />
                </div>
                <div className="form-group">
                  <label htmlFor="contact">Contact</label>
                  <input className='contact-input' type="text" id="contact" name="contact" placeholder="" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input className='contact-input' type="email" id="email" name="email" placeholder="" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input className='contact-input' type="text" id="subject" name="subject" placeholder="" />
                </div>
              </div>
              <button type="submit" className='contactus--button'>Submit</button>
            </form>
          </div>
        </div>
  
        <Footer />
      </div>
    );
  };
  
  export default Contact;
