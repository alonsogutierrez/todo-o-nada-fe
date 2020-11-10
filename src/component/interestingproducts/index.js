import React from 'react'
import { Col, Container, Row } from 'reactstrap'

import ProductSlider from '../home/ProductSlider'

const saleslider = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
}

const InterestingProducts = () => (
  <div className="content-wrapper">
    <Container>
      <Row className="margin-top-12">
        <Col sm={12} className="text-center">
          <div className="section-title">
            <h2 className="title">Los más pedidos</h2>
            <p>Todo o nada tatto art, mensaje de aliento para que la gente se motive ;).</p>
          </div>
          <Row className="margin-top-4">
            <Col sm={12}>
              <div className="products products-loop grid ciyashop-products-shortcode row">
                <ProductSlider settings={saleslider} />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </div>
)

export default InterestingProducts
