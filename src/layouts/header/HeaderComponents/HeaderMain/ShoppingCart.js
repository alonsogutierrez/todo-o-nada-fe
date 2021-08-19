import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.min.css'
import { toast, ToastContainer } from 'react-toastify'

import setChangeCartData from './../../../../actions/setChangeCartData'

const ShoppingCart = ({ cartItems, changeCart, setChangeCart }) => {
  const readCartItems = () => {
    return JSON.parse(localStorage.getItem('LocalCartItems'))
  }

  const removeFromCart = (position) => {
    let cartItems = readCartItems()
    cartItems = cartItems.slice(0, position).concat(cartItems.slice(position + 1, cartItems.length))
    localStorage.removeItem('LocalCartItems')
    localStorage.setItem('LocalCartItems', JSON.stringify(cartItems))
    setChangeCart(!changeCart)
    toast.warning('Producto eliminado del carro')
  }

  const getItemPrice = (item) => {
    let itemPrice = 0
    if (item.price) {
      itemPrice = item.price.toLocaleString(navigator.language, {
        minimumFractionDigits: 0,
      })
      return itemPrice
    }
    return itemPrice
  }

  const getSubTotal = () => {
    const subTotal = cartItems
      .reduce((fr, cartItem) => {
        let totalPriceItem = 0
        if (cartItem.quantity && cartItem.price) {
          totalPriceItem = fr + Number(cartItem.quantity) * Number(cartItem.price)
        }
        return totalPriceItem
      }, 0)
      .toLocaleString(navigator.language, {
        minimumFractionDigits: 0,
      })
    return subTotal
  }

  return cartItems ? (
    <>
      <ToastContainer autoClose={1000} draggable={false} />
      <div className="cart-contents" id="DivCartContent">
        <div className="widget ciyashop widget-shopping-cart">
          <div className="widget-shopping-cart-content">
            <div className="pgs-product-list-widget-container has-scrollbar">
              <ul className="ciyashop-mini-cart cart-list">
                {cartItems.map((cartItem, index) => (
                  <li className="ciya-mini-cart-item" key={index}>
                    <Link
                      onClick={() => removeFromCart(index)}
                      id={`Product_${cartItem.productId}`}
                      className="remove remove_from_cart_button"
                    >
                      ×
                    </Link>
                    <div className="media">
                      <Link to="#">
                        <img
                          width={60}
                          height={76}
                          src={cartItem.picture}
                          className="img-fluid"
                          alt
                        />
                      </Link>
                      <div className="media-body">
                        <Link to="#" className="product-title">
                          {cartItem.productName} - {cartItem.size}
                        </Link>
                        <span className="quantity">
                          {cartItem.quantity} ×{' '}
                          <span className="woocs-special_price_code">
                            <span className="ciya-Price-amount amount">
                              <span className="ciya-Price-currencySymbol">$</span>
                              {getItemPrice(cartItem)}
                            </span>
                          </span>
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <p className="ciyashop-mini-cart__total total">
              <strong>Subtotal:</strong>{' '}
              <span className="woocs_special_price_code">
                <span className="ciyashop-Price-amount amount">
                  <span className="ciyashop-Price-currencySymbol">$</span> {getSubTotal()}
                </span>
              </span>
            </p>
            <p className="ciyashop-mini-cart__buttons buttons">
              <Link to="/shopping-cart" className="button wc-forward">
                Ver carrito
              </Link>
              <Link to="/checkout" className="button checkout wc-forward">
                Checkout
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  ) : (
    <></>
  )
}

const mapStateToProps = (state) => ({
  changeCart: state.changeCartDataReducer.changeCartData,
})

const mapDispatchToProps = (dispatch) => ({
  setChangeCart: (change) => dispatch(setChangeCartData(change)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)

ShoppingCart.defaultProps = {
  cartItems: [],
  changeCart: false,
  setChangeCart: () => {},
}

ShoppingCart.propTypes = {
  cartItems: PropTypes.array,
  changeCart: PropTypes.bool,
  setChangeCart: PropTypes.func,
}
