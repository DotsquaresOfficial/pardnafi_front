/* eslint-disable react/no-unescaped-entities */

import React, { useEffect, useState } from 'react';
import Footer from '../Widgets/Footer';
import PageHeader from '../Widgets/PageHeader';
import Header from '../Widgets/Header';

import { Link, useNavigate } from "react-router-dom"
import { dashboard, loginRoute } from '../constent/Routes';
import { toast } from 'react-toastify';
import { LoginValid } from '../validations/LoginValid';
import { register, isEmailExist as fetchIsEmailExist } from '../services/Login';
import { role } from "../constent/Enum"
import { getWeb3AuthEVMInstance } from './web3auth';
import { useAuth } from '../../AuthContext';
import { CircularProgress } from '@mui/material';
import Web3 from 'web3';
const SignUp = () => {

  const { authenticated, login, connectWallet ,logout} = useAuth();
  const navigate = useNavigate()
  const [isEmailExist, setIsEmailExist] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
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
    password: '', cPassword: ''
  });




  const showcurrentPassword = () => {
    if (passwordShow.type === "password") {
      setPasswordShow({ eye: "fa-eye", type: "text" });
    } else {
      setPasswordShow({ eye: "fa-eye-slash", type: "password" });
    }
  };


  const handleChange = async (e) => {

    const { name, value } = e.target;

    // remove any email existance log.
    setIsEmailExist(null);

    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));

    let checkRegister = LoginValid(name, value);

    setFormDataErr({ ...formDataErr, [name]: checkRegister });

    //Return if there is an problem
    if (checkRegister !== "") {
      
      return;
    }

    // Set is Verified Null
    if (name == "email") {
      try {
    
        let data = { email: value }
        setIsEmailExist("Loading");
        const resp = await fetchIsEmailExist(data)
        if (resp.success) {
          if (resp.isEmailExists) {
            setTimeout(() => {
              setIsEmailExist(true);
            }, 1000); // Delay of 1 second gives soomth experience.
          } else {
            setTimeout(() => {
              setIsEmailExist(false);
            }, 1000); // Delay of 1 second gives soomth experience.
          }
        }
      } catch (ex) {
        toast.error("Something went wrong.");
        setIsEmailExist(true);
      }
    }

  };

  const handleSubmit = async (e) => {
    // Prevents Default
    e.preventDefault();



    // Start the lader
    setIsLoading(true);

    // Fetch the from data
    const { firstName, lastName, email, password, cPassword } = formData

    // Iterate through all the feilds
    for (let key in formData) {

      // Check if details are valid
      let checkRegisterFrom = LoginValid(key, formData[key]);
      setFormDataErr({ ...formDataErr, [key]: checkRegisterFrom });
      if (checkRegisterFrom !== "") {
        // If there is any error then stop the loader
        setIsLoading(false);
        return false;
      }
    }

    // If all feilds are valid then validate the confirm password and password
    if (password !== cPassword) {
      toast.error("Confirm password doesn't match");
      setIsLoading(false);
      return;
    }

    // Check if email doesnot exists
    if (isEmailExist) {
      toast.error("Email already Exists, Please change your email.");
      setIsLoading(false);
      return;
    };

    // create user data
    const userData = { firstName, lastName, email, password, role: role.User };

    try {
      try {
        // Connect the wallet with web3auth
        await  connectWallet(formData.email.trim().toLowerCase());


        if(!getWeb3AuthEVMInstance()?.connected){
         toast.error("Failed to verify user.");
         setIsLoading(false);
          return;
        }
 
       } catch (error) {
        console.log(error);
        toast.error(`Something went wrong ${error}`);
        setIsLoading(false);
        return;
       }

      try {
        // get users information
        const user = await getWeb3AuthEVMInstance().getUserInfo()
       
  
        if (!user?.verifierId) {
          setIsLoading(false);
          toast.error("Failed to retrieve user details. Please try again.");
          return;
        }
  
        // Trim and lowercase to check all the emails
        if (user.verifierId.trim().toLowerCase() !== formData.email.trim().toLowerCase()) {
          setIsLoading(false);
          toast.error("Connected ID and email in the registration form don't match.");
          return;
        }
        setIsLoading(false);
  
        console.log("User authenticated successfully:", user);
        const provider = getWeb3AuthEVMInstance().provider;
        if(!provider){
          await logout();
          return;
        }

        const web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();

        await logout();
        const result = await register({...userData,walletAddress:accounts[0]});
        if (result?.success) {
          toast.success(result.message);
          setIsLoading(false);
          setTimeout(() => navigate(loginRoute), 1000);
        } else {
          setIsLoading(false);
          toast.error(result.message || "Registration failed.");
        }
    
  
      } catch (error) {
      
        console.error("Authentication error:", error);
        toast.error("Authentication failed. Please try again.");
        setIsLoading(false);
        return;
      }
    
    } catch (error) {
      setIsLoading(false);
      console.error("Error during registration:", error);
      toast.error("Something went wrong. Please try again.");
    }

    setIsLoading(false);
  };


  return (
    <>
   
      <PageHeader title="Sign Up" text="Sign Up" />
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
                            maxLength={50}
                                                        
                            className="form-control"
                            type="text"
                            placeholder="Ex. Dan"
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
                           maxLength={50}
                            className="form-control"
                            type="text"
                            id="last-name"
                            placeholder="Ex. Pandey"
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
                           maxLength={254}
                            type="email"
                            className="form-control"
                            id="account-email"
                            placeholder="Enter your email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                          />
                          {formDataErr.email===""&& isEmailExist !== null && isEmailExist !== "Loading" && (
                            <span style={{ color: isEmailExist ? "red" : "green", display: 'flex', alignItems: 'center' }}>
                              {/* Conditionally render the icon and text */}
                              {isEmailExist ? (
                                <>
                                  <span style={{ marginRight: '8px' }}>✖</span> {/* Cross symbol */}
                                  {"Email already exists"}
                                </>
                              ) : (
                                <>
                                  <span style={{ marginRight: '8px' }}>✔</span> {/* Checkmark symbol */}
                                  {"Email available"}
                                </>
                              )}
                            </span>
                          )}

                          {formDataErr.email===""&&isEmailExist === "Loading" && (
                            <div style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              gap: '8px'
                            }}>
                              <CircularProgress size={16} />
                              <span style={{
                                fontSize: '14px',
                                marginLeft: '8px'
                              }}>
                                {" checking your email ..."}
                              </span>
                            </div>
                          )}
                        </div>{formDataErr && <span className='' style={{ color: "red" }}>{formDataErr?.email}</span>}
                      </div>
                      <div className="col-12">
                        <div className="form-pass">
                          <label htmlFor="account-pass" className="form-label">
                            Password
                          </label>
                          <input
                            minLength={8}
                            maxLength={64}
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
                            minLength={8}
                            maxLength={64}
                            type="password"
                            className="form-control showhide-pass"
                            id="account-cpass"
                            name="cPassword"
                            value={formData.cPassword}
                            placeholder="Re-type password"
                            onChange={handleChange}

                          />

                          
                        </div>
                        {formDataErr && <span className='' style={{ color: "red" }}>{formDataErr?.cPassword}</span>}
                      </div>
                    </div>

                   {
                    !isLoading?
                     <button
                     type="submit"
                     className="trk-btn trk-btn--border trk-btn--primary d-block mt-4"
                   >
                     Verify email
                   </button>:
                   (
                            <div style={{
                              display: 'flex',
                              padding:'20px',
                              justifyContent: 'center',
                              alignItems: 'center',
                              gap: '8px'
                            }}>
                              <CircularProgress size={25} />
                              <span style={{
                                fontSize: '14px',
                                marginLeft: '8px'
                              }}>
                              </span>
                            </div>
                          )
                   }
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
    
    </>
  );
};
export default SignUp;
