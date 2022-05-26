import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row } from 'reactstrap'
import { Formik, Form } from 'formik'
import PropTypes from 'prop-types'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loader from 'react-loader-spinner'

import DiscountAPI from '../../../../common/DiscountAPI'
import FormLabel from './FormLabels'

const DiscountForm = (props) => {
  const [discountData] = useState(props.discount)
  const [loading, setLoading] = useState(false)

  useEffect(() => {}, [props.discount])

  const processDiscount = async (discountFormData, code) => {
    try {
      const discountAPI = new DiscountAPI()
      setLoading(true)
      await discountAPI.createDiscount(discountFormData)
      setLoading(false)
      toast.success('Descuento procesado exitosamente')
      if (props.isEditDiscount) {
        await props.fetchDiscountData(code)
      }
      return
    } catch (err) {
      setLoading(false)
      toast.error('No se pudo procesar el descuento, intentar nuevamente porfavor')
    }
  }

  const getFormErrors = (formValues) => {
    const errors = {}
    if (!formValues.code) {
      errors.code = 'Codigo requerido'
    }
    if (!formValues.amount) {
      errors.amount = 'Cantidad requerido'
    }
    if (!formValues.expireDate) {
      errors.expireDate = 'Fecha de vencimiento requerido'
    }
    return errors
  }

  const onSubmitHandler = async (values) => {
    let formData = {}
    formData.code = values.code
    formData.isPercentual = values.isPercentual
    formData.amount = values.amount
    formData.expireDate = values.expireDate
    formData.isActive = values.isActive

    await processDiscount(formData, values.code)

    setLoading(false)
  }

  const getInitialDiscountMapped = () => {
    const discountMapped = {
      code: '',
      isPercentual: false,
      amount: '',
      expireDate: '',
      isActive: false,
    }

    return discountMapped
  }

  const getDiscountMappedFromProps = (discountData) => {
    const { discountCouponResult } = discountData
    if (!discountCouponResult) {
      return {}
    }
    const discountMappedFromProps = {}
    const { code, isPercentual, amount, expireDate, isActive } = discountCouponResult
    discountMappedFromProps.code = code
    discountMappedFromProps.isPercentual = isPercentual
    discountMappedFromProps.amount = amount
    discountMappedFromProps.expireDate = expireDate
    discountMappedFromProps.isActive = isActive

    return discountMappedFromProps
  }

  const discount =
    !Object.keys(discountData).length > 0
      ? getInitialDiscountMapped()
      : getDiscountMappedFromProps(discountData)

  if (loading) {
    return (
      <>
        <div>
          <Loader type="Puff" color="#04d39f" height="100" width="100" />
        </div>
      </>
    )
  }

  return (
    <div>
      <ToastContainer autoClose={3000} />
      <div className="site-content">
        <div className="content-wrapper section-ptb">
          <Container>
            <div className="product-content-top single-product single-product-edit">
              <Row>
                <div className="product-top-left col-xl-12 col-md-12">
                  <div className="product-top-right-inner">
                    <div className="summary entry-summary">
                      <Formik
                        initialValues={discount}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={(values) => getFormErrors(values)}
                        onSubmit={async (values) => await onSubmitHandler(values)}
                      >
                        {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => {
                          return (
                            <Form>
                              <FormLabel
                                values={values}
                                errors={errors}
                                touched={touched}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                setFieldValue={setFieldValue}
                              />
                              <Row>
                                <button
                                  type="submit"
                                  className="btn btn-primary mb-2 mr-2"
                                  disabled={false}
                                >
                                  {' '}
                                  Procesar Descuento{' '}
                                </button>
                                <Link to="/admin-panel/discount" class="btn btn-danger mb-2">
                                  {' '}
                                  Cancelar{' '}
                                </Link>
                              </Row>
                            </Form>
                          )
                        }}
                      </Formik>
                    </div>
                  </div>
                </div>
              </Row>
            </div>
          </Container>
        </div>
      </div>
    </div>
  )
}
export default DiscountForm

DiscountForm.defaultProps = {
  discount: {},
  isEditDiscount: false,
}

DiscountForm.propTypes = {
  discount: PropTypes.object,
  fetchDiscountData: PropTypes.func,
  isEditDiscount: PropTypes.bool,
}
