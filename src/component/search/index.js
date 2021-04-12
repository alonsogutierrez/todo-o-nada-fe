import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row } from 'reactstrap'
import PropTypes from 'prop-types'

import ClientAPI from '../../common/ClientAPI'
import ProductsAPI from '../../api/product'
import { getFilterProductsdata } from '../../services'
import ProductCard from './ProductCard'

import SideFilter from './filters/SideFilter'
import TopFilter from './filters/TopFilter'
import ShopBanner from './ShopBanner'
import SocialFilter from './SocialInfo'
import SubHeader from './SubHeader'

class SearchPage extends Component {
  constructor(props) {
    super()
    this.state = {
      limit: 8,
      clientAPI: new ClientAPI(),
      productsAPI: ProductsAPI,
      products: props.products,
      categoryNameSelected: '',
    }
  }

  onLoadMore() {
    const { limit } = this.state
    this.setState({
      limit: limit + 8,
    })
  }

  refreshPage() {
    window.location.reload(false)
  }

  isCategoryQuery() {
    const { match } = this.props
    const categoryName = match.params.categoryName
    this.setState(
      {
        categoryNameSelected: categoryName,
      },
      () => {
        return categoryName ? true : false
      }
    )
  }

  async componentDidMount() {
    const { clientAPI, categoryNameSelected, limit, productsAPI } = this.state
    if (this.isCategoryQuery()) {
      try {
        const productsByCategory = await clientAPI.getProductsByCategory(categoryNameSelected)
        //TODO: Map response to set same product structure
        this.setState({
          products: productsByCategory,
        })
      } catch (err) {
        console.log('Error trying to get products by category')
      }
    }
    if (limit < productsAPI.length) {
      setTimeout(() => {
        this.setState({
          limit: limit + 8,
        })
      }, 2500)
    }
  }

  render() {
    const { products } = this.props
    const { limit } = this.state
    let layoutstyle = localStorage.getItem('setLayoutStyle')

    if (layoutstyle == null) {
      layoutstyle = localStorage.setItem('setLayoutStyle', 'col-sm-6 col-md-4')
    }
    return (
      <>
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
                        {products.slice(0, limit).map((product, index) => (
                          <ProductCard product={product} key={index} layoutstyle={layoutstyle} />
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
      </>
    )
  }
}

const mapDispatchToProps = (state) => ({
  products: getFilterProductsdata(state.data, state.filters),
})

export default connect(mapDispatchToProps, {})(SearchPage)

SearchPage.defaultProps = {
  products: [],
  match: {},
}

SearchPage.propTypes = {
  products: PropTypes.array,
  match: PropTypes.object,
}
