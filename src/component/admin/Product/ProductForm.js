import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, FormGroup, Input, Label, Row } from 'reactstrap'
import { Formik } from 'formik'
import PropTypes from 'prop-types'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import ClientAPI from '../../../common/ClientAPI'

const categories = ['hombre', 'mujer', 'niño', 'niña', 'irezumi', 'traditional']

const ProductForm = (props) => {
  const [productData, setProductData] = useState(props.product)

  const getSizeSKU = (details, size) => {
    let stock = 0
    for (let sku in details) {
      if (details[sku].size === size) {
        stock = details[sku].stock
      }
    }
    return stock
  }

  useEffect(() => {
    const { product } = props
    if (product && Object.keys(product).length > 0) {
      const { name, description, color, picture, category, details } = product
      let productData = {}
      productData = {
        ...productData,
        name,
        description,
        color,
        pictures: [picture],
        published: false,
        categories: category,
        stockBySizeS: getSizeSKU(details, 'S'),
        stockBySizeM: getSizeSKU(details, 'M'),
        stockBySizeL: getSizeSKU(details, 'L'),
        stockBySizeXL: getSizeSKU(details, 'XL'),
        stockBySizeXXL: getSizeSKU(details, 'XXL'),
      }

      setProductData(productData)
    }
  }, [props.product])

  window.scrollTo(0, 0)
  const createProduct = async (productFormData) => {
    const clientAPI = new ClientAPI()
    return await clientAPI.createProduct(productFormData)
  }

  const product = !productData
    ? {
        name: '',
        description: '',
        price: 0,
        color: '',
        pictures: null,
        published: false,
        categories: [],
        stockBySizeS: 0,
        stockBySizeM: 0,
        stockBySizeL: 0,
        stockBySizeXL: 0,
      }
    : productData

  console.log('product: ', product)

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
                        initialValues={product}
                        validate={(values) => {
                          console.log('validate values: ', values)
                          const errors = {}
                          if (!values.name) {
                            errors.name = 'nombre requerido'
                          }
                          if (!values.description) {
                            errors.description = 'descripcion requerida'
                          }
                          if (!values.price) {
                            errors.price = 'precio requerido'
                          }
                          if (!values.color) {
                            errors.color = 'selecciona un color'
                          }
                          if (values.pictures != null && values.pictures.length > 3) {
                            errors.pictures = 'cargar no mas de 3 imagenes'
                          }
                          if (values.category.length < 1) {
                            errors.categories = 'debes elegir almenos una categoria'
                          }
                          return errors
                        }}
                        onSubmit={async (values, { setSubmitting }) => {
                          let formData = new FormData()
                          formData.append('name', values.name)
                          formData.append('description', values.description)
                          const price = {
                            basePriceReference: 0,
                            basePriceSales: values.price,
                          }
                          formData.append('price', JSON.stringify(price))
                          formData.append('color', values.color)
                          formData.append('published', values.published)
                          formData.append('category', JSON.stringify(values.category))

                          const subProducts = []
                          subProducts.push({ size: 'S', stock: values.stockBySizeS, sku: 1 })
                          subProducts.push({ size: 'M', stock: values.stockBySizeM, sku: 2 })
                          subProducts.push({ size: 'L', stock: values.stockBySizeL, sku: 3 })
                          subProducts.push({ size: 'XL', stock: values.stockBySizeXL, sku: 4 })
                          subProducts.push({ size: 'XXL', stock: values.stockBySizeXxL, sku: 5 })

                          formData.append('details', JSON.stringify(subProducts))
                          for (const key of Object.keys(values.pictures)) {
                            formData.append('pictures', values.pictures[key])
                          }
                          const productCreatedResponse = await createProduct(formData)

                          if (productCreatedResponse.status === 201)
                            return toast.success('Producto creado exitosamente')
                          setSubmitting(false)
                        }}
                      >
                        {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          setFieldValue,
                          isSubmitting,
                        }) => {
                          return (
                            <form onSubmit={handleSubmit}>
                              <Row>
                                <FormGroup className="edit-icon col-md-12">
                                  <Input
                                    type="text"
                                    name="name"
                                    className="form-control product_title"
                                    placeholder="nombre"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                  />
                                  {errors.name && touched.name && errors.name}
                                </FormGroup>
                              </Row>
                              <Row>
                                <FormGroup className="edit-icon col-md-6">
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
                                <FormGroup className="edit-icon col-md-6">
                                  <Input
                                    type="number"
                                    className="form-control price"
                                    placeholder="precio"
                                    name="price"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.price.basePriceSales}
                                  />
                                  {errors.price && touched.price && errors.price}
                                </FormGroup>
                              </Row>
                              <Row>
                                <FormGroup className="edit-icon col-md-12">
                                  <Input
                                    type="textarea"
                                    className="form-control"
                                    name="description"
                                    rows="3"
                                    placeholder="descripción"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.description}
                                  />
                                  {errors.description && touched.description && errors.description}
                                </FormGroup>
                              </Row>
                              <Row>
                                <FormGroup className="col-md">
                                  <Label className="title pl-0">Producto publicado</Label>
                                  <input
                                    type="checkbox"
                                    placeholder="Visible"
                                    name="published"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.published}
                                  />
                                </FormGroup>
                              </Row>
                              <Row>
                                <FormGroup className="col-md-12">
                                  <Label className="title pl-0">Categorias</Label>
                                  {categories.map((category, index) => (
                                    <Label key={index}>
                                      <Input
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="categories"
                                        value={category}
                                        type="checkbox"
                                      />{' '}
                                      {category}
                                    </Label>
                                  ))}
                                  {errors.categories && touched.categories && errors.categories}
                                </FormGroup>
                              </Row>
                              <Row>
                                <FormGroup className="col-md-12">
                                  <Label className="title pl-0">Imágenes</Label>
                                  <input
                                    type="file"
                                    name="pictures"
                                    className="form-control"
                                    multiple
                                    onChange={(event) => {
                                      setFieldValue('pictures', event.currentTarget.files)
                                    }}
                                  />
                                  {errors.pictures && touched.pictures && errors.pictures}
                                </FormGroup>
                              </Row>
                              Stock por Talla
                              <Row>
                                <FormGroup className="edit-icon col-md-6">
                                  <Label className="title pl-0">Talla S</Label>
                                  <Input
                                    type="number"
                                    name="stockBySizeS"
                                    className="form-control product_title"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.stockBySizeS}
                                  />
                                  {errors.stockBySizeS &&
                                    touched.stockBySizeS &&
                                    errors.stockBySizeS}
                                </FormGroup>
                                <FormGroup className="edit-icon col-md-6">
                                  <Label className="title pl-0">Talla M</Label>
                                  <Input
                                    type="number"
                                    name="stockBySizeM"
                                    className="form-control product_title"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.stockBySizeM}
                                  />
                                  {errors.stockBySizeM &&
                                    touched.stockBySizeM &&
                                    errors.stockBySizeM}
                                </FormGroup>
                              </Row>
                              <Row>
                                <FormGroup className="edit-icon col-md-6">
                                  <Label className="title pl-0">Talla L</Label>
                                  <Input
                                    type="number"
                                    name="stockBySizeL"
                                    className="form-control product_title"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.stockBySizeL}
                                  />
                                  {errors.stockBySizeL &&
                                    touched.stockBySizeL &&
                                    errors.stockBySizeL}
                                </FormGroup>
                                <FormGroup className="edit-icon col-md-6">
                                  <Label className="title pl-0">Talla XL</Label>
                                  <Input
                                    type="number"
                                    name="stockBySizeXL"
                                    className="form-control product_title"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.stockBySizeXL}
                                  />
                                  {errors.stockBySizeXL &&
                                    touched.stockBySizeXL &&
                                    errors.stockBySizeXL}
                                </FormGroup>
                              </Row>
                              <Row>
                                <FormGroup className="edit-icon col-md-6">
                                  <Label className="title pl-0">Talla XXL</Label>
                                  <Input
                                    type="number"
                                    name="stockBySizeXXL"
                                    className="form-control product_title"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.stockBySizeXXL}
                                  />
                                  {errors.stockBySizeXXL &&
                                    touched.stockBySizeXXL &&
                                    errors.stockBySizeXXL}
                                </FormGroup>
                              </Row>
                              <Row>
                                <button
                                  className="btn btn-primary mb-2 mr-2"
                                  disabled={isSubmitting}
                                >
                                  {' '}
                                  Crear Producto{' '}
                                </button>
                                <Link to="/admin-panel/Product" class="btn btn-danger mb-2">
                                  {' '}
                                  Cancelar{' '}
                                </Link>
                              </Row>
                            </form>
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
export default ProductForm

ProductForm.defaultProps = {
  product: {},
}

ProductForm.propTypes = {
  product: PropTypes.object,
}
