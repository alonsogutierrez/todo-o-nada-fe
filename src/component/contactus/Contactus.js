import React, { Component } from 'react'
import { Col, Container, Row } from 'reactstrap'
import PropTypes from 'prop-types'
import Businessschedule from './Businessschedule'
import ContactDetail from './ContactDetail'
import ContactForm from './ContactForm'
import PageTitle from '../../widgets/PageTitle'

class Contactus extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }
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
          <div className="section-wrapper">
            <Row className="row-equal-height no-gutters">
              <Col lg={12}>
                <ContactForm />
              </Col>
            </Row>
          </div>
          <div className="section-wrapper section-ptb">
            <Container>
              <Businessschedule />
            </Container>
          </div>
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
