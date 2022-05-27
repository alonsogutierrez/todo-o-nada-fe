import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import DiscountCouponForm from '../shoppingcart/DiscountCouponForm'

import DispatchOptions from './DispatchOptions'
import PaymentMethods from './PaymentMethods'

const calculateSubTotal = (items) => {
  return items.reduce(
    (accum, cartItem) => accum + parseInt(cartItem.quantity, 10) * parseInt(cartItem.price, 10),
    0
  )
}

const OrderResume = ({ changeCartData, discountData }) => {
  const [cartItems] = useState(JSON.parse(localStorage.getItem('LocalCartItems')))
  const [subTotal] = useState(calculateSubTotal(cartItems))
  const [totalShippingCharge, setTotalShippingCharge] = useState(0)

  const formatToCurrency = (val) => {
    return val.toLocaleString(navigator.language, {
      minimumFractionDigits: 0,
    })
  }

  const setTotalShippingChargeFunc = (shippingCharge) => {
    setTotalShippingCharge(shippingCharge)
  }

  const calculateTotalOrder = () => {
    let totalDiscount = 0
    if (discountData && Object.keys(discountData).length > 0 && discountData.isValid) {
      totalDiscount = discountData.isPercentual
        ? parseInt(Math.ceil(subTotal * (discountData.amount / 100)))
        : discountData.amount
    }
    const totalOrder = parseInt(subTotal, 10) + parseInt(totalShippingCharge, 10) - totalDiscount
    return totalOrder
  }

  const renderDiscountData = (discount, subTotal) => {
    if (discount && Object.keys(discount).length > 0 && discount.isValid && subTotal) {
      let totalDiscount = 0
      if (discount.isPercentual) {
        totalDiscount = parseInt(Math.ceil(subTotal * discountData.amount))
      } else {
        totalDiscount = discount.amount
      }

      return (
        <tr className="cart-subtotal">
          <th>Descuento</th>
          <td>
            <span className="woocs_special_price_code">
              <span className="Price-amount amount">
                <span className="Price-currencySymbol">$</span>
                {formatToCurrency(totalDiscount)}
              </span>
            </span>
          </td>
        </tr>
      )
    }
    return null
  }

  useEffect(() => {}, [changeCartData])

  const discountLabel = renderDiscountData(discountData, subTotal)

  return (
    <>
      {cartItems !== null && cartItems.length > 0 ? (
        <table className="shop_table checkout-review-order-table">
          <thead>
            <tr>
              <th className="product-name">Producto</th>
              <th className="product-total">Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index} className="cart_item">
                <td className="product-name">
                  {item.productName}&nbsp; {`- ${item.size}`}
                  <strong className="product-quantity"> × {item.quantity}</strong>{' '}
                </td>
                <td className="product-total">
                  <span className="woocs_special_price_code">
                    <span className="Price-amount amount">
                      <span className="Price-currencySymbol">$</span>{' '}
                      {formatToCurrency(Number(item.price) * Number(item.quantity))}{' '}
                    </span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="cart-subtotal">
              <th>Subtotal</th>
              <td>
                <span className="woocs_special_price_code">
                  <span className="Price-amount amount">
                    <span className="Price-currencySymbol">$</span>
                    {formatToCurrency(subTotal)}
                  </span>
                </span>
              </td>
            </tr>
            <DispatchOptions setTotalShippingChargeFunc={setTotalShippingChargeFunc} />
            {discountData && Object.keys(discountData).length > 0 && discountData.isValid
              ? discountLabel
              : null}
            <tr className="order-total">
              <th>Total</th>
              <td>
                <strong>
                  <span className="woocs_special_price_code">
                    <span className="Price-amount amount">
                      <span className="Price-currencySymbol">$</span>
                      {formatToCurrency(calculateTotalOrder())}{' '}
                    </span>
                  </span>
                </strong>
              </td>
            </tr>
            <tr>
              <th>Cupón</th>
              <td>
                <DiscountCouponForm />
              </td>
            </tr>
          </tfoot>
        </table>
      ) : (
        <div>No hay productos encontrados</div>
      )}
      <PaymentMethods />
    </>
  )
}

const mapStateToProps = (state) => ({
  discountData: state.discountDataReducer.discountData,
  changeDiscountData: state.changeDiscountsDataReducer.changeDiscountsData,
  changeCartData: state.changeCartDataReducer.changeCartData,
})

export default connect(mapStateToProps, null)(OrderResume)

OrderResume.defaultProps = {
  discountData: {},
  changeDiscountData: false,
  changeCartData: false,
}

OrderResume.propTypes = {
  discountData: PropTypes.object,
  changeDiscountData: PropTypes.bool,
  changeCartData: PropTypes.bool,
}
