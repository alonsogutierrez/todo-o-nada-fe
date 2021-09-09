/**
 *  CommingSoon Page
 */
import React, { Component } from 'react'
import { Col, Container, Row } from 'reactstrap'
import CommingSoonimg from '../../assets/images/comingsoon.png'
import CommingSoonCounter from './CommingSoonCounter'

class ComingSoon extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <body>
        <div className="coming-soon">
          <div className="site-content">
            <div className="content-wrapper">
              <Container>
                <Row className="align-items-center justify-content-center">
                  <Col md={11} lg={7} className="text-center">
                    <div className="mntc-cs-item mntc-cs-content pb-0">
                      <h1 className="text-blue">Volveremos prontamente!</h1>
                      <p>
                        Estamos trabajando para mejorar nuestro sitio, por favor paciencia y no te
                        olvides de nuestras redes sociales, por ahí tamién atendemos.
                      </p>
                    </div>
                    <img src={CommingSoonimg} title="CommingSoon" alt="CommingSoon" />
                    <div className="mntc-cs-item mntc-cs-content coming-soon-countdown p-0">
                      <CommingSoonCounter time={'100150'}></CommingSoonCounter>
                    </div>
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
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </div>
      </body>
    )
  }
}
export default ComingSoon
