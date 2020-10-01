import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const dispatchData = {
  homeDelivery: {
    name: 'Despacho a domicilio',
    total: 1000,
  },
  localPickUp: {
    name: 'Retiro en tienda',
    total: 0,
  },
}

const DispatchOptions = ({ setTotalShippingChargeFunc, userData }) => {
  const getShippingChargeByAddress = () => {
    console.log('User Data: ', userData)
    //console.log(`Calculating dispatch to: ${country}, ${region}`)
    return 1000
  }

  const setShippingCharge = (numCase) => {
    switch (numCase) {
      case dispatchData.homeDelivery.name:
        dispatchData.homeDelivery.total = getShippingChargeByAddress(userData)
        setTotalShippingChargeFunc(dispatchData.homeDelivery.total)
        break
      case dispatchData.localPickUp.name:
        setTotalShippingChargeFunc(dispatchData.localPickUp.total)
        break
      default:
        return
    }
  }

  return (
    <>
      <tr className="shipping-totals shipping">
        <th>Despacho</th>
        <td data-title="Shipping">
          <ul id="shipping_method" className="shipping-methods">
            <a onClick={() => setShippingCharge(dispatchData.homeDelivery.name)}>
              <li>
                <input
                  style={{ cursor: 'pointer' }}
                  type="radio"
                  name="shipping_method[0]"
                  data-index="0"
                  id="shipping_method_0_flat_rate3"
                  value="flat_rate:3"
                  className="shipping_method"
                  defaultChecked
                />
                <label style={{ cursor: 'pointer' }} htmlFor="shipping_method_0_flat_rate3">
                  {dispatchData.homeDelivery.name}:{' '}
                  <span className="Price-amount amount">
                    <span className="Price-currencySymbol">$</span>
                    {dispatchData.homeDelivery.total}{' '}
                  </span>
                </label>
              </li>
            </a>
            <a onClick={() => setShippingCharge(dispatchData.localPickUp.name)}>
              <li>
                <input
                  style={{ cursor: 'pointer' }}
                  type="radio"
                  name="shipping_method[0]"
                  data-index="0"
                  id="shipping_method_0_local_pickup4"
                  value="local_pickup:4"
                  className="shipping_method"
                />
                <label style={{ cursor: 'pointer' }} htmlFor="shipping_method_0_local_pickup4">
                  {dispatchData.localPickUp.name}:{' '}
                  <span className="Price-amount amount">
                    <span className="Price-currencySymbol">$</span>
                    {dispatchData.localPickUp.total}
                  </span>
                </label>
              </li>
            </a>
          </ul>
        </td>
      </tr>
    </>
  )
}

const mapStateToProps = (state) => ({
  userData: state.userDataReducer.userData,
})

export default connect(mapStateToProps, null)(DispatchOptions)

DispatchOptions.defaultProps = {
  userData: {},
  setTotalShippingChargeFunc: () => {},
}

DispatchOptions.propTypes = {
  userData: PropTypes.object,
  setTotalShippingChargeFunc: PropTypes.func,
}
