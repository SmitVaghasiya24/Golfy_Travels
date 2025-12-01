import React from 'react'
import BreadcrumbHero from '../../components/Breadcrumb'
import Destination from '../../components/Destination'
import Footer from '../../components/Footer'

function Destinations() {
  return (
    <div>
      <BreadcrumbHero title="Destination" background="/breadcrumb.jpeg" />
      <Destination type="destination" />
      <Footer />
    </div>
  )
}

export default Destinations