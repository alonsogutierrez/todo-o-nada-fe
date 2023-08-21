import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ProductInfo from './ProductInfo'

class ProductCard extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { product, isAdminView, key } = this.props
    const { _source, _id } = product
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
      <div key={key} className={this.props.layoutstyle}>
        <ProductInfo product={productMapped} isAdminView={isAdminView} />
      </div>
    )
  }
}

export default ProductCard

ProductCard.defaultProps = {
  product: {},
  isAdminView: false,
  layoutstyle: '',
  key: '',
}

ProductCard.propTypes = {
  product: PropTypes.object,
  isAdminView: PropTypes.bool,
  layoutstyle: PropTypes.string,
  key: PropTypes.string,
}
