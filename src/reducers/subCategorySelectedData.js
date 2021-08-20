import SET_SUBCATEGORY_SELECTED from '../types/setSubCategorySelectedData'

const initState = {
  subCategorySelectedData: '',
}

export default (state = initState, action) => {
  switch (action.type) {
    case SET_SUBCATEGORY_SELECTED:
      return { ...state, subCategorySelectedData: action.payload.subCategorySelectedData }
    default:
      return state
  }
}
