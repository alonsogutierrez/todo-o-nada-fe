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
import setChangeCartData from '../../../actions/setChangeCartData'

import orderCreator from './helpers/order'

import validators from '../../../helpers/validators'
import ClientAPI from '../../../common/ClientAPI'

class CheckOut extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clientAPI: new ClientAPI(),
      formValues: {},
      errors: {},
      loading: false,
      flagScrollErrors: false,
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
    if (!cart) {
      this.props.history.push(`/`)
    }
    return cart
  }

  onCheckOutSubmit(e) {
    e.preventDefault()
    this.setState({ loading: true }, async () => {
      const { dispatchType } = this.props
      const formValidation = this.handleValidation(dispatchType)
      if (formValidation) {
        const { clientAPI, formValues } = this.state
        const { setOrderData, setChangeCart, changeCart, dispatchType, discountData } = this.props
        const cartItems = localStorage.getItem('LocalCartItems')
        localStorage.setItem('finalCheckoutCartItems', cartItems)
        const cartItemsParsed = JSON.parse(cartItems)
        try {
          const orderDataToSave = orderCreator(
            cartItemsParsed,
            formValues,
            dispatchType,
            discountData
          )
          let orderDataSaved = {}
          try {
            orderDataSaved = await clientAPI.createOrder(orderDataToSave)
            setOrderData(orderDataSaved)
            localStorage.removeItem('LocalCartItems')
            setChangeCart(!changeCart)
            window.location.replace(orderDataSaved.redirect_to)
          } catch (err) {
            if (err.message == 'Request failed with status code 400') {
              this.setState({ loading: false })
              let errors = {}
              errors['email'] = 'Ingresa un correo que exista por favor'
              const { setErrorsForm } = this.props
              setErrorsForm(errors)
              this.setState({ flagScrollErrors: true })
            } else {
              throw new Error('Cant create order in payment api')
            }
          }
        } catch (e) {
          this.setState({ loading: false })
        }
      } else {
        this.setState({ loading: false })
        setTimeout(() => {
          this.setState({ flagScrollErrors: false })
        }, 1 * 1000)
      }
    })
  }

  handleValidation(dispatchType) {
    const { formValues } = this.state
    let errors = {}
    let formIsValid = false
    this.props.setErrorsForm(errors)

    const validatorResponse = validators.validatorUserForm(formValues, dispatchType)

    if (!validatorResponse.isValid) {
      errors = validatorResponse.errors
      const { setErrorsForm } = this.props
      setErrorsForm(errors)
      this.setState({ flagScrollErrors: true })
      return formIsValid
    }
    this.props.setUserData(formValues)
    formIsValid = true
    return formIsValid
  }

  render() {
    const { loading, flagScrollErrors } = this.state
    const idFinishButton = loading ? 'place_order_disabled' : 'place_order'

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
                    <AddressForm
                      setFormValues={this.setFormValues}
                      flagScrollErrorsView={flagScrollErrors}
                    />
                  </Row>
                </Col>
                <Col lg={6} className="mt-5">
                  <h3 id="order_review_heading">Tu orden</h3>
                  <div id="order_review" className="checkout-review-order">
                    <OrderResume />
                    <div className="form-row place-order">
                      <button
                        type="submit"
                        className="button alt"
                        name="checkout_place_order"
                        id={idFinishButton}
                        value="Place order"
                        data-value="Place order"
                        disabled={loading}
                      >
                        Finalizar compra
                      </button>
                    </div>
                  </div>
                </Col>
              </Row>
            </form>
          </Container>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  changeCart: state.changeCartDataReducer.changeCartData,
  dispatchType: state.dispatchTypeDataReducer.dispatchTypeData,
  discountData: state.discountDataReducer.discountData,
})

const mapDispatchToProps = (dispatch) => ({
  setErrorsForm: (errorsForm) => dispatch(setErrorsForm(errorsForm)),
  setUserData: (userData) => dispatch(setUserData(userData)),
  setOrderData: (orderData) => dispatch(setOrderData(orderData)),
  setChangeCart: (change) => dispatch(setChangeCartData(change)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut)

CheckOut.defaultProps = {
  history: {},
  changeCart: false,
  dispatchType: '',
  discountData: {},
  setChangeCart: () => {},
  setErrorsForm: () => {},
  setUserData: () => {},
  setOrderData: () => {},
}

CheckOut.propTypes = {
  history: PropTypes.object,
  changeCart: PropTypes.bool,
  dispatchType: PropTypes.string,
  discountData: PropTypes.object,
  setChangeCart: PropTypes.func,
  setErrorsForm: PropTypes.func,
  setUserData: PropTypes.func,
  setOrderData: PropTypes.func,
}
