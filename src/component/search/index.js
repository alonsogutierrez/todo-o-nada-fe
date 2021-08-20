import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Row } from 'reactstrap'
import PropTypes from 'prop-types'
import queryString from 'query-string'

import ClientAPI from '../../common/ClientAPI'
import ProductCard from './ProductCard'

import SideFilter from './filters/SideFilter'
import TopFilter from './filters/TopFilter'
import SocialFilter from './SocialInfo'
import SubHeader from './SubHeader'

import setActualProductsData from '../../actions/setActualProductsData'
import setChangeProducts from '../../actions/setChangeProducts'

import { getFilterProductsdata } from '../../services'

const SearchPage = ({
  products,
  setActualProductsData,
  setChangeProducts,
  changeProducts,
  categorySelectedData,
  location,
  match,
}) => {
  const [productsPerPage, setProductsPerPage] = useState(16)
  const [clientAPI] = useState(new ClientAPI())
  const [isEnabledLoadMoreButton, setIsEnabledLoadMoreButton] = useState(true)

  const onLoadMore = () => {
    let totalProducts = 0
    if (products) {
      const { total = { value: 0 } } = products
      if (total) {
        totalProducts = total.value
      }
    }
    setIsEnabledLoadMoreButton(productsPerPage + 16 <= totalProducts)
    let maxProductsPerPage = 0
    if (productsPerPage + 16 >= totalProducts) {
      maxProductsPerPage = totalProducts
    } else {
      maxProductsPerPage = productsPerPage + 16
    }
    setProductsPerPage(maxProductsPerPage)
  }

  const refreshPage = () => {
    window.location.reload(false)
  }

  const isCategoryQuery = () => {
    const categoryName = match.params.categoryName
    return categoryName ? true : false
  }

  const searchByCategory = async () => {
    let categoryName = categorySelectedData
    try {
      if (!categoryName) {
        categoryName = match.params.categoryName
      }
      const productsByCategory = await clientAPI.getProductsByCategory(categoryName)
      setActualProductsData(productsByCategory)
      setChangeProducts(!changeProducts)
    } catch (err) {
      console.log('Error trying to get products by category')
    }
  }

  const searchByText = async () => {
    const search = queryString.parse(location.search)
    const { query } = search
    try {
      const productsBySearch = await clientAPI.getSearch(query)
      setActualProductsData(productsBySearch)
      setChangeProducts(!changeProducts)
    } catch (err) {
      console.log('Error trying to get products by search')
    }
  }

  useEffect(() => {
    if (isCategoryQuery()) {
      searchByCategory()
    } else {
      searchByText()
    }
  }, [isEnabledLoadMoreButton, categorySelectedData])

  let actualProducts = []
  if (products) {
    const { hits = [] } = products
    if (hits) {
      actualProducts = hits
    }
  }
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
                </div>
              </div>
              <div className="content col-xl-9 col-lg-8">
                <div className="products-header">
                  <div className="loop-header">
                    <div className="loop-header-tools">
                      <div className="loop-header-tools-wrapper">
                        <TopFilter totalProducts={productsPerPage} />
                      </div>
                    </div>
                  </div>
                </div>
                {actualProducts && actualProducts.length > 0 ? (
                  <div>
                    <Row className="products products-loop grid ciyashop-products-shortcode pgs-product-list">
                      {actualProducts.slice(0, productsPerPage).map((product, index) => (
                        <ProductCard product={product} key={index} layoutstyle={layoutstyle} />
                      ))}
                    </Row>
                    {isEnabledLoadMoreButton && (
                      <div className="text-center">
                        <a onClick={onLoadMore} className="loadmore-btn">
                          Cargar más
                        </a>
                      </div>
                    )}
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
                        <button onClick={refreshPage} className="btn btn-solid">
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

const mapStateToProps = (state) => ({
  products: getFilterProductsdata(
    state.actualProductsDataReducer.actualProductsData,
    state.filters
  ),
  filters: state.filters,
  changeProducts: state.changeProductsDataReducer.changeProductsData,
  categorySelectedData: state.categorySelectedDataReducer.categorySelectedData,
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
  categorySelectedData: '',
}

SearchPage.propTypes = {
  products: PropTypes.array,
  match: PropTypes.object,
  location: PropTypes.object,
  setActualProductsData: PropTypes.func,
  changeProducts: PropTypes.bool,
  setChangeProducts: PropTypes.func,
  categorySelectedData: PropTypes.string,
}
