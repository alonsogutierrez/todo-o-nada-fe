import SET_ORDER_DATA from '../types/setOrderData'

export default (orderData) => (dispatch) => {
  dispatch({
    type: SET_ORDER_DATA,
    payload: {
      orderData,
    },
  })
}
