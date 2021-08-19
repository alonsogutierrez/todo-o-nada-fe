import SET_DISPATCH_TYPE from '../types/setDispatchType'

export default (dispatchTypeData) => (dispatch) => {
  dispatch({
    type: SET_DISPATCH_TYPE,
    payload: {
      dispatchTypeData,
    },
  })
}
