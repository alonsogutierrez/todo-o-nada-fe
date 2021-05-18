/**
 *  Success Screen
 */
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import PropTypes from 'prop-types'

import PaymentDetail from './PaymentDetail.js'
import ClientAPI from './../../../common/ClientAPI'

const SuccessPayment = (props) => {
  const [shippingAmount, setShippingAmount] = useState(0)
  const [clientAPI] = useState(new ClientAPI())
  const [orderNumber] = useState(new URLSearchParams(props.location.search).get('orderNumber'))
  const [order, setOrder] = useState({})
  const [loading, setLoading] = useState(false)
  const [cartItems, setCartItems] = useState([])

  const setShippingAmountInfo = () => {
    if (localStorage.getItem('TotalShippingCharge') !== null) {
      setShippingAmount(parseFloat(localStorage.getItem('TotalShippingCharge')))
    }
  }

  const loadOrderData = async () => {
    const order = await clientAPI.getOrderByOrderNumber(orderNumber)
    return order[0]
  }

  const readCartItems = () => {
    setCartItems(JSON.parse(localStorage.getItem('finalCheckoutCartItems')))
    localStorage.removeItem('finalCheckoutCartItems')
    localStorage.removeItem('formValues')
    localStorage.removeItem('errors')
    if (!cartItems) {
      this.props.history.push(`/`)
    }
  }
  const renderPaymentInfo = (user, shippingAmount) => {
    console.log('loading: ', loading)
    console.log('user, order, shippingAmount: ', user, order, shippingAmount)
    if (!loading && order && Object.keys(order).length > 0) {
      return (
        <PaymentDetail
          orderData={order}
          userData={user}
          totalShippingCarge={shippingAmount}
        ></PaymentDetail>
      )
    }
    return <h2>Loading data...</h2>
  }

  useEffect(async () => {
    setShippingAmountInfo()
    readCartItems()
    setLoading(true)
    setOrder(await loadOrderData())
    setLoading(false)
    let evt = document.createEvent('Event')
    evt.initEvent('load', false, false)
    window.dispatchEvent(evt)
    window.scrollTo(0, 0)
  }, [])

  console.log('orderDta: ', order)

  const { paymentData } = order
  let user = {}
  if (paymentData) {
    user = paymentData.user
  }

  return (
    <div>
      <div className="inner-intro">
        <Container>
          <Row className="intro-title align-items-center">
            <Col md={6} className="text-left">
              <div className="intro-title-inner">
                <h1>Mi cuenta</h1>
              </div>
            </Col>
            <Col md={6} className="text-right">
              <ul className="ciyashop_breadcrumbs page-breadcrumb breadcrumbs">
                <li className="home">
                  <span>
                    <Link className="bread-link bread-home" to="/">
                      Home
                    </Link>
                  </span>
                </li>
                <li>
                  <span>Mi cuenta</span>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="section-ptb">
        <Container>
          <Row className="justify-content-center">
            <Col lg={7}>{renderPaymentInfo(user, shippingAmount)}</Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  userData: state.userDataReducer.userData,
  orderData: state.orderDataReducer.orderData,
})

export default connect(mapStateToProps)(SuccessPayment)

SuccessPayment.defaultProps = {
  history: {},
  location: {},
  userData: {},
  orderData: {},
}

SuccessPayment.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  userData: PropTypes.object,
  orderData: PropTypes.object,
}
