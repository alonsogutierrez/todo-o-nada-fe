import SET_VIEW_ORDER_TOGGLE from '../types/setViewOrderToggle'

export default (viewOrderToggleData) => (dispatch) => {
  dispatch({
    type: SET_VIEW_ORDER_TOGGLE,
    payload: {
      viewOrderToggleData,
    },
  })
}
