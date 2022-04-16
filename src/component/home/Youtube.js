import React from 'react'
import { Col, Container, Row } from 'reactstrap'

const Youtube = () => {
  return (
    <Container>
      <Row className="margin-top-12">
        <Col sm={12} className="text-center">
          <div className="section-title">
            <h1>Conoce nuestro arte</h1>
          </div>
          <Row className="margin-top-4">
            <Col sm={12}>
              <div>
                <iframe
                  src="https://www.youtube.com/embed/0aYUO73CP00"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="video"
                />{' '}
                <iframe
                  src="https://www.youtube.com/embed/J9wRKzc_O40"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="video"
                />{' '}
                <iframe
                  src="https://www.youtube.com/embed/5d2r4sRDwE8"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="video"
                />{' '}
                <iframe
                  src="https://www.youtube.com/embed/gB8OIcLYetU"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="video"
                />{' '}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default Youtube
