import React from 'react'
import { Col, Container, Row } from 'reactstrap'

import ProductSlider from './ProductSlider'

const sliderConfig = {
  dots: false,
  infinite: true,
  slidesToShow: 5,
  autoplay: true,
  speed: 1000,
  autoplaySpeed: 5000,
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

const ProductSliderHome = () => (
  <Container>
    <Row className="margin-top-12">
      <Col sm={12} className="text-center">
        <div className="section-title">
          <h1>Nuevos lanzamientos</h1>
        </div>
        <Row className="margin-top-4">
          <Col sm={12}>
            <div className="products products-loop grid ciyashop-products-shortcode row">
              <ProductSlider settings={sliderConfig} />
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  </Container>
)

export default ProductSliderHome
