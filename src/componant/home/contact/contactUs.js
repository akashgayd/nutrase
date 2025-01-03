import React from "react";
import { useState } from "react";
import "./contact.css";
import ContactImg from '../../../aseets/contact.jpg'
import { MdAttachEmail } from "react-icons/md";
import { FaPhoneSquare } from "react-icons/fa";

import Header from "../../common/header/Header";
import Footer from "../../common/Footer/footer";







const ContactUs = () => {


const name = "akashgaydhane@gmail.com";
const password = "akash1234";










  return (
    <>
    <Header/>
    <br/>
    
    
    <div className="contact-main-container">
      <div className="contact-content-cont">
        <div className="contact-left-cont">
          <div className="contact-left-cont-title">Get in Touch</div>
          <br />
          <div className="contact-left-cont-heading">
            Let's Chat, Reach Out to Us
          </div>
          <div className="contact-left-cont-small-head">
            Have question or feedback? We're here to help. Send us a message,
            and we'll respond within 24 hours.
          </div>
          <br />
          <form className="contact-detail-form">
            <div className="contact-detail-name-part">
              <div className="label-input-width">
                <label className="contact-label">First Name</label>
                <input
                  type="text"
                  className="contact-input"
                  placeholder="Enter your first name"
                />
              </div>
              <div className="label-input-width">
                <label className="contact-label">Last Name</label>
                <input
                  type="text"
                  className="contact-input"
                  placeholder="Enter your first name"
                />
              </div>
            </div>
            <br />
            <label className="contact-label">Email Address</label>
            <input
              type="email"
              className="contact-input"
              placeholder="Enter your Email"
            />
            <br />
            <label className="contact-label">City</label>
            <input
              type="text"
              className="contact-input"
              placeholder="Enter your City"
            />
            <br />
            <label className="contact-label">Message</label>
                <input
                  type="text"
                  className="contact-input msg"
                  placeholder="Leave us message"
                />
                <button type="submit" className="contact-submit-button">Submit</button>
          </form>
        </div>
        <div className="contact-right-cont">
            <img src={ContactImg} className="contact-right-image"/>
            <div className="contact-us-right-part">
                <div className="contact-us-email-part">
                    <div className="contact-email-icon">
                        <MdAttachEmail className="mail-icon"></MdAttachEmail>
                    </div>
                    <div className="contact-email-name-and-text">
                        <p className="mail-text">Email</p>
                        <p className="mail-text-part">info@yourwebsite.com</p>
                    </div>
                </div>
                <br/>
                <div className="contact-us-email-part">
                    <div className="contact-email-icon">
                        <FaPhoneSquare className="mail-icon"></FaPhoneSquare>
                    </div>
                    <div className="contact-email-name-and-text">
                        <p className="mail-text">Phone No.</p>
                        <p className="mail-text-part">+91 9800000000</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ContactUs;
