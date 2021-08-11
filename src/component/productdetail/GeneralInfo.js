import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { toast, ToastContainer } from 'react-toastify'
import { Row } from 'reactstrap'
import 'react-toastify/dist/ReactToastify.min.css'
import 'react-image-lightbox/style.css'
import './style.css'

import setChangeCartData from '../../actions/setChangeCartData'

const getDefaultSize = (product) => {
  const details = product.details
  for (let sku in details) {
    if (details[sku].stock > 0) {
      return details[sku].size
    }
  }
}

const getDefaultColor = (product) => (product.color ? product.color : '')

const getDefaultSku = (product) => {
  const details = product.details
  for (let sku in details) {
    if (details[sku].stock > 0) {
      return sku
    }
  }
}

const GeneralInfo = (props) => {
  const [sizes] = useState(['S', 'M', 'L', 'XL'])
  const [qty, setQuantity] = useState(1)
  const [size, setSize] = useState(getDefaultSize(props.product))
  const [color] = useState(getDefaultColor(props.product))
  const [sku, setSku] = useState(getDefaultSku(props.product))

  const AddToCart = (e, product, skuSelected, quantity, isProductWithStockAvailable) => {
    e.preventDefault()
    if (!isProductWithStockAvailable) {
      toast.warning('Producto sin stock')
    } else {
      let cartItems = JSON.parse(localStorage.getItem('LocalCartItems'))
      if (!cartItems) cartItems = []
      const selectedProduct = cartItems.find(
        (cartItem) =>
          cartItem.itemNumber === parseInt(product.itemNumber, 10) &&
          cartItem.sku === parseInt(skuSelected, 10)
      )
      if (!selectedProduct) {
        cartItems.push({
          itemNumber: parseInt(product.itemNumber, 10),
          sku: parseInt(skuSelected, 10),
          productName: product.name,
          quantity,
          price: product.price.basePriceSales,
          isProductWithStockAvailable,
          picture: product.pictures[0],
        })
        localStorage.removeItem('LocalCartItems')
        localStorage.setItem('LocalCartItems', JSON.stringify(cartItems))
        const { setChangeCart, changeCart } = props
        setChangeCart(!changeCart)
        toast.success('Producto agregado al carro')
      } else {
        toast.warning('Producto ya esta en el carro')
      }
    }
  }

  const PlusQty = (itemNumberProduct, skuSelected) => {
    let cartItems = JSON.parse(localStorage.getItem('LocalCartItems'))
    if (!cartItems) cartItems = []
    const selectedProduct = cartItems.find(
      (product) => product.itemNumber === itemNumberProduct && product.sku === skuSelected
    )
    if (selectedProduct) {
      cartItems = cartItems.map((item) => {
        if (item.itemNumber === itemNumberProduct && item.sku === skuSelected) {
          return {
            ...item,
            quantity: item.quantity + 1,
          }
        }
        return item
      })
      localStorage.removeItem('LocalCartItems')
      localStorage.setItem('LocalCartItems', JSON.stringify(cartItems))
      const { setChangeCart, changeCart } = props
      setChangeCart(!changeCart)
      toast.success('Producto agregado al carro')
    }
    setQuantity(qty + 1)
  }

  const MinusQty = (itemNumberProduct, skuSelected) => {
    if (qty > 1) {
      setQuantity(qty - 1)
      let cartItems = JSON.parse(localStorage.getItem('LocalCartItems'))
      if (!cartItems) cartItems = []
      const selectedProduct = cartItems.find(
        (product) => product.itemNumber === itemNumberProduct && product.sku === skuSelected
      )
      if (selectedProduct) {
        cartItems = cartItems.map((item) =>
          item.itemNumber === itemNumberProduct && item.sku === skuSelected
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        localStorage.removeItem('LocalCartItems')
        localStorage.setItem('LocalCartItems', JSON.stringify(cartItems))
        const { setChangeCart, changeCart } = props
        setChangeCart(!changeCart)
        toast.warn('Producto eliminado del carro')
      }
    }
    if (qty === 1) {
      setQuantity(1)
      let cartItems = JSON.parse(localStorage.getItem('LocalCartItems'))
      if (!cartItems) cartItems = []
      const selectedProduct = cartItems.find(
        (product) => product.itemNumber === itemNumberProduct && product.sku === skuSelected
      )
      if (selectedProduct) {
        cartItems =
          cartItems.length > 1
            ? cartItems.filter(
                (item) => item.itemNumber !== itemNumberProduct && item.sku !== skuSelected
              )
            : []
        localStorage.removeItem('LocalCartItems')
        localStorage.setItem('LocalCartItems', JSON.stringify(cartItems))
        const { setChangeCart, changeCart } = props
        setChangeCart(!changeCart)
        toast.warn('Producto borrado del carro')
      }
    }
  }

  const isSkuInCard = (skuSelected) => {
    let checkCart = false
    const cartItems = JSON.parse(localStorage.getItem('LocalCartItems'))
    if (cartItems && cartItems.length > 0) {
      checkCart = cartItems.some((item) => item.sku === skuSelected)
    }
    return checkCart
  }

  const formatNumberToView = (num) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(num)
  }

  const configSubProduct = (product) => {
    return sizes.map((size) => {
      const newProductDetails = product.details
      let detailsUpdated = {}
      for (let sku in newProductDetails) {
        if (newProductDetails[sku].size === size) {
          detailsUpdated = { ...newProductDetails[sku], sku }
        }
      }

      return { size, details: detailsUpdated }
    })
  }

  const handleSetSize = (size) => {
    const productDetails = props.product.details
    for (const sku in productDetails) {
      if (productDetails[sku].size === size) {
        setSku(sku)
      }
    }
    setSize(size)
  }

  const renderSizesProduct = (subProducts) => {
    return (
      <span className="size">
        <label>Tamaño:</label>
        {subProducts.map((product, index) => {
          if (Object.keys(product.details).length > 0) {
            return (
              <span key={index} itemProp="size" style={{ paddingRight: '4px' }}>
                <a
                  href="javascript:void(0)"
                  rel="tag"
                  onClick={(event) => handleSetSize(event.target.name)}
                  name={product.details.size}
                  className={size === product.details.size ? 'selectedSize' : ''}
                >
                  {product.details.size}
                </a>
              </span>
            )
          }
          return (
            <span key={index} itemProp="size" style={{ paddingRight: '4px' }}>
              <a href="javascript:void(0)" rel="tag" className="isDisabled">
                {product.size}
              </a>
            </span>
          )
        })}
      </span>
    )
  }

  const renderColorsProduct = (color) => (
    <span className="size">
      <label>Color:</label>
      <span itemProp="size" style={{ paddingRight: '4px' }}>
        {color}
      </span>
    </span>
  )

  const renderSKUProduct = (sku) => (
    <span className="sku_wrapper">
      <label>SKU:</label>
      <span className="sku">{sku ? sku : ''}</span>
    </span>
  )

  const handleGoToShoppingCart = (e) => {
    e.preventDefault()
    props.history.push(`/shopping-cart`)
  }

  const renderImageProduct = () => {
    return (
      <img src={props.product.pictures} className="img-fluid" name={props.product.itemNumber} />
    )
  }

  const isSomeSkuWithStockAvailable = (skuDetails) => {
    for (let sku in skuDetails) {
      if (skuDetails[sku].stock > 0) return true
    }
    return false
  }

  const setActualQuantity = (sku) => {
    const cartItems = JSON.parse(localStorage.getItem('LocalCartItems'))
    let cartItem = {}
    if (cartItems && cartItems.length > 0) {
      cartItem = cartItems.filter((item) => item.sku === sku)
      if (cartItem && Object.keys(cartItem).length > 0) {
        setQuantity(cartItem[0].quantity)
      }
    }
  }

  useEffect(() => {
    setActualQuantity(sku)
  }, [size, sku])

  const { product } = props
  const { itemNumber } = product
  const skuDetails = product.details

  const isProductWithStockAvailable = isSomeSkuWithStockAvailable(skuDetails)

  const subProducts = configSubProduct(product)

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
      <section>
        <div className="product-content-top single-product">
          <Row>
            <div className="product-top-left col-xl-5 col-md-6">
              <div className="product-top-left-inner">
                <div className="ciyashop-product-images">
                  <div className="ciyashop-product-images-wrapper ciyashop-gallery-style-default ciyashop-gallery-thumb_position-bottom ciyashop-gallery-thumb_vh-horizontal">
                    <div className="ciyashop-product-thumbnails">{renderImageProduct()}</div>
                    <div className="clearfix" />
                  </div>
                </div>
              </div>
            </div>
            <div className="product-top-right col-xl-7 col-md-6">
              <div className="product-top-right-inner">
                <div className="summary entry-summary">
                  <h1 className="product_title entry-title">{product.name}</h1>
                  <p className="price">{`${formatNumberToView(product.price.basePriceSales)}`}</p>
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
                          onClick={() => PlusQty(itemNumber, sku)}
                        >
                          +
                        </Link>
                        <Link
                          className="quantity-button quantity-down"
                          onClick={() => MinusQty(itemNumber, sku)}
                        >
                          -
                        </Link>
                      </div>
                    </div>
                    {!isSkuInCard(sku) ? (
                      <button
                        onClick={(e) =>
                          AddToCart(e, product, sku, qty, isProductWithStockAvailable)
                        }
                        className="button single_add_to_cart_button"
                        rel="nofollow"
                      >
                        Agregar al carro
                      </button>
                    ) : (
                      <button
                        className="button single_add_to_cart_button"
                        onClick={(e) => handleGoToShoppingCart(e)}
                      >
                        Ir al carro
                      </button>
                    )}
                    <div className="clearfix" />
                  </form>
                  <div className="product_meta">
                    <span className="posted_in">
                      <label>Categorías:</label>
                      {product.category.toString()}
                    </span>
                    {renderSizesProduct(subProducts)}
                    {renderColorsProduct(color)}
                    {renderSKUProduct(sku)}
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
                </div>
              </div>
            </div>
          </Row>
        </div>
      </section>
    </>
  )
}

const mapStateToProps = (state) => ({
  changeCart: state.changeCartDataReducer.changeCartData,
})

const mapDispatchToProps = (dispatch) => ({
  setChangeCart: (changeCart) => dispatch(setChangeCartData(changeCart)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GeneralInfo))

GeneralInfo.defaultProps = {
  history: {},
  product: {},
  changeCart: false,
  setChangeCart: () => {},
}

GeneralInfo.propTypes = {
  history: PropTypes.object,
  product: PropTypes.object,
  changeCart: PropTypes.bool,
  setChangeCart: PropTypes.func,
}
