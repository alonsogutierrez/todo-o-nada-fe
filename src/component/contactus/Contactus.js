import React, { Component } from 'react'
import { Container, Row } from 'reactstrap'
import PropTypes from 'prop-types'
import ContactDetail from './ContactDetail'
import PageTitle from '../../widgets/PageTitle'

class Contactus extends Component {
  render() {
    return (
      <div className="site-content">
        <div className="inner-intro header_intro header_intro_bg-image header_intro_opacity header_intro_opacity-custom">
          <Container>
            <Row className="intro-title align-items-center intro-section-center">
              <PageTitle title="Contáctanos" />
            </Row>
          </Container>
        </div>
        <div className="content-wrapper">
          <ContactDetail />
        </div>
      </div>
    )
  }
}
export default Contactus

Contactus.defaultProps = {
  google: {},
}

Contactus.propTypes = {
  google: PropTypes.object,
}
