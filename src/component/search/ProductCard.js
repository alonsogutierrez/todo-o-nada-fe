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
    return (
      <div key={1} className={this.props.layoutstyle}>
        <ProductInfo product={product} />
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
