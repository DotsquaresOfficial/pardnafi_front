import React from 'react'
import Header from '../../Widgets/Header'
import PageHeader from '../../Widgets/PageHeader'
import Footer from '../../Widgets/Footer'

const GroupDetails = () => {
  return (
    <>
    
      <PageHeader title="Group Details" text="Group Details" />
      <section className='payment-method'>
       <div className='container'>
        <div className='row'>
        <div className='col-md-9'>
       <div className='row'>
       <div className='col-md-4'>
       <div className='upcoming-payment'>
        <div className='payment-simble'>
          <div className='up-box'>
         <h2>50£</h2>
         </div>
         <div className='payment-date'>
          <h3>Upcoming Payment</h3>
          <p>Date: 26-02-2025</p>
         </div>
        </div>
        <div className='payment-card'>
          <img src='/images/card-sp 1.svg'/>
        </div>
       </div>
       </div>

       <div className='col-md-4'>
       <div className='upcoming-payment'>
        <div className='payment-simble'>
          <div className='up-box'>
         <h2>50£</h2>
         </div>
         <div className='payment-date'>
          <h3>Last Payment</h3>
          <p>Date: 26-01-2025</p>
         </div>
        </div>
        <div className='payment-card'>
          <img src='/images/card-sp 2.svg'/>
        </div>
       </div>
       </div>

       <div className='col-md-4'>
       <div className='upcoming-payment'>
        <div className='payment-simble'>
          <div className='up-box'>
         <h2>50£</h2>
         </div>
         <div className='payment-date'>
          <h3>Total Paneilty</h3>
          <p>Date: 26-02-2025</p>
         </div>
        </div>
        <div className='payment-card'>
          <img src='/images/time-watch.svg'/>
        </div>
       </div>
       </div>


       </div>
       <div className='group-contrutbution'>
        <ul>
          <li> <span>Group Contribution Per Cycle: </span> 50£</li>
          <li> <span>Group Payout Frequency: </span> 30 Days</li>
          <li> <span>Group Duration: </span> 6 Months</li>
          <li> <span>Group Created By: </span>  0xd384E6A167634F2E9864649F320C2e5dF80Cfb5d</li>
          <li> <span>Created At: </span> 2/7/2025, 11:04:46 AM</li>
        </ul>
       </div>
        </div>
        <div className='col-md-3'>
         <div className='contr-graph'>
          <h2>Contributions </h2>
          <img src='/images/contr-graph.svg'/>
          <div className='payment-tag'>
          <div className='grah-details-tag inves'>
            <h6>Total Investment</h6>
          </div>
          <div className='grah-details-tag rec'>
            <h6>Total Received</h6>
          </div>
          <div className='grah-details-tag your-inves'>
            <h6>Your Total Investment</h6>
          </div>
          <div className='grah-details-tag total-rec'>
            <h6>Your Total Investment  Received</h6>
          </div>
          </div>
         </div>
        </div>
        </div>
       </div>
      </section>


    
    </>
  )
}

export default GroupDetails
