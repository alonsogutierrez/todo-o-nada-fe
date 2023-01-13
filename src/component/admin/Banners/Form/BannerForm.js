import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row } from 'reactstrap'
import { Formik, Form } from 'formik'
import PropTypes from 'prop-types'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loader from 'react-loader-spinner'

import ClientAPI from '../../../../common/ClientAPI'
import GeneralBannerLabelForm from './GeneralBannerLabelForm'

const BannerForm = (props) => {
  const [bannerData] = useState(props.banner)
  const [loading, setLoading] = useState(false)

  useEffect(() => {}, [])

  const processBanner = async (bannerFormData, bannerNumber) => {
    try {
      const clientAPI = new ClientAPI()
      setLoading(true)
      await clientAPI.processBanner(bannerFormData)
      setLoading(false)
      toast.success('Banner procesado exitosamente')
      if (props.isEditForm) {
        await props.fetchBannerData(bannerNumber)
      }
      return
    } catch (err) {
      setLoading(false)
      toast.error('No se pudo procesar el banner, intentar nuevamente porfavor')
    }
  }

  const getFormErrors = (formValues) => {
    const errors = {}
    if (!formValues.bannerNumber) {
      errors.bannerNumber = 'num de banner requerido'
    }
    if (isNaN(formValues.bannerNumber)) {
      errors.bannerNumber = 'num de banner debe ser numerico'
    }
    if (!formValues.position) {
      errors.position = 'posición requerida'
    }
    if (!formValues.images) {
      errors.images = 'imagenes de banner requerida'
    }
    return errors
  }

  const onSubmitHandler = async (values) => {
    let formData = new FormData()

    formData.append('bannerNumber', values.bannerNumber)
    formData.append('position', values.position)
    formData.append('isActive', values.isActive)

    if (values.images) {
      for (const key of Object.keys(values.images)) {
        formData.append('images', values.images[key])
      }
    }

    await processBanner(formData, values.bannerNumber)

    setLoading(false)
  }

  const getInitialBannerMapped = () => {
    const bannerMapped = {
      bannerNumber: '',
      position: '',
      isActive: true,
      images: {
        desktop: '',
        mobile: '',
      },
    }

    return bannerMapped
  }

  const getBannerMappedFromProps = (bannerData) => {
    const bannerMappedFromProps = {}
    const { bannerNumber, position, isActive, images } = bannerData
    bannerMappedFromProps.bannerNumber = bannerNumber
    bannerMappedFromProps.position = position
    bannerMappedFromProps.isActive = isActive
    bannerMappedFromProps.images = images

    return bannerMappedFromProps
  }

  const banner =
    !Object.keys(bannerData).length > 0
      ? getInitialBannerMapped()
      : getBannerMappedFromProps(bannerData)

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
                        initialValues={banner}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={(values) => getFormErrors(values)}
                        onSubmit={async (values) => {
                          await onSubmitHandler(values)
                        }}
                      >
                        {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => {
                          return (
                            <>
                              <GeneralBannerLabelForm
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                setFieldValue={setFieldValue}
                                values={values}
                                errors={errors}
                                touched={touched}
                              />
                              <Form>
                                <Row>
                                  <button
                                    type="submit"
                                    className="btn btn-primary mb-2 mr-2"
                                    disabled={false}
                                  >
                                    {' '}
                                    Procesar Banner{' '}
                                  </button>
                                  <Link to="/admin-panel/banner" class="btn btn-danger mb-2">
                                    {' '}
                                    Cancelar{' '}
                                  </Link>
                                </Row>
                              </Form>
                            </>
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
export default BannerForm

BannerForm.defaultProps = {
  banner: {},
  isEditForm: false,
}

BannerForm.propTypes = {
  banner: PropTypes.object,
  fetchBannerData: PropTypes.func,
  isEditForm: PropTypes.bool,
}
