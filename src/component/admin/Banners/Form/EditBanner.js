import React, { useState, useEffect, useCallback } from 'react'
import { Container } from 'reactstrap'
import PropTypes from 'prop-types'
import Loader from 'react-loader-spinner'

import BannerForm from './BannerForm'

import ClientAPI from './../../../../common/ClientAPI'

const EditBanner = (props) => {
  const [clientAPI] = useState(new ClientAPI())
  const [bannerRequest, setBannerRequest] = useState({
    loading: false,
    data: {},
  })
  useEffect(async () => {
    const bannerNumber = props.match.params.bannerNumber
    await fetchBannerData(bannerNumber)
  }, [])

  const fetchBannerData = useCallback(async (bannerNumber) => {
    setBannerRequest({ loading: true, data: bannerRequest.data })
    const bannerByBannerNumberResponse = await clientAPI.getBannerByBannerNumber(bannerNumber)
    setBannerRequest({ loading: false, data: bannerByBannerNumberResponse })
    return
  }, [])

  if (bannerRequest.loading) {
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
            <BannerForm
              banner={bannerRequest.data}
              fetchBannerData={fetchBannerData}
              isEditForm={true}
            />
          </Container>
        </div>
      </div>
    </div>
  )
}
export default EditBanner

EditBanner.defaultProps = {
  match: {},
}

EditBanner.propTypes = {
  match: PropTypes.object,
}
