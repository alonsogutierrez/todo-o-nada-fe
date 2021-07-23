import React, { useEffect, useState } from 'react'
import Lightbox from 'react-image-lightbox'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import Slider from 'react-slick'
import 'react-toastify/dist/ReactToastify.min.css'
import { toast, ToastContainer } from 'react-toastify'
import { Row } from 'reactstrap'
import 'react-image-lightbox/style.css'

import './style.css'

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
}
const productslider = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
}

const sizes = ['S', 'M', 'L', 'XL']

const getDefaultSize = (product) => {
  const details = product.details
  for (let sku in details) {
    if (details[sku].stock > 0) {
      return details[sku].size
    }
  }
}
const getDefaultColor = (product) => {
  const details = product.details
  for (let sku in details) {
    if (details[sku].stock > 0) {
      return details[sku].color
    }
  }
}
const getDefaultSku = (product) => {
  const details = product.details
  for (let sku in details) {
    if (details[sku].stock > 0) {
      return sku
    }
  }
}

const GeneralInfo = (props) => {
  const [photoIndex, setPhotoIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [qty, setQuantity] = useState(1)
  const [imagePreview, setImagePreview] = useState('')
  //const [colorsAvailable, setColorsAvailable] = useState([])
  const [size, setSize] = useState(getDefaultSize(props.product))
  const [color] = useState(getDefaultColor(props.product))
  const [sku, setSku] = useState(getDefaultSku(props.product))
  // const [pictures, setPictures] = useState([])
  // const [newImage, setNewImage] = useState('')
  // const [cc, settabid] = useState(0)

  // const changePreviewImage = (image) => {
  //   setNewImage(image)
  //   settabid(1)
  // }

  const AddToCart = (
    e,
    itemNumber,
    sku,
    productName,
    quantity,
    price,
    isProductWithStockAvailable
  ) => {
    e.preventDefault()
    console.log('Click AddToCart button')
    if (!isProductWithStockAvailable) {
      toast.warning('Producto sin stock')
    } else {
      let cartItems = JSON.parse(localStorage.getItem('LocalCartItems'))
      if (!cartItems) cartItems = []
      const selectedProduct = cartItems.find(
        (product) => product.itemNumber === itemNumber && product.sku === sku
      )
      console.log('selectedProduct: ', selectedProduct)
      if (!selectedProduct) {
        cartItems.push({
          itemNumber,
          sku,
          productName,
          quantity,
          price,
          isProductWithStockAvailable,
        })
        localStorage.removeItem('LocalCartItems')
        localStorage.setItem('LocalCartItems', JSON.stringify(cartItems))
        toast.success('Producto agregado al carro')
      } else {
        toast.warning('Producto ya esta en el carro')
      }
    }
  }

  const PlusQty = () => {
    setQuantity(qty + 1)
  }

  const MinusQty = () => {
    if (qty > 1) {
      setQuantity(qty - 1)
      // TODO: Add logic to erase 1 product from array
    }
  }

  const isSkuInCard = (sku) => {
    let checkCart = false
    const cartItems = JSON.parse(localStorage.getItem('LocalCartItems'))
    if (cartItems && cartItems.length > 0) {
      checkCart = cartItems.some((item) => item.sku === sku)
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
    const { product } = props
    const productDetails = product.details
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

  const renderColorsProduct = (subProducts) => {
    let colorSelected = ''
    subProducts.forEach((p) => {
      if (p.details.sku === sku) {
        colorSelected = p.details.color
      }
    })
    return (
      <span className="size">
        <label>Color:</label>
        <span itemProp="size" style={{ paddingRight: '4px' }}>
          {colorSelected}
        </span>
      </span>
    )
  }

  const renderSKUProduct = () => {
    if (!sku) {
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
        <span className="sku">{sku}</span>
      </span>
    )
  }

  const handleGoToShoppingCart = (e) => {
    console.log('********** SHOPPING CART ********')
    const { history } = props
    e.preventDefault()
    history.push('/shopping-cart')
  }

  const setImages = () => {
    subProducts.forEach((p) => {
      if (p.sku === sku) {
        return p.pictures
      }
    })
    return []
  }

  const setFirstSubProductAvailable = (subProducts) => {
    const productsAvailable = subProducts.length > 0
    if (productsAvailable) {
      subProducts.forEach((p) => {
        if (p.details.stock > 0) {
          return {
            size: p.details.stock,
            color: p.details.color,
            sku: p.details.sku,
          }
        }
      })
    }
    return {}
  }

  const setCarousel = (subProducts, sku) => {
    let spSelected = {}
    let defaultProduct = {}
    if (!sku) {
      defaultProduct = setFirstSubProductAvailable(subProducts)
      subProducts.forEach((sp) => {
        if (sp.details.sku === defaultProduct.sku) {
          spSelected = sp.details
        }
      })
    } else {
      subProducts.forEach((sp) => {
        if (sp.details.sku === sku) {
          spSelected = sp.details
        }
      })
    }
    return (
      <Slider {...productslider} className="ciyashop-product-thumbnails__wrapper">
        {spSelected.pictures.map((pic, index) => (
          <div key={index} className="ciyashop-product-thumbnail__image">
            <Link onMouseOver={() => console.log('clicked')}>
              <img
                src={pic.image}
                className="img-fluid"
                id={pic.image}
                name={pic.image}
                onClick={(event) => setImagePreview(event.target.name)}
              />
            </Link>
          </div>
        ))}
      </Slider>
    )
  }

  const setImagePreviewFunc = (imagePreview, images) => {
    let image = ''
    if (!imagePreview) {
      image = images[0]
    } else {
      image = imagePreview
    }
    return (
      <div className="ciyashop-product-gallery__image">
        <img src={image} className="img-fluid" />
      </div>
    )
  }

  const isSomeSkuWithStockAvailable = (skuDetails) => {
    for (let sku in skuDetails) {
      if (skuDetails[sku].stock > 0) return true
    }
    return false
  }

  useEffect(() => {}, [size, sku])

  const { product } = props
  const { name, price, itemNumber } = product
  const productPrice = price.basePriceSales
  const skuDetails = product.details

  const isProductWithStockAvailable = isSomeSkuWithStockAvailable(skuDetails)

  const subProducts = configSubProduct(product)
  const defaultProduct = setFirstSubProductAvailable(subProducts)
  const images = setImages(subProducts, defaultProduct.size, defaultProduct.color)

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
                    <div className="ciyashop-product-gallery ciyashop-product-gallery--with-images slick-carousel">
                      <Slider
                        {...settings}
                        className="ciyashop-product-gallery__wrapper popup-gallery"
                      >
                        {setImagePreviewFunc(imagePreview, images)}
                      </Slider>
                      <div className="ciyashop-product-gallery_buttons_wrapper">
                        <div
                          className="ciyashop-product-gallery_button ciyashop-product-gallery_button-zoom popup-gallery"
                          onClick={() => setIsOpen(true)}
                        >
                          <Link to="#" className="ciyashop-product-gallery_button-link-zoom">
                            <i className="fa fa-arrows-alt" />
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="ciyashop-product-thumbnails">
                      {setCarousel(subProducts, sku)}
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
                  <p className="price">{`${formatNumberToView(
                    product.price.basePriceSales * qty
                  )}`}</p>
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
                        <Link className="quantity-button quantity-up" onClick={() => PlusQty()}>
                          +
                        </Link>
                        <Link className="quantity-button quantity-down" onClick={() => MinusQty()}>
                          -
                        </Link>
                      </div>
                    </div>
                    {!isSkuInCard(sku) ? (
                      <Link
                        onClick={(e) =>
                          AddToCart(
                            e,
                            itemNumber,
                            sku,
                            name,
                            qty,
                            productPrice,
                            isProductWithStockAvailable
                          )
                        }
                        className="button single_add_to_cart_button"
                        rel="nofollow"
                      >
                        Agregar al carro
                      </Link>
                    ) : (
                      <Link
                        onClick={(e) => handleGoToShoppingCart(e)}
                        className="button single_add_to_cart_button"
                        rel="nofollow"
                      >
                        Ir al carro
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
                    {renderSizesProduct(subProducts)}
                    {renderColorsProduct(subProducts, size)}
                    {renderSKUProduct(subProducts, size, color)}
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
        <div>
          {isOpen && (
            <Lightbox
              mainSrc={images[photoIndex]}
              nextSrc={images[(photoIndex + 1) % images.length]}
              prevSrc={images[(photoIndex + images.length - 1) % images.length]}
              onCloseRequest={() => setIsOpen(false)}
              enableZoom={false}
              onMovePrevRequest={() =>
                setPhotoIndex((photoIndex + images.length - 1) % images.length)
              }
              onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
            />
          )}
        </div>
      </section>
    </>
  )
}

export default withRouter(GeneralInfo)

GeneralInfo.defaultProps = {
  product: {},
  history: {},
}

GeneralInfo.propTypes = {
  product: PropTypes.object,
  history: PropTypes.object,
}
