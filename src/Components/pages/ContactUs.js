import React, { useState } from 'react';
import { InputValid } from '../validations/InputValid';
import toastr from 'toastr';
import { useSetContactUsMutation } from '../../redux/contactUsApi';
import Footer from '../Widgets/Footer'
import PageHeader from '../Widgets/PageHeader'
import Header from '../Widgets/Header'
import { Link } from 'react-router-dom'

const ContactUs = () => {

    const [setContactUs] = useSetContactUsMutation();
    const [contactUsField, setContactUsField] = useState({
        firstName: '',

        contactNumber: '',
        email: '',
        message: ''
    });
    const [contactUsFieldErr, setContactUsFieldErr] = useState({
        firstName: '',

        contactNumber: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContactUsField({ ...contactUsField, [name]: value });
        let checkContact = InputValid(name, value);
        setContactUsFieldErr({ ...contactUsFieldErr, [name]: checkContact });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        for (let key in contactUsField) {
            let checkContact = InputValid(key, contactUsField[key]);
            setContactUsFieldErr({ ...contactUsFieldErr, [key]: checkContact });
            if (checkContact !== "") {
                return false;
            }
        }

        const { firstName, contactNumber, email, message } = contactUsField
        const data = {
            name: firstName,
            contactNumber, email, message
        };

        setContactUs(data).then((result) => {
            if (result.data.status) {

                toastr.success(result.data.message);
                setContactUsField({
                    firstName: '',

                    contactNumber: '',
                    email: '',
                    message: ''
                })

            } else {

                toastr.error(result.data.message);
            }
        });




    };


    return (
        <>
            <Header />
            <PageHeader title="Contact Us" text="Contact Us" />

            <div className="contact padding-top padding-bottom dash-sec">
                <div className="section-header section-header--max50">
                    <h2 className="mb-15 mt-minus-5">Contact Us
                    </h2>
                    <p>We offer the best pricings around - from installations to repairs, maintenance, and more!</p>
                </div>

                <div className="container">

                    <div className="contact__wrapper">

                        <div className="row g-5">

                            <div className="col-md-5">
                                <div className='contact__form'>
                                    <div className="contact__info">
                                        <div className="contact__social">
                                            <h3>let’s <span>{`get in touch `}</span>
                                                with us</h3>

                                        </div>
                                        <div className="contact__details">


                                            <div className="contact__item">
                                                <div className="contact__item-inner">
                                                    <div className="contact__item-thumb">
                                                        <span> <i class="fa-solid fa-phone"></i></span>

                                                    </div>
                                                    <div className="contact__item-content">

                                                        <p>

                                                            <Link href="tel:+447441448582">+44 744 144 8582</Link>

                                                        </p>
                                                        <p>
                                                            <Link href="tel:+8801313941166">+880 131 394 1166</Link>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="contact__item" >
                                                <div className="contact__item-inner">
                                                    <div className="contact__item-thumb">
                                                        <span> <i class="fa-solid fa-envelope"></i></span>
                                                    </div>
                                                    <div className="contact__item-content">
                                                        <p>
                                                            <Link target="_blank" href="mailto:mail@thetork.com">mail@thetork.com</Link>
                                                        </p>
                                                        <p>
                                                            <Link target="_blank" href="mailto:support@thetork.com">support@thetork.com</Link>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="contact__item" >
                                                <div className="contact__item-inner">
                                                    <div className="contact__item-thumb">

                                                        <span><i class="fa-solid fa-address-book"></i></span>
                                                    </div>
                                                    <div className="contact__item-content">
                                                        <p>
                                                            88 Sheridan Street
                                                        </p>
                                                        <p>
                                                            534 Victoria Trail
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div></div>
                            </div>
                            <div className="col-md-7">
                                <div className="contact__form">
                                    <h2 className='mb-4'>Get in touch</h2>
                                    <form onSubmit={handleSubmit}>
                                        <div className="row g-4">
                                            <div className='row'>
                                                <div className="col-6">
                                                    <div>
                                                        <label htmlFor="name" className="form-label">Name</label>
                                                        <input className="form-control" type="text" id="name"
                                                            name="firstName" value={contactUsField.firstName}
                                                            onChange={handleChange} placeholder="Full Name" />
                                                    </div>{contactUsFieldErr && <span className='' style={{ color: "red" }}>{contactUsFieldErr?.firstName}</span>}
                                                </div>
                                                <div className="col-6">
                                                    <div>
                                                        <label htmlFor="name" className="form-label">Contact number</label>
                                                        <input className="form-control" type="text" id="name"
                                                            name="contactNumber"
                                                            value={contactUsField.contactNumber}
                                                            onChange={handleChange}
                                                            placeholder="Contact Number" />
                                                    </div>  {contactUsFieldErr && <span className='' style={{ color: "red" }}>{contactUsFieldErr?.contactNumber}</span>}
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div>
                                                    <label htmlFor="email" className="form-label">Email</label>
                                                    <input className="form-control" type="email" id="email" name="email"
                                                        value={contactUsField.email}
                                                        onChange={handleChange} placeholder="Email here" />
                                                </div> {contactUsFieldErr && <span className='' style={{ color: "red" }}>{contactUsFieldErr?.email}</span>}
                                            </div>
                                            <div className="col-12">
                                                <div>
                                                    <label htmlFor="textarea" className="form-label">Message</label>
                                                    <textarea cols="30" rows="5" className="form-control" id="textarea"
                                                        placeholder="Enter Your Message" name="message"
                                                        value={contactUsField.message}
                                                        onChange={handleChange}></textarea>
                                                </div>{contactUsFieldErr && <span className='' style={{ color: "red" }}>{contactUsFieldErr?.message}</span>}
                                            </div>
                                        </div>
                                        <button type="submit" className="trk-btn trk-btn--border trk-btn--primary mt-4 d-block">contact us
                                            now</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="contact__shape">
                    <span className="contact__shape-item contact__shape-item--1"><img src="/images/contact/4.png"
                        alt="shape-icon" /></span>
                    <span className="contact__shape-item contact__shape-item--2"> <span></span> </span>
                </div> */}
            </div>


            <Footer />
        </>
    )
}

export default ContactUs
