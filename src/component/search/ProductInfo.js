import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import 'react-toastify/dist/ReactToastify.min.css'
import { toast, ToastContainer } from 'react-toastify'

import setChangeCartData from '../../actions/setChangeCartData'

const ProductInfo = ({ product, changeCart, setChangeCart }) => {
  const AddToCart = (ProductID, ProductName, ProductImage, Qty, Rate, StockStatus) => {
    let cartItems = JSON.parse(localStorage.getItem('LocalCartItems'))
    if (cartItems === null) cartItems = []
    let selectedProduct = cartItems.find((product) => product.ProductID === ProductID)
    if (!selectedProduct) {
      cartItems.push({
        ProductID: ProductID,
        ProductName: ProductName,
        ProductImage: ProductImage,
        Qty: Qty,
        Rate: Rate,
        StockStatus: StockStatus,
      })
      localStorage.removeItem('LocalCartItems')
      localStorage.setItem('LocalCartItems', JSON.stringify(cartItems))
      setChangeCart(!changeCart)
      toast.success('Producto agregado al carro')
    } else {
      toast.warning('Producto ya esta en el carro')
    }
  }

  const CheckCardItem = (ID) => {
    let checkCart = false
    let cartItems = JSON.parse(localStorage.getItem('LocalCartItems'))
    if (cartItems && cartItems.length > 0) {
      for (const cartItem of cartItems) {
        if (cartItem.ProductID === ID) {
          checkCart = true
        }
      }
    }
    return checkCart
  }

  let rat = []
  let rating = product.rating
  let i = 1
  while (i <= 5) {
    if (i <= rating) {
      rat.push(<i className="fa fa-star" />)
    } else {
      rat.push(<i className="fa fa-star-o" />)
    }
    i += 1
  }

  return (
    <>
      <ToastContainer autoClose={1000} draggable={false} />
      <div className="product product_tag-black product-hover-style-default product-hover-button-style-dark product_title_type-single_line product_icon_type-line-icon">
        <div className="product-inner element-hovered">
          <div className="product-thumbnail">
            <div className="product-thumbnail-inner">
              <Link to={`/shop/${product.category}/${product.id}`}>
                {product.pictures[0] ? (
                  <div className="product-thumbnail-main">
                    <img
                      src={require(`../../assets/images/${product.pictures[0]}`)}
                      className="img-fluid"
                    />
                  </div>
                ) : null}
                {product.pictures[1] ? (
                  <div className="product-thumbnail-swap">
                    <img
                      src={require(`../../assets/images/${product.pictures[1]}`)}
                      className="img-fluid"
                    />
                  </div>
                ) : null}
              </Link>
            </div>

            <div className="product-actions">
              <div className="product-actions-inner">
                <div className="product-action product-action-add-to-cart">
                  {!CheckCardItem(product.id) ? (
                    <Link
                      onClick={() =>
                        AddToCart(
                          product.id,
                          product.name,
                          product.pictures[0],
                          1,
                          product.salePrice,
                          'In Stock'
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
            {product.tags ? (
              <span className="ciyashop-product-category">
                {product.tags.map((tag, index) => (
                  <span key={index}>
                    {tag}
                    {index === product.tags.length - 1 ? '' : ', '}
                  </span>
                ))}
              </span>
            ) : null}
            {product.name && (
              <h3 className="product-name">
                <Link to={`/shop/${product.category}/${product.id}`}>{product.name}</Link>
              </h3>
            )}
            <div className="product-rating-price">
              {product.salePrice && (
                <span className="price">
                  <ins>
                    <span className="price-amount amount">
                      <span className="currency-symbol">$</span>
                      {product.salePrice.toLocaleString(navigator.language, {
                        minimumFractionDigits: 0,
                      })}
                    </span>
                  </ins>
                </span>
              )}
              <div className="product-rating">{rat}</div>
            </div>
            <div className="product-actions product-actions-list">
              <div className="product-actions-inner">
                <div className="product-action product-action-add-to-cart">
                  {!CheckCardItem(product.id) ? (
                    <Link
                      onClick={() =>
                        AddToCart(
                          product.id,
                          product.name,
                          product.pictures[0],
                          1,
                          product.salePrice,
                          'In Stock'
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
