import React from 'react'
import Header from '../../Widgets/Header'
import PageHeader from '../../Widgets/PageHeader'
import Footer from '../../Widgets/Footer'

const OnfidoKyc = () => {
  return (
    <>
    
            <PageHeader title="Onfido Kyc" text="Onfido Kyc" />
            <section className="account padding-top padding-bottom sec-bg-color2">
                <div className="container">
                    <div
                        className="account__wrapper"
                        data-aos="fade-up"
                        data-aos-duration="800"
                    >
                        <div className="row g-4">
                            <div className="col-lg-12">
                                <div className="account__content account__content--style1">
                                    <div className="account__header">
                                        <h2>Welcome back!</h2>
                                        <p>
                                            Please complete your KYC
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
  )
}

export default OnfidoKyc
