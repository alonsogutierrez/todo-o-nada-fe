import SET_CHANGE_DISCOUNTS from '../types/setChangeDiscounts'

export default (changeDiscounts) => (dispatch) => {
  dispatch({
    type: SET_CHANGE_DISCOUNTS,
    payload: {
      changeDiscounts,
    },
  })
}
