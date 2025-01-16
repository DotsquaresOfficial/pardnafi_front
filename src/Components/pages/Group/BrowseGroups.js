import React from 'react'
import Header from '../../Widgets/Header'
import PageHeader from '../../Widgets/PageHeader?'
import Footer from '../../Widgets/Footer'
import { Link } from 'react-router-dom'
import GroupCard from '../../partials/GroupCard'
import Testimonial from '../../partials/Testimonial'
import Newsletter from '../../partials/Newsletter'

const BrowseGroups = () => {
  return (
    <>
    <Header />
      <PageHeader title="Browse Group" text="Browse Group"/>
      <GroupCard />
      {/* <Testimonial /> */}
      {/* <Newsletter /> */}
      <Footer />
</>
  )
}

export default BrowseGroups
