


import React, { useEffect, useState } from 'react';
import Footer from '../Widgets/Footer';
import PageHeader from '../Widgets/PageHeader';
import Header from '../Widgets/Header';

import { Link, useNavigate } from "react-router-dom"
import { dashboard, loginRoute,signup } from '../constent/Routes';

import { LoginValid } from '../validations/LoginValid';
import { register, isEmailExist, changePassword } from '../services/Login';
import { role } from "../constent/Enum"
import { getWeb3AuthNearInstance } from './web3auth';
import { toast } from 'react-toastify';
import { ChangePasswordValid } from '../validations/ChangePasswordValid';
import SignUp from './SignUp';


const ChangePassword = () => {

    const navigate = useNavigate();
    const [passwordShow, setPasswordShow] = useState({
      eye: "fa-eye-slash",
      type: "password",
    });
  
    const [formData, setFormData] = useState({
      current_password: "",
      new_password: "",
      confirm_new_password: "",
    });
  
    const [formDataErr, setFormDataErr] = useState({
      current_password: "",
      new_password: "",
      confirm_new_password: "",
    });
  
    const showPassword = (field) => {
      setPasswordShow((prev) => ({
        eye: prev.type === "password" ? "fa-eye" : "fa-eye-slash",
        type: prev.type === "password" ? "text" : "password",
      }));
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
  
      // Validate input on change
      const validationError = ChangePasswordValid(
        name,
        value,
        formData.new_password,
        formData.confirm_new_password
      );
      console.log(validationError,"jjjj")
      setFormDataErr((prevErr) => ({
        ...prevErr,
        [validationError.name]: validationError.error,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Validate all fields before submission
      let hasError = false;
      for (const field in formData) {
        const validationError = ChangePasswordValid(
          field,
          formData[field],
          formData.new_password,
          formData.confirm_new_password
        );
        if (validationError.error) hasError = true;
  
        setFormDataErr((prevErr) => ({
          ...prevErr,
          [validationError.name]: validationError.error,
        }));
      }
  
      if (hasError) return;
  
   
      const token = localStorage.getItem("jwtToken");
      const response = await changePassword(formData,token); 
      if (response.success) {
        toast.success(response.message);
        navigate(signup); 
      } else {
        toast.error(response.message);
      }
    };
  




    return (
      <>
      <Header />
      <PageHeader title="Change Password" text="Change Password" />
      <section className="account padding-top padding-bottom sec-bg-color2">
        <div className="container">
          <div
            className="account__wrapper"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <div className="row g-4">
              <div className="col-12">
                <div className="account__content account__content--style1">
                  <div className="account__header">
                    <h2>Change Your Password</h2>
                    <p>Join the community and start saving together.</p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="row g-4">
                      <div className="col-12">
                        <div className="form-pass">
                          <label htmlFor="currentPassword" className="form-label">
                            Current Password
                          </label>
                          <input
                            type={passwordShow.type}
                            className="form-control showhide-pass"
                            id="currentPassword"
                            placeholder="Current Password"
                            name="current_password"
                            value={formData.current_password}
                            onChange={handleChange}
                          />
                          <button
                            type="button"
                            className="form-pass__toggle"
                            onClick={showPassword}
                          >
                            <i className={`fa ${passwordShow.eye}`}></i>
                          </button>
                          {formDataErr.current_password && (
                            <span style={{ color: "red" }}>
                              {formDataErr.current_password}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-pass">
                          <label htmlFor="newPassword" className="form-label">
                            New Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="newPassword"
                            placeholder="New Password"
                            name="new_password"
                            value={formData.new_password}
                            onChange={handleChange}
                          />
                          {formDataErr.new_password && (
                            <span style={{ color: "red" }}>
                              {formDataErr.new_password}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-pass">
                          <label
                            htmlFor="confirmPassword"
                            className="form-label"
                          >
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            placeholder="Confirm New Password"
                            name="confirm_new_password"
                            value={formData.confirm_new_password}
                            onChange={handleChange}
                          />
                          {formDataErr.confirm_new_password && (
                            <span style={{ color: "red" }}>
                              {formDataErr.confirm_new_password}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="trk-btn trk-btn--border trk-btn--primary d-block mt-4"
                    >
                      Change Password
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="account__shape">
          <span className="account__shape-item account__shape-item--1">
            <img src="/images/contact/4.png" alt="shape-icon" />
          </span>
        </div>
      </section>
      <Footer />
    </>
      );
    }

export default ChangePassword