import SET_CHANGE_CART_DATA from '../types/setChangeCartData'

export default (changeCartData) => (dispatch) => {
  dispatch({
    type: SET_CHANGE_CART_DATA,
    payload: {
        changeCartData,
    },
  })
}
