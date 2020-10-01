import React, { Component, Fragment } from 'react'
import { Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'

class Topbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  render() {
    return (
      <Fragment>
        <div
          className='topbar topbar-bg-color-default topbar-desktop-on topbar-mobile-off'
          style={{ display: 'none' }}
        >
          <div className='container-fluid'>
            <Row>
              <Col lg={6} sm={12}>
                <div className='topbar-left text-left'>
                  <div className='topbar-link'>
                    <ul>
                      <li className='topbar_item topbar_item_type-email'>
                        <Link to='/contactus'>
                          <i className='fa fa-envelope-o'>&nbsp;</i>
                          support@ciyashop.com
                        </Link>
                      </li>
                      <li className='topbar_item topbar_item_type-phone_number'>
                        <Link to='/contactus'>
                          <i className='fa fa-phone'>&nbsp;</i>126-632-2345
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
              <Col lg={6} sm={12}>
                <div className='topbar-right text-right'>
                  <div className='topbar-link'>
                    <ul>
                      <li className='topbar_item topbar_item_type-topbar_menu'>
                        <div className='menu-top-bar-menu-container'>
                          <ul className='top-menu list-inline'>
                            <li className='menu-item'>
                              <Link to='/Account/AccountProfile'>
                                My account
                              </Link>
                            </li>
                            <li>
                              <Link
                                to='#'
                                onClick={this.toggle}
                                data-toggle='modal'
                                data-target='#'
                              >
                                <i className='fa fa-sign-in'>&nbsp;</i> Login
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className='topbar_item topbar_item_type-social_profiles'>
                        <div className='topbar-social_profiles-wrapper'>
                          <ul className='topbar-social_profiles'>
                            <li className='topbar-social_profile'>
                              <a
                                href={'https://www.facebook.com'}
                                target='_blank'
                                rel='noopener noreferrer'
                              >
                                <i className='fa fa-facebook' />
                              </a>
                            </li>
                            <li className='topbar-social_profile'>
                              <a
                                href={'https://twitter.com/'}
                                target='_blank'
                                rel='noopener noreferrer'
                              >
                                <i className='fa fa-twitter' />
                              </a>
                            </li>
                            <li className='topbar-social_profile'>
                              <a
                                href={'https://plus.google.com/'}
                                target='_blank'
                                rel='noopener noreferrer'
                              >
                                <i className='fa fa-google-plus' />
                              </a>
                            </li>
                            <li className='topbar-social_profile'>
                              <a
                                href={'https://vimeo.com/'}
                                target='_blank'
                                rel='noopener noreferrer'
                              >
                                <i className='fa fa-vimeo' />
                              </a>
                            </li>
                            <li className='topbar-social_profile'>
                              <a
                                href={'https://in.pinterest.com/'}
                                target='_blank'
                                rel='noopener noreferrer'
                              >
                                <i className='fa fa-pinterest' />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Topbar
