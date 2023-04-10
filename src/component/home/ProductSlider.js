import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import { Col } from 'reactstrap'
import PropTypes from 'prop-types'

import ClientAPI from '../../common/ClientAPI'
import setChangeCartData from '../../actions/setChangeCartData'
import ProductInfo from './../search/ProductInfo'

const ProductSlider = ({ settings, type = 'principal' }) => {
  const [clientAPI] = useState(new ClientAPI())
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])

  useEffect(() => {
    const getMoreInterestingProducts = async (type) => {
      setLoading(true)
      const productsResponse = await clientAPI.getMoreInterestingProducts(type)

      if (productsResponse.hits.length > 0) {
        const hits = productsResponse.hits

        setProducts(
          hits.map((hit) => {
            let {
              picture,
              categories,
              name,
              price,
              description,
              itemNumber,
              sku,
              quantity,
              details,
            } = hit._source
            return {
              picture,
              categories,
              name,
              price,
              description,
              itemNumber,
              sku,
              id: hit._id,
              quantity,
              details,
            }
          })
        )
      }
      setLoading(false)
    }
    getMoreInterestingProducts(type)
  }, [products.length])

  let settingsUpdated = {}
  if (products.length > 0) {
    settingsUpdated = settings
    let slidesToShow = 5
    if (products.length < 5) {
      slidesToShow = products.length
    }
    settingsUpdated.slidesToShow = slidesToShow
    settings = settingsUpdated
  }

  return (
    <>
      <Col sm={12}>
        <div className="products-listing-items-wrapper products-listing-carousel">
          <div
            className="products"
            data-nav-arrow="false"
            data-items={4}
            data-md-items={3}
            data-sm-items={3}
            data-xs-items={2}
            data-xx-items={1}
            data-space={20}
          >
            <Slider {...settings} className="slider-spacing-10 slider-arrow-hover">
              {loading && (
                <>
                  <div>
                    <Loader type="Puff" color="#04d39f" height="100" width="100" />
                  </div>
                </>
              )}
              {!loading &&
                products.length > 0 &&
                products.map((product, index) => (
                  <div key={index}>
                    <div className="item">
                      <ProductInfo product={product} />
                    </div>
                  </div>
                ))}
            </Slider>
          </div>
        </div>
      </Col>
    </>
  )
}

const mapStateToProps = (state) => ({
  changeCart: state.changeCartDataReducer.changeCartData,
})

const mapDispatchToProps = (dispatch) => ({
  setChangeCart: (change) => dispatch(setChangeCartData(change)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductSlider)

ProductSlider.defaultProps = {
  settings: {},
  type: 'principal',
  productSub: '',
}

ProductSlider.propTypes = {
  settings: PropTypes.object,
  type: PropTypes.string,
  productSub: PropTypes.string,
}
