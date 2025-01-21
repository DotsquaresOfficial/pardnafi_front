
import React, { useState } from 'react'
import Header from '../../Widgets/Header'
import PageHeader from '../../Widgets/PageHeader?'
import Footer from '../../Widgets/Footer'
import { Link } from 'react-router-dom'


const PollingPage = () => {

  const [selectedOption, setSelectedOption] = useState(null);
  const [votes, setVotes] = useState({
    increaseContrib: 0,
    extendDuration: 0,
    moreMeetings: 0,
    newLeader: 0,
    newMembers: 0,
  });

  const handleVote = (option) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [option]: prevVotes[option] + 1,
    }));
    setSelectedOption(option);
  };

  const getTotalVotes = () => {
    return Object.values(votes).reduce((acc, curr) => acc + curr, 0);
  };

  const renderResults = () => {
    const totalVotes = getTotalVotes();
    return (
      <div className="results">

        <h3>Voting Results:</h3>
        <ul>
          {Object.keys(votes).map((option) => (
            <li key={option}>
              {option.replace(/([A-Z])/g, ' $1')}: {votes[option]} votes ({((votes[option] / totalVotes) * 100).toFixed(2)}%)
            </li>
          ))}
        </ul>
      </div>
    );
  };
  return (
    <>
      <Header />
      <PageHeader title="Polling" text="Polling" />
      <section className="account  sec-bg-color2">
        <div className="container">

        </div>
        <div className="account__shape">
          <span className="account__shape-item account__shape-item--1">
            <img src="/images/contact/4.png" alt="shape-icon" />
          </span>
        </div>
      </section>

      <section className='pooling-vote'>
        <div className='section-header section-header--max50'>
          <h2 className='mb-15 mt-minus-5'>Groups Polling
</h2>
        </div>
  <div className="container">
    <div className="row">
      {/* What's Up Group Column */}
      <div className='col-md-4'>
        <div className='pooldata-card'>
          <h6> Group A</h6>
          
          <div className="poll-option">
            <div className="d-flex justify-content-between support-group">
              <span>Support </span>
            </div>
            <div className="earyexit-grp">
              <div className='early-data'>
            Yes <input className="form-check-input" type="radio" name="earlyExit" id="earlyExitYes" value="yes" aria-label="Yes" /> 
            </div>
            <div className='progress'>
              <div className="progress-bar" role="progressbar" style={{ width: '32%', backgroundColor: '#ffcccb' }} aria-valuenow={70} aria-valuemin={0} aria-valuemax={100} />
            </div>
            </div>
            <div className='votesdata-input'>
              <span>65 votes</span>
              
           
            </div>

            <div className="d-flex justify-content-between ">
             
            </div>
            <div className="earyexit-grp">
              <div className='early-data'>
            No <input className="form-check-input" type="radio" name="earlyExit" id="earlyExitYes" value="yes" aria-label="Yes" /> 
            </div>
            <div className='progress'>
              <div className="progress-bar" role="progressbar" style={{ width: '63%', backgroundColor: '#ffcccb' }} aria-valuenow={70} aria-valuemin={0} aria-valuemax={100} />
            </div>
            </div>
            <div className='votesdata-input'>
              <span>135 votes</span>
              
           
            </div>


          </div>

          
          
        </div>
        <div className='pooldata-card'>
          <h6> Group B</h6>
          
          <div className="poll-option">
            <div className="d-flex justify-content-between support-group">
              <span>Support </span>
            </div>
            <div className="earyexit-grp">
              <div className='early-data'>
            Yes <input className="form-check-input" type="radio" name="earlyExit" id="earlyExitYes" value="yes" aria-label="Yes" /> 
            </div>
            <div className='progress'>
              <div className="progress-bar" role="progressbar" style={{ width: '32%', backgroundColor: '#ffcccb' }} aria-valuenow={70} aria-valuemin={0} aria-valuemax={100} />
            </div>
            </div>
            <div className='votesdata-input'>
              <span>65 votes</span>
              
           
            </div>

            <div className="d-flex justify-content-between support-group">
             
            </div>
            <div className="earyexit-grp">
              <div className='early-data'>
            No <input className="form-check-input" type="radio" name="earlyExit" id="earlyExitYes" value="yes" aria-label="Yes" /> 
            </div>
            <div className='progress'>
              <div className="progress-bar" role="progressbar" style={{ width: '63%', backgroundColor: '#ffcccb' }} aria-valuenow={70} aria-valuemin={0} aria-valuemax={100} />
            </div>
            </div>
            <div className='votesdata-input'>
              <span>135 votes</span>
              
           
            </div>


          </div>

          
          
        </div>
      </div>

      {/* Payment Reduce Column */}
      <div className='col-md-4'>
        <div className='pooldata-card'>
          <h6> Payment reduce</h6>
          
          <div className="poll-option">
            <div className="d-flex justify-content-between support-group">
              <span>Payment </span>
            </div>
            <div className="earyexit-grp">
              <div className='early-data'>
            Yes <input className="form-check-input" type="radio" name="earlyExit" id="earlyExitYes" value="yes" aria-label="Yes" /> 
            </div>
            <div className='progress'>
              <div className="progress-bar" role="progressbar" style={{ width: '70%', backgroundColor: '#ffcccb' }} aria-valuenow={70} aria-valuemin={0} aria-valuemax={100} />
            </div>
            </div>
            <div className='votesdata-input'>
              <span>150 votes</span>
              
           
            </div>

            <div className="d-flex justify-content-between support-group">
             
            </div>
            <div className="earyexit-grp">
              <div className='early-data'>
            No <input className="form-check-input" type="radio" name="earlyExit" id="earlyExitNo" value="yes" aria-label="Yes" /> 
            </div>
            <div className='progress'>
              <div className="progress-bar" role="progressbar" style={{ width: '37%', backgroundColor: '#ffcccb' }} aria-valuenow={70} aria-valuemin={0} aria-valuemax={100} />
            </div>
            </div>
            <div className='votesdata-input'>
              <span>75 votes</span>
              
           
            </div>


          </div>

          
          
        </div>
      </div>


      {/* Early Exit Group Column */}
      <div className='col-md-4'>
        <div className='pooldata-card'>
          <h6>Early Exit Group</h6>
          
          <div className="poll-option">
            <div className="d-flex justify-content-between support-group">
              <span>Support Early Exit</span>
            </div>
            <div className="earyexit-grp">
              <div className='early-data'>
            Yes <input className="form-check-input" type="radio" name="earlyExit" id="earlyExitYes" value="yes" aria-label="Yes" /> 
            </div>
            <div className='progress'>
              <div className="progress-bar" role="progressbar" style={{ width: '80%', backgroundColor: '#ffcccb' }} aria-valuenow={70} aria-valuemin={0} aria-valuemax={100} />
            </div>
            </div>
            <div className='votesdata-input'>
              <span>180 votes</span>
              
           
            </div>

            <div className="d-flex justify-content-between support-group">
             
            </div>
            <div className="earyexit-grp">
              <div className='early-data'>
            No <input className="form-check-input" type="radio" name="earlyExit" id="earlyExitYes" value="yes" aria-label="Yes" /> 
            </div>
            <div className='progress'>
              <div className="progress-bar" role="progressbar" style={{ width: '10%', backgroundColor: '#ffcccb' }} aria-valuenow={70} aria-valuemin={0} aria-valuemax={100} />
            </div>
            </div>
            <div className='votesdata-input'>
              <span>20 votes</span>
              
           
            </div>


          </div>

          
          
        </div>
      </div>
    </div>
  </div>
</section>



      <Footer />
    </>
  )
}

export default PollingPage

