import React, { useEffect, useState } from 'react';
import Footer from '../Widgets/Footer';
import PageHeader from '../Widgets/PageHeader';
import Header from '../Widgets/Header';

import { Link, useNavigate } from "react-router-dom"
import { dashboard, loginRoute } from '../constent/Routes';

import { LoginValid } from '../validations/LoginValid';
import { register, isEmailExist, forgotPassword } from '../services/Login';
import { role } from "../constent/Enum"
import { InputValid } from '../validations/InputValid';
import { toast } from 'react-toastify';



const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    const err = InputValid(name, value)
    setEmailError(err)
    setEmail(value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    let checkEmail = InputValid("email", email);

    setEmailError(checkEmail);
    if (checkEmail !== "") {
      return false;
    }
    let data = { email }
    const resp = await forgotPassword(data)
    if (resp.success) {
      toast.success(resp.message)
      navigate(loginRoute)
    } else {
      toast.error(resp.message);

    }

  }

  return (
    <>
 
      <PageHeader title="Forgot Password" text="Forgot Password" />
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
                    <h2>Reset Your Password</h2>
                    <p>
                      Hey there! Forgot your password? No worries, just click "forgot password"
                      and follow the steps to recover it. Easy peasy lemon squeezy!
                    </p>
                  </div>



                  <form
                    // className="account__form needs-validation"
                    onSubmit={handleSubmit}
                  >
                    <div className="row g-4">


                      <div className="col-12">
                        <div>
                          <label htmlFor="account-email" className="form-label">
                            Email
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="account-email"
                            placeholder="Enter your email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                          />

                        </div>{emailError && <span className='' style={{ color: "red" }}>{emailError}</span>}
                      </div>


                    </div>

                    <button
                      type="submit"
                      className="trk-btn trk-btn--border trk-btn--primary d-block mt-4"
                    >
                      Reset password
                    </button>
                  </form>

                  <div className="account__switch">
                    <p>
                      Back to Login <Link to={loginRoute}>Login</Link>
                    </p>
                  </div>
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
    
    </>
  );
}

export default ForgotPassword