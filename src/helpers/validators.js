const validatorUserForm = (userForm) => {
  let formValues = userForm
  let errors = {}
  let formIsValid = true

  const firstNameValidation = validateNames(formValues['first_name'])
  if (!firstNameValidation.isValid) {
    formIsValid = false
    errors['first_name'] = firstNameValidation.message
  }

  const lastNameValidation = validateNames(formValues['last_name'])
  if (!lastNameValidation.isValid) {
    formIsValid = false
    errors['last_name'] = lastNameValidation.message
  }

  const dniValidation = validateDni(formValues['dni'])
  if (!dniValidation.isValid) {
    formIsValid = false
    errors['dni'] = dniValidation.message
  }

  const countryValidation = validateLocation(formValues['country_selected'])
  if (!countryValidation.isValid) {
    formIsValid = false
    errors['country'] = countryValidation.message
  }

  const regionValidation = validateLocation(formValues['region_selected'])
  if (!regionValidation.isValid) {
    formIsValid = false
    errors['region'] = regionValidation.message
  }

  const communeValidation = validateNames(formValues['commune_selected'])
  if (!communeValidation.isValid) {
    formIsValid = false
    errors['commune'] = communeValidation.message
  }

  if (formValues['country_selected'].code !== 'CL') {
    const zipCodeValidation = validateZipCode(formValues['zip_code'])
    if (!zipCodeValidation.isValid) {
      formIsValid = false
      errors['zip_code'] = zipCodeValidation.message
    }
  }

  const addressValidation = validateAddress(formValues['address'])
  if (!addressValidation.isValid) {
    formIsValid = false
    errors['address'] = addressValidation.message
  }

  const numAddressValidation = validateAddress(formValues['num_address'])
  if (!numAddressValidation.isValid) {
    formIsValid = false
    errors['num_address'] = numAddressValidation.message
  }

  const phoneValidation = validatePhone(formValues['phone'], 9)
  if (!phoneValidation.isValid) {
    formIsValid = false
    errors['phone'] = phoneValidation.message
  }

  const emailValidation = validateEmail(formValues['email'])
  if (!emailValidation.isValid) {
    formIsValid = false
    errors['email'] = emailValidation.message
  }

  return {
    isValid: formIsValid,
    errors,
  }
}

const validateNames = (name) => {
  let message = ''
  let isValid = false
  if (!name) {
    return {
      isValid,
      message: 'Ingresa los datos por favor',
    }
  }

  const inputNameFormatted = name.replace(/[^a-zA-ZáéíñóúüÁÉÍÑÓÚÜ´'\s]/g, '')
  const minLength = 2

  isValid = inputNameFormatted.length > minLength
  if (isValid) {
    return {
      isValid: true,
      message: 'Solo letras por favor',
    }
  }

  return {
    isValid,
    message,
  }
}

const validateDni = (dni) => {
  let message = ''
  let isValid = true
  if (!dni) {
    return {
      isValid: false,
      message: 'Ingresa tu rut por favor',
    }
  }

  //TODO: Change validation by rut.js library validations
  const regex = /[0-9]{7,8}-[0-9Kk]{1}/
  if (!dni.match(regex)) {
    return {
      isValid: false,
      message: 'Rut válido por favor (formato 11111111-1)',
    }
  }

  return {
    isValid,
    message,
  }
}

const validateLocation = (location) => {
  let isValid = true
  let message = ''

  if (!location) {
    return {
      isValid: false,
      message: 'Ingresa los datos por favor',
    }
  }

  if (typeof location !== 'object') {
    return {
      isValid: false,
      message: 'Ingresa un dato válido',
    }
  }

  return {
    isValid,
    message,
  }
}

const validateZipCode = (zipCode) => {
  let isValid = false
  let message = ''

  if (!zipCode) {
    return {
      isValid: false,
      message: 'Ingresa el zip code',
    }
  }

  //TODO: Change by a zipCode by country validation
  const regex = /(^[0-9]*$)|(^$)/
  if (!zipCode.match(regex)) {
    return {
      isValid: false,
      message: 'Ingresa zip code válido',
    }
  }

  return {
    isValid,
    message,
  }
}

const validateAddress = (address) => {
  let isValid = true
  let message = ''

  if (!address) {
    return {
      isValid: false,
      message: 'Ingresa la dirección por favor',
    }
  }

  const regex = /(^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$)|(^$)/
  if (!address.match(regex)) {
    return {
      isValid: false,
      message: 'Ingresa solo letras y números',
    }
  }

  return {
    isValid,
    message,
  }
}

const validatePhone = (phone, minLength) => {
  let isValid = false
  let message = ''

  if (!phone) {
    return {
      isValid: false,
      message: 'Ingresa el teléfono por favor',
    }
  }

  const inputPhoneFormatted = parseInt(phone, 10).toString()
  isValid = inputPhoneFormatted.length === minLength
  if (!isValid) {
    return {
      isValid: false,
      message: 'El número debe tener 9 dígitos',
    }
  }

  return {
    isValid,
    message,
  }
}

const validateEmail = (email) => {
  let isValid = false
  let message = ''

  if (!email) {
    return {
      isValid: false,
      message: 'Ingresa un email por favor',
    }
  }

  //eslint-disable-next-line
  const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  isValid = !!email.match(regex)
  if (!isValid) {
    return {
      isValid,
      message: 'Ingresa un email válido por favor',
    }
  }

  return {
    isValid,
    message,
  }
}

const validators = {
  validatorUserForm,
}

export default validators
