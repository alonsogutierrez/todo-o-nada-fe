import SET_USER_DATA from '../types/setUserData'

const initState = {
  userData: {},
}

export default (state = initState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return { ...state, userData: action.payload.userData }
    default:
      return state
  }
}
