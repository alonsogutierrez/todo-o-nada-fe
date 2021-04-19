/*
 * Post Detail Page
 */
import React, { Component } from 'react'
import Lightbox from 'react-image-lightbox'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import { toast } from 'react-toastify'
import { Row } from 'reactstrap'
import 'react-image-lightbox/style.css'
import './style.css'

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
}
const productslider = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1
}

const sizes = ['S', 'M', 'L', 'XL']

class PostDetail extends Component {
  constructor(props) {
    super(props)
    this.AddToCart = this.AddToCart.bind(this)
    this.state = {
      photoIndex: 0,
      isOpen: false,
      qty: 1,
      newImage: props.product.details[0].pictures[0],
      subProducts: null,
      colorsAvailable: [],
      size: 'S',
      color: ''
    }
  }

  changePreviewImage(image) {
    this.setState({
      newImage: image,
      tabid: 1
    })
  }

  // Add To Cart
  AddToCart(ProductID, ProductName, ProductImage, Qty, Rate, StockStatus) {
    var Cart = JSON.parse(localStorage.getItem('LocalCartItems'))
    if (Cart == null) Cart = new Array()
    let selectedProduct = Cart.find((product) => product.ProductName === ProductName)
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
      toast.warning('Producto ya esta en el carro')
    }
  }

  PlusQty() {
    this.setState({
      qty: this.state.qty + 1
    })
  }

  MinusQty() {
    if (this.state.qty > 1) {
      this.setState({
        qty: this.state.qty - 1
      })
    }
  }

  CheckCardItem(ID) {
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

  formatNumberToView(num) {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(num)
  }

  setAvailableSubProduct(product) {
    return sizes.map((size) => {
      return { size, details: product.details.filter((subProduct) => subProduct.size === size) }
    })
  }

  setSizesProduct(subProducts) {
    return (
      <span className="size">
        <label>Tamaño:</label>
        {subProducts.map((available, index) => {
          if (available.details.length > 0) {
            return (
                    <span key={index} itemProp="size" style={{ paddingRight: '4px' }}>
                      <a href="javascript:void(0)" rel="tag" onClick={(event) => this.setState({size: event.target.name})} name={available.size}>
                        {available.size}
                      </a>
                    </span>)
          }
          return (
            <span key={index} itemProp="size" style={{ paddingRight: '4px' }}>
              <a href="javascript:void(0)" rel="tag" className="isDisabled">
                {available.size}
              </a>
            </span>
          )
        })}
      </span>
    )
  }

  setColorsProduct(subProducts, size) {
    const colorsAvailable = subProducts.find((item) => item.size === size)
    return (
      <span className="size">
        <label>Colores:</label>
        {colorsAvailable.details.map((color, index) => (
          <span key={index} itemProp="size" style={{ paddingRight: '4px' }}>
            <a href="javascript:void(0)" rel="tag" onClick={(event) => this.setState({color: event.target.name})} name={color.color}>
              {color.color}
            </a>
          </span>
        ))}
      </span>
    )
  }

  setSKUProduct(subProducts, size = '', color = '') {
    if (!color) {
      return (
        <span className="sku_wrapper">
         <label>SKU:</label>
         <span className="sku">{subProducts[0].details[0].sku}</span>
        </span>
      )
    }
    const sizeDetails = subProducts.filter((subP) => subP.size === size)[0]
    console.log(sizeDetails)
    const subProductSelected = sizeDetails.details.find((detail) => detail.color === color)

    if (!subProductSelected) {
      return (
        <span className="sku_wrapper">
         <label>SKU:</label>
         <span className="sku"></span>
        </span>
      )
    }

    return (
      <span className="sku_wrapper">
         <label>SKU:</label>
         <span className="sku">{subProductSelected.sku}</span>
        </span>
    )
  }

  render() {
    const { photoIndex, isOpen, size, color } = this.state
    const qty = this.state.qty
    const { product } = this.props
    const subProducts = this.setAvailableSubProduct(product)

    const images = []
    {
      product.details[0].pictures.map((pic) => images.push(require(`../../assets/images/${pic}`)))
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
      <section>
        <div className="product-content-top single-product">
          <Row>
            <div className="product-top-left col-xl-5 col-md-6">
              <div className="product-top-left-inner">
                <div className="ciyashop-product-images">
                  <div
                    className="ciyashop-product-images-wrapper ciyashop-gallery-style-default ciyashop-gallery-thumb_position-bottom ciyashop-gallery-thumb_vh-horizontal">
                    <div className="ciyashop-product-gallery ciyashop-product-gallery--with-images slick-carousel">
                      <Slider
                        {...settings}
                        className="ciyashop-product-gallery__wrapper popup-gallery"
                      >
                        <div className="ciyashop-product-gallery__image">
                          <img
                            src={require(`../../assets/images/shop/women/a.jpg`)}
                            className="img-fluid"
                          />
                        </div>
                      </Slider>
                      <div className="ciyashop-product-gallery_buttons_wrapper">
                        <div
                          className="ciyashop-product-gallery_button ciyashop-product-gallery_button-zoom popup-gallery"
                          onClick={() => this.setState({ isOpen: true })}
                        >
                          <Link to="#" className="ciyashop-product-gallery_button-link-zoom">
                            <i className="fa fa-arrows-alt" />
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="ciyashop-product-thumbnails">
                      <Slider {...productslider} className="ciyashop-product-thumbnails__wrapper">
                        {product.details[0].pictures.map((pictureimage, index) => (
                          <div key={index} className="ciyashop-product-thumbnail__image">
                            <Link onMouseOver={() => this.changePreviewImage(pictureimage)}>
                              <img
                                src={require(`../../assets/images/${pictureimage}`)}
                                className="img-fluid"
                              />
                            </Link>
                          </div>
                        ))}
                      </Slider>
                    </div>
                    <div className="clearfix" />
                  </div>
                </div>
              </div>
            </div>
            <div className="product-top-right col-xl-7 col-md-6">
              <div className="product-top-right-inner">
                <div className="summary entry-summary">
                  <h1 className="product_title entry-title">{product.name}</h1>
                  <p className="price">{`${this.formatNumberToView((product.price.BasePriceSales * qty))}`}</p>
                  <div className="product-details__short-description">
                    <div className="pdp-about-details-txt pdp-about-details-equit">
                      {product.description}
                    </div>
                  </div>
                  <form className="cart">
                    <div className="quantity">
                      <label className="screen-reader-text" htmlFor="quantity_5cdab503cf26f">
                        Cantidad
                      </label>
                      <input type="text" className="input-text qty text" value={qty} title="Qty" />
                      <div className="quantity-nav">
                        <Link
                          className="quantity-button quantity-up"
                          onClick={() => this.PlusQty()}
                        >
                          +
                        </Link>
                        <Link
                          className="quantity-button quantity-down"
                          onClick={() => this.MinusQty()}
                        >
                          -
                        </Link>
                      </div>
                    </div>
                    {!this.CheckCardItem(product.id) ? (
                      <Link
                        onClick={() =>
                          this.AddToCart(
                            product.id,
                            product.name,
                            product.details[0].pictures[0],
                            qty,
                            product.salePrice,
                            'In Stock'
                          )
                        }
                        className="button single_add_to_cart_button"
                        rel="nofollow"
                      >
                        Agregar al carro
                      </Link>
                    ) : (
                      <Link
                        to="/shopping-cart"
                        className="button single_add_to_cart_button"
                        rel="nofollow"
                      >
                        Ver el carro
                      </Link>
                    )}
                    <div className="clearfix" />
                  </form>
                  {/* TODO: aun no es necesario el refactor de product_meta */}
                  <div className="product_meta">
                    <span className="posted_in">
                      <label>Categorías:</label>
                      {product.category.toString()}
                    </span>
                    {this.setSizesProduct(subProducts)}
                    {this.setColorsProduct(subProducts, size)}
                    {this.setSKUProduct(subProducts, size, color)}
                  </div>
                  <div className="social-profiles">
                    <span className="share-label">Compartir:</span>
                    <ul className="share-links">
                      <li>
                        <a
                          href="https://www.facebook.com"
                          className="share-link facebook-share"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fa fa-facebook" />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="ciyashop-sticky-btn">
                    <div className="ciyashop-sticky-btn-container container">
                      <div className="row align-items-center">
                        <div className="col-lg-5">
                          <div className="ciyashop-sticky-btn-content">
                            <div className="ciyashop-sticky-btn-thumbnail">
                              <img
                                src={require(`../../assets/images/products/product-01.jpg`)}
                                className="img-fluid"
                                alt
                              />
                            </div>
                            <div className="ciyashop-sticky-btn-info">
                              <h4 className="product-title">
                                Women’s Fabric Mix Midi Wrap Jumpsuit
                              </h4>
                              <div className="star-rating">
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star-o" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-7">
                          <div className="ciyashop-sticky-btn-cart">
                            <div className="wishlist-compare-button">
                              <div className="product-action product-action-wishlist">
                                <Link
                                  to="#"
                                  data-toggle="tooltip"
                                  data-original-title="Wishlist"
                                  data-placement="top"
                                >
                                  Browse Wishlist
                                </Link>
                              </div>
                              <div className="product-action product-action-compare">
                                <Link
                                  to="#"
                                  className="compare button"
                                  data-toggle="tooltip"
                                  data-original-title="Compare"
                                  data-placement="top"
                                >
                                  Compare
                                </Link>
                              </div>
                            </div>
                            <span className="price">$9.00</span>
                            <form className="cart">
                              <div className="quantity">
                                <label
                                  className="screen-reader-text"
                                  htmlFor="quantity_5cdab503cf26f"
                                >
                                  Quantity
                                </label>
                                <input
                                  type="number"
                                  id="quantity_5cdab503cf26f"
                                  className="input-text qty text"
                                  step={1}
                                  min={1}
                                  max
                                  name="quantity"
                                  defaultValue={1}
                                  title="Qty"
                                  size={4}
                                  pattern="[0-9]*"
                                  inputMode="numeric"
                                  aria-labelledby
                                />
                                <div className="quantity-nav">
                                  <div className="quantity-button quantity-up">+</div>
                                  <div className="quantity-button quantity-down">-</div>
                                </div>
                              </div>
                              <button
                                type="submit"
                                className="single_add_to_cart_button button alt"
                              >
                                Add to cart
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Row>
        </div>
        <div>
          {isOpen && (
            <Lightbox
              mainSrc={images[photoIndex]}
              nextSrc={images[(photoIndex + 1) % images.length]}
              prevSrc={images[(photoIndex + images.length - 1) % images.length]}
              onCloseRequest={() => this.setState({ isOpen: false })}
              enableZoom={false}
              onMovePrevRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + images.length - 1) % images.length
                })
              }
              onMoveNextRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + 1) % images.length
                })
              }
            />
          )}
        </div>
      </section>
    )
  }
}

export default PostDetail

PostDetail.defaultProps = {
  product: {}
}

PostDetail.propTypes = {
  product: PropTypes.object
}
