/**
 *  Contact Us Page
 */
import { GoogleApiWrapper, Map } from 'google-maps-react'
import React, { Component } from 'react'
import { Col, Container, Row } from 'reactstrap'
import PropTypes from 'prop-types'
import Businessschedule from '../../widgets/Businessschedule'
import ContactDetail from '../../widgets/ContactDetail'
import ContactForm from '../../widgets/ContactForm'
import PageTitle from '../../widgets/PageTitle'

const mapStyles = {
  width: '100%',
  height: '100%'
}

class Contactus extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }
  render() {
    return (
      <div className='site-content'>
        <div className='inner-intro header_intro header_intro_bg-image header_intro_opacity header_intro_opacity-custom'>
          <Container>
            <Row className='intro-title align-items-center intro-section-center'>
              <PageTitle title='Contact Us' />
            </Row>
          </Container>
        </div>
        <div className='content-wrapper'>
          <div className='section-wrapper section-pt pb-6'>
            <ContactDetail />
          </div>
          <div className='section-wrapper'>
            <Row className='row-equal-height no-gutters'>
              <Col md={6}>
                <ContactForm />
              </Col>
              <Col md={6} className='google-map'>
                <Map
                  google={this.props.google}
                  zoom={14}
                  style={mapStyles}
                  initialCenter={{
                    lat: -37.817065,
                    lng: 144.955903
                  }}
                />
              </Col>
            </Row>
          </div>
          <div className='section-wrapper section-ptb'>
            <Container>
              <Businessschedule />
            </Container>
          </div>
        </div>
      </div>
    )
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyBfqH9LV7E0y3DvblpSUoAHkA33S7pWCII'
})(Contactus)

Contactus.defaultProps = {
  google: {}
}

Contactus.propTypes = {
  google: PropTypes.object
}
