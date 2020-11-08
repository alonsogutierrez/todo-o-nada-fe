import SET_CHANGE_CART_DATA from '../types/setChangeCartData'

const initState = {
  changeCartData: false,
}

export default (state = initState, action) => {
  switch (action.type) {
    case SET_CHANGE_CART_DATA:
      return { ...state, changeCartData: action.payload.changeCartData }
    default:
      return state
  }
}
