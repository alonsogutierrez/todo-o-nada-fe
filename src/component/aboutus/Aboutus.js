import React, { Component } from 'react'
import { Container } from 'reactstrap'

import OurHistory from './OurHistory'
import InterestingFacts from './InterestingFacts'
import PageTitle from '../../widgets/PageTitle'

class Aboutus extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }
  render() {
    return (
      <div className="site-content">
        <div className="inner-intro header_intro header_intro_bg-image header_intro_opacity header_intro_opacity-custom">
          <Container>
            <div className="row intro-title align-items-center intro-section-center">
              <PageTitle title="Quienes somos" />
            </div>
          </Container>
        </div>
        <div className="content-wrapper">
          <OurHistory />
          <InterestingFacts />
        </div>
      </div>
    )
  }
}
export default Aboutus
