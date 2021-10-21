import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Container, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap'
import Loader from 'react-loader-spinner'
import PropTypes from 'prop-types'

import SupportInfo from './SupportInfo'
import GeneralInfo from './GeneralInfo'
import ClientAPI from '../../common/ClientAPI'

const ProductDetail = (props) => {
  const { match } = props
  const [itemNumber] = useState(match.params.itemNumber)
  const [activeTab] = useState('1')
  const [clientAPI] = useState(new ClientAPI())
  const [actualProduct, setActualProduct] = useState()
  const [loading, setLoading] = useState(true)

  const getProductCategory = (categories) => {
    if (!categories) {
      return ''
    }
    const firstTwoCategories = categories.slice(0, 2)
    let itemCategories = firstTwoCategories.map((cat) => cat.toUpperCase())
    return itemCategories.join('-')
  }

  const isProductWithGeneralSizes = (categories) => {
    return categories.includes('hombre') || categories.includes('mujer')
  }

  useEffect(async () => {
    const productResponseData = await clientAPI.getProductByItemNumber(itemNumber)
    setActualProduct(productResponseData)
    setLoading(false)
    window.scrollTo(0, 0)
  }, [])

  let productDescription = ''
  let productCategory = ''
  let productName = ''
  const sizesImgStyle = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '60%',
    borderRadius: '5px',
  }

  if (actualProduct) {
    let { description, category, name } = actualProduct
    productDescription = description ? description : ''
    productCategory = getProductCategory(category)
    productName = name ? name : ''
  }

  return (
    <div>
      <div className="site-content">
        {actualProduct && (
          <>
            <div className="inner-intro">
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
                        <span>{productCategory}</span>
                      </li>
                      <li>
                        <span>{productName}</span>
                      </li>
                    </ul>
                  </div>
                </Row>
              </Container>
            </div>
            <div className="content-wrapper section-ptb">
              {loading ? (
                <>
                  <div>
                    <Loader type="Puff" color="#04d39f" height="100" width="100" />
                  </div>
                </>
              ) : (
                <>
                  <Container>
                    <GeneralInfo product={actualProduct} tabid={activeTab} />
                    <div className="product-content-bottom">
                      <Nav tabs>
                        <NavItem active>
                          <NavLink className="nav-item active">Descripción</NavLink>
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
                              <p>{productDescription}</p>
                              <br />
                              {isProductWithGeneralSizes(actualProduct.category) && (
                                <img
                                  style={sizesImgStyle}
                                  src={require('./../../assets/images/sizes.jpg').default}
                                />
                              )}
                              <SupportInfo />
                            </div>
                          </div>
                        </TabPane>
                      </TabContent>
                    </div>
                  </Container>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default withRouter(ProductDetail)

ProductDetail.defaultProps = {
  match: {},
}

ProductDetail.propTypes = {
  match: PropTypes.object,
}
