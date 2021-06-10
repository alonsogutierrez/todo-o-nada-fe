import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ProductInfo from './ProductInfo'

class ProductCard extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { product } = this.props
    const { _source, _id } = product
    let { pictures, categories, name, price, description, itemNumber, sku, quantity } = _source
    //TODO: Get image for CDN Repository of images
    const randomNumberForTest = Math.random() * (6 - 3) + 3
    if (!pictures) {
      pictures = [
        `products/product-0${parseInt(randomNumberForTest)}.png`,
        `products/product-0${parseInt(randomNumberForTest)}.png`,
      ]
    }
    const productMapped = {
      pictures,
      categories,
      name,
      price,
      description,
      itemNumber,
      sku,
      id: _id,
      quantity,
    }
    return (
      <div key={1} className={this.props.layoutstyle}>
        <ProductInfo product={productMapped} />
      </div>
    )
  }
}

export default ProductCard

ProductCard.defaultProps = {
  product: {},
  layoutstyle: '',
}

ProductCard.propTypes = {
  product: PropTypes.object,
  layoutstyle: PropTypes.string,
}
