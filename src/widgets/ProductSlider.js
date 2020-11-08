import React from 'react'
import { connect } from 'react-redux'
import Slider from 'react-slick'
import { Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { ToastContainer, toast } from 'react-toastify'

import sliderProducts from '../api/sliderProducts.json'
import setProductsCartData from '../actions/setProductsCartData'
import setChangeCartData from '../actions/setChangeCartData'

const ProductSlider = ({ productsCart, setProductsCart, settings, changeCart, setChangeCart }) => {
  function AddToCart(ProductID, ProductName, ProductImage, Qty, Rate, StockStatus) {
    const thereAreProductsInCart = productsCart.length > 0
    let productData = {}
    if (thereAreProductsInCart) {
      const product = productsCart.find(product => product.productId === ProductID)
      if (!product) {
        productData = {
          ProductID: ProductID,
          ProductName: ProductName,
          ProductImage: ProductImage,
          Qty: Qty,
          Rate: Rate,
          StockStatus: StockStatus
        }
        productsCart.push(productData)
        const newProductsCart = productsCart
        setProductsCart(newProductsCart)
        setChangeCart(!changeCart)
        toast.success('Producto agregado al reducer!')
      } else {
        toast.error('Producto ya existente en el reducer')
      }
    } else {
      productData = {
        ProductID: ProductID,
        ProductName: ProductName,
        ProductImage: ProductImage,
        Qty: Qty,
        Rate: Rate,
        StockStatus: StockStatus
      }
      productsCart.push(productData)
      const newProductsCart = productsCart
      setProductsCart(newProductsCart)
      setChangeCart(!changeCart)
      toast.success('Producto agregado al reducer!')
    }
    var Cart = JSON.parse(localStorage.getItem('LocalCartItems'))
    if (Cart == null) Cart = new Array()
    let selectedProduct = Cart.find(product => product.ProductName === ProductName)
    if (selectedProduct == null) {
      Cart.push({
        ProductID: ProductID,
        ProductName: ProductName,
        ProductImage: ProductImage,
        Qty: Qty,
        Rate: Rate,
        StockStatus: StockStatus
      })
      localStorage.removeItem('LocalCartItems')
      localStorage.setItem('LocalCartItems', JSON.stringify(Cart))
      toast.success('Producto agregado al carro')
    } else {
      toast.warning('Este producto ya esta en tu carro!')
    }
  }

  function CheckCardItem(ID) {
    let checkcart = false
    var Cart = JSON.parse(localStorage.getItem('LocalCartItems'))
    if (Cart && Cart.length > 0) {
      for (const cartItem of Cart) {
        if (cartItem.ProductID === ID) {
          checkcart = true
        }
      }
    }
    return checkcart
  }

  function rating(productrat) {
    let rat = []
    let i = 1
    while (i <= 5) {
      if (i <= productrat) {
        rat.push(<i className="fa fa-star" />)
      } else {
        rat.push(<i className="fa fa-star-o" />)
      }
      i += 1
    }
    return rat
  }

  return (
    <Col sm={12}>
      <ToastContainer autoClose={1000} />
      <div className="products-listing-items-wrapper products-listing-carousel">
        <div
          className="products"
          data-nav-arrow="false"
          data-items={4}
          data-md-items={3}
          data-sm-items={3}
          data-xs-items={2}
          data-xx-items={1}
          data-space={20}
        >
          <Slider {...settings} className="slider-spacing-10 slider-arrow-hover">
            {sliderProducts.map((product, index) => (
              <div key={index}>
                <div className="item">
                  <div className="product product_tag-black product-hover-style-default product-hover-button-style-dark product_title_type-single_line product_icon_type-line-icon">
                    <div className="product-inner element-hovered">
                      <div className="product-thumbnail">
                        <div className="product-thumbnail-inner">
                          <a href={`/shop/${product.category}/${product.id}`}>
                            {product.pictures[0] ? (
                              <div className="product-thumbnail-main">
                                <img
                                  src={require(`../assets/images/${product.pictures[0]}`)}
                                  className="img-fluid"
                                />
                              </div>
                            ) : null}
                            {product.pictures[1] ? (
                              <div className="product-thumbnail-swap">
                                <img
                                  src={require(`../assets/images/${product.pictures[1]}`)}
                                  className="img-fluid"
                                />
                              </div>
                            ) : null}
                          </a>
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
                                <Link
                                  to="/shopping-cart"
                                  className="button add_to_cart_button"
                                  rel="nofollow"
                                >
                                  Ver el carro
                                </Link>
                              )}
                            </div>
                            <div className="product-action product-action-wishlist">
                              {!CheckWishList(product.id) ? (
                                <Link
                                  onClick={() =>
                                    AddToWishList(
                                      product.id,
                                      product.name,
                                      product.pictures[0],
                                      1,
                                      product.salePrice,
                                      'In Stock'
                                    )
                                  }
                                  className="add_to_wishlist"
                                  data-toggle="tooltip"
                                  data-original-title="Wishlist"
                                  data-placement="top"
                                >
                                  {' '}
                                  Agregar a la lista de deseos
                                </Link>
                              ) : (
                                <Link
                                  to="/wishlist"
                                  className="add_to_wishlist_fill"
                                  data-toggle="tooltip"
                                  data-original-title="Wishlist"
                                  data-placement="top"
                                >
                                  Ver lista de deseos
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="product-info">
                        <span className="ciyashop-product-category">{product.category}</span>
                        <h3 className="product-name">
                          <a href={`/shop/${product.category}/${product.id}`}>{product.name}</a>
                        </h3>
                        <div className="product-rating-price">
                          <span className="price">
                            <ins>
                              <span className="price-amount amount">
                                <span className="currency-symbol">$</span>
                                {product.salePrice.toLocaleString(navigator.language, {
                                  minimumFractionDigits: 0
                                })}
                              </span>
                            </ins>
                          </span>
                          <div className="product-rating">{rating(product.rating)}</div>
                        </div>
                        <div className="product-details__short-description">
                          <p></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </Col>
  )
}

const mapStateToProps = (state) => ({
  productsCart: state.productsCartDataReducer.productsCartData,
  changeCart: state.changeCartDataReducer.changeCartData,
})

const mapDispatchToProps = (dispatch) => ({
  setProductsCart: (productsCart) => dispatch(setProductsCartData(productsCart)),
  setChangeCart: (change) => dispatch(setChangeCartData(change)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductSlider)

ProductSlider.defaultProps = {
  settings: {},
  productSub: '',
  productsCart: [],
  changeCart: false,
  setProductsCart: () => {},
  setChangeCart: () => {},
}

ProductSlider.propTypes = {
  settings: PropTypes.object,
  productSub: PropTypes.string,
  productsCart: PropTypes.array,
  changeCart: PropTypes.bool,
  setProductsCart: PropTypes.func,
  setChangeCart: PropTypes.func,
}
