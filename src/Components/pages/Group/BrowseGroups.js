import React from 'react'
import Header from '../../Widgets/Header'
import PageHeader from '../../Widgets/PageHeader?'
import Footer from '../../Widgets/Footer'
import GroupCard from '../../partials/GroupCard'
const BrowseGroups = () => {
  return (
    <>
      <Header/>
      <PageHeader title="Browse Group" text="Browse Group" />
      <GroupCard/>
      <Footer/>
    </>
  )
}

export default BrowseGroups
