import SET_ACTUAL_PRODUCTS_DATA from '../types/setActualProductsData'

export default (actualProductsData) => (dispatch) => {
  dispatch({
    type: SET_ACTUAL_PRODUCTS_DATA,
    payload: {
      actualProductsData,
    },
  })
}
