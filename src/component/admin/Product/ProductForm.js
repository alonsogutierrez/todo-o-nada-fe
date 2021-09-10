import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, FormGroup, Input, Label, Row } from 'reactstrap'
import { Formik, Form } from 'formik'
import PropTypes from 'prop-types'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loader from 'react-loader-spinner'

import ClientAPI from '../../../common/ClientAPI'

const categories = [
  'hombre',
  'mujer',
  'niño',
  'niña',
  'irezumi',
  'traditional',
  'tattoo-collection',
] // Get from Categories API

const ProductForm = (props) => {
  const [productData] = useState(props.product)
  const [loading, setLoading] = useState(false)

  useEffect(() => {}, [props.product])

  const processProduct = async (productFormData) => {
    try {
      const clientAPI = new ClientAPI()
      setLoading(true)
      await clientAPI.processProduct(productFormData)
      setLoading(false)
      toast.success('Producto procesado exitosamente')
      return
    } catch (err) {
      setLoading(false)
      toast.error('No se pudo procesar el producto, intentar nuevamente porfavor')
    }
  }

  const getProductMappedFromProps = (productData) => {
    const productMappedFromProps = {}
    const {
      itemNumber,
      name,
      description,
      price,
      color,
      pictures,
      published,
      category,
      details,
    } = productData
    productMappedFromProps.itemNumber = itemNumber
    productMappedFromProps.name = name
    productMappedFromProps.description = description
    productMappedFromProps.price = price
    productMappedFromProps.color = color
    productMappedFromProps.pictures = pictures
    productMappedFromProps.published = published
    productMappedFromProps.categories = category
    productMappedFromProps.details = details
    for (let sku in details) {
      if (details[sku].size === 'S') {
        productMappedFromProps.stockBySizeS = details[sku].stock
        productMappedFromProps.skuBySizeS = sku
      }
      if (details[sku].size === 'M') {
        productMappedFromProps.stockBySizeM = details[sku].stock
        productMappedFromProps.skuBySizeM = sku
      }
      if (details[sku].size === 'L') {
        productMappedFromProps.stockBySizeL = details[sku].stock
        productMappedFromProps.skuBySizeL = sku
      }
      if (details[sku].size === 'XL') {
        productMappedFromProps.stockBySizeXL = details[sku].stock
        productMappedFromProps.skuBySizeXL = sku
      }
      if (details[sku].size === 'XXL') {
        productMappedFromProps.stockBySizeXXL = details[sku].stock
        productMappedFromProps.skuBySizeXXL = sku
      }
    }

    return productMappedFromProps
  }

  const product =
    !Object.keys(productData).length > 0
      ? {
          itemNumber: '',
          name: '',
          description: '',
          price: {
            basePriceSales: 0,
            basePriceReference: 0,
            discount: 0,
          },
          color: '',
          pictures: null,
          published: false,
          categories: [],
          details: {},
          stockBySizeS: 0,
          stockBySizeM: 0,
          stockBySizeL: 0,
          stockBySizeXL: 0,
          stockBySizeXXL: 0,
          skuBySizeS: '',
          skuBySizeM: '',
          skuBySizeL: '',
          skuBySizeXL: '',
          skuBySizeXXL: '',
        }
      : getProductMappedFromProps(productData)

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
                        initialValues={product}
                        validate={(values) => {
                          const errors = {}
                          if (!values.itemNumber) {
                            errors.itemNumber = 'itemNumber requerido'
                          }
                          if (!values.name) {
                            errors.name = 'nombre requerido'
                          }
                          if (!values.description) {
                            errors.description = 'descripción requerida'
                          }
                          if (!values.price.basePriceSales) {
                            errors.price = 'precio venta requerido'
                          }
                          if (!values.price.basePriceReference) {
                            errors.price = 'precio costo requerido'
                          }
                          if (!values.color) {
                            errors.color = 'selecciona un color'
                          }
                          if (values.pictures != null && values.pictures.length > 3) {
                            errors.pictures = 'cargar no más de 3 imagenes'
                          }
                          if (values.categories && values.categories.length < 1) {
                            errors.categories = 'debes elegir almenos una categoría'
                          }
                          return errors
                        }}
                        onSubmit={async (values) => {
                          const price = {
                            basePriceReference: values.price.basePriceReference,
                            basePriceSales: values.price.basePriceSales,
                            discount: 0,
                          }
                          let formData = new FormData()

                          formData.append('itemNumber', values.itemNumber)
                          formData.append('name', values.name)
                          formData.append(
                            'category',
                            values.categories.map((cat) => cat.toLowerCase())
                          )
                          formData.append('description', values.description)
                          formData.append('color', values.color)
                          formData.append('price', JSON.stringify(price))
                          formData.append('published', values.published)

                          let sizes = []

                          const details = {}
                          if (values.skuBySizeS) {
                            details[values.skuBySizeS] = {
                              stock: values.stockBySizeS,
                              size: 'S',
                            }
                            sizes.push('S')
                          }
                          if (values.skuBySizeM) {
                            details[values.skuBySizeM] = {
                              stock: values.stockBySizeM,
                              size: 'M',
                            }
                            sizes.push('M')
                          }
                          if (values.skuBySizeL) {
                            details[values.skuBySizeL] = {
                              stock: values.stockBySizeL,
                              size: 'L',
                            }
                            sizes.push('L')
                          }
                          if (values.skuBySizeXL) {
                            details[values.skuBySizeXL] = {
                              stock: values.stockBySizeXL,
                              size: 'XL',
                            }
                            sizes.push('XL')
                          }
                          if (values.skuBySizeXXL) {
                            details[values.skuBySizeXXL] = {
                              stock: values.stockBySizeXXL,
                              size: 'XXL',
                            }
                            sizes.push('XXL')
                          }

                          formData.append('details', JSON.stringify(details))
                          if (values.pictures) {
                            for (const key of Object.keys(values.pictures)) {
                              formData.append('pictures', values.pictures[key])
                            }
                          }
                          formData.append('sizes', sizes)

                          const productProcessResponse = await processProduct(formData)

                          if (productProcessResponse.status === 201)
                            toast.success('Producto procesado exitosamente')
                          else {
                            toast.error('No se pudo procesar el producto')
                          }

                          setLoading(false)
                          props.fetchProductData(values.itemNumber)
                        }}
                      >
                        {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => {
                          return (
                            <Form>
                              <Row>
                                <FormGroup className="edit-icon col-md-12">
                                  <Label className="title pl-0">Item number</Label>
                                  <Input
                                    type="text"
                                    name="itemNumber"
                                    className="form-control product_title"
                                    placeholder="Ingresa el n° del producto"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.itemNumber}
                                  />
                                  {errors.itemNumber && touched.itemNumber && errors.itemNumber}
                                </FormGroup>
                              </Row>
                              <Row>
                                <FormGroup className="edit-icon col-md-12">
                                  <Label className="title pl-0">Nombre</Label>
                                  <Input
                                    type="text"
                                    name="name"
                                    className="form-control product_title"
                                    placeholder="Ingresa el nombre del producto"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                  />
                                  {errors.name && touched.name && errors.name}
                                </FormGroup>
                              </Row>
                              <Row>
                                <FormGroup className="edit-icon col-md-6">
                                  <Label className="title pl-0">Color</Label>
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
                              </Row>
                              <Row>
                                <FormGroup className="edit-icon col-md-6">
                                  <Label className="title pl-0">Precio venta</Label>
                                  <Input
                                    type="number"
                                    className="form-control price"
                                    placeholder="Precio Venta"
                                    name="price.basePriceSales"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.price ? values.price.basePriceSales : 0}
                                  />
                                  {errors.basePriceSales &&
                                    touched.basePriceSales &&
                                    errors.basePriceSales}
                                </FormGroup>
                                <FormGroup className="edit-icon col-md-6">
                                  <Label className="title pl-0">Precio costo</Label>
                                  <Input
                                    type="number"
                                    className="form-control price"
                                    placeholder="Precio Compra"
                                    name="price.basePriceReference"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.price ? values.price.basePriceReference : 0}
                                  />
                                  {errors.basePriceReference &&
                                    touched.basePriceReference &&
                                    errors.basePriceReference}
                                </FormGroup>
                              </Row>
                              <Row>
                                <FormGroup className="edit-icon col-md-12">
                                  <Label className="title pl-0">Descripción</Label>
                                  <Input
                                    type="textarea"
                                    className="form-control"
                                    name="description"
                                    rows="3"
                                    placeholder="Ingresa la descripción de tu producto"
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
                                        defaultChecked={
                                          values.categories
                                            ? values.categories.includes(category)
                                            : false
                                        }
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
                                      const fileToUpload = event.currentTarget.files
                                      event.preventDefault()
                                      setFieldValue('pictures', fileToUpload)
                                    }}
                                  />
                                  {errors.pictures && touched.pictures && errors.pictures}
                                  <Label className="title pl-0">Imagen Cargada</Label>
                                  <span>
                                    {values.pictures && typeof values.pictures[0] === 'string' ? (
                                      <img src={values.pictures[0]} style={{ width: '50%' }} />
                                    ) : (
                                      'Nueva imagen a cargar'
                                    )}
                                  </span>
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
                                  <Label className="title pl-0">SKU talla S</Label>
                                  <Input
                                    type="text"
                                    name="skuBySizeS"
                                    className="form-control product_title"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.skuBySizeS}
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
                                  <Label className="title pl-0">SKU talla M</Label>
                                  <Input
                                    type="text"
                                    name="skuBySizeM"
                                    className="form-control product_title"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.skuBySizeM}
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
                                  <Label className="title pl-0">SKU talla L</Label>
                                  <Input
                                    type="text"
                                    name="skuBySizeL"
                                    className="form-control product_title"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.skuBySizeL}
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
                                  <Label className="title pl-0">SKU talla XL</Label>
                                  <Input
                                    type="text"
                                    name="skuBySizeXL"
                                    className="form-control product_title"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.skuBySizeXL}
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
                                  <Label className="title pl-0">SKU talla XXL</Label>
                                  <Input
                                    type="text"
                                    name="skuBySizeXXL"
                                    className="form-control product_title"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.skuBySizeXXL}
                                  />
                                  {errors.stockBySizeXXL &&
                                    touched.stockBySizeXXL &&
                                    errors.stockBySizeXXL}
                                </FormGroup>
                              </Row>
                              <Row>
                                <button
                                  type="submit"
                                  className="btn btn-primary mb-2 mr-2"
                                  disabled={false}
                                >
                                  {' '}
                                  Procesar Producto{' '}
                                </button>
                                <Link to="/admin-panel/Product" class="btn btn-danger mb-2">
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
export default ProductForm

ProductForm.defaultProps = {
  product: {},
}

ProductForm.propTypes = {
  product: PropTypes.object,
  fetchProductData: PropTypes.func,
}
