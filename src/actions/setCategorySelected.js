import SET_CATEGORY_SELECTED from '../types/setCategorySelectedData'

export default (categorySelectedData) => (dispatch) => {
  dispatch({
    type: SET_CATEGORY_SELECTED,
    payload: {
      categorySelectedData,
    },
  })
}
