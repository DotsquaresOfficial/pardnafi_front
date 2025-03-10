import React, { useEffect, useState } from 'react';


import Footer from '../../Widgets/Footer'
import PageHeader from '../../Widgets/PageHeader'
import Header from '../../Widgets/Header'
import { Link } from 'react-router-dom'
import { LoginValid } from '../../validations/LoginValid';
import { uploadImage } from '../../services/User';
import { toast } from 'react-toastify';
import { useGetProfileQuery, useSetProfileMutation } from '../../../redux/profileApi';


const Profile = () => {
  const {data}= useGetProfileQuery()
 const [setProfile, { isLoading }] = useSetProfileMutation();
  
  const [profileField, setProfileField] = useState({ firstName: "",lastName:"", email: "", contactNumber: "" });
  const [imagePreview, setImagePreview] = useState(null);


  useEffect(() => { 
    if (data?.user&&data?.user) { 
    setProfileField({ firstName: data?.user.firstName,lastName:data?.user.lastName, email: data?.user.email});
    setImagePreview(data?.user.avatar)
  }
  },[data])
  const [profileFieldErr, setProfileFieldErr] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: ""

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileField({ ...profileField, [name]: value });
    let checkProfile = LoginValid(name, value);
    setProfileFieldErr({ ...profileFieldErr, [name]: checkProfile });
  };

  const handleProfileHandler = (e) => {
    e.preventDefault();

    for (let key in profileField) {
      let checkProfile = LoginValid(key, profileField[key]);

      setProfileFieldErr({ ...profileFieldErr, [key]: checkProfile });
      if (checkProfile !== "") {
        return false;
      }
    }
    setProfile({
      firstName: profileField.firstName,
      lastName: profileField.lastName,
      avatar: imagePreview}).then((res) => {
   
        
        toast.success(res.data.message)
        
      })
  }

  const handleImageUploadHandler = async (e) => {
    const file = e.target.files?.[0]

    const token = localStorage.getItem("jwtToken");
    const data = new FormData();
    data.append("fileInput", file);

    const response = await uploadImage(data, token);
    if (response && response.file && response.file.url) {


      setImagePreview(response.file.url);
    }
  }


  return (
    <>
     
      <PageHeader title="Profile" text="Profile" />
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
                    <h2>Profile</h2>

                  </div>

                  <form
                    onSubmit={handleProfileHandler}
                  >
                    <div className='userprofile-img'>
                      <div className='dark-subject'>
                        <div className='img-user'>
                          <img className="dark" src={imagePreview ? imagePreview : "/images/header/user.jpg"} alt="logo" />
                        </div>
                        <div className='username-heading'>
                          {/* <h6>User</h6>
                          <p>John doe</p> */}
                        </div>

                      </div>
                      <div className="dropzone dropzone-single  dz-clickable" data-toggle="dropzone" data-dropzone-url="http://">
                        <div className="dz-default dz-message">
                          <div className="image-doc">
                            <img className="dark" src="/images/about/upload-img.svg" alt="logo" />
                          </div>

                          <input type="file" className="form-control" onChange={handleImageUploadHandler} aria-describedby="emailHelp" />
                        </div>
                      </div>

                    </div>
                    <div className="row g-4">
                      <div className="col-6">
                        <div>
                          <label htmlFor="account-email" className="form-label">
                            Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={profileField.firstName}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            name="firstName"

                          />
                          {profileFieldErr && <span className='text-danger'>{profileFieldErr?.firstName}</span>}
                        </div>
                      </div>
                      <div className="col-6">
                      <div>
                          <label htmlFor="account-email" className="form-label">
                           Last Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={profileField.lastName}
                            onChange={handleChange}
                            placeholder="Last Name"
                            name="lastName"

                          />
                          {profileFieldErr && <span className='text-danger'>{profileFieldErr?.lastName}</span>}


                        </div>
                      </div>
                    </div>
                    <div className='row g-4'>
                      <div className="col-12 mt-5">
                       

                        <div>
                          <label htmlFor="account-email" className="form-label">
                            Email Address
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            value={profileField.email}
                            onChange={handleChange}
                            placeholder="Email address"
                            name="email"
                            disabled

                          />
                          {profileFieldErr && <span className='text-danger'>{profileFieldErr?.email}</span>}
                        </div>


                      </div>

                    </div>
                    <button
                      type="submit"

                      className="trk-btn trk-btn--border trk-btn--primary d-block mt-4"
                    >
                      Update
                    </button>
                  </form>
                  {/* 
              <div className="account__switch">
                <p>
                  Back to Login
                </p>
              </div> */}
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
  )
}
export default Profile
