import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, FormGroup, Input, Label, Row } from 'reactstrap'
import { Formik, Form } from 'formik'
import PropTypes from 'prop-types'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loader from 'react-loader-spinner'

import ClientAPI from '../../../../common/ClientAPI'
import LabelConfigData from './LabelConfigData'
import SizeLabelSpecificationConfig from './SizeLabelSpecificationConfig'

const ProductForm = (props) => {
  const [categories, setCategories] = useState([])
  const [productData] = useState(props.product)
  const [loading, setLoading] = useState(false)
  const [formLabelConfigs] = useState(LabelConfigData)

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
    if (!formValues.name) {
      errors.name = 'nombre requerido'
    }
    if (!formValues.description) {
      errors.description = 'descripción requerida'
    }
    if (!formValues.productSizeType) {
      errors.productSizeType = 'tipo de tañao de producto requerida'
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

    if (productProcessResponse.status === 201) toast.success('Producto procesado exitosamente')
    else {
      toast.error('No se pudo procesar el producto')
    }

    setLoading(false)
    props.fetchProductData(values.itemNumber)
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
                        validate={(values) => getFormErrors(values)}
                        onSubmit={async (values) => await onSubmitHandler(values)}
                      >
                        {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => {
                          return (
                            <Form>
                              {formLabelConfigs.map((formLabel) => {
                                const { rows } = formLabel
                                if (rows && rows.length > 0) {
                                  return (
                                    <Row>
                                      {rows.map((row, index) => (
                                        <FormGroup
                                          className={row.formClassName}
                                          key={row.labelName + index}
                                        >
                                          <Label className="title pl-0">{row.labelTitle}</Label>
                                          {row.labelName === 'categories' && categories ? (
                                            categories.map((category, catIndex) => (
                                              <Label key={catIndex}>
                                                <Input
                                                  type={row.type}
                                                  name={row.labelName}
                                                  className={row.inputClassName}
                                                  placeholder={row.placeHolder}
                                                  onChange={handleChange}
                                                  onBlur={handleBlur}
                                                  value={category}
                                                  defaultChecked={row.defaultChecked(
                                                    values,
                                                    category
                                                  )}
                                                  key={category + catIndex}
                                                />{' '}
                                                {category}
                                              </Label>
                                            ))
                                          ) : row.labelName === 'pictures' ? (
                                            <>
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
                                              {errors.pictures && touched.pictures}
                                              <Label className="title pl-0">Imagen Cargada</Label>
                                              <span>
                                                {values.pictures &&
                                                typeof values.pictures[0] === 'string' ? (
                                                  <img
                                                    src={values.pictures[0]}
                                                    style={{ width: '50%' }}
                                                  />
                                                ) : (
                                                  'Nueva imagen a cargar'
                                                )}
                                              </span>
                                            </>
                                          ) : (
                                            <Input
                                              type={row.type}
                                              name={row.labelName}
                                              className={row.inputClassName}
                                              placeholder={row.placeHolder}
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              value={row.getValue(values)}
                                            >
                                              {row.options && row.options.length > 0
                                                ? row.options.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                      {option.text}
                                                    </option>
                                                  ))
                                                : undefined}
                                            </Input>
                                          )}
                                          {errors[`${row.labelName}`] &&
                                            touched[`${row.labelName}`]}
                                        </FormGroup>
                                      ))}
                                    </Row>
                                  )
                                }
                                return <></>
                              })}
                              Stock por Tallas
                              {SizeLabelSpecificationConfig.map((sizeLabelData) => {
                                const { rows } = sizeLabelData
                                if (rows && rows.length > 0) {
                                  return rows.map((row, idxRow) => {
                                    const { formGroupList } = row
                                    return (
                                      <Row key={idxRow}>
                                        {formGroupList && formGroupList.length > 0 ? (
                                          <>
                                            {formGroupList.map((formGroup, idxFormGroup) => {
                                              const { labelList, formClassName } = formGroup
                                              return (
                                                <FormGroup
                                                  key={idxFormGroup}
                                                  className={formClassName}
                                                >
                                                  {labelList.map((actualLabel) => {
                                                    return (
                                                      <>
                                                        <Label className="title pl-0">
                                                          {actualLabel.labelTitle}
                                                        </Label>
                                                        <Input
                                                          type={actualLabel.inputType}
                                                          name={actualLabel.inputName}
                                                          className={actualLabel.inputClassName}
                                                          onChange={handleChange}
                                                          onBlur={handleBlur}
                                                          value={actualLabel.getInputValue(values)}
                                                        />
                                                      </>
                                                    )
                                                  })}
                                                </FormGroup>
                                              )
                                            })}
                                          </>
                                        ) : (
                                          <></>
                                        )}
                                      </Row>
                                    )
                                  })
                                }
                                return <></>
                              })}
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
