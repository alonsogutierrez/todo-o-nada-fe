import SET_ERRORS_FORM from '../types/setErrorsForm'

const initState = {
  errorsForm: {},
}

export default (state = initState, action) => {
  switch (action.type) {
    case SET_ERRORS_FORM:
      return { ...state, errorsForm: action.payload.errorsForm }
    default:
      return state
  }
}
