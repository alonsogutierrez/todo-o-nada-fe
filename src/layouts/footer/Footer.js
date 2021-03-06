import React from 'react'
import { Row, Col, Container } from 'reactstrap'
import { Link } from 'react-router-dom'

class Footer extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.Checkscroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.Checkscroll)
  }

  Checkscroll() {
    var scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop

    if (scrollTop > 350) {
      if (document.getElementById('back-to-top') != null) {
        document
          .getElementById('back-to-top')
          .setAttribute('style', 'display:block')
      }
    } else {
      if (document.getElementById('back-to-top') != null) {
        document
          .getElementById('back-to-top')
          .setAttribute('style', 'display:none')
      }
    }
  }

  ClicktoTop() {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' })
  }

  render() {
    let backtotop = { display: 'none' }
    return (
      <div>
        <footer className='site-footer'>
          <div className='footer-wrapper'>
            <div className='footer-widgets-wrapper'>
              <div className='footer'>
                <Container>
                  <Row>
                    <div className='col-lg-3 col-md-6 footer-align-left'>
                      <div className='logo-wrapper widget'>
                        <p>
                          <Link to='#'>
                            <img
                              className='img-fluid'
                              src={require(`../../assets/images/todo_o_nada_letras_logo.jpg`)}
                              alt='logo'
                            />
                          </Link>
                        </p>
                      </div>
                      <div className='text-content'>
                        <p className='mb-3 mt-4'>
                          Todo o nada tatto art enfocados en nuestra marca propia,
                          diseños exclusivos de tatuadores, y una técnica serigrafica
                          con mucho amor y dedicación.
                        </p>
                      </div>
                      <div className='pgs-social-profiles mt-4'>
                        <div className='social-profiles-wrapper'>
                          <div className='social-profiles-wrapper-inner social-profiles-default social-profiles-shape-square'>
                            <div className='social-profiles'>
                              <ul>
                                <li>
                                  <a
                                    href='https://www.facebook.com'
                                    title='Facebook'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                  >
                                    <i className='fa fa-facebook' />
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-lg-3 col-md-6 footer-align-left'>
                      <div className='footer-nav-menu widget'>
                        <h4 className='footer-title title'>Links importantes</h4>
                        <div className='menu-useful-links-container'>
                          <ul className='menu'>
                            <li className='menu-item active'>
                              <Link to='/'>Home</Link>
                            </li>
                            <li className='menu-item'>
                              <Link to='/aboutus'>Quienes somos</Link>
                            </li>
                            <li className='menu-item'>
                              <Link to='/contactus'>Contáctanos</Link>
                            </li>
                            <li className='menu-item'>
                              <Link to='/privacy-policy'>Política de privacidad</Link>
                            </li>
                            <li className='menu-item'>
                              <Link to='/terms-condition'>
                                Términos y condiciones
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className='col-lg-3 col-md-6 footer-align-left'>
                      <div className='pgs-contact-widget widget mt-4 mt-lg-0'>
                        <h4 className='footer-title title'>Información de contacto</h4>
                        <div className='footer-address'>
                          <ul>
                            <li>
                              <i className='fa fa-map-marker' />
                              <span>
                                Puente Alto, Santiago, Chile
                              </span>
                            </li>
                            <li className='pgs-contact-email'>
                              <i className='fa fa-envelope-o' />
                              <span>contacto@todoonadatattoart.cl</span>
                            </li>
                            <li>
                              <i className='fa fa-phone' />
                              <span>+569 9999 9999</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                    </div>
                    <div className='col-lg-3 col-md-6 footer-align-left'>
                        <h4 className='footer-title title'>Noticias</h4>
                        <div className='newsletter'>
                          <div className='section-field'>
                            <form className='newsletter_form'>
                              <div className='input-area'>
                                <input
                                  type='text'
                                  className='placeholder newsletter-email'
                                  name='newsletter_email'
                                  placeholder='Enter your email'
                                />
                              </div>
                              <div className='button-area'>
                                <span className='input-group-btn'>
                                  <button
                                    className='btn btn-icon newsletter-mailchimp submit'
                                    type='button'
                                  >
                                    Subscribete
                                  </button>
                                </span>
                                <span className='newsletter-spinner spinimg-pgs_newsletter_widget_2' />
                              </div>
                            </form>
                          </div>
                        </div>
                    </div>
                   
                  </Row>
                </Container>
              </div>
            </div>
            <div className='site-info'>
              <div className='footer-widget'>
                <Container>
                  <div className='row align-items-center'>
                    <Col md={6} className='float-left'>
                      <p>
                        {' '}
                        © Copyright 2020 <Link to='/home'>Todo o nada Tatto art</Link>{' '}
                        Todos los derechos reservados.
                      </p>
                    </Col>
                  </div>
                  <div className='clearfix' />
                </Container>
              </div>
            </div>
          </div>
        </footer>
        <div id='back-to-top' style={backtotop} onClick={this.ClicktoTop}>
          <Link className='top arrow'>
            <i className='fa fa-angle-up'></i>
          </Link>
        </div>
      </div>
    )
  }
}
export default Footer
