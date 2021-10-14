import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row } from 'reactstrap'
import { Formik, Form } from 'formik'
import PropTypes from 'prop-types'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loader from 'react-loader-spinner'

import ClientAPI from '../../../../common/ClientAPI'
import SizesForm from './SizesForm'
import GeneralLabelForm from './GeneralLabelForm'

const ProductForm = (props) => {
  const [categories, setCategories] = useState([])
  const [productData] = useState(props.product)
  const [loading, setLoading] = useState(false)
  const [totalSizes] = useState(['10', '12', '14', '16', 'S', 'M', 'L', 'XL', 'XXL'])
  const [uniqueMeasuresIdentifiers] = useState([1, 2, 3, 4])

  useEffect(() => {
    const getCategories = async () => {
      const clientAPI = new ClientAPI()
      try {
        const categoriesResponse = await clientAPI.getCategories()
        setCategories(categoriesResponse)
      } catch (err) {
        throw new Error(`Cant get categories: ${err.message}`)
      }
    }
    getCategories()
  }, [props.product])

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

  const getFormErrors = (formValues) => {
    const errors = {}
    if (!formValues.itemNumber) {
      errors.itemNumber = 'itemNumber requerido'
    }
    if (isNaN(formValues.itemNumber)) {
      errors.itemNumber = 'itemNumber debe ser numerico'
    }
    if (!formValues.name) {
      errors.name = 'nombre requerido'
    }
    if (!formValues.description) {
      errors.description = 'descripción requerida'
    }
    if (!formValues.productSizeType) {
      errors.productSizeType = 'tipo de tamaño de producto requerida'
    }
    if (!formValues.price.basePriceSales) {
      errors.price = 'precio venta requerido'
    }
    if (!formValues.price.basePriceReference) {
      errors.price = 'precio costo requerido'
    }
    if (!formValues.color) {
      errors.color = 'selecciona un color'
    }
    if (formValues.pictures != null && formValues.pictures.length > 3) {
      errors.pictures = 'cargar no más de 3 imagenes'
    }
    if (formValues.categories && formValues.categories.length < 1) {
      errors.categories = 'debes elegir almenos una categoría'
    }
    return errors
  }

  const onSubmitHandler = async (values) => {
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
    formData.append('productSizeType', values.productSizeType)
    formData.append('description', values.description)
    formData.append('color', values.color)
    formData.append('price', JSON.stringify(price))
    formData.append('published', values.published)

    let sizes = []

    const details = {}
    if (values.productSizeType === 'uniqueMeasures') {
      uniqueMeasuresIdentifiers.forEach((actualUniqueMeasure) => {
        if (values[`skuBySize${actualUniqueMeasure}`]) {
          details[values[`skuBySize${actualUniqueMeasure}`]] = {
            stock: values[`stockBySize${actualUniqueMeasure}`],
            size: values[`measureBySize${actualUniqueMeasure}`],
          }
          sizes.push(values[`measureBySize${actualUniqueMeasure}`])
        }
      })
    } else {
      totalSizes.forEach((actualSize) => {
        if (values[`skuBySize${actualSize}`]) {
          details[values[`skuBySize${actualSize}`]] = {
            stock: values[`stockBySize${actualSize}`],
            size: actualSize,
          }
          sizes.push(actualSize)
        }
      })
    }

    formData.append('details', JSON.stringify(details))
    if (values.pictures) {
      for (const key of Object.keys(values.pictures)) {
        formData.append('pictures', values.pictures[key])
      }
    }
    formData.append('sizes', sizes)

    const productProcessResponse = await processProduct(formData)

    if (productProcessResponse.status === 201) toast.success('Producto procesado exitosamente')
    else {
      toast.error('No se pudo procesar el producto')
    }

    setLoading(false)
    props.fetchProductData(values.itemNumber)
  }

  const getInitialProductMapped = () => {
    const productMapped = {
      itemNumber: '',
      name: '',
      categories: [],
      productSizeType: '',
      description: '',
      price: {
        basePriceSales: 0,
        basePriceReference: 0,
        discount: 0,
      },
      color: '',
      pictures: null,
      published: false,
      details: {},
    }

    totalSizes.forEach((actualSize) => {
      productMapped[`stockBySize${actualSize}`] = 0
      productMapped[`skuBySize${actualSize}`] = ''
    })
    uniqueMeasuresIdentifiers.forEach((actualMeasure) => {
      productMapped[`measureBySize${actualMeasure}`] = ''
      productMapped[`stockBySize${actualMeasure}`] = 0
      productMapped[`skuBySize${actualMeasure}`] = ''
    })

    return productMapped
  }

  const getProductMappedFromProps = (productData) => {
    const productMappedFromProps = {}
    const {
      itemNumber,
      name,
      category,
      productSizeType,
      description,
      price,
      color,
      pictures,
      published,
      details,
    } = productData
    productMappedFromProps.itemNumber = itemNumber
    productMappedFromProps.name = name
    productMappedFromProps.categories = category
    productMappedFromProps.productSizeType = productSizeType
    productMappedFromProps.description = description
    productMappedFromProps.price = price
    productMappedFromProps.color = color
    productMappedFromProps.pictures = pictures
    productMappedFromProps.published = published
    productMappedFromProps.details = details
    let pos = 1
    for (let sku in details) {
      if (productSizeType === 'uniqueMeasures') {
        productMappedFromProps[`measureBySize${pos}`] = details[sku].size
        productMappedFromProps[`stockBySize${pos}`] = details[sku].stock
        productMappedFromProps[`skuBySize${pos}`] = sku
        pos++
      } else {
        totalSizes.forEach((actualSize) => {
          if (details[sku].size === actualSize) {
            productMappedFromProps[`stockBySize${actualSize}`] = details[sku].stock
            productMappedFromProps[`skuBySize${actualSize}`] = sku
          }
        })
      }
    }

    return productMappedFromProps
  }

  const product =
    !Object.keys(productData).length > 0
      ? getInitialProductMapped()
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
                        validate={(values) => getFormErrors(values)}
                        onSubmit={async (values) => await onSubmitHandler(values)}
                      >
                        {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => {
                          return (
                            <Form>
                              <GeneralLabelForm
                                categories={categories}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                setFieldValue={setFieldValue}
                                values={values}
                                errors={errors}
                                touched={touched}
                              />
                              <SizesForm
                                productSizeType={values.productSizeType}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                values={values}
                              />
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
