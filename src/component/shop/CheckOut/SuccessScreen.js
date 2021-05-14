/**
 *  Success Screen
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import PropTypes from 'prop-types'

import productsAPI from '../../../api/product.json'
import PaymentDetail from './PaymentDetail.js'

class SuccessScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      TotalShippingCarge: 0,
      formValues: {},
    }
    this.setFormValues = this.setFormValues.bind(this)
  }

  componentDidMount() {
    // TODO: Call to bff to get payment status, if if valid show data if not say a wrong message
    this.setFormValues()
    this.ReadCartItems()
    this.forceUpdate()
    var evt = document.createEvent('Event')
    evt.initEvent('load', false, false)
    window.dispatchEvent(evt)
    window.scrollTo(0, 0)
  }

  setFormValues() {
    const { userData } = this.props
    this.setState({ formValues: userData }, () => {
      if (localStorage.getItem('TotalShippingCharge') !== null) {
        this.setState({
          TotalShippingCarge: parseFloat(localStorage.getItem('TotalShippingCharge')),
        })
      }
    })
  }

  ReadCartItems() {
    this.setState(
      {
        cartItems: JSON.parse(localStorage.getItem('finalCheckoutCartItems')),
      },
      () => {
        localStorage.removeItem('finalCheckoutCartItems')
        localStorage.removeItem('formValues')
        localStorage.removeItem('errors')
        if (this.state.cartItems === null) {
          this.props.history.push(`/`)
        }
      }
    )
  }

  //TODO: Create functions to get all prices, TOTAL, SUBTOTAL AND DISPATCH
  getOrderSubTotal(products) {
    let total = 0
    products.forEach((product) => {
      total += product.quantity * product.prices[0].basePriceSales
    })
    return total
  }

  getProductImage(product) {
    const productFind = productsAPI.find((productAPI) => {
      return product.sku === productAPI['id']
    })
    if (productFind) {
      return productFind.pictures[0]
    }
  }

  getOrderTotal(products, totalShippingCarge) {
    return this.getOrderSubTotal(products) + totalShippingCarge
  }

  render() {
    const { orderData } = this.props
    const { paymentData } = orderData.order
    const { user } = paymentData
    const userData = user
    const { TotalShippingCarge } = this.state

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
              <Col lg={7}>
                <PaymentDetail
                  orderData={orderData.order}
                  userData={userData}
                  totalShippingCarge={TotalShippingCarge}
                ></PaymentDetail>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userData: state.userDataReducer.userData,
  orderData: state.orderDataReducer.orderData,
})

export default connect(mapStateToProps)(SuccessScreen)

SuccessScreen.defaultProps = {
  history: {},
  userData: {},
  orderData: {},
}

SuccessScreen.propTypes = {
  history: PropTypes.object,
  userData: PropTypes.object,
  orderData: PropTypes.object,
}
