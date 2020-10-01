import SET_ERRORS_FORM from '../types/setErrorsForm'

export default (errorsForm) => (dispatch) => {
  dispatch({
    type: SET_ERRORS_FORM,
    payload: {
      errorsForm,
    },
  })
}
