import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Container, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import SupportInfo from './SupportInfo'
import GeneralInfo from './GeneralInfo'
import ProductSlider from '../home/ProductSlider'
import ClientAPI from '../../common/ClientAPI'

const relatedSliderConfig = {
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

const ProductDetail = (props) => {
  const { match } = props
  const [itemNumber] = useState(match.params.itemNumber)
  const [activeTab, setActiveTab] = useState('1')
  const [clientAPI] = useState(new ClientAPI())
  const [actualProduct, setActualProduct] = useState(null)

  useEffect(async () => {
    const productResponseData = await clientAPI.getProductByItemNumber(itemNumber)
    if (!productResponseData) {
      const { history } = props
      history.push('/pagenotfound')
    }
    setActualProduct(productResponseData)
    window.scrollTo(0, 0)
  }, [])

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }

  return (
    <div>
      <div className="site-content">
        <div className="inner-intro">
          {actualProduct !== null && (
            <Container>
              <Row className="intro-title align-items-center">
                <div className="col-12">
                  <ul className="ciyashop_breadcrumbs page-breadcrumb breadcrumbs">
                    <li className="home">
                      <span>
                        <Link className="bread-link bread-home" to="/">
                          Home
                        </Link>
                      </span>
                    </li>
                    <li>
                      <span>{actualProduct.category}</span>
                    </li>
                    <li>
                      <span>{actualProduct.name}</span>
                    </li>
                  </ul>
                </div>
              </Row>
            </Container>
          )}
        </div>
        <div className="content-wrapper section-ptb">
          <Container>
            {actualProduct !== null && <GeneralInfo product={actualProduct} tabid={activeTab} />}
            <div className="product-content-bottom">
              <Nav tabs>
                <NavItem active>
                  <NavLink
                    className={classnames({ active: activeTab === '1' })}
                    onClick={() => {
                      toggle('1')
                    }}
                  >
                    Descripción
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <div className="tab-content" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="description"
                      role="tabpanel"
                      aria-labelledby="home-tab"
                    >
                      <h2>Descripción del producto</h2>
                      <p>Características y detalle del producto, tallas, etc...</p>
                      <img src={require('../../assets/images/TALLAS_POLERAS.jpg').default} />
                      <SupportInfo />
                    </div>
                  </div>
                </TabPane>
              </TabContent>
              {actualProduct !== null && (
                <div className="related products">
                  <h2>Productos relacionados</h2>
                  <div className="row">
                    <ProductSlider
                      productSub={actualProduct.subcategory}
                      settings={relatedSliderConfig}
                    />
                  </div>
                </div>
              )}
            </div>
          </Container>
        </div>
      </div>
    </div>
  )
}

export default withRouter(ProductDetail)

ProductDetail.defaultProps = {
  match: {},
  history: {},
}

ProductDetail.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
}
