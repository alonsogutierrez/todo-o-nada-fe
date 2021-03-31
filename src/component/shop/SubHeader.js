import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'

const SubHeader = () => {
  return (
    <>
      <div className="inner-intro">
        <Container>
          <Row className="intro-title align-items-center">
            <Col md={6} className="text-left">
              <div className="intro-title-inner">
                <h1>Compra</h1>
              </div>
            </Col>
            <Col md={6} className="text-right">
              <ul className="ciyashop_breadcrumbs page-breadcrumb breadcrumbs">
                <li className="home">
                  <span>
                    <Link className="bread-link bread-home" to="/">
                      Home
                    </Link>
                  </span>
                </li>
                <li>
                  <span>Productos</span>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default SubHeader
