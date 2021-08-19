import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Col, Input } from 'reactstrap'

import countries from '../../../api/countries.json'
import regions from '../../../api/regions.json'

const getCountryByCode = (countryCode) => {
  const countrySelected = countries.filter((country) => country.code === countryCode)
  return countrySelected[0]
}

const getRegionByCode = (regionCode) => {
  const regionSelected = regions.filter((region) => region.code === regionCode)
  return regionSelected[0]
}

const AddressForm = ({ setFormValues, errorsForm, flagScrollErrorsView, dispatchType }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dni, setDni] = useState('')
  const [country, setCountry] = useState(getCountryByCode('CL'))
  const [region, setRegion] = useState(getRegionByCode('RM'))
  const [communes, setCommunes] = useState(region.comunas)
  const [commune, setCommune] = useState(communes[0])
  const [postalCode, setPostalCode] = useState('')
  const [address, setAddress] = useState('')
  const [numberAddress, setNumberAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})
  const [classInputEmail, setClassInputEmail] = useState('form-control')
  const [userFormData, setUserFormData] = useState({
    first_name: '',
    last_name: '',
    dni: '',
    country_selected: country,
    region_selected: region,
    commune_selected: commune,
    zip_code: '',
    address: '',
    num_address: '',
    phone: '',
    email: '',
  })

  const handleInputFirstName = (firstName) => {
    firstName = firstName.replace(/[^a-zA-ZáéíñóúüÁÉÍÑÓÚÜ´'\s]/g, '')
    setFirstName(firstName)
    setUserFormData({
      ...userFormData,
      first_name: firstName,
    })
  }

  const handleInputLastName = (lastName) => {
    lastName = lastName.replace(/[^a-zA-ZáéíñóúüÁÉÍÑÓÚÜ´'\s]/g, '')
    setLastName(lastName)
    setUserFormData({
      ...userFormData,
      last_name: lastName,
    })
  }

  const handleInputDNI = (dniInput) => {
    setDni(dniInput)
    setUserFormData({
      ...userFormData,
      dni: dniInput,
    })
  }

  const handleSelectedCountry = (countryCode) => {
    const countrySelected = getCountryByCode(countryCode)
    setCountry(countrySelected)
    setUserFormData({
      ...userFormData,
      country_selected: countrySelected,
    })
  }

  const handleSelectedRegion = (regionCode) => {
    setRegion(regionCode)
    const regionSelected = getRegionByCode(regionCode)
    const communes = regionSelected.comunas
    setCommunes(regionSelected.comunas)
    setCommune(communes[0])
    setUserFormData({
      ...userFormData,
      region_selected: regionSelected,
    })
  }

  const handleSelectedCommune = (communeCode) => {
    setCommune(communeCode)
    setUserFormData({
      ...userFormData,
      commune_selected: communeCode,
    })
  }

  const handleInputPostalCode = (inputPostalCode) => {
    const regex = /(^[0-9]*$)|(^$)/
    if (inputPostalCode.match(regex)) {
      setPostalCode(inputPostalCode)
      setUserFormData({
        ...userFormData,
        zip_code: inputPostalCode,
      })
    }
  }

  const handleInputAddress = (address) => {
    const regex = /(^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$)|(^$)/
    if (address.match(regex)) {
      setAddress(address)
      setUserFormData({
        ...userFormData,
        address: address,
      })
    }
  }

  const handleInputNumberAddress = (numberAddress) => {
    const regex = /(^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$)|(^$)/
    if (numberAddress.match(regex)) {
      setNumberAddress(numberAddress)
      setUserFormData({
        ...userFormData,
        num_address: numberAddress,
      })
    }
  }

  const handleInputPhone = (phone) => {
    const regex = /(^[0-9]*$)|(^$)/
    if (phone.match(regex)) {
      setPhone(phone)
      setUserFormData({
        ...userFormData,
        phone: phone,
      })
    }
  }

  const handleInputEmail = (emailInput) => {
    setEmail(emailInput)
    //eslint-disable-next-line
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    let error = null
    if (emailInput.match(regex)) {
      setClassInputEmail('form-control')
      setUserFormData({
        ...userFormData,
        email: emailInput,
      })
    } else {
      setClassInputEmail('form-control-error')
      error = 'Email invalido'
    }
    const newErrors = { ...errors, email: error }
    setErrors(newErrors)
  }

  const firstNameRef = useRef(null)
  const lastNameRef = useRef(null)
  const dniRef = useRef(null)
  const phoneRef = useRef(null)
  const emailRef = useRef(null)

  const postalCodeRef = useRef(null)
  const addressRef = useRef(null)
  const address2Ref = useRef(null)

  const scrollIntoViewBehavior = {
    inline: 'end',
    block: 'center',
    behavior: 'smooth',
  }

  const scrollIntoErrorsView = (errorsForm, dispatchType) => {
    for (const errorType in errorsForm) {
      if (errorType === 'first_name') {
        firstNameRef.current.scrollIntoView(scrollIntoViewBehavior)
        return
      }
      if (errorType === 'last_name') {
        lastNameRef.current.scrollIntoView(scrollIntoViewBehavior)
        return
      }
      if (errorType === 'dni') {
        dniRef.current.scrollIntoView(scrollIntoViewBehavior)
        return
      }
      if (dispatchType !== 'PICKUP') {
        if (errorType === 'postal_code') {
          postalCodeRef.current.scrollIntoView(scrollIntoViewBehavior)
          return
        }
        if (errorType === 'address') {
          addressRef.current.scrollIntoView(scrollIntoViewBehavior)
          return
        }
        if (errorType === 'num_address') {
          address2Ref.current.scrollIntoView(scrollIntoViewBehavior)
          return
        }
      }

      if (errorType === 'phone') {
        phoneRef.current.scrollIntoView(scrollIntoViewBehavior)
        return
      }
      if (errorType === 'email') {
        emailRef.current.scrollIntoView(scrollIntoViewBehavior)
        return
      }
    }
  }

  useEffect(() => {
    setFormValues(userFormData)
    setErrors(errorsForm)
    if (flagScrollErrorsView) {
      scrollIntoErrorsView(errorsForm, dispatchType)
    }
  }, [userFormData, errorsForm, flagScrollErrorsView])

  return (
    <Col sm={12}>
      <div className="billing-fields mt-5">
        <h3>Detalles de compra</h3>
        <div className="billing-fields__field-wrapper">
          <div className="form-group" ref={firstNameRef}>
            <label htmlFor="billing_first_name" className="">
              Nombres&nbsp;
              <abbr className="required" title="required">
                *
              </abbr>
            </label>
            <Input
              type="text"
              className="form-control"
              name="billing_first_name"
              id="billing_first_name"
              placeholder="Ingresa tus nombres"
              value={firstName}
              onChange={(e) => handleInputFirstName(e.target.value)}
            />
            <span className="error">{errors['first_name']}</span>
          </div>
          <div className="form-group" ref={lastNameRef}>
            <label htmlFor="billing_last_name" className="">
              Apellidos&nbsp;
              <abbr className="required" title="required">
                *
              </abbr>
            </label>
            <Input
              type="text"
              className="form-control "
              name="billing_last_name"
              id="billing_last_name"
              placeholder="Ingresa tus apellidos"
              value={lastName}
              onChange={(e) => handleInputLastName(e.target.value)}
            />
            <span className="error">{errors['last_name']}</span>
          </div>
          <div className="form-group" ref={dniRef}>
            <label htmlFor="billing_dni" className="">
              RUT
              <abbr className="required" title="required">
                *
              </abbr>
            </label>
            <Input
              type="text"
              className="form-control "
              name="billing_dni"
              id="billing_dni"
              placeholder="Ingresa tu rut, formato: 11222333-4"
              value={dni}
              onChange={(e) => handleInputDNI(e.target.value)}
            />
            <span className="error">{errors['dni']}</span>
          </div>
          {dispatchType !== 'PICKUP' && (
            <>
              <div className="form-group">
                <label htmlFor="billing_country" className="">
                  País&nbsp;<abbr className="required" title="required"></abbr>
                </label>
                <select
                  name="billing_country"
                  id="billing_country"
                  className="form-control"
                  value={country.code}
                  onChange={(e) => handleSelectedCountry(e.target.value)}
                  disabled={true}
                >
                  {countries.map((country, key) => (
                    <option key={key} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
              {country.code === 'CL' && (
                <>
                  <div className="form-group">
                    <label htmlFor="billing_country" className="">
                      Región&nbsp;
                      <abbr className="required" title="required"></abbr>
                    </label>
                    <select
                      name="billing_country"
                      id="billing_country"
                      className="form-control"
                      value={region.code}
                      onChange={(e) => handleSelectedRegion(e.target.value)}
                    >
                      {regions.map((region, key) => (
                        <option key={key} value={region.code}>
                          {region.region}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="billing_country" className="">
                      Comuna&nbsp;
                      <abbr className="required" title="required"></abbr>
                    </label>
                    <select
                      name="billing_country"
                      id="billing_country"
                      className="form-control"
                      value={commune}
                      onChange={(e) => handleSelectedCommune(e.target.value)}
                    >
                      {communes.map((commune, key) => (
                        <option key={key} value={commune.code}>
                          {commune}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}
              {country.code !== 'CL' && (
                <div className="form-group" ref={postalCodeRef}>
                  <label htmlFor="billing_postal_code_1" className="">
                    Código postal&nbsp;
                    <abbr className="required" title="required">
                      *
                    </abbr>
                  </label>
                  <Input
                    type="text"
                    className="form-control"
                    name="billing_postal_code_1"
                    id="billing_postal_code_1"
                    placeholder="Código postal"
                    value={postalCode}
                    onChange={(e) => handleInputPostalCode(e.target.value)}
                  />
                  <span className="error">{errors['zip_code']}</span>
                </div>
              )}
              <div className="form-group" ref={addressRef}>
                <label htmlFor="billing_address_1" className="">
                  Dirección&nbsp;
                  <abbr className="required" title="required">
                    *
                  </abbr>
                </label>
                <Input
                  type="text"
                  className="form-control"
                  name="billing_address_1"
                  id="billing_address_1"
                  placeholder="Dirección y nº de casa/depto"
                  value={address}
                  onChange={(e) => handleInputAddress(e.target.value)}
                />
                <span className="error">{errors['address']}</span>
              </div>
              <div className="form-group" ref={address2Ref}>
                <label htmlFor="billing_address_2" className="screen-reader-text">
                  Departamento, block, etc.&nbsp;
                  <span className="optional">(opcional)</span>
                </label>
                <Input
                  type="text"
                  className="form-control"
                  name="billing_address_2"
                  id="billing_address_2"
                  placeholder="Nº casa, departamento, etc."
                  value={numberAddress}
                  onChange={(e) => handleInputNumberAddress(e.target.value)}
                />
                <span className="error">{errors['num_address']}</span>
              </div>
            </>
          )}
          <div className="form-group" ref={phoneRef}>
            <label htmlFor="billing_phone" className="">
              Telefono&nbsp; (WhatsApp)
              <abbr className="required" title="required">
                *
              </abbr>
            </label>
            <Input
              type="tel"
              className="form-control"
              name="billing_phone"
              id="billing_phone"
              placeholder=""
              value={phone}
              autocomplete="tel"
              onChange={(e) => handleInputPhone(e.target.value)}
            />
            <span className="error">{errors['phone']}</span>
          </div>
          <div className="form-group" ref={emailRef}>
            <label htmlFor="billing_email" className="">
              Email&nbsp;
              <abbr className="required" title="required">
                *
              </abbr>
            </label>
            <Input
              type="email"
              className={classInputEmail}
              name="billing_email"
              id="billing_email"
              placeholder=""
              value={email}
              autocomplete="email username"
              onChange={(e) => handleInputEmail(e.target.value)}
            />
            {errors['email'] !== '' && <span className="error">{errors['email']}</span>}
          </div>
        </div>
      </div>
    </Col>
  )
}

const mapStateToProps = (state) => ({
  errorsForm: state.errorsForm.errorsForm,
  dispatchType: state.dispatchTypeDataReducer.dispatchTypeData,
})

export default connect(mapStateToProps, null)(AddressForm)

AddressForm.propTypes = {
  setFormValues: PropTypes.func,
  errorsForm: PropTypes.object,
  flagScrollErrorsView: PropTypes.bool,
  dispatchType: PropTypes.string,
}
