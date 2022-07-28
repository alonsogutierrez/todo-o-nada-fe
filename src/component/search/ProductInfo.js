import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const ProductInfo = ({ product }) => {
  const { picture, name, price, description, itemNumber, details } = product

  const productPrice = price.basePriceSales
  let isProductWithStockAvailable = false
  for (const sku in details) {
    if (parseInt(details[sku].quantity, 10) > 0) isProductWithStockAvailable = true
  }

  const getDiscountPercentage = (priceSales, pricesReference) => {
    return 100 - parseInt((100 * priceSales) / pricesReference)
  }
  const { basePriceReference, basePriceSales } = price
  const discountPercentage = getDiscountPercentage(basePriceSales, basePriceReference)
  const titleDiscountStyle = {
    color: '#fb7633',
    fontWeight: 'bold',
  }

  const discountPriceStyle = {
    color: 'gray',
    textDecoration: 'line-through',
  }

  return (
    <>
      <div className="product product_tag-black product-hover-style-default product-hover-button-style-dark product_title_type-single_line product_icon_type-line-icon">
        <div className="product-inner element-hovered">
          <div className="product-thumbnail">
            <div className="product-thumbnail-inner">
              <Link to={`/product/${itemNumber}`}>
                <div className="product-thumbnail-main">
                  <img src={picture} className="img-fluid img-slider" />
                </div>
              </Link>
            </div>

            <div className="product-actions">
              <div className="product-actions-inner">
                <div className="product-action product-action-add-to-cart">
                  {
                    <Link
                      to={`/product/${itemNumber}`}
                      className="button add_to_cart_button"
                      rel="nofollow"
                    >
                      {isProductWithStockAvailable ? 'Ver producto' : 'No hay stock'}
                    </Link>
                  }
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
            {discountPercentage > 0 && (
              <p style={titleDiscountStyle}>{`Oferta - ${discountPercentage}% descuento`} </p>
            )}

            <div className="product-rating-price">
              {basePriceReference > productPrice && (
                <span className="price">
                  <ins>
                    <span className="price-amount amount" style={discountPriceStyle}>
                      <span className="currency-symbol">$</span>
                      {basePriceReference.toLocaleString(navigator.language, {
                        minimumFractionDigits: 0,
                      })}
                    </span>
                  </ins>
                </span>
              )}
            </div>
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
                  <Link
                    to={`/product/${itemNumber}`}
                    className="button add_to_cart_button"
                    rel="nofollow"
                  >
                    {isProductWithStockAvailable ? 'Ver producto' : 'No hay stock'}
                  </Link>
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

export default ProductInfo

ProductInfo.defaultProps = {
  product: {},
}

ProductInfo.propTypes = {
  product: PropTypes.object,
}
