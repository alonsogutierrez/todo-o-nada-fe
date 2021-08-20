import SET_CATEGORY_SELECTED from '../types/setCategorySelectedData'

const initState = {
  categorySelectedData: '',
}

export default (state = initState, action) => {
  switch (action.type) {
    case SET_CATEGORY_SELECTED:
      return { ...state, categorySelectedData: action.payload.categorySelectedData }
    default:
      return state
  }
}
