import SET_PRODUCTS_CART_DATA from '../types/setProductsCartData'

const initState = {
  productsCartData: [],
}

export default (state = initState, action) => {
  switch (action.type) {
    case SET_PRODUCTS_CART_DATA:
      return { ...state, productsCartData: action.payload.productsCartData }
    default:
      return state
  }
}
