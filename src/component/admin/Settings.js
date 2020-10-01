/**
 *  Settings
 */
import React, { Component } from 'react'
import { Col, Container, Row } from 'reactstrap'
import AdminProfileDetail from '../../widgets/AdminProfileDetail'
import Adminsitebar from './Adminsitebar'

class Settings extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }
  render() {
    return (
      <div className='section-ptb'>
        <Container>
          <AdminProfileDetail />
          <Row>
            <Adminsitebar />
            <Col lg={9} className='mt-4 mt-lg-0'>
              <div className='woocommerce-Address'>
                <Row>
                  <Col lg={6}>
                    <div className='woocommerce-Address-title'>
                      <h5 className='mb-0'>Deactivate Your Account</h5>
                    </div>
                    <div className='woocommerce-Address-info mt-4'>
                      <div className='custom-control custom-radio mb-2'>
                        <input
                          type='radio'
                          id='customRadio1'
                          name='customRadio'
                          className='custom-control-input'
                        ></input>
                        <label
                          className='custom-control-label'
                          htmlFor='customRadio1'
                        >
                          This is temporary. I&quot;ll be back.
                        </label>
                      </div>
                      <div className='custom-control custom-radio mb-2'>
                        <input
                          type='radio'
                          id='customRadio2'
                          name='customRadio'
                          className='custom-control-input'
                        ></input>
                        <label
                          className='custom-control-label'
                          htmlFor='customRadio2'
                        >
                          My account was hacked.
                        </label>
                      </div>
                      <div className='custom-control custom-radio mb-2'>
                        <input
                          type='radio'
                          id='customRadio3'
                          name='customRadio'
                          className='custom-control-input'
                        ></input>
                        <label
                          className='custom-control-label'
                          htmlFor='customRadio3'
                        >
                          I have a privacy concern.
                        </label>
                      </div>
                      <div className='custom-control custom-radio'>
                        <input
                          type='radio'
                          id='customRadio4'
                          name='customRadio'
                          className='custom-control-input'
                        ></input>
                        <label
                          className='custom-control-label'
                          htmlFor='customRadio4'
                        >
                          Other
                        </label>
                      </div>
                      <div className='form-group mt-3 mb-0'>
                        <label>Please explain further </label>
                        <input type='email' className='form-control'></input>
                      </div>
                    </div>
                  </Col>
                  <Col lg={6} className='mt-4 mt-md-5 mt-lg-0'>
                    <div className='woocommerce-Address-title'>
                      <h5 className='mb-0'>Notifications</h5>
                    </div>
                    <div className='woocommerce-Address-info mt-4'>
                      <div className='custom-control custom-checkbox mb-2'>
                        <input
                          type='checkbox'
                          className='custom-control-input'
                          id='customCheck1'
                        ></input>
                        <label
                          className='custom-control-label'
                          htmlFor='customCheck1'
                        >
                          Enable Notifications
                        </label>
                      </div>
                      <div className='custom-control custom-checkbox mb-2'>
                        <input
                          type='checkbox'
                          className='custom-control-input'
                          id='customCheck2'
                        ></input>
                        <label
                          className='custom-control-label'
                          htmlFor='customCheck2'
                        >
                          Show Desktop Notifications
                        </label>
                      </div>
                      <div className='custom-control custom-checkbox mb-2'>
                        <input
                          type='checkbox'
                          className='custom-control-input'
                          id='customCheck3'
                        ></input>
                        <label
                          className='custom-control-label'
                          htmlFor='customCheck3'
                        >
                          Get e-mail notification for my own activity
                        </label>
                      </div>
                      <div className='custom-control custom-checkbox'>
                        <input
                          type='checkbox'
                          className='custom-control-input'
                          id='customCheck4'
                        ></input>
                        <label
                          className='custom-control-label'
                          htmlFor='customCheck4'
                        >
                          Get e-mail notification for request and reviews
                        </label>
                      </div>
                    </div>
                  </Col>
                  <Col lg={12}>
                    <a className='btn btn-primary mt-4' href='#'>
                      Delete account
                    </a>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
export default Settings
