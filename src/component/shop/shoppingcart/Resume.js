import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Table } from 'reactstrap'

const Resume = ({ changeCartData, changeDiscountData, discountData }) => {
  const [isCartChanged] = useState(changeCartData)

  const cartItems = JSON.parse(localStorage.getItem('LocalCartItems'))
  const subTotal = cartItems.reduce(
    (fr, cartItem) => fr + Number(cartItem.quantity) * Number(cartItem.price),
    0
  )
  const discount =
    discountData && Object.keys(discountData).length > 0 && discountData.isValid
      ? discountData.isPercentual
        ? parseInt(Math.floor(subTotal * discountData.amount))
        : discountData.amount
      : 0
  const total = subTotal - discount

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
          <td data-title="Subtotal">
            <span className="woocs_special_price_code">
              <span className="Price-amount amount">
                <span className="Price-currencySymbol">$</span> {totalDiscount}{' '}
              </span>
            </span>
          </td>
        </tr>
      )
    }
    return null
  }
  const discountDataLabel = renderDiscountData(discountData, subTotal)

  console.log('Resume changeDiscountData: ', changeDiscountData)

  useEffect(() => {}, [isCartChanged])

  return (
    <div className="cart-collaterals col-xl-4">
      <div className="cart_totals ">
        <h2>Resumen</h2>
        <div className="table-responsive">
          <Table cellspacing="0" className="shop_table shop_table_responsive">
            <tbody>
              <tr className="cart-subtotal">
                <th>Subtotal</th>
                <td data-title="Subtotal">
                  <span className="woocs_special_price_code">
                    <span className="Price-amount amount">
                      <span className="Price-currencySymbol">$</span>{' '}
                      {subTotal.toLocaleString(navigator.language, {
                        minimumFractionDigits: 0,
                      })}{' '}
                    </span>
                  </span>
                </td>
              </tr>
              {discountData && Object.keys(discountData).length > 0 && discountData.isValid
                ? discountDataLabel
                : null}
              <tr className="order-total">
                <th>Total</th>
                <td data-title="Total">
                  <strong>
                    <span className="special_price_code">
                      <span className="Price-amount amount">
                        <span className="Price-currencySymbol">$</span>{' '}
                        {total.toLocaleString(navigator.language, {
                          minimumFractionDigits: 0,
                        })}{' '}
                      </span>
                    </span>
                  </strong>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="proceed-to-checkout">
          <Link to="/checkout" className="checkout-button button">
            Ir al checkout
          </Link>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  discountData: state.discountDataReducer.discountData,
  changeDiscountData: state.changeDiscountsDataReducer.changeDiscountsData,
  changeCartData: state.changeCartDataReducer.changeCartData,
})

export default connect(mapStateToProps, null)(Resume)

Resume.defaultProps = {
  discountData: {},
  changeDiscountData: false,
  changeCartData: false,
}

Resume.propTypes = {
  discountData: PropTypes.object,
  changeDiscountData: PropTypes.bool,
  changeCartData: PropTypes.bool,
}
