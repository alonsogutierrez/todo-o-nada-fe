import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import PropTypes from 'prop-types'

import PaymentDetail from './PaymentDetail.js'
import ClientAPI from '../../../common/ClientAPI'

const SuccessPayment = (props) => {
  const [shippingAmount, setShippingAmount] = useState(0.0)
  const [clientAPI] = useState(new ClientAPI())
  const [isPaymentValid, setIsPaymentValid] = useState(false)
  const [response, setResponse] = useState({
    data: null,
    loading: true,
  })
  const [cartItems, setCartItems] = useState([])

  const setShippingAmountInfo = () => {
    const shippingAmount = localStorage.getItem('TotalShippingCharge')
    if (shippingAmount) {
      setShippingAmount(parseFloat(0.0))
    }
  }

  const getOrderData = async (orderNumber, id) => {
    const order = await clientAPI.getOrderByOrderNumber(orderNumber, id)
    return order
  }

  const getOrderPaymentStatus = async (orderNumber) => {
    const orderPaymentStatus = await clientAPI.getOrderPaymentStatus(orderNumber)
    return orderPaymentStatus
  }

  const readCartItems = () => {
    setCartItems(JSON.parse(localStorage.getItem('finalCheckoutCartItems')))
    localStorage.removeItem('finalCheckoutCartItems')
    localStorage.removeItem('formValues')
    localStorage.removeItem('errors')
    if (!cartItems) {
      props.history.push(`/`)
    }
  }

  useEffect(() => {
    setShippingAmountInfo()
    readCartItems()
    const fetchOrderData = async () => {
      const orderNumber = new URLSearchParams(props.location.search).get('orderNumber')
      const id = new URLSearchParams(props.location.search).get('id')

      // TODO: Call to Payments API and check if order is with valid payment
      const orderPaymentState = await getOrderPaymentStatus(orderNumber)
      if (orderPaymentState.isValid) {
        const orderData = await getOrderData(orderNumber, id)
        setResponse({
          data: orderData,
          loading: false,
        })
        setIsPaymentValid(true)
      } else {
        setResponse({
          data: {},
          loading: false,
        })
        setIsPaymentValid(false)
      }
    }
    fetchOrderData()
    let evt = document.createEvent('Event')
    evt.initEvent('load', false, false)
    window.dispatchEvent(evt)
    window.scrollTo(0, 0)
  }, [])

  const orderData = response.data ? response.data : {}

  return (
    <>
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
              <Col lg={7}>
                {isPaymentValid ? (
                  <PaymentDetail
                    orderData={orderData}
                    totalShippingCarge={shippingAmount}
                    loading={response.loading}
                  ></PaymentDetail>
                ) : (
                  <>
                    <h1>Pago inválido</h1>
                  </>
                )}
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
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
