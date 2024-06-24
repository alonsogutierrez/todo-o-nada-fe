import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'reactstrap'

import ProductSlider from './ProductSlider'
import ClientAPI from '../../common/ClientAPI'

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

const ProductSliderHome = () => {
  const [clientAPI] = useState(new ClientAPI())
  const [carrouselData, setCarrouselData] = useState(null)

  useEffect(async () => {
    async function getConfigData() {
      try {
        const response = await clientAPI.getCarrouselConfig()
        setCarrouselData(response.data)
      } catch (err) {
        console.error('error trying to get carrousel config')
      }
    }
    if (!carrouselData) {
      getConfigData()
    }
  }, [])

  return (
    <Container>
      {carrouselData &&
        carrouselData.carrouselsOrder.map((carrouselKey) => {
          if (carrouselKey !== 'dropIdx-0') {
            return (
              <Row className="margin-top-12" key={`index-${carrouselKey}`}>
                <Col sm={12} className="text-center">
                  <div className="section-title">
                    <h1>{carrouselData.carrousels[carrouselKey].title}</h1>
                  </div>
                  <Row className="margin-top-4">
                    <Col sm={12}>
                      <div className="products products-loop grid ciyashop-products-shortcode row">
                        <ProductSlider
                          settings={sliderConfig}
                          carrouselData={carrouselData}
                          carrouselKey={carrouselKey}
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            )
          }
        })}
    </Container>
  )
}

export default ProductSliderHome
