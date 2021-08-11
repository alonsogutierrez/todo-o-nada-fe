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
    let { picture, categories, name, price, description, itemNumber, sku, quantity } = _source
    const productMapped = {
      pictures: picture,
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
