import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { toast, ToastContainer } from 'react-toastify'
import { Row } from 'reactstrap'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

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
  const [adultSizes] = useState(['S', 'M', 'L', 'XL', 'XXL'])
  const [childSizes] = useState(['2', '4', '6', '8', '10', '12', '14', '16'])
  const [qty, setQuantity] = useState(1)
  const [size, setSize] = useState(getDefaultSize(props.product))
  const [color] = useState(getDefaultColor(props.product))
  const [sku, setSku] = useState(getDefaultSku(props.product))

  const IsSkuWithAvailableStock = (skuSelected, desiredQuantity) => {
    const { product } = props
    const skuDetails = product.details
    const availableStock =
      skuDetails[skuSelected] && Object.keys(skuDetails[skuSelected]).length > 0
        ? skuDetails[skuSelected].stock
        : 0
    const isStockAvailable = desiredQuantity <= availableStock
    return isStockAvailable
  }

  const AddToCart = (e, product, skuSelected, quantity) => {
    e.preventDefault()
    if (!IsSkuWithAvailableStock(skuSelected, quantity)) {
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
          picture: product.pictures[0],
          size,
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
    const desiredQuantity = qty + 1
    if (!IsSkuWithAvailableStock(skuSelected, desiredQuantity)) {
      toast.warning('Producto sin stock')
    } else {
      let cartItems = JSON.parse(localStorage.getItem('LocalCartItems'))
      if (!cartItems) cartItems = []

      const selectedProduct = cartItems.find(
        (product) =>
          product.itemNumber === parseInt(itemNumberProduct, 10) &&
          product.sku === parseInt(skuSelected, 10)
      )
      if (selectedProduct) {
        cartItems = cartItems.map((item) => {
          if (
            item.itemNumber === parseInt(itemNumberProduct, 10) &&
            item.sku === parseInt(skuSelected, 10)
          ) {
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
  }

  const MinusQty = (itemNumberProduct, skuSelected) => {
    if (qty > 1) {
      setQuantity(qty - 1)
      let cartItems = JSON.parse(localStorage.getItem('LocalCartItems'))
      if (!cartItems) cartItems = []
      const selectedProduct = cartItems.find(
        (product) =>
          product.itemNumber === parseInt(itemNumberProduct, 10) &&
          product.sku === parseInt(skuSelected, 10)
      )
      if (selectedProduct) {
        cartItems = cartItems.map((item) =>
          item.itemNumber === parseInt(itemNumberProduct, 10) &&
          item.sku === parseInt(skuSelected, 10)
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
        (product) =>
          product.itemNumber === parseInt(itemNumberProduct, 10) &&
          product.sku === parseInt(skuSelected, 10)
      )
      if (selectedProduct) {
        cartItems =
          cartItems.length > 1
            ? cartItems.filter(
                (item) =>
                  item.itemNumber !== parseInt(itemNumberProduct, 10) &&
                  item.sku !== parseInt(skuSelected, 10)
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

  const IsSkuInCard = (skuSelected) => {
    let checkCart = false
    const cartItems = JSON.parse(localStorage.getItem('LocalCartItems'))
    if (cartItems && cartItems.length > 0) {
      checkCart = cartItems.some((item) => item.sku === parseInt(skuSelected, 10))
    }
    return checkCart
  }

  const formatNumberToView = (num) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(num)
  }

  const getConfigClothesSizes = (childSizes, newProductDetails) => {
    let detailsUpdated = {}
    let productSizeResult = []
    productSizeResult = childSizes.map((size) => {
      for (let sku in newProductDetails) {
        detailsUpdated = {}
        if (newProductDetails[sku].size === size) {
          detailsUpdated = { ...newProductDetails[sku], sku }
        }
        const productUpdated = { size, details: detailsUpdated }
        return productUpdated
      }
    })

    productSizeResult = productSizeResult.concat(
      adultSizes.map((size) => {
        for (let sku in newProductDetails) {
          detailsUpdated = {}
          if (newProductDetails[sku].size === size) {
            detailsUpdated = { ...newProductDetails[sku], sku }
          }
          return { size, details: detailsUpdated }
        }
      })
    )

    return productSizeResult
  }

  const getConfigUniqueMeasuresSizes = (newProductDetails) => {
    let result = []
    let detailsUpdated = {}
    for (let sku in newProductDetails) {
      detailsUpdated = { ...newProductDetails[sku], sku }
      result.push({ size: newProductDetails[sku].size, details: detailsUpdated })
    }
    return result
  }

  const configSubProduct = (product) => {
    const newProductDetails = product.details
    if (product.productSizeType === 'clothesSizes') {
      return getConfigClothesSizes(childSizes, newProductDetails)
    }
    return getConfigUniqueMeasuresSizes(newProductDetails)
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

  const renderSizesProduct = (subProducts, productSizeType) => {
    if (productSizeType === 'clothesSizes') {
      return (
        <>
          <span className="size normalSize">
            <label className="normalSize">Tamaño niño:</label>
            {subProducts
              .filter((product) => {
                return childSizes.includes(product.size)
              })
              .map((product, index) => {
                if (Object.keys(product.details).length > 0 && product.details.stock > 0) {
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
          <span className="size normalSize">
            <label className="normalSize">Tamaño adulto:</label>
            {subProducts
              .filter((product) => {
                return adultSizes.includes(product.size)
              })
              .map((product, index) => {
                if (Object.keys(product.details).length > 0 && product.details.stock > 0) {
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
        </>
      )
    }
    return (
      <span className="size normalSize">
        <label className="normalSize">Medidas:</label>
        {subProducts.map((product, index) => {
          if (Object.keys(product.details).length > 0 && product.details.stock > 0) {
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
    <span className="size normalSize">
      <label className="normalSize">Color:</label>
      <span className="normalSize" itemProp="size" style={{ paddingRight: '4px' }}>
        {color}
      </span>
    </span>
  )

  const handleGoToShoppingCart = (e) => {
    e.preventDefault()
    props.history.push(`/shopping-cart`)
  }

  const renderImageProduct = () => (
    <TransformWrapper initialScale={1} initialPositionX={1} initialPositionY={1}>
      {({ zoomIn, zoomOut, resetTransform }) => (
        <>
          <div className="tools">
            <button className="btn btn-solid" onClick={() => zoomIn()}>
              Zoom +
            </button>
            <button className="btn btn-solid" onClick={() => zoomOut()}>
              Zoom -
            </button>
            <button className="btn btn-solid" onClick={() => resetTransform()}>
              Reset
            </button>
          </div>
          <TransformComponent>
            <img
              src={props.product.pictures}
              className="img-fluid"
              name={props.product.itemNumber}
              style={{
                borderRadius: '5px',
              }}
            />
          </TransformComponent>
        </>
      )}
    </TransformWrapper>
  )

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
  const subProducts = configSubProduct(product)

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
                    {!IsSkuInCard(sku) ? (
                      IsSkuWithAvailableStock(sku, 1) ? (
                        <button
                          onClick={(e) => AddToCart(e, product, sku, qty)}
                          className="button single_add_to_cart_button"
                          rel="nofollow"
                        >
                          Agregar al carro
                        </button>
                      ) : (
                        <button
                          className="btn btn-secondary"
                          disabled={!IsSkuWithAvailableStock(sku, 1)}
                        >
                          No hay stock
                        </button>
                      )
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
                    <span className="posted_in normalSize">
                      <label className="normalSize">Categorías:</label>
                      <span className="normalSize">{product.category.join(', ')}</span>
                    </span>
                    {renderSizesProduct(subProducts, product.productSizeType)}
                    {renderColorsProduct(color)}
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
