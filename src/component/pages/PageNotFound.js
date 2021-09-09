import React, { Component } from 'react'
import { Col, Container, Row } from 'reactstrap'

class PageNotFound extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div className="site-content">
        <div className="inner-intro header_intro header_intro_bg-image header_intro_opacity header_intro_opacity-custom">
          <Container>
            <Row className="intro-title align-items-center intro-section-center">
              <Col>
                <div className="intro-title-inner">
                  <h1>404 - Página no encontrada</h1>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="content-wrapper section-pt pb-6">
          <Container>
            <Row className="align-items-center">
              <Col lg={12} className="text-center">
                <div className="error404 no-results not-found">
                  <div className="error-block clearfix">
                    <h1 className="error-block-title">404</h1>
                    <p className="error-block-subtitle">
                      Lo sentimos no podemos encontrar esta página !
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}
export default PageNotFound
