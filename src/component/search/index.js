import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row } from 'reactstrap'
import PropTypes from 'prop-types'
import queryString from 'query-string'

import ClientAPI from '../../common/ClientAPI'
import ProductCard from './ProductCard'

import SideFilter from './filters/SideFilter'
import TopFilter from './filters/TopFilter'
import ShopBanner from './ShopBanner'
import SocialFilter from './SocialInfo'
import SubHeader from './SubHeader'

import setActualProductsData from '../../actions/setActualProductsData'
import setChangeProducts from '../../actions/setChangeProducts'

import { getFilterProductsdata } from '../../services'

class SearchPage extends Component {
  constructor() {
    super()
    this.state = {
      limit: 8,
      clientAPI: new ClientAPI(),
      categoryNameSelected: '',
      searchText: '',
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
    return categoryName ? true : false
  }

  async searchByCategory() {
    const { match, setActualProductsData, setChangeProducts, changeProducts } = this.props
    const categoryName = match.params.categoryName
    try {
      const { clientAPI } = this.state
      const productsByCategory = await clientAPI.getProductsByCategory(categoryName)
      setActualProductsData(productsByCategory)
      setChangeProducts(!changeProducts)
    } catch (err) {
      console.log('Error trying to get products by category')
    }
  }

  async searchByText() {
    const { location, setActualProductsData, setChangeProducts, changeProducts } = this.props
    const search = queryString.parse(location.search)
    const { query } = search
    try {
      const { clientAPI } = this.state
      const productsBySearch = await clientAPI.getSearch(query)
      setActualProductsData(productsBySearch)
      setChangeProducts(!changeProducts)
    } catch (err) {
      console.log('Error trying to get products by search')
    }
  }

  componentDidMount() {
    const { limit } = this.state
    const { products } = this.props
    const { actualProductsData } = products
    let actualProducts = []
    if (actualProductsData && actualProductsData.hits) {
      const { hits } = actualProductsData
      if (hits) {
        actualProducts = hits
      }
    } else {
      if (this.isCategoryQuery()) {
        this.searchByCategory()
      } else {
        this.searchByText()
      }
    }

    if (limit < actualProducts.length) {
      setTimeout(() => {
        this.setState({
          limit: limit + 8,
        })
      }, 2500)
    }
  }

  render() {
    const { products } = this.props
    let actualProducts = []
    let totalProducts = 0
    if (products) {
      const { hits = [], total = { value: 0 } } = products
      if (hits && total) {
        actualProducts = hits
        totalProducts = total.value
      }
    }

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
                          <TopFilter totalProducts={totalProducts} />
                        </div>
                      </div>
                    </div>
                  </div>
                  {actualProducts && actualProducts.length > 0 ? (
                    <div>
                      <Row className="products products-loop grid ciyashop-products-shortcode pgs-product-list">
                        {actualProducts.slice(0, limit).map((product, index) => (
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

const mapStateToProps = (state) => ({
  products: getFilterProductsdata(
    state.actualProductsDataReducer.actualProductsData,
    state.filters
  ),
  filters: state.filters,
  changeProducts: state.changeProductsDataReducer.changeProductsData,
})

const mapDistpachToProps = (dispatch) => ({
  setActualProductsData: (products) => dispatch(setActualProductsData(products)),
  setChangeProducts: (changeProducts) => dispatch(setChangeProducts(changeProducts)),
})

export default connect(mapStateToProps, mapDistpachToProps)(SearchPage)

SearchPage.defaultProps = {
  products: [],
  match: {},
  location: {},
  setActualProductsData: () => {},
  changeProducts: false,
  setChangeProducts: () => {},
}

SearchPage.propTypes = {
  products: PropTypes.array,
  match: PropTypes.object,
  location: PropTypes.object,
  setActualProductsData: PropTypes.func,
  changeProducts: PropTypes.bool,
  setChangeProducts: PropTypes.func,
}
