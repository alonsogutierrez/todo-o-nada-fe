import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Slider from 'react-slick'
import { Col } from 'reactstrap'
import PropTypes from 'prop-types'
import { ToastContainer } from 'react-toastify'

import ClientAPI from '../../common/ClientAPI'
import setChangeCartData from '../../actions/setChangeCartData'
import ProductInfo from './../search/ProductInfo'

const ProductSlider = ({ settings }) => {
  const [clientAPI] = useState(new ClientAPI())
  const [products, setProducts] = useState([])

  useEffect(() => {
    const getMoreInterestingProducts = async () => {
      const productsResponse = await clientAPI.getMoreInterestingProducts()
      if (productsResponse.hits.length > 0) {
        const hits = productsResponse.hits

        setProducts(
          hits.map((hit) => {
            let {
              pictures, //TODO: Get image for CDN Repository of images
              categories,
              name,
              price,
              description,
              itemNumber,
              sku,
              quantity,
            } = hit._source
            const randomNumberForTest = Math.random() * (6 - 3) + 3
            if (!pictures) {
              pictures = [
                `products/product-0${parseInt(randomNumberForTest)}.png`,
                `products/product-0${parseInt(randomNumberForTest)}.png`,
              ]
            }
            return {
              pictures,
              categories,
              name,
              price,
              description,
              itemNumber,
              sku,
              id: hit._id,
              quantity,
            }
          })
        )
      }
    }
    getMoreInterestingProducts()
  }, [products.length])

  return (
    <>
      <ToastContainer autoClose={1000} draggable={false} />
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
              {products.length === 0 && (
                <>
                  <div>
                    <h2>Loading data...</h2>
                  </div>
                </>
              )}
              {products.length > 0 &&
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
  productSub: '',
}

ProductSlider.propTypes = {
  settings: PropTypes.object,
  productSub: PropTypes.string,
}
