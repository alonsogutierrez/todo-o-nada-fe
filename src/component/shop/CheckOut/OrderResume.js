import React, { useState } from 'react'

import DispatchOptions from './DispatchOptions'
import PaymentMethods from './PaymentMethods'

const calculateSubTotal = (items) => {
  return items
    .reduce((fr, CartItem) => fr + Number(CartItem.Qty) * Number(CartItem.Rate), 0)
    .toLocaleString(navigator.language, {
      minimumFractionDigits: 0,
    })
}

const OrderResume = () => {
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
    const total = Number(subTotal) + Number(totalShippingCharge)
    return total
  }

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
                  {item.ProductName}&nbsp;{' '}
                  <strong className="product-quantity">× {item.Qty}</strong>{' '}
                </td>
                <td className="product-total">
                  <span className="woocs_special_price_code">
                    <span className="Price-amount amount">
                      <span className="Price-currencySymbol">$</span>{' '}
                      {formatToCurrency(item.Rate * item.Qty)}{' '}
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
          </tfoot>
        </table>
      ) : (
        <div>No hay productos encontrados</div>
      )}
      <PaymentMethods />
    </>
  )
}

export default OrderResume
