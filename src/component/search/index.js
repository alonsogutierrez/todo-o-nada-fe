import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Row } from 'reactstrap'
import PropTypes from 'prop-types'

import ClientAPI from '../../common/ClientAPI'
import ProductsAPI from '../../api/product'
import { getFilterProductsdata } from '../../services'
import ProductList from './ProductList'

import SideFilter from './filters/SideFilter'
import TopFilter from './filters/TopFilter'
import ShopBanner from './ShopBanner'
import SocialFilter from './SocialInfo'
import SubHeader from './SubHeader'

const SearchPage = (props) => {
  const [limit, setLimit] = useState(8)
  const [clientAPI] = useState(new ClientAPI())
  const [productsAPI] = useState(ProductsAPI)
  const [products, setProducts] = useState(props.products)
  const [categoryNameSelected, setCategoryNameSelected] = useState('')

  const onLoadMore = () => {
    setLimit(limit + 8)
  }

  const refreshPage = () => {
    window.location.reload(false)
  }

  const isCategoryQuery = () => {
    const categoryName = props.match.params.categoryName
    setCategoryNameSelected(categoryName)
    return categoryName ? true : false
  }

  useEffect(async () => {
    if (isCategoryQuery()) {
      try {
        const productsByCategory = await clientAPI.getProductsByCategory(categoryNameSelected)
        //TODO: Map response to set same product structure
        setProducts(productsByCategory)
      } catch (err) {
        console.log('Error trying to get products by category')
      }
    }
    if (limit < productsAPI.length) {
      setTimeout(() => {
        setLimit(limit + 8)
      }, 2500)
    }
  }, [])

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
                        <ProductList product={product} key={index} layoutstyle={layoutstyle} />
                      ))}
                    </Row>
                    <div className="text-center">
                      <a onClick={onLoadMore} className="loadmore-btn">
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
