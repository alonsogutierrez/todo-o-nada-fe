import React from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Table } from 'reactstrap'

const Resume = () => {
  const cartItems = JSON.parse(localStorage.getItem('LocalCartItems'))
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
                      {cartItems
                        .reduce(
                          (fr, cartItem) => fr + Number(cartItem.quantity) * Number(cartItem.price),
                          0
                        )
                        .toLocaleString(navigator.language, {
                          minimumFractionDigits: 0,
                        })}{' '}
                    </span>
                  </span>
                </td>
              </tr>
              <tr className="order-total">
                <th>Total</th>
                <td data-title="Total">
                  <strong>
                    <span className="special_price_code">
                      <span className="Price-amount amount">
                        <span className="Price-currencySymbol">$</span>{' '}
                        {parseFloat(
                          parseFloat(
                            cartItems.reduce(
                              (fr, cartItem) =>
                                fr + Number(cartItem.quantity) * Number(cartItem.price),
                              0
                            )
                          )
                        ).toLocaleString(navigator.language, {
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
  changeCart: state.changeCartDataReducer.changeCartData,
})

const mapDispatchToProps = (dispatch) => ({
  setDiscountData: (change) => dispatch(setDiscountData(change)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Resume))

Resume.defaultProps = {
  discountData: {},
  setDiscountData: () => {},
}

Resume.propTypes = {
  discountData: PropTypes.object,
  setDiscountData: PropTypes.func,
}
