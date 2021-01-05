/**
 *  Success Screen
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import PropTypes from 'prop-types'

import productsAPI from '../../../api/product.json'

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
    const total = products.map((product) => {
      return product.quantity * product.prices[0].basePriceSales
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
    const { userData, orderData } = this.props
    const { TotalShippingCarge } = this.state
    const { orderNumber, products, createdAt } = orderData.order
    const createdDate = new Date(createdAt).toLocaleDateString('es-CL')

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
                <div className="success-screen">
                  <div className="thank-you text-center">
                    <i className="fa fa-check-circle-o"></i>
                    <h1 className="text-white">¡Muchas gracias {userData.first_name}!</h1>
                    <span>Perfecto! Recibimos tu pago. Tu orden será procesada pronto.</span>
                    <strong className="text-white">Nº de orden: {orderNumber}</strong>
                  </div>
                  <div className="delivery p-4 p-md-5 bg-light text-center">
                    <span className="h5">Fecha estimada de llegada</span>
                    <h2 className="mb-0 mt-2">Entre 3 a 5 dias habiles</h2>
                  </div>
                  <div className="pt-4 px-4 pt-md-5 px-md-5 pb-3">
                    <Row>
                      <Col lg={6}>
                        <h6>Despacho a</h6>
                        <ul className="list-unstyled mb-0">
                          <li>
                            {userData.first_name} {userData.last_name}
                          </li>
                          <li>{userData.address}</li>
                          <li>{userData.num_address}</li>
                          <li>{userData.country_selected.name}</li>
                        </ul>
                      </Col>
                      {products !== null && products.length > 0 ? (
                        <Col lg={6} className="text-lg-right mt-4 mt-lg-0">
                          <h6>Resumen</h6>
                          <ul className="list-unstyled mb-0">
                            <li>
                              <span>Nº de orden:</span> <strong>{orderNumber}</strong>
                            </li>
                            <li>
                              <span>Fecha de compra:</span> <strong>{createdDate}</strong>
                            </li>
                            <li>
                              <span>Totales orden:</span>{' '}
                              <strong>
                                $
                                {this.getOrderTotal(products, TotalShippingCarge).toLocaleString(
                                  navigator.language,
                                  {
                                    minimumFractionDigits: 0,
                                  }
                                )}{' '}
                              </strong>
                            </li>
                          </ul>
                        </Col>
                      ) : (
                        <div>No hay productos encontrados</div>
                      )}
                    </Row>
                  </div>
                  {products !== null && products.length > 0 ? (
                    <div className="ordered-detail">
                      <h5 className="mb-4">Los detalles de tu orden</h5>
                      <div className="table-responsive">
                        {products !== null && products.length > 0 ? (
                          <table className="table mb-0">
                            <tbody>
                              {products.map((product, index) => (
                                <tr key={index} className="ordered-item">
                                  <td className="ordered-image">
                                    <img
                                      alt="img 01"
                                      src={require(`../../../assets/images/${this.getProductImage(
                                        product
                                      )}`)}
                                      className="img-fluid"
                                    />
                                  </td>
                                  <td className="ordered-name">
                                    <h6 className="mb-0">Producto</h6>
                                    <span>{product.name}</span>
                                  </td>
                                  <td className="ordered-quantity">
                                    <h6 className="mb-0">Cantidad</h6>
                                    <span>{product.quantity}</span>
                                  </td>
                                  <td className="ordered-price">
                                    <h6 className="mb-0">Precio</h6>
                                    <span>
                                      $
                                      {product.prices[0].basePriceSales.toLocaleString(
                                        navigator.language,
                                        {
                                          minimumFractionDigits: 0,
                                        }
                                      )}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          <div>No hay productos encontrados</div>
                        )}
                      </div>
                      <div className="table-responsive">
                        <table className="table total-table table-borderless mt-4 mb-0">
                          <tbody>
                            <tr>
                              <td>Subtotal</td>
                              <td className="text-right">
                                $
                                {parseFloat(this.getOrderSubTotal(products)).toLocaleString(
                                  navigator.language,
                                  {
                                    minimumFractionDigits: 2,
                                  }
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td>Despacho</td>
                              <td className="text-right">${parseFloat(TotalShippingCarge)}</td>
                            </tr>
                            <tr className="border-top">
                              <td>
                                <strong className="h5">Total</strong>
                              </td>
                              <td className="text-right h5">
                                <strong>
                                  $
                                  {this.getOrderTotal(products, TotalShippingCarge).toLocaleString(
                                    navigator.language,
                                    {
                                      minimumFractionDigits: 2,
                                    }
                                  )}
                                </strong>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div>No hay productos encontrados</div>
                  )}
                  <div className="d-sm-flex px-4 pb-4 px-md-5 pb-md-5">
                    <Link className="button ml-auto" to="/">
                      Ir al Home
                    </Link>
                  </div>
                </div>
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
