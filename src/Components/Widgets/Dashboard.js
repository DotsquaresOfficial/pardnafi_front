import React from 'react'
import Header from './Header'
import PageHeader from './PageHeader'
import Footer from './Footer'

const Dashboard = () => {
  return (
    <>
      <Header />
      <PageHeader title="Dashboard" text="Dashboard" />
      <section className="account padding-top padding-bottom sec-bg-color2 dash-sec">
        <div className='container'>
       <div class="row">
        <div className='col-md-4'> 
        <div className='createnew-group'>
        <div className='creategroup-img'>
         <img src='/images/icon/add-icon.svg'alt='add'/> 
        </div>
        <h2>Create a New group</h2>
        <p>Lorem ipsum dolor sit amet consectetur.</p>
        </div>
        </div>

        <div className='col-md-4'> 
        <div className='createnew-group'>
        <div className='creategroup-img'>
         <img src='/images/icon/world.svg'alt='add'/> 
        </div>
        <h2>Browse Groups</h2>
        <h1>+657</h1>
        </div>
        </div>

        <div className='col-md-4'> 
        <div className='createnew-group'>
        <div className='creategroup-img'>
         <img src='/images/icon/user-active.svg'alt='add'/> 
        </div>
        <h2>Active Groups</h2>
        <h1>+254</h1>
        </div>
        </div>
       </div>
       </div>
      </section>
      <Footer />
    </>
  )
}

export default Dashboard
