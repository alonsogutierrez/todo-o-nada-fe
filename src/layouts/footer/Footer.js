import React from 'react'
import { Row, Col, Container } from 'reactstrap'
import { Link } from 'react-router-dom'

class Footer extends React.Component {
  constructor(props) {
    super(props)
  }

  handleInstagramClick(e) {
    e.preventDefault()
    window.open('https://www.instagram.com/todoonadatattooart', '_blank')
  }
  render() {
    return (
      <div>
        <footer className="site-footer">
          <div className="footer-wrapper">
            <div className="footer-widgets-wrapper">
              <div className="footer">
                <Container>
                  <Row>
                    <div className="col-lg-4 col-md-6 footer-align-left">
                      <div className="logo-wrapper widget">
                        <p>
                          <Link to="/home">
                            <img
                              className="img-fluid"
                              src={require(`../../assets/images/todo_o_nada_letras_logo.jpg`)}
                              alt="logo"
                            />
                          </Link>
                        </p>
                      </div>
                      <div className="text-content">
                        <p className="mb-3 mt-4">
                          Reproducción de obras de arte de los/as mejores artistas del tatuaje de
                          America del Sur y el mundo.
                        </p>
                      </div>
                      <div className="pgs-social-profiles mt-4">
                        <div className="social-profiles-wrapper">
                          <div className="social-profiles-wrapper-inner social-profiles-default social-profiles-shape-square">
                            <div className="social-profiles">
                              <ul>
                                <li>
                                  <a
                                    href="https://www.instagram.com/todoonadatattooart/"
                                    title="Instagram"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <i className="fa fa-instagram" />
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="https://www.facebook.com/todoonadatattooart/"
                                    title="Facebook"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <i className="fa fa-facebook" />
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 footer-align-left">
                      <div className="footer-nav-menu widget">
                        <h4 className="footer-title title">Links importantes</h4>
                        <div className="menu-useful-links-container">
                          <ul className="menu">
                            <li className="menu-item active">
                              <Link to="/">Home</Link>
                            </li>
                            <li className="menu-item">
                              <Link to="/aboutus">Quienes somos</Link>
                            </li>
                            <li className="menu-item">
                              <Link to="/contactus">Contáctanos</Link>
                            </li>
                            <li className="menu-item">
                              <Link to="/privacy-policy">Política de privacidad</Link>
                            </li>
                            <li className="menu-item">
                              <Link to="/terms-and-conditions">Términos y condiciones</Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 footer-align-left">
                      <div className="pgs-contact-widget widget mt-4 mt-lg-0">
                        <h4 className="footer-title title">Información de contacto</h4>
                        <div className="footer-address">
                          <ul>
                            <li>
                              <i className="fa fa-map-marker" />
                              <span>Calle del Arzobispo #0607, Providencia, Chile</span>
                            </li>
                            <li className="pgs-contact-email">
                              <i className="fa fa-envelope-o" />
                              <span>todoonadatattooart2017@gmail.com</span>
                            </li>
                            <li>
                              <i className="fa fa-instagram" />
                              <span>
                                <Link onClick={(e) => this.handleInstagramClick(e)}>
                                  @todoonadatattooart
                                </Link>
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Row>
                </Container>
              </div>
            </div>
            <div className="site-info">
              <div className="footer-widget">
                <Container>
                  <div className="row align-items-center">
                    <Col md={6} className="float-left">
                      <p>
                        {' '}
                        © Copyright {new Date().getFullYear()}{' '}
                        <a
                          href="https://prodevperspectives.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          ProDevPerspectives
                        </a>{' '}
                        Todos los derechos reservados.
                      </p>
                    </Col>
                  </div>
                  <div className="clearfix" />
                </Container>
              </div>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}
export default Footer
