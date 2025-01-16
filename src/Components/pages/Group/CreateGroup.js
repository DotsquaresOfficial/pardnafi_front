import React from 'react'
import Header from '../../Widgets/Header'
import PageHeader from '../../Widgets/PageHeader?'
import Footer from '../../Widgets/Footer'
import { Link } from 'react-router-dom'


const CreateGroup = () => {
    return (
        <>
            <Header />
            <PageHeader title="Create Group" text="Create Group" />
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
                                        <h2>Create New Group</h2>
                                        <p>
                                            Join the community and start saving together.
                                        </p>
                                    </div>

                                    {/* <div className="account__social">
                    <Link scroll={false} href="" className="account__social-btn">
                      <span>
                        <img
                          src="/images/others/google.svg"
                          alt="google icon"
                        />
                      </span>
                      Continue with google
                    </Link>
                  </div> */}

                                    {/* <div className="account__divider account__divider--style1">
                    <span>or</span>
                  </div> */}

                                    <form
                                        action=""
                                        className="account__form needs-validation"
                                        noValidate
                                    >
                                        <div className="row g-4">
                                            <div className="col-12 col-md-6">
                                                <div>
                                                    <label htmlFor="first-name" className="form-label">
                                                        Group Name
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        id="Group Name"
                                                        placeholder="Group Name"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div>
                                                    <label htmlFor="last-name-options" className="form-label">
                                                        Group Size (5 - 20 members)
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        id="Group Name"
                                                        placeholder="Group Size (5 - 20 members)"
                                                    />

                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <div>
                                                    <label htmlFor="account-email" className="form-label">
                                                        Contribution Amount per Cycle (£)
                                                    </label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        id="account-email"
                                                        placeholder="Contribution Amount per Cycle (£)"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-pass">
                                                    <label htmlFor="account-pass" className="form-label">
                                                        Payout Frequency
                                                    </label>
                                                    <select className="form-select" aria-label="Default select example">
                                                        <option selected>Open this select menu</option>
                                                        <option value="Weekly">Weekly</option>
                                                        <option value="Bi-weekly">Bi-weekly</option>
                                                        <option value="Monthly">Monthly</option>
                                                    </select>


                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-pass">
                                                    <label htmlFor="account-cpass" className="form-label">
                                                        Group Duration (months)
                                                    </label>
                                                    {/* <select className="form-control" id="last-name-options">
                          <option value="Doe">Doe</option>
                          <option value="Smith">Smith</option>
                        </select> */}

                                                    <select className="form-select" aria-label="Default select example">
                                                        <option selected>Open this select menu</option>
                                                        <option value="3">3 Months</option>
                                                        <option value="6">6 Months</option>
                                                        <option value="12">12 Months</option>
                                                    </select>


                                                </div>
                                            </div>
                                            <div className="account__check">
                                            <div className="account__check-remember">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    value=""
                                                    id="terms-check"
                                                />
                                                <label htmlFor="terms-check" className="form-check-label">
                                                Enable DAO Deposit Support
                                                </label>
                                            </div>
                                            
                                        </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="trk-btn trk-btn--border trk-btn--primary d-block mt-4"
                                        >
                                            Create Group
                                        </button>
                                    </form>
                                 
                                    {/* <div className="account__switch">
                    <p>
                      Don’t have an account yet? <Link to="/">Login</Link>
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
            <Footer />
        </>
    )
}

export default CreateGroup
