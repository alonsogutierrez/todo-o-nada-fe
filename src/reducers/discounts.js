import SET_DISCOUNT_DATA from '../types/setDiscountData'

const initState = {
  discountData: {},
}

export default (state = initState, action) => {
  switch (action.type) {
    case SET_DISCOUNT_DATA:
      return { ...state, discountData: action.payload.discountData }
    default:
      return state
  }
}
