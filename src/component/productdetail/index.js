/**
 *  Shop Product Detail Page
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import { Row, Container, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import classnames from 'classnames'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import ProductDetailSupportInfo from './ProductDetailSupportInfo'
import PostDetail from '../../templates/post-detail'
import ProductSlider from '../home/ProductSlider'

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

class ProductDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allProducts: this.props.products,
      productId: parseInt(this.props.match.params.id),
      currentProduct: null,
      activeTab: '1',
    }
    this.toggle = this.toggle.bind(this)
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    let currentProductId = this.state.productId
    let allProducts = this.state.allProducts
    if (allProducts && allProducts.length > 0) {
      const product = allProducts.find((product) => product.id === currentProductId)
      if (product !== undefined) {
        this.setState({
          currentProduct: product,
        })
      }
    }
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      })
    }
  }

  render() {
    const currentProduct = this.state.currentProduct
    return (
      <div>
        {currentProduct !== null ? (
          // <!-- Links -->
          <div className="site-content">
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
                        <span>{currentProduct.category}</span>
                      </li>
                      <li>
                        <span>{currentProduct.name}</span>
                      </li>
                    </ul>
                  </div>
                </Row>
              </Container>
            </div>
            <div className="content-wrapper section-ptb">
              <Container>
                {/* PDP Details */}
                <PostDetail product={currentProduct} tabid={this.state.activeTab} />
                <div className="product-content-bottom">
                  <Nav tabs>
                    <NavItem active>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === '1' })}
                        onClick={() => {
                          this.toggle('1')
                        }}
                      >
                        Descripción
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={this.state.activeTab}>
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
                          <img src={require('../../assets/images/TALLAS_POLERAS.jpg')} />
                          <ProductDetailSupportInfo />
                        </div>
                      </div>
                    </TabPane>
                  </TabContent>
                  <div className="related products">
                    <h2>Productos relacionados</h2>
                    <div className="row">
                      <ProductSlider
                        productSub={currentProduct.subcategory}
                        settings={relatedSliderConfig}
                      />
                    </div>
                  </div>
                </div>
              </Container>
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}

const AppMapStateToProps = (state) => {
  return {
    products: state.data.products,
  }
}

export default connect(AppMapStateToProps)(withRouter(ProductDetail))

ProductDetail.defaultProps = {
  products: [],
  match: {},
}

ProductDetail.propTypes = {
  products: PropTypes.array,
  match: PropTypes.object,
}
