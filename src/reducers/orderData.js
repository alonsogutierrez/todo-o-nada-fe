import SET_ORDER_DATA from '../types/setOrderData'

const initState = {
  orderData: {},
}

export default (state = initState, action) => {
  switch (action.type) {
    case SET_ORDER_DATA:
      return { ...state, orderData: action.payload.orderData }
    default:
      return state
  }
}
