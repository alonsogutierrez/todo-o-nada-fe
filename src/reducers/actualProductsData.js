import SET_ACTUAL_PRODUCTS_DATA from '../types/setActualProductsData'

const initState = {
  actualProductsData: [],
}

export default (state = initState, action) => {
  switch (action.type) {
    case SET_ACTUAL_PRODUCTS_DATA:
      return { ...state, actualProductsData: action.payload.actualProductsData }
    default:
      return state
  }
}
