import SET_VIEW_ORDER_TOGGLE from '../types/setViewOrderToggle'

const initState = {
  viewOrderToggleData: false,
}

export default (state = initState, action) => {
  switch (action.type) {
    case SET_VIEW_ORDER_TOGGLE:
      return { ...state, viewOrderToggleData: action.payload.viewOrderToggleData }
    default:
      return state
  }
}
