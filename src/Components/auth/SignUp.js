/* eslint-disable react/no-unescaped-entities */

import React, { useEffect, useState } from 'react';
import Footer from '../Widgets/Footer';
import PageHeader from '../Widgets/PageHeader';
import Header from '../Widgets/Header';

import { Link, useNavigate } from "react-router-dom"
import { dashboard, loginRoute } from '../constent/Routes';
import { toast } from 'react-toastify';
import { LoginValid } from '../validations/LoginValid';
import { register, isEmailExist } from '../services/Login';
import { role } from "../constent/Enum"
import { getWeb3AuthEVMInstance } from './web3auth';
import { useAuth } from '../../AuthContext';
const SignUp = () => {

  const { authenticated, login } = useAuth();
  const navigate = useNavigate()
  const [providerNear, setProviderNear] = useState(null);
  const [provider, setProvider] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);




  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    // phone: '',
    password: '', cPassword: ''
  });
  const [passwordShow, setPasswordShow] = useState({
    eye: "fa-eye-slash",
    type: "password",
  });

  const [formDataErr, setFormDataErr] = useState({
    firstName: '',
    lastName: '',
    email: '',
    // phone: '',

    password: '', cPassword: ''
  });

  useEffect(() => {

    if (authenticated) {
      navigate(dashboard, { replace: true });
    } else {

    }
  }, [authenticated, navigate]);

  useEffect(() => {

    const init = async () => {
      try {
        setProviderNear(getWeb3AuthEVMInstance());
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const showcurrentPassword = () => {
    if (passwordShow.type === "password") {
      setPasswordShow({ eye: "fa-eye", type: "text" });
    } else {
      setPasswordShow({ eye: "fa-eye-slash", type: "password" });
    }
  };


  const handleChange = async (e) => {

    const { name, value } = e.target;



    // if (!isVerified) {
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    let checkRegister = LoginValid(name, value);
    console.log(checkRegister, "hhh")
    setFormDataErr({ ...formDataErr, [name]: checkRegister });
    // }

    if (name == "email") {
      let data = { email: value }
      const resp = await isEmailExist(data)
      if (resp.success) {
        if (resp.isEmailExists) {
          setIsVerified(true)
          return false
        } else {
          setIsVerified(false)
        }

      }
    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await provider.logout();
    } catch (error) {

    }

    const { firstName,
      lastName,
      email,
      password, cPassword } = formData

    for (let key in formData) {
      let checkRegister = LoginValid(key, formData[key]);
      setFormDataErr({ ...formDataErr, [key]: checkRegister });
      if (checkRegister !== "") {
        return false;
      }
    }


    if (password !== cPassword) {
      toast.error("Confirm password does't matched");
      return false;
    }
    const data = {
      firstName, lastName, email, password, role: role.User
    }



    // await login()

    // const result = await register(data)


    // if (result.success) {
    //   toast.success(result.message);
    //   setTimeout(() => {
    //     navigate(loginRoute)
    //   }, 1000)
    // } else {
    //   toast.error(result.message);
    // }

    try {
      if (isVerified) {
        return false
      }

      const resp = await logins();
      console.log(resp, "resp====")


      if (resp === false) {
        return
      } else {
        const result = await register(data);

        if (result.success) {
          toast.success(result.message);
          setTimeout(() => navigate(loginRoute), 1000);
        } else {
          toast.error(result.message);
        }
      }


    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Something went wrong. Please try again.");
    }


  };

  const logins = async () => {
    try {


      if (!providerNear) {
        console.error("Web3Auth not initialized");
        toast.error("Web3Auth is not initialized. Please try again later.");
        return;
      }

      try{
        await providerNear.initModal();
      }catch(error){
        console.error("Web3Auth error:", error);
      }
      const web3authProvider = await providerNear.connect();
      const user = await providerNear.getUserInfo();
      await providerNear.logout();

      if (user?.verifierId !== formData.email) {
        toast.error("Connected ID and email in the registration form don't match.");
        return false;
      }

    } catch (error) {
      console.error("Web3Auth error:", error);
      toast.error("Failed to authenticate. Please try again.");
      window.location.reload();
      return false;
    }
  };
  return (
    <>
      <Header />
      <PageHeader title="Register" text="Register" />
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
                    <h2>Create Your Account</h2>
                    <p>
                      Join the community and start saving together.
                    </p>
                  </div>



                  <form
                    // className="account__form needs-validation"
                    onSubmit={handleSubmit}
                  >
                    <div className="row g-4">
                      <div className="col-12 col-md-6">
                        <div>
                          <label htmlFor="firstName" className="form-label">
                            First name
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Ex. Jhon"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}


                            id="firstName"



                          />
                        </div>
                        {formDataErr && <span className='' style={{ color: "red" }}>{formDataErr?.firstName}</span>}
                      </div>
                      <div className="col-12 col-md-6">
                        <div>
                          <label htmlFor="last-name" className="form-label">
                            Last name
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            id="last-name"
                            placeholder="Ex. Doe"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                          />
                        </div>
                        {formDataErr && <span className='' style={{ color: "red" }}>{formDataErr?.lastName}</span>}
                      </div>
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
                            value={formData.email}
                            onChange={handleChange}
                          />
                          <span style={isVerified ? { color: "red" } : { color: "green" }}>{isVerified ? "Already exists" : "Active"}</span>
                        </div>{formDataErr && <span className='' style={{ color: "red" }}>{formDataErr?.email}</span>}
                      </div>
                      <div className="col-12">
                        <div className="form-pass">
                          <label htmlFor="account-pass" className="form-label">
                            Password
                          </label>
                          <input
                            type={passwordShow.type}
                            className="form-control showhide-pass"
                            id="account-pass"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}

                          />

                          <button
                            type="button"
                            id="btnToggle"
                            className="form-pass__toggle"
                            onClick={showcurrentPassword}

                          >
                            <i id="eyeIcon" className={`fa ${passwordShow.eye}`}></i>
                          </button>
                        </div>
                        {formDataErr && <span className='' style={{ color: "red" }}>{formDataErr?.password}</span>}
                      </div>
                      <div className="col-12">
                        <div className="form-pass">
                          <label htmlFor="account-cpass" className="form-label">
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            className="form-control showhide-pass"
                            id="account-cpass"
                            name="cPassword"
                            value={formData.cPassword}
                            placeholder="Re-type password"
                            onChange={handleChange}

                          />

                          {/* <button
                            type="button"
                            id="btnCToggle"
                            className="form-pass__toggle"
                          >
                            <i id="eyeIcon2" className="fa fa-eye"></i>
                          </button> */}
                        </div>
                        {formDataErr && <span className='' style={{ color: "red" }}>{formDataErr?.cPassword}</span>}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="trk-btn trk-btn--border trk-btn--primary d-block mt-4"
                    >
                      Connect Wallet
                    </button>
                  </form>

                  <div className="account__switch">
                    <p>
                      Already have an account? <Link to={loginRoute}>Sign In</Link>
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
      <Footer />
    </>
  );
};
export default SignUp;
