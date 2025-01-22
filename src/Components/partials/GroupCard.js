import React from 'react'
import { Link } from 'react-router-dom'

const GroupCard = () => {
  return (
    <>
        <section className="pricing padding-top padding-bottom dash-sec">
        <div className="section-header section-header--max50">
        <h2 className="mb-15 mt-minus-5">Browse Group</h2>
          <p>We offer the best pricings around - from installations to repairs, maintenance, and more!</p>
         
        </div>
        <div className="container">


           
          <div className='private-govermrnt'>
          <select class="form-select form-select-lg mb-3" aria-label="Large select example">
  <option selected>Select Group</option>
  <option value="1">Public Group</option>
  <option value="2">Private Group</option>
</select>
       
          </div>
          <div className="pricing__wrapper">
            <div className="row g-4 align-items-center">
              <div className="col-md-6 col-lg-4">
                <div className="pricing__item" data-aos="fade-right" data-aos-duration="1000">
                  <div className="pricing__item-inner">
                    <div className="pricing__item-content">
    
                      {/* <!-- pricing top part --> */}
                      <div className="pricing__item-top">
                        <h6 className="mb-15">Basic</h6>
                        <h3 className="mb-25">$99/<span>Monthly</span> </h3>
                      </div>
    
                      {/* <!-- pricing middle part --> */}
                      <div className="pricing__item-middle">
                        <ul className="pricing__list">
                          <li className="pricing__list-item"><span><img src="/images/icon/check.svg" alt="check"
                                className="dark"/></span>
                            Contribution: $100 per cycle</li>
                          <li className="pricing__list-item"><span><img src="/images/icon/check.svg" alt="check"
                                className="dark"/></span>
                            Frequency: Monthly</li>
                          <li className="pricing__list-item"><span><img src="/images/icon/check.svg" alt="check"
                                className="dark"/></span>
                            Duration: 12 Months</li>
                          <li className="pricing__list-item"><span><img src="/images/icon/check.svg" alt="check"
                                className="dark"/></span>
                            Rules: No late payments</li>
                        </ul>
    
                      </div>
    
                      {/* <!-- pricing bottom part --> */}
                      <div className="pricing__item-bottom">
                        <Link href="signup" className="trk-btn trk-btn--outline">Join Group</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="pricing__item " data-aos="fade-up" data-aos-duration="1000">
                  <div className="pricing__item-inner active">
                    <div className="pricing__item-content">
    
                      {/* <!-- pricing top part --> */}
                      <div className="pricing__item-top">
                        <h6 className="mb-15">standard</h6>
                        <h3 className="mb-25">$149/<span>Monthly</span> </h3>
                      </div>
    
                      {/* <!-- pricing middle part --> */}
                      <div className="pricing__item-middle">
                        <ul className="pricing__list">
                          <li className="pricing__list-item"><span><img src="/images/icon/check.svg" alt="check"
                                className="dark"/></span>
                           Contribution: $200 per cycle</li>
                          <li className="pricing__list-item"><span><img src="/images/icon/check.svg" alt="check"
                                className="dark"/></span>
                            Frequency: Weekly</li>
                          <li className="pricing__list-item"><span><img src="/images/icon/check.svg" alt="check"
                                className="dark"/></span>
                            24/7 technical support</li>
                          <li className="pricing__list-item"><span><img src="/images/icon/check.svg" alt="check"
                                className="dark"/></span>
                             Duration: 8 Months</li>
                          <li className="pricing__list-item"><span><img src="/images/icon/check.svg" alt="check"
                                className="dark"/></span>
                            Rules: No late payments</li>
                        </ul>
    
                      </div>
    
                      {/* <!-- pricing bottom part --> */}
                      <div className="pricing__item-bottom">
                        <Link href="signup" className="trk-btn trk-btn--outline active">Join Group</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="pricing__item" data-aos="fade-left" data-aos-duration="1000">
                  <div className="pricing__item-inner">
                    <div className="pricing__item-content">
    
                      {/* <!-- pricing top part --> */}
                      <div className="pricing__item-top">
                        <h6 className="mb-15">premium</h6>
                        <h3 className="mb-25">$199/<span>Monthly</span> </h3>
                      </div>
    
                      {/* <!-- pricing middle part --> */}
                      <div className="pricing__item-middle">
                      <ul className="pricing__list">
                          <li className="pricing__list-item"><span><img src="/images/icon/check.svg" alt="check"
                                className="dark"/></span>
                           Contribution: $500 per cycle</li>
                          <li className="pricing__list-item"><span><img src="/images/icon/check.svg" alt="check"
                                className="dark"/></span>
                            Frequency: Yearly</li>
                         
                          <li className="pricing__list-item"><span><img src="/images/icon/check.svg" alt="check"
                                className="dark"/></span>
                             Duration: 9 Months</li>
                          <li className="pricing__list-item"><span><img src="/images/icon/check.svg" alt="check"
                                className="dark"/></span>
                            Rules: No late payments</li>
                        </ul>
                      </div>
    
                      {/* <!-- pricing bottom part --> */}
                      <div className="pricing__item-bottom">
                        <Link href="signup" className="trk-btn trk-btn--outline">Join Group</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="pricing__shape">
          <span className="pricing__shape-item pricing__shape-item--1"> <span></span> </span>
          <span className="pricing__shape-item pricing__shape-item--2"> <img src="/images/icon/1.png" alt="shape-icon"/>
          </span>
        </div> */}
      </section>
    </>
  )
}

export default GroupCard
