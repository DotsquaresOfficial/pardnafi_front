import React, { useEffect, useState } from 'react';
import Footer from '../Widgets/Footer';
import PageHeader from '../Widgets/PageHeader';
import Header from '../Widgets/Header';

import { Link, useNavigate } from "react-router-dom"
import { dashboard, loginRoute } from '../constent/Routes';
import toastr from 'toastr';
import { LoginValid } from '../validations/LoginValid';
import { register, isEmailExist } from '../services/Login';
import { role } from "../constent/Enum"
import { getWeb3AuthNearInstance } from './web3auth';




const ForgotPassword = () => {
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
    password: ''
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

    password: ''
  });


  useEffect(() => {

    const init = async () => {
      try {
        setProviderNear(getWeb3AuthNearInstance());
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

    const { firstName,
      lastName,
      email,
      password } = formData

    for (let key in formData) {
      let checkRegister = LoginValid(key, formData[key]);
      setFormDataErr({ ...formDataErr, [key]: checkRegister });
      if (checkRegister !== "") {
        return false;
      }
    }
    const data = {
      firstName, lastName, email, password, role: role.User
    }



    await login()

    const result = await register(data)

    return
    if (result.success) {
      toastr.success(result.message);
      setTimeout(() => {
        navigate(loginRoute)
      }, 1000)
    } else {
      toastr.error(result.message);
    }


  };

  const login = async () => {

    try {
      if (!providerNear) {
        console.log("Web3Auth not initilized");
        return;
      }
      await providerNear.initModal();
      const web3authProvider = await providerNear.connect();
      const user = await providerNear.getUserInfo();
      if (user?.verifierId !== formData.email) {

        toastr.error("Connected id and you provided in register form does't match")
      }
      await providerNear.logout();



    } catch (ex) {
      console.log(ex);
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
                                value={formData.email}
                                onChange={handleChange}
                              />
                              <span style={isVerified ? { color: "red" } : { color: "green" }}>{isVerified ? "Already exists" : "Active"}</span>
                            </div>{formDataErr && <span className='' style={{ color: "red" }}>{formDataErr?.email}</span>}
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
          <Footer />
        </>
      );
}

export default ForgotPassword