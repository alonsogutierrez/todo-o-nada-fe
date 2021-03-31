import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ShoppingCart = ({ cartItems }) => {
  const removeFromCart = () => {
    //TODO: Add logic to erase this product from cart
    return []
  }

  const getItemImage = (item) => {
    //TODO: Call to CDN to get item image
    return require(`../../../../assets/images/${item.ProductImage}`)
  }

  const getItemPrice = (item) => {
    return item.Rate.toLocaleString(navigator.language, {
      minimumFractionDigits: 0,
    })
  }

  const getSubTotal = () => {
    return cartItems
      .reduce((fr, cartItem) => fr + cartItem.Qty * cartItem.Rate, 0)
      .toLocaleString(navigator.language, {
        minimumFractionDigits: 0,
      })
  }

  console.log('shopping cart itemsInCart: ', cartItems)

  return cartItems ? (
    <>
      <div className="cart-contents" id="DivCartContent">
        <div className="widget ciyashop widget-shopping-cart">
          <div className="widget-shopping-cart-content">
            <div className="pgs-product-list-widget-container has-scrollbar">
              <ul className="ciyashop-mini-cart cart-list">
                {cartItems ? (
                  cartItems.map((cartItem, index) => (
                    <li className="ciya-mini-cart-item" key={index}>
                      <Link
                        onClick={() => removeFromCart(index)}
                        id={`Product_${cartItem.ProductID}`}
                        className="remove remove_from_cart_button"
                      >
                        ×
                      </Link>
                      <div className="media">
                        <Link to="#">
                          <img
                            width={60}
                            height={76}
                            src={getItemImage(cartItem)}
                            className="img-fluid"
                            alt
                          />
                        </Link>
                        <div className="media-body">
                          <Link to="#" className="product-title">
                            {cartItem.ProductName}
                          </Link>
                          <span className="quantity">
                            {cartItem.Qty} ×{' '}
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
                  ))
                ) : (
                  <></>
                )}
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
              <Link to="/CheckOut" className="button checkout wc-forward">
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

export default connect()(ShoppingCart)

ShoppingCart.defaultProps = {
  cartItems: [],
}

ShoppingCart.propTypes = {
  cartItems: PropTypes.array,
}
