import SET_CHANGE_PRODUCTS from '../types/setChangeProducts'

export default (changeProducts) => (dispatch) => {
  dispatch({
    type: SET_CHANGE_PRODUCTS,
    payload: {
      changeProducts,
    },
  })
}
