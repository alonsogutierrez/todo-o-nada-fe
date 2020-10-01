/* eslint-disable react/no-string-refs */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col, Container, Row } from 'reactstrap'
import PropTypes from 'prop-types'

import HeaderCheckOut from './HeaderCheckOut'
import AddressForm from './AddressForm'
import OrderResume from './OrderResume'

import setErrorsForm from '../../../actions/setErrorsForm'
import setUserData from '../../../actions/setUserData'
import setOrderData from '../../../actions/setOrderData'

import orderCreator from './Order'

import validators from '../../../helpers/validators'
import ClientAPI from '../../../common/ClientAPI'

class CheckOut extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clientAPI: new ClientAPI(),
      formValues: {},
      errors: {},
    }
    this.setFormValues = this.setFormValues.bind(this)
  }

  componentDidMount() {
    var evt = document.createEvent('Event')
    evt.initEvent('load', false, false)
    window.dispatchEvent(evt)
    window.scrollTo(0, 0)
  }

  setFormValues(formValues) {
    this.setState({ formValues }, () => {
      this.props.setUserData(formValues)
    })
  }

  readCartItems() {
    var cart = JSON.parse(localStorage.getItem('LocalCartItems'))
    if (cart == null) {
      this.props.history.push(`/`)
    }
    return cart
  }

  async onCheckOutSubmit(e) {
    e.preventDefault()
    if (this.handleValidation()) {
      const { clientAPI, formValues } = this.state
      const { setOrderData } = this.props
      const shippingData = {
        total: 1000,
      }
      const cartItems = localStorage.getItem('LocalCartItems')
      localStorage.setItem('finalCheckoutCartItems', cartItems)
      const cartItemsParsed = JSON.parse(cartItems)
      try {
        const orderDataToSave = orderCreator(cartItemsParsed, formValues, shippingData)
        const orderDataSaved = await clientAPI.createOrder(orderDataToSave)
        setOrderData(orderDataSaved)
        localStorage.removeItem('LocalCartItems')
        console.log('Order well saved: ', orderDataSaved)
        this.props.history.push('/SuccessScreen')
      } catch (e) {
        console.log('Can`t createOrder: ', e)
      }
    }
  }

  handleValidation() {
    let formValues = this.state.formValues
    let errors = {}
    let formIsValid = false

    const validatorResponse = validators.validatorUserForm(formValues)

    if (!validatorResponse.isValid) {
      errors = validatorResponse.errors
      const { setErrorsForm } = this.props
      setErrorsForm(errors)
      return formIsValid
    }
    this.props.setUserData(formValues)
    formIsValid = true
    return formIsValid
  }

  render() {
    return (
      <div className="site-content">
        <div className="inner-intro">
          <HeaderCheckOut />
        </div>
        <div className="content-wrapper mb-7">
          <Container>
            <form onSubmit={this.onCheckOutSubmit.bind(this)}>
              <Row className="mt-5">
                <Col className="col-lg-6">
                  <Row>
                    <AddressForm setFormValues={this.setFormValues} />
                  </Row>
                </Col>
                <Col lg={6} className="mt-5">
                  <OrderResume />
                </Col>
              </Row>
            </form>
          </Container>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  setErrorsForm: (errorsForm) => dispatch(setErrorsForm(errorsForm)),
  setUserData: (userData) => dispatch(setUserData(userData)),
  setOrderData: (orderData) => dispatch(setOrderData(orderData)),
})

export default connect(null, mapDispatchToProps)(CheckOut)

CheckOut.defaultProps = {
  history: {},
  setErrorsForm: () => {},
  setUserData: () => {},
  setOrderData: () => {},
}

CheckOut.propTypes = {
  history: PropTypes.object,
  setErrorsForm: PropTypes.func,
  setUserData: PropTypes.func,
  setOrderData: PropTypes.func,
}
