import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Container, Row, Col, Input } from 'reactstrap'
import PropTypes from 'prop-types'
import { toast, ToastContainer } from 'react-toastify'

//import PropTypes from 'prop-types'

import DiscountAPI from '../../../common/DiscountAPI'
import setDiscounts from './../../../actions/setDiscounts'
import setChangeDiscounts from '../../../actions/setChangeDiscounts'

const DiscountCoupon = (props) => {
  const [coupon, setCoupon] = useState('')
  const [isValidCouponIngressed, setIsValidCouponIngressed] = useState(false)
  const [discountAPI] = useState(new DiscountAPI())
  const [errors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleSearchInput = (e) => {
    const couponInputLetter = e.target.value
    const couponFormatted = couponInputLetter //.replace(/[^a-zA-ZáéíñóúüÁÉÍÑÓÚÜ´'\s]/g, '')
    setCoupon(couponFormatted)
  }

  const handleSearchValidation = () => {
    //TODO: Add search input validation logic
    return true
  }

  const onSearchSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const searchValidation = handleSearchValidation()
    if (searchValidation) {
      try {
        console.log('coupon: ', coupon)

        const discountResult = await discountAPI.getDiscountByCode(coupon)
        props.setDiscounts(discountResult)
        props.setChangeDiscounts(!props.changeDiscounts)
        const isValidCoupon = discountResult.isActive && discountResult.code === coupon
        if (isValidCoupon) {
          setIsValidCouponIngressed(isValidCoupon)
          toast.success('Cupón cargado correctamente!')
        } else {
          toast.error('Cupón invalido!')
        }

        setLoading(false)
      } catch (err) {
        setLoading(false)
        toast.error('Cupón invalido!')
        console.error('error en validando cuponde de descuento: ', err.message)
      }
    } else {
      setLoading(false)
    }
  }

  useEffect(() => {
    var evt = document.createEvent('Event')
    evt.initEvent('load', false, false)
    window.dispatchEvent(evt)
    window.scrollTo(0, 0)
  }, [])

  const rowStyle = {
    paddingTop: '15px',
  }

  const colStyle = {
    marginLeft: '-15px',
  }

  return (
    <>
      <ToastContainer autoClose={1000} draggable={false} />
      <Container>
        <form role="search" onSubmit={(e) => onSearchSubmit(e)}>
          <Row style={rowStyle} className="ciya-tools-action ciya-tools-search">
            <Col xs="10">
              <Input
                type="search"
                className="form-control"
                maxLength={150}
                name="search_text_input"
                id="search_text_input"
                placeholder="Ingresa tu cupón de descuento"
                value={coupon}
                onChange={(e) => handleSearchInput(e)}
                disabled={isValidCouponIngressed}
              />
              <span className="error">{errors['search-error']}</span>
            </Col>
            <Col xs="2" style={colStyle}>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-solid glyph-icon pgsicon-ecommerce-gift"
                onClick={(e) => onSearchSubmit(e)}
              ></button>
            </Col>
          </Row>
        </form>
      </Container>
    </>
  )
}

const mapDispatchToProps = (dispatch) => ({
  setDiscounts: (products) => dispatch(setDiscounts(products)),
  setChangeDiscounts: (changeProducts) => dispatch(setChangeDiscounts(changeProducts)),
})

export default connect(null, mapDispatchToProps)(withRouter(DiscountCoupon))

DiscountCoupon.defaultProps = {
  history: {},
  setDiscounts: () => {},
  changeDiscounts: false,
  setChangeDiscounts: () => {},
}

DiscountCoupon.propTypes = {
  history: PropTypes.object,
  setDiscounts: PropTypes.func,
  changeDiscounts: PropTypes.bool,
  setChangeDiscounts: PropTypes.func,
}

// Resume.defaultProps = {
//   cartItems: [],
// }

// Resume.propTypes = {
//   cartItems: PropTypes.array,
// }
