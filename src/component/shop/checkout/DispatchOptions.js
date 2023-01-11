import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import setDispatchType from './../../../actions/setDispatchType'

const dispatchData = {
  homeDelivery: {
    name: 'Despacho a domicilio (Envío por pagar), costo varíable dependiendo del destino',
    code: 'HOME_DELIVERY',
    total: 0,
  },
  localPickUp: {
    name: 'Calle del Arzobispo #0607, Providencia, Chile (Retiro en tienda)',
    code: 'PICKUP',
    total: 0,
  },
}

const DispatchOptions = ({ setTotalShippingChargeFunc, dispatchType, setDispatchType }) => {
  const setShippingCharge = (numCase) => {
    switch (numCase) {
      case dispatchData.homeDelivery.name:
        setTotalShippingChargeFunc(dispatchData.homeDelivery.total)
        setDispatchType(dispatchData.homeDelivery.code)
        return
      case dispatchData.localPickUp.name:
        setTotalShippingChargeFunc(dispatchData.localPickUp.total)
        setDispatchType(dispatchData.localPickUp.code)
        return
      default:
        return
    }
  }

  const isHomeDelivery = dispatchType !== 'PICKUP'

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
                  defaultChecked={isHomeDelivery}
                />
                <label style={{ cursor: 'pointer' }} htmlFor="shipping_method_0_flat_rate3">
                  {dispatchData.homeDelivery.name}
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
                  defaultChecked={!isHomeDelivery}
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
  dispatchType: state.dispatchTypeDataReducer.dispatchTypeData,
})

const mapDispatchToProps = (dispatch) => ({
  setDispatchType: (type) => dispatch(setDispatchType(type)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DispatchOptions)

DispatchOptions.defaultProps = {
  userData: {},
  dispatchType: '',
  setTotalShippingChargeFunc: () => {},
  setDispatchType: () => {},
}

DispatchOptions.propTypes = {
  userData: PropTypes.object,
  dispatchType: PropTypes.string,
  setTotalShippingChargeFunc: PropTypes.func,
  setDispatchType: PropTypes.func,
}
