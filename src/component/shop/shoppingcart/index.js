/* eslint-disable react/no-string-refs */
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Col, Container, Row, Table } from 'reactstrap'
import PropTypes from 'prop-types'
import 'react-toastify/dist/ReactToastify.min.css'
import { toast, ToastContainer } from 'react-toastify'

import ClientAPI from '../../../common/ClientAPI'
import setChangeCartData from '../../../actions/setChangeCartData'
import Resume from './Resume'
import DiscountCouponForm from './DiscountCouponForm'

const ShopingCart = (props) => {
  const readCartItems = () => {
    return JSON.parse(localStorage.getItem('LocalCartItems'))
  }

  const getProductTotalStock = async (itemNumber, sku) => {
    const clientAPI = new ClientAPI()
    const productResponse = await clientAPI.getProductByItemNumber(itemNumber)
    const { details } = productResponse
    const productDetail = details[sku]
    if (productDetail) {
      const { stock: actualStock } = productDetail
      return actualStock
    }
    throw new Error('Product not found')
  }

  const plusQty = async (position) => {
    const { setChangeCart, changeCart } = props
    let cartItems = readCartItems()
    const actualProduct = cartItems[position]
    if (!actualProduct && !(Object.keys(actualProduct).length > 0)) {
      throw new Error('Product not found in localStorage')
    }
    try {
      const totalProductStock = await getProductTotalStock(
        actualProduct.itemNumber,
        actualProduct.sku
      )
      const desiredProductQuantity = actualProduct.quantity + 1
      const isStockAvailable = totalProductStock > desiredProductQuantity
      if (isStockAvailable) {
        actualProduct.quantity = parseInt(actualProduct.quantity + 1)
        cartItems[position] = actualProduct
        localStorage.removeItem('LocalCartItems')
        localStorage.setItem('LocalCartItems', JSON.stringify(cartItems))
        setChangeCart(!changeCart)
        toast.success('Producto agregado al carro')
      } else {
        toast.warn('Producto sin más stock')
      }
    } catch (err) {
      console.error(`Error trying to add product: ${err.message}`)
      toast.error('No se pudo agregar tu product, ha ocurrido un error')
    }
  }

  const minusQty = (position) => {
    const { setChangeCart, changeCart } = props
    let cartItems = readCartItems()
    if (cartItems[position].quantity != 1) {
      cartItems[position].quantity = parseInt(cartItems[position].quantity - 1)
      localStorage.removeItem('LocalCartItems')
      localStorage.setItem('LocalCartItems', JSON.stringify(cartItems))
      setChangeCart(!changeCart)
      toast.warning('Producto eliminado del carro')
    } else {
      removeFromCart(position)
    }
  }

  const setDefaults = () => {
    const { history } = props
    const cartItems = readCartItems()
    if (cartItems && cartItems.length <= 0) {
      history.push('/')
    }
    localStorage.setItem('ShippingType', 1)
  }

  const removeFromCart = (position) => {
    const { setChangeCart, changeCart } = props
    let cartItems = readCartItems()
    cartItems = cartItems.slice(0, position).concat(cartItems.slice(position + 1, cartItems.length))
    localStorage.removeItem('LocalCartItems')
    localStorage.setItem('LocalCartItems', JSON.stringify(cartItems))
    setChangeCart(!changeCart)
    toast.warning('Producto eliminado del carro')
  }

  useEffect(() => {
    var evt = document.createEvent('Event')
    evt.initEvent('load', false, false)
    window.dispatchEvent(evt)
    window.scrollTo(0, 0)
  }, [])

  setDefaults()

  const cartItems = readCartItems()
  return (
    <>
      <ToastContainer autoClose={1000} draggable={false} />
      <div className="site-content">
        <div className="content-wrapper section-ptb">
          <Container>
            {cartItems ? (
              <>
                <Row>
                  <Col xl={8}>
                    <div className="table-responsive">
                      <Table className="cart-table">
                        <thead>
                          <tr>
                            <th className="product-remove"></th>
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
                                  onClick={() => removeFromCart(index)}
                                  className="remove"
                                ></Link>
                              </td>
                              <td className="product-thumbnail">
                                <Link to="#">
                                  <img src={cartItem.picture} alt="product" />
                                </Link>
                              </td>
                              <td className="product-name">
                                {cartItem.productName} - {cartItem.size}
                              </td>
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
                                      onClick={() => plusQty(index)}
                                    >
                                      +
                                    </Link>
                                    <Link
                                      className="quantity-button quantity-down"
                                      onClick={() => minusQty(index)}
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
                  <Resume />
                </Row>
                <Row>
                  <Col xl={8}></Col>
                  <Col xl={4}>
                    <DiscountCouponForm cartItems={cartItems} />
                  </Col>
                </Row>
              </>
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

const mapStateToProps = (state) => ({
  changeCart: state.changeCartDataReducer.changeCartData,
})

const mapDispatchToProps = (dispatch) => ({
  setChangeCart: (change) => dispatch(setChangeCartData(change)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ShopingCart))

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
