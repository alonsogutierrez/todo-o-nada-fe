import SET_USER_DATA from '../types/setUserData'

export default (userData) => (dispatch) => {
  dispatch({
    type: SET_USER_DATA,
    payload: {
      userData,
    },
  })
}
