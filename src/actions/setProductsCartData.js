import SET_PRODUCTS_CART_DATA from '../types/setProductsCartData'

export default (productsCartData) => (dispatch) => {
  dispatch({
    type: SET_PRODUCTS_CART_DATA,
    payload: {
      productsCartData,
    },
  })
}
