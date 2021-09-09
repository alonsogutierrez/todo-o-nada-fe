/**
 *  Maintenance Page
 */
import React, { Component } from 'react'
import { Col, Container, Row } from 'reactstrap'
import maintenanceimg from '../../assets/images/maintenance.png'

class Maintenance extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div className="maintenance">
        <div className="site-content">
          <div className="content-wrapper">
            <Container>
              <Row className="align-items-center justify-content-center">
                <Col md={11} lg={7} className="text-center">
                  <div className="mntc-cs-item mntc-cs-content text-center">
                    <h1>Sitio bajo mantención</h1>
                    <p>El sitio esta en mantención actualmente. Volveremos prontamente</p>
                    <img
                      className="mb-2 mt-3"
                      src={maintenanceimg}
                      title="maintenance"
                      alt="maintenance"
                    />
                    <p className="mt-4 mt-md-5">
                      Te pedimos disculpas por el inconveniente, estamos haciendo nuestro mejor
                      esfuerzo para brindarles un mejor servicio.
                    </p>
                    <div className="coming-soon-social">
                      <ul>
                        <li>
                          <a
                            href="https://www.instagram.com/todoonadatattooart"
                            rel="noreferrer"
                            target="_blank"
                          >
                            {' '}
                            <i className="fa fa-instagram"></i>{' '}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    )
  }
}
export default Maintenance
