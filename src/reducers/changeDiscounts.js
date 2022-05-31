import SET_CHANGE_DISCOUNTS from '../types/setChangeDiscounts'

const initState = {
  changeDiscountsData: false,
}

export default (state = initState, action) => {
  switch (action.type) {
    case SET_CHANGE_DISCOUNTS:
      return { ...state, changeDiscountsData: action.payload.changeDiscountsData }
    default:
      return state
  }
}
