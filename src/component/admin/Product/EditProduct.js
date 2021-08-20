import React, { useState, useEffect } from 'react'
import { Container } from 'reactstrap'
import PropTypes from 'prop-types'
import Loader from 'react-loader-spinner'

import ProductForm from './ProductForm'

import ClientAPI from '../../../common/ClientAPI'

const EditProduct = (props) => {
  const [productData, setProductData] = useState({})
  const [clientAPI] = useState(new ClientAPI())
  const [loading, setLoading] = useState(true)

  useEffect(async () => {
    const itemNumber = props.match.params.itemNumber
    const productByItemNumberResponse = await clientAPI.getProductByItemNumber(itemNumber)
    setProductData(productByItemNumberResponse)
    setLoading(false)
  }, [loading])

  if (loading) {
    return (
      <>
        <div>
          <Loader type="Puff" color="#04d39f" height="100" width="100" />
        </div>
      </>
    )
  }

  return (
    <div>
      <div className="site-content">
        <div className="content-wrapper section-ptb">
          <Container>
            <ProductForm product={productData} />
          </Container>
        </div>
      </div>
    </div>
  )
}
export default EditProduct

EditProduct.defaultProps = {
  match: {},
}

EditProduct.propTypes = {
  match: PropTypes.object,
}
