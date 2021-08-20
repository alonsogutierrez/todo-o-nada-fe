import SET_SUBCATEGORY_SELECTED from '../types/setSubCategorySelectedData'

export default (subCategorySelectedData) => (dispatch) => {
  dispatch({
    type: SET_SUBCATEGORY_SELECTED,
    payload: {
      subCategorySelectedData,
    },
  })
}
