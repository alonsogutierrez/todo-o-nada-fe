import React, { useState, useEffect, useCallback } from 'react'
import { Container } from 'reactstrap'
import PropTypes from 'prop-types'
import Loader from 'react-loader-spinner'

import DiscountForm from './Form/DiscountForm'

import DiscountAPI from '../../../common/DiscountAPI'

const GeneralForm = (props) => {
  const [discountAPI] = useState(new DiscountAPI())
  const [discountRequest, setDiscountRequest] = useState({
    loading: false,
    data: {},
  })
  useEffect(async () => {
    const discountId = props.match.params.discountId
    await fetchDiscountData(discountId)
  }, [])

  const fetchDiscountData = useCallback(async (discountCode) => {
    setDiscountRequest({ loading: true, data: discountRequest.data })
    let discountByCodeResponse = ''
    if (discountCode) {
      discountByCodeResponse = await discountAPI.getDiscountByCode(discountCode)
    } else {
      discountByCodeResponse = {}
    }
    setDiscountRequest({ loading: false, data: discountByCodeResponse })
    return
  }, [])

  if (discountRequest.loading) {
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
            <DiscountForm
              discount={discountRequest.data}
              fetchDiscountData={fetchDiscountData}
              isEditDiscount={false}
            />
          </Container>
        </div>
      </div>
    </div>
  )
}
export default GeneralForm

GeneralForm.defaultProps = {
  match: {},
}

GeneralForm.propTypes = {
  match: PropTypes.object,
}
