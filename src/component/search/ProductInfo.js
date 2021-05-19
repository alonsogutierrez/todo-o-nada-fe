import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import 'react-toastify/dist/ReactToastify.min.css'
import { toast, ToastContainer } from 'react-toastify'

import setChangeCartData from '../../actions/setChangeCartData'

const ProductInfo = ({ product, changeCart, setChangeCart }) => {
  const AddToCart = (itemNumber, sku, productName, quantity, price, stockStatus) => {
    let cartItems = JSON.parse(localStorage.getItem('LocalCartItems'))
    if (!cartItems) cartItems = []
    let selectedProduct = cartItems.find(
      (product) => product.itemNumber === itemNumber && product.sku === sku
    )
    if (!selectedProduct) {
      cartItems.push({
        itemNumber,
        sku,
        productName,
        quantity,
        price,
        stockStatus,
      })
      localStorage.removeItem('LocalCartItems')
      localStorage.setItem('LocalCartItems', JSON.stringify(cartItems))
      setChangeCart(!changeCart)
      toast.success('Producto agregado al carro')
    } else {
      toast.warning('Producto ya esta en el carro')
    }
  }

  const CheckCardItem = (itemNumber, sku) => {
    let checkCart = false
    let cartItems = JSON.parse(localStorage.getItem('LocalCartItems'))
    if (cartItems && cartItems.length > 0) {
      for (const cartItem of cartItems) {
        if (cartItem.itemNumber === itemNumber && cartItem.sku === sku) {
          checkCart = true
        }
      }
    }
    return checkCart
  }

  const productPrice = product.price.basePriceSales ? product.price.basePriceSales : product.price
  return (
    <>
      <ToastContainer autoClose={1000} draggable={false} />
      <div className="product product_tag-black product-hover-style-default product-hover-button-style-dark product_title_type-single_line product_icon_type-line-icon">
        <div className="product-inner element-hovered">
          <div className="product-thumbnail">
            <div className="product-thumbnail-inner">
              <Link to={`/product/${product.itemNumber}`}>
                {product.pictures[0] ? (
                  <div className="product-thumbnail-main">
                    <img
                      src={require(`./../../assets/images/${product.pictures[0]}`).default}
                      className="img-fluid"
                    />
                  </div>
                ) : null}
                {product.pictures[1] ? (
                  <div className="product-thumbnail-swap">
                    <img
                      src={require(`./../../assets/images/${product.pictures[1]}`).default}
                      className="img-fluid"
                    />
                  </div>
                ) : null}
              </Link>
            </div>

            <div className="product-actions">
              <div className="product-actions-inner">
                <div className="product-action product-action-add-to-cart">
                  {!CheckCardItem(product.itemNumber, product.sku) ? (
                    <Link
                      onClick={() =>
                        AddToCart(
                          product.itemNumber,
                          product.sku,
                          product.name,
                          1,
                          productPrice,
                          product.quantity > 0 ? 'In Stock' : 'No Stock'
                        )
                      }
                      className="button add_to_cart_button"
                      rel="nofollow"
                    >
                      Agregar al carro
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
            {product.name && (
              <h3 className="product-name">
                <Link to={`/product/${product.itemNumber}`}>{product.name}</Link>
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
                  {!CheckCardItem(product.itemNumber, product.sku) ? (
                    <Link
                      onClick={() =>
                        AddToCart(
                          product.itemNumber,
                          product.sku,
                          product.name,
                          1,
                          productPrice,
                          product.quantity > 0 ? 'In Stock' : 'No Stock'
                        )
                      }
                      className="button add_to_cart_button"
                      rel="nofollow"
                    >
                      Agregar al carro
                    </Link>
                  ) : (
                    <Link to="/shopping-cart" className="button add_to_cart_button" rel="nofollow">
                      Ver carro
                    </Link>
                  )}
                </div>
              </div>
            </div>
            {product.description && (
              <div className="product-details__short-description">
                <p>{product.description}</p>
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
