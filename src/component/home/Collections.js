import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'

const collections = [
  {
    id: 1,
    imageSrc: require(`../../assets/images/sub-banner-02-1.jpg`),
    name: 'Colección Todo o Nada',
    link: '/todo-o-nada'
  },
  {
    id: 2,
    imageSrc: require(`../../assets/images/sub-banner-02-1.jpg`),
    name: 'Colección Irezumi Art',
    link: '/irezumi-art'
  },
  {
    id: 3,
    imageSrc: require(`../../assets/images/sub-banner-02-1.jpg`),
    name: 'Colección Chicas',
    link: '/irezumi-art'
  }
]

const Collections = () => (
  <Container>
    <Row className="margin-top-8 mb-7 pb-3 pb-sm-0">
      <Col sm={12}>
        <Row>
          {collections.map(collection => (
            <div className="col-lg-4" key={collection.id}>
              <div className="ciyashop_banner_wrapper">
                <div className="ciyashop_banner ciyashop_banner-style-style-1 ciyashop_banner-effect-border banner-2">
                  <img
                    className="ciyashop_banner-image img-fluid inline"
                    alt="Banner"
                    src={collection.imageSrc}
                  />
                  <div className="ciyashop_banner-content ciyashop_banner-content-hleft ciyashop_banner-content-vtop">
                    <div className="ciyashop_banner-content-wrapper">
                      <div className="ciyashop_banner-content-inner-wrapper">
                        <div className="ciyashop_banner-text-wrap ciyashop_banner-text-wrap-1 hidden-lg hidden-md hidden-sm hidden-xs">
                          <div className="ciyashop_banner-text">{collection.name}</div>
                        </div>
                        <div className="ciyashop_banner-btn-wrap ciyashop_banner-btn-style-link ciyashop_banner-btn-shape-square mt-0">
                          <Link to={collection.link} className="ciyashop_banner-btn inline_hover">
                            Compra ahora
                          </Link>{' '}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Row>
      </Col>
    </Row>
  </Container>
)

export default Collections
