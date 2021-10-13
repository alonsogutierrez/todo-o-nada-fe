import React, { useState, useEffect, useCallback } from 'react'
import { Container } from 'reactstrap'
import PropTypes from 'prop-types'
import Loader from 'react-loader-spinner'

import ProductForm from './ProductForm/ProductForm'

import ClientAPI from '../../../common/ClientAPI'

const EditProduct = (props) => {
  const [clientAPI] = useState(new ClientAPI())
  const [productRequest, setProductRequest] = useState({
    loading: false,
    data: {},
  })
  useEffect(async () => {
    const itemNumber = props.match.params.itemNumber
    setProductRequest({ loading: true })
    await fetchProductData(itemNumber)
  }, [])

  const fetchProductData = useCallback(async (itemNumber) => {
    const productByItemNumberResponse = await clientAPI.getProductByItemNumber(itemNumber)
    setProductRequest({ loading: false, data: productByItemNumberResponse })
    return
  }, [])

  if (productRequest.loading) {
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
            <ProductForm product={productRequest.data} fetchProductData={fetchProductData} />
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
