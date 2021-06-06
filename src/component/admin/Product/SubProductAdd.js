import React from 'react'
import { Container, Row, FormGroup, Input, Label } from 'reactstrap'
import { Formik } from 'formik'
import ClientAPI from '../../../common/ClientAPI'
import PropTypes from 'prop-types'

const uploadImages = async (imagesFormData) => {
  const clientAPI = new ClientAPI()
  const data = await clientAPI.updateImages(imagesFormData)
  if(data.status === 'ok') {
    return data.locationArray
  }
  return {}
}

const SubProductAdd = ({ subProductInstance }) => {
  return (
    <div className="content-wrapper section-ptb">
      <Container>
        <div className="product-content-top single-product single-product-edit">
          <Row>
            <div className="product-top-left col-xl-7 col-md-12">
              <div className="product-top-right-inner">
                <div className="summary entry-summary">
                  <Formik
                    initialValues={
                      { color: '',
                        size: '',
                        stock: '',
                        pictures: null,
                      }
                    }
                    validate={values => {
                      const errors = {}
                      if (!values.color) {
                        errors.color = 'selecciona un color'
                      }
                      if(!values.size){
                        errors.size = 'selecciona una talla'
                      }
                      if(!values.stock){
                        errors.stock = 'ingresa el stock'
                      }
                      if(!values.pictures) {
                        errors.pictures = 'agrega una imagen'
                      }
                      if(values.pictures != null && values.pictures.length > 3) {
                        errors.pictures = 'cargar no mas de 3 imagenes'
                      }
                      return errors
                    }}
                    onSubmit={ async (values) => {
                      let formData = new FormData()
                      for (const key of Object.keys(values.pictures)) {
                        formData.append('pictures', values.pictures[key])
                      }
                      const urlImages = await uploadImages(formData)
                      const subProduct = { ...values, pictures: urlImages }
                      console.log('subProductInstance: ',subProduct)
                      subProductInstance(subProduct)
                    }}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      setFieldValue
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <Row>
                          <FormGroup className="edit-icon col-md-4">
                            <Input
                              type="select"
                              name="color"
                              className="form-control product_title"
                              placeholder="color"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.color}
                            >
                              <option value="">selecciona un color</option>
                              <option value="Rojo">Rojo</option>
                              <option value="Azul">Azul</option>
                              <option value="Negro">Negro</option>
                              <option value="Verde">Verde</option>
                              <option value="Amarillo">Amarillo</option>
                              <option value="Blanco">Blanco</option>
                            </Input>
                            {errors.color && touched.color && errors.color}
                          </FormGroup>
                          <FormGroup className="edit-icon col-md-4">
                            <Input
                              type="select"
                              name="size"
                              className="form-control product_title"
                              placeholder="talla"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.size}
                            >
                              <option value="">selecciona una talla</option>
                              <option value="S">S</option>
                              <option value="M">M</option>
                              <option value="L">L</option>
                              <option value="XL">XL</option>
                            </Input>
                            {errors.size && touched.size && errors.size}
                          </FormGroup>
                          <FormGroup className="edit-icon col-md-4">
                            <Input
                              type="number"
                              name="stock"
                              className="form-control product_title"
                              placeholder="stock"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.stock}
                            />
                            {errors.stock && touched.stock && errors.stock}
                          </FormGroup>
                          <FormGroup className="col-md-12">
                            <Label className="title pl-0">Imágenes</Label>
                            <input type="file"
                                   name="pictures"
                                   className="form-control"
                                   multiple
                                   onChange={(event) => {
                                     setFieldValue("pictures", event.currentTarget.files)
                                   }}
                            />
                            {errors.pictures && touched.pictures && errors.pictures}
                          </FormGroup>
                          <button type="submit" className="btn btn-primary mb-2 mr-2">
                            Guardar
                          </button>
                        </Row>
                      </form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </Row>
        </div>
      </Container>
    </div>
  )
}

SubProductAdd.propTypes = {
  subProductInstance: PropTypes.func
}

export default SubProductAdd
