/**
 *  Shop Main Page
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row } from 'reactstrap'
import PropTypes from 'prop-types'

import AllProduct from '../../api/product'
import { getFilterProductsdata } from '../../services'
import ProductList from '../../widgets/ProductList'
import ShopBanner from '../../widgets/shopfilter/ShopBanner'
import SideFilter from '../../widgets/shopfilter/SideFilter'
import SocialFilter from '../../widgets/shopfilter/SocialInfo'
import TopFilter from '../../widgets/shopfilter/TopFilter'
import SubHeader from './SubHeader'

class ShopPage extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      limit: 8,
      hasMoreProduct: true,
      getproduct: AllProduct,
    }
    this.onLoadMore = this.onLoadMore.bind(this)
    this.refreshPage = this.refreshPage.bind(this)
  }

  UNSAFE_componentWillMount() {
    if (this.state.limit < this.state.getproduct.length) {
      setTimeout(() => {
        this.setState({
          limit: this.state.limit + 8,
        })
      }, 2500)
    }
  }

  onLoadMore() {
    this.setState({
      limit: this.state.limit + 8,
    })
  }

  refreshPage() {
    window.location.reload(false)
  }

  render() {
    let { products } = this.props
    let layoutstyle = localStorage.getItem('setLayoutStyle')

    if (layoutstyle == null) {
      layoutstyle = localStorage.setItem('setLayoutStyle', 'col-sm-6 col-md-4')
    }

    return (
      <div className="site-content">
        <SubHeader />
        <div className="content-wrapper section-pt mb-3 mb-md-5">
          <Container>
            <Row>
              <div className="sidebar col-xl-3 col-lg-4 desktop">
                <div className="shop-sidebar-widgets">
                  <SideFilter />
                  <SocialFilter />
                  <ShopBanner />
                </div>
              </div>
              <div className="content col-xl-9 col-lg-8">
                <div className="products-header">
                  <div className="loop-header">
                    <div className="loop-header-tools">
                      <div className="loop-header-tools-wrapper">
                        <TopFilter productlength={products.length} />
                      </div>
                    </div>
                  </div>
                </div>
                {products.length > 0 ? (
                  <div>
                    <Row className="products products-loop grid ciyashop-products-shortcode pgs-product-list">
                      {products.slice(0, this.state.limit).map((product, index) => (
                        <ProductList product={product} key={index} layoutstyle={layoutstyle} />
                      ))}
                    </Row>
                    <div className="text-center">
                      <a onClick={this.onLoadMore} className="loadmore-btn">
                        Cargar más
                      </a>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Row className="products products-loop grid ciyashop-products-shortcode">
                      <div className="col-sm-12 text-center  mt-5">
                        <img
                          src={require(`../../assets/images/empty-search.jpg`)}
                          className="img-fluid mb-4"
                        />
                        <h3>Lo sentimos! No hay productos encontrados paara tu búsqueda! </h3>
                        <p>Intenta con otras palabras.</p>
                        <button onClick={this.refreshPage} className="btn btn-solid">
                          Continua comprando
                        </button>
                      </div>
                    </Row>
                  </div>
                )}
              </div>
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (state) => ({
  products: getFilterProductsdata(state.data, state.filters),
})

export default connect(mapDispatchToProps, {})(ShopPage)

ShopPage.defaultProps = {
  products: [],
}

ShopPage.propTypes = {
  products: PropTypes.array,
}
