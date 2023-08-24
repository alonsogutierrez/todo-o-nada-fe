import React from 'react'
import { connect } from 'react-redux'
import Slider from 'react-slick'
import { Col } from 'reactstrap'
import PropTypes from 'prop-types'

import setChangeCartData from '../../actions/setChangeCartData'
import ProductInfo from './../search/ProductInfo'

const ProductSlider = ({ settings, carrouselData, carrouselKey }) => {
  const products = carrouselData ? carrouselData.carrousels[carrouselKey].products : []
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
              {carrouselData &&
                carrouselData.carrousels[carrouselKey].products.length > 0 &&
                carrouselData.carrousels[carrouselKey].products.map((productKey, index) => {
                  const productData = carrouselData.products[productKey]
                  const { _source, _id } = productData
                  if (_source) {
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
                    } = _source
                    const productMapped = {
                      picture,
                      categories,
                      name,
                      price,
                      description,
                      itemNumber,
                      sku,
                      id: _id,
                      quantity,
                      details,
                    }

                    return (
                      <div key={index}>
                        <div className="item">
                          <ProductInfo product={productMapped} />
                        </div>
                      </div>
                    )
                  }
                })}
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
  carrouselData: {},
  carrouselKey: '',
}

ProductSlider.propTypes = {
  settings: PropTypes.object,
  carrouselData: PropTypes.object,
  carrouselKey: PropTypes.string,
}
