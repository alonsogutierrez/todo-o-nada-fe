import SET_DISCOUNT_DATA from '../types/setDiscountData'

export default (discountData) => (dispatch) => {
  dispatch({
    type: SET_DISCOUNT_DATA,
    payload: {
      discountData,
    },
  })
}
