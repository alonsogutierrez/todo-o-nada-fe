import SET_DISPATCH_TYPE from './../types/setDispatchType'

const initState = {
  dispatchTypeData: 'HOME_DELIVERY',
}

export default (state = initState, action) => {
  switch (action.type) {
    case SET_DISPATCH_TYPE:
      return { ...state, dispatchTypeData: action.payload.dispatchTypeData }
    default:
      return state
  }
}
