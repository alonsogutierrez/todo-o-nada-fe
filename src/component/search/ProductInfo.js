import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import 'react-toastify/dist/ReactToastify.min.css'
import { toast, ToastContainer } from 'react-toastify'

import setChangeCartData from '../../actions/setChangeCartData'

const ProductInfo = ({ product, changeCart, setChangeCart }) => {
  const AddToCart = (product, quantity, isProductWithStockAvailable) => {
    if (!isProductWithStockAvailable) {
      toast.warning('Producto sin stock')
    } else {
      let cartItems = JSON.parse(localStorage.getItem('LocalCartItems'))
      if (!cartItems) cartItems = []
      let selectedProduct = cartItems.find(
        (cartItem) =>
          cartItem.itemNumber === parseInt(product.itemNumber, 10) &&
          cartItem.sku === parseInt(product.sku, 10)
      )
      if (!selectedProduct) {
        cartItems.push({
          itemNumber: parseInt(product.itemNumber, 10),
          sku: parseInt(product.sku, 10),
          productName: product.name,
          quantity,
          price: product.price.basePriceSales,
          isProductWithStockAvailable,
          picture: product.picture,
        })
        localStorage.removeItem('LocalCartItems')
        localStorage.setItem('LocalCartItems', JSON.stringify(cartItems))
        setChangeCart(!changeCart)
        toast.success('Producto agregado al carro')
      } else {
        toast.warning('Producto ya esta en el carro')
      }
    }
  }

  const CheckCardItem = (itemNumber, sku) => {
    let checkCart = false
    let cartItems = JSON.parse(localStorage.getItem('LocalCartItems'))
    if (cartItems && cartItems.length > 0) {
      for (const cartItem of cartItems) {
        if (cartItem && cartItem.itemNumber === itemNumber && cartItem.sku === sku) {
          checkCart = true
        }
      }
    }
    return checkCart
  }

  const { picture, name, price, description, itemNumber, sku, quantity } = product

  const productPrice = price.basePriceSales
  const isProductWithStockAvailable = quantity > 0
  return (
    <>
      <ToastContainer autoClose={1000} draggable={false} />
      <div className="product product_tag-black product-hover-style-default product-hover-button-style-dark product_title_type-single_line product_icon_type-line-icon">
        <div className="product-inner element-hovered">
          <div className="product-thumbnail">
            <div className="product-thumbnail-inner">
              <Link to={`/product/${itemNumber}`}>
                <div className="product-thumbnail-main">
                  <img src={picture} className="img-fluid" />
                </div>
              </Link>
            </div>

            <div className="product-actions">
              <div className="product-actions-inner">
                <div className="product-action product-action-add-to-cart">
                  {!CheckCardItem(itemNumber, sku) ? (
                    <Link
                      onClick={() => AddToCart(product, 1, isProductWithStockAvailable)}
                      className="button add_to_cart_button"
                      rel="nofollow"
                    >
                      {isProductWithStockAvailable ? 'Agregar al carro' : 'No hay stock'}
                    </Link>
                  ) : (
                    <Link to="/shopping-cart" className="button add_to_cart_button" rel="nofollow">
                      Ver carro
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="product-info">
            {name && (
              <h3 className="product-name">
                <Link to={`/product/${itemNumber}`}>{name}</Link>
              </h3>
            )}
            <div className="product-rating-price">
              {productPrice && (
                <span className="price">
                  <ins>
                    <span className="price-amount amount">
                      <span className="currency-symbol">$</span>
                      {productPrice.toLocaleString(navigator.language, {
                        minimumFractionDigits: 0,
                      })}
                    </span>
                  </ins>
                </span>
              )}
            </div>
            <div className="product-actions product-actions-list">
              <div className="product-actions-inner">
                <div className="product-action product-action-add-to-cart">
                  {!CheckCardItem(itemNumber, sku) ? (
                    <Link
                      onClick={() => AddToCart(product, 1, isProductWithStockAvailable)}
                      className="button add_to_cart_button"
                      rel="nofollow"
                    >
                      {isProductWithStockAvailable ? 'Agregar al carro' : 'No hay stock'}
                    </Link>
                  ) : (
                    <Link to="/shopping-cart" className="button add_to_cart_button" rel="nofollow">
                      Ver carro
                    </Link>
                  )}
                </div>
              </div>
            </div>
            {description && (
              <div className="product-details__short-description">
                <p>{description}</p>
              </div>
            )}
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductInfo)

ProductInfo.defaultProps = {
  product: {},
  changeCart: false,
  setChangeCart: () => {},
}

ProductInfo.propTypes = {
  product: PropTypes.object,
  changeCart: PropTypes.bool,
  setChangeCart: PropTypes.func,
}
