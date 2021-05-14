/***
 *  Products Reducers
 ***/
export default (state = { products: [], detail_products: [] }, action) => {
  if (action.type === 'ACTUAL_PRODUCTS') {
    return { ...state, products: action.products }
  } else {
    return state
  }
}
