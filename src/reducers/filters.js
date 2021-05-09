const initState = {
  category: [],
  size: [],
  color: [],
  ratings: '',
  value: { min: 0, max: 200000 },
  sortOrder: '',
}

export default (state = initState, action) => {
  switch (action.type) {
    case 'GET_CATEGORY_VALUE':
      return {
        ...state,
        category: action.category,
      }
    case 'GET_SIZE_VALUE':
      return {
        ...state,
        size: action.size,
      }
    case 'GET_COLOR_VALUE':
      return {
        ...state,
        color: action.color,
      }
    case 'GET_PRICE_VALUE':
      return {
        ...state,
        value: { min: action.value.value.min, max: action.value.value.max },
      }
    case 'GET_SORT_BY_VALUE':
      return {
        ...state,
        sortOrder: action.sort_by,
      }
    case 'GET_RATING_VALUE':
      return {
        ...state,
        ratings: action.rating,
      }
    default:
      return state
  }
}
