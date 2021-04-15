/* eslint-disable react/no-string-refs */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Col, Container, Row, Table } from 'reactstrap'
import PropTypes from 'prop-types'
import 'react-toastify/dist/ReactToastify.min.css'
import { toast, ToastContainer } from 'react-toastify'

import setChangeCartData from '../../../actions/setChangeCartData'

class ShopingCart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ShippingFlatRate: 1.5,
      ShippingLocalPickUp: 2.0,
      TotalShippingCarge: 1.5,
    }
    this.readCartItems = this.readCartItems.bind(this)
    this.plusQty = this.plusQty.bind(this)
    this.minusQty = this.minusQty.bind(this)
    this.setDefaults = this.setDefaults.bind(this)
  }

  componentDidMount() {
    this.setDefaults(document, 'script')
    var evt = document.createEvent('Event')
    evt.initEvent('load', false, false)
    window.dispatchEvent(evt)
    window.scrollTo(0, 0)
  }

  setDefaults() {
    const { history } = this.props
    const { TotalShippingCarge } = this.state
    const cartItems = this.readCartItems()
    if (cartItems && !cartItems.length > 0) {
      history.push('/')
    }
    localStorage.setItem('TotalShippingCharge', TotalShippingCarge)
    localStorage.setItem('ShippingType', 1)
    this.forceUpdate()
  }

  readCartItems() {
    return JSON.parse(localStorage.getItem('LocalCartItems'))
  }

  removeFromCart(Index) {
    const { setChangeCart, changeCart } = this.props
    let UpdatedCart = this.readCartItems()
    UpdatedCart = UpdatedCart.slice(0, Index).concat(
      UpdatedCart.slice(Index + 1, UpdatedCart.length)
    )
    localStorage.removeItem('LocalCartItems')
    localStorage.setItem('LocalCartItems', JSON.stringify(UpdatedCart))
    setChangeCart(!changeCart)
    toast.warning('Producto eliminado del carro')
  }

  plusQty(Index) {
    const { setChangeCart, changeCart } = this.props
    let UpdatedCart = this.readCartItems()
    UpdatedCart[Index].Qty = parseInt(UpdatedCart[Index].Qty + 1)
    localStorage.removeItem('LocalCartItems')
    localStorage.setItem('LocalCartItems', JSON.stringify(UpdatedCart))
    setChangeCart(!changeCart)
    toast.success('Producto agregado al carro')
  }

  minusQty(Index) {
    const { setChangeCart, changeCart } = this.props
    let UpdatedCart = this.readCartItems()
    if (UpdatedCart[Index].Qty != 1) {
      UpdatedCart[Index].Qty = parseInt(UpdatedCart[Index].Qty - 1)
      localStorage.removeItem('LocalCartItems')
      localStorage.setItem('LocalCartItems', JSON.stringify(UpdatedCart))
      setChangeCart(!changeCart)
      toast.warning('Producto eliminado del carro')
    } else {
      this.removeFromCart(Index)
    }
  }

  render() {
    const cartItems = this.readCartItems()
    return (
      <>
        <ToastContainer autoClose={1000} draggable={false} />
        <div className="site-content">
          <div className="content-wrapper section-ptb">
            <Container>
              {cartItems ? (
                <Row>
                  <Col xl={8}>
                    <div className="table-responsive">
                      <Table className="cart-table">
                        <thead>
                          <tr>
                            <th clas="product-remove"></th>
                            <th className="product-thumbnail"></th>
                            <th className="product-name">
                              <span className="nobr">Producto</span>
                            </th>
                            <th className="product-price">
                              <span className="nobr">Precio</span>
                            </th>
                            <th className="product-stock-status">Cantidad</th>
                            <th className="product-subtotal">Total</th>
                          </tr>

                          {cartItems.map((cartItem, index) => (
                            <tr key={index}>
                              <td className="product-remove">
                                <Link
                                  onClick={() => this.removeFromCart(index)}
                                  className="remove"
                                ></Link>
                              </td>
                              <td className="product-thumbnail">
                                <Link to="#">
                                  <img
                                    src={require(`../../../assets/images/products/product-01.jpg`)}
                                    alt="product"
                                  />
                                </Link>
                              </td>
                              <td className="product-name">{cartItem.productName}</td>
                              <td className="product-price">
                                $
                                {cartItem.price.toLocaleString(navigator.language, {
                                  minimumFractionDigits: 0,
                                })}
                              </td>
                              <td className="product-quantity">
                                <div className="quantity">
                                  <label
                                    className="screen-reader-text"
                                    htmlFor="quantity_5cd96a418e8ad"
                                  >
                                    Cantidad
                                  </label>
                                  <input
                                    type="text"
                                    className="input-text qty text"
                                    value={cartItem.quantity}
                                    title="Qty"
                                  />
                                  <div className="quantity-nav">
                                    <Link
                                      className="quantity-button quantity-up"
                                      onClick={() => this.plusQty(index)}
                                    >
                                      +
                                    </Link>
                                    <Link
                                      className="quantity-button quantity-down"
                                      onClick={() => this.minusQty(index)}
                                    >
                                      -
                                    </Link>
                                  </div>
                                </div>
                              </td>
                              <td className="product-subtotal">
                                $
                                {(
                                  Number(cartItem.price) * Number(cartItem.quantity)
                                ).toLocaleString(navigator.language, {
                                  minimumFractionDigits: 0,
                                })}
                              </td>
                            </tr>
                          ))}
                        </thead>
                      </Table>
                    </div>
                  </Col>
                  <div className="cart-collaterals col-xl-4">
                    <div className="cart_totals ">
                      <h2>Resumen</h2>
                      <div className="table-responsive">
                        <Table cellspacing="0" className="shop_table shop_table_responsive">
                          <tbody>
                            <tr className="cart-subtotal">
                              <th>Subtotal</th>
                              <td data-title="Subtotal">
                                <span className="woocs_special_price_code">
                                  <span className="Price-amount amount">
                                    <span className="Price-currencySymbol">$</span>{' '}
                                    {cartItems
                                      .reduce(
                                        (fr, cartItem) =>
                                          fr + Number(cartItem.quantity) * Number(cartItem.price),
                                        0
                                      )
                                      .toLocaleString(navigator.language, {
                                        minimumFractionDigits: 0,
                                      })}{' '}
                                  </span>
                                </span>
                              </td>
                            </tr>
                            <tr className="order-total">
                              <th>Total</th>
                              <td data-title="Total">
                                <strong>
                                  <span className="special_price_code">
                                    <span className="Price-amount amount">
                                      <span className="Price-currencySymbol">$</span>{' '}
                                      {parseFloat(
                                        parseFloat(
                                          cartItems.reduce(
                                            (fr, cartItem) =>
                                              fr +
                                              Number(cartItem.quantity) * Number(cartItem.price),
                                            0
                                          )
                                        )
                                      ).toLocaleString(navigator.language, {
                                        minimumFractionDigits: 2,
                                      })}{' '}
                                    </span>
                                  </span>
                                </strong>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                      <div className="proceed-to-checkout">
                        <Link to="CheckOut" className="checkout-button button">
                          Ir al checkout
                        </Link>
                      </div>
                    </div>
                  </div>
                </Row>
              ) : (
                <div className="wishlist-not-found">
                  <img
                    src={require(`../../../assets/images/empty-search.jpg`)}
                    className="img-fluid mb-4"
                  />
                  <h4 className="d-block">Tu carrito de compras esta vacío.</h4>
                  <a className="btn btn-primary" href="/">
                    Seguir comprando
                  </a>
                </div>
              )}
            </Container>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  changeCart: state.changeCartDataReducer.changeCartData,
})

const mapDispatchToProps = (dispatch) => ({
  setChangeCart: (change) => dispatch(setChangeCartData(change)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopingCart)

ShopingCart.defaultProps = {
  history: {},
  changeCart: false,
  setChangeCart: () => {},
}

ShopingCart.propTypes = {
  history: PropTypes.object,
  changeCart: PropTypes.bool,
  setChangeCart: PropTypes.func,
}
