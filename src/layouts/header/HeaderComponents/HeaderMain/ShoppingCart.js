import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ShoppingCart = ({ cartItems }) => {
  const removeFromCart = () => {
    //TODO: Add logic to erase this product from cart
    return []
  }

  const getItemImage = () => {
    //TODO: Call to CDN to get item image
    return require('../../../../assets/images/products/product-01.jpg')
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
                          src={getItemImage()}
                          className="img-fluid"
                          alt
                        />
                      </Link>
                      <div className="media-body">
                        <Link to="#" className="product-title">
                          {cartItem.productName}
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

export default connect()(ShoppingCart)

ShoppingCart.defaultProps = {
  cartItems: [],
}

ShoppingCart.propTypes = {
  cartItems: PropTypes.array,
}
