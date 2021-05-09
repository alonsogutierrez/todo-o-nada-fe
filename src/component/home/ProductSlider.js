import React from 'react'
import { connect } from 'react-redux'
import Slider from 'react-slick'
import { Col } from 'reactstrap'
import PropTypes from 'prop-types'
import { ToastContainer } from 'react-toastify'

import sliderProducts from '../../api/sliderProducts.json'
import setChangeCartData from '../../actions/setChangeCartData'
import ProductInfo from './../search/ProductInfo'

const ProductSlider = ({ settings }) => {
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
              {sliderProducts.map((product, index) => (
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
