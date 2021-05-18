import React from 'react'
import { Container, Row, FormGroup, Input } from 'reactstrap'
import { Formik } from 'formik'

const SubProductAdd = () => {
  return (
    <div className="content-wrapper section-ptb">
      <Container>
        <div className="product-content-top single-product single-product-edit">
          <Row>
            <div className="product-top-left col-xl-7 col-md-12">
              <div className="product-top-right-inner">
                <div className="summary entry-summary">
                  <Formik
                    initialValues={{ color: '', size: '', stock: '', pictures: [] }}
                    validate={values => {
                      const errors = {}
                      if (!values.color) {
                        errors.color = 'debes seleccionar un color'
                      }
                      if(!values.size){
                        errors.size = 'debes seleccionar una talla'
                      }
                      if(!values.stock){
                        errors.stock = 'debes ingresar el stock'
                      }
                      return errors
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                      console.log(JSON.stringify(values, null, 2))
                      setSubmitting(false)
                    }}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <Row>
                          <FormGroup className="edit-icon col-md-4">
                            <Input
                              type="text"
                              name="color"
                              className="form-control product_title"
                              placeholder="color"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.color}
                            />
                            {errors.color && touched.color && errors.color}
                          </FormGroup>
                          <FormGroup className="edit-icon col-md-4">
                            <Input
                              type="text"
                              name="size"
                              className="form-control product_title"
                              placeholder="size"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.size}
                            />
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

export default SubProductAdd
