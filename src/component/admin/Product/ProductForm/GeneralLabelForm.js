import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { FormGroup, Input, Label, Row, Col } from 'reactstrap'

import LabelConfigData from './LabelConfigData'

const GeneralLabelForm = (props) => {
  const [objectReferences] = useState({
    itemNumber: useRef(null),
    name: useRef(null),
    productSizeType: useRef(null),
    color: useRef(null),
    price: {
      basePriceSales: useRef(null),
      basePriceReference: useRef(null),
    },
    description: useRef(null),
    published: useRef(null),
    categories: useRef(null),
    pictures: useRef(null),
  })
  const { categories, handleBlur, handleChange, setFieldValue, values, errors, touched } = props

  const scrollIntoViewBehavior = {
    inline: 'end',
    block: 'center',
    behavior: 'smooth',
  }

  useEffect(() => {
    if (errors) {
      if (errors['itemNumber']) {
        objectReferences['itemNumber'].current.scrollIntoView(scrollIntoViewBehavior)
        return
      }
      if (errors['name']) {
        objectReferences['name'].current.scrollIntoView(scrollIntoViewBehavior)
        return
      }
      if (errors['productSizeType']) {
        objectReferences['productSizeType'].current.scrollIntoView(scrollIntoViewBehavior)
        return
      }
      if (errors['price'] && errors['price'] === 'precio venta requerido') {
        objectReferences['price']['basePriceReference'].current.scrollIntoView(
          scrollIntoViewBehavior
        )
        return
      }
      if (errors['price'] && errors['price'] === 'precio costo requerido') {
        objectReferences['price']['basePriceSales'].current.scrollIntoView(scrollIntoViewBehavior)
        return
      }
      if (errors['color']) {
        objectReferences['color'].current.scrollIntoView(scrollIntoViewBehavior)
        return
      }
      if (errors['description']) {
        objectReferences['description'].current.scrollIntoView(scrollIntoViewBehavior)
        return
      }
      if (errors['published']) {
        objectReferences['published'].current.scrollIntoView(scrollIntoViewBehavior)
        return
      }
      if (errors['categories']) {
        objectReferences['categories'].current.scrollIntoView(scrollIntoViewBehavior)
        return
      }
      if (errors['pictures']) {
        objectReferences['pictures'].current.scrollIntoView(scrollIntoViewBehavior)
        return
      }
    }
  })

  return (
    <>
      {LabelConfigData.map((formLabel, indexLabel) => {
        const { rows } = formLabel
        if (rows && rows.length > 0) {
          return (
            <Row key={`form-${indexLabel}`}>
              {rows.map((row, index) => {
                let errorStyle = {}
                if (errors[`${row.labelName}`]) {
                  errorStyle = {
                    color: 'red',
                    fontSize: '20px',
                  }
                }
                let actualInputRef = objectReferences[`${row.labelName}`]
                if (row.labelName === 'price.basePriceSales') {
                  actualInputRef = objectReferences['price']['basePriceSales']
                }
                if (row.labelName === 'price.basePriceReference') {
                  actualInputRef = objectReferences['price']['basePriceReference']
                }
                return (
                  <FormGroup className={row.formClassName} key={row.labelName + index}>
                    <Label className="title pl-0">{row.labelTitle}</Label>
                    {
                      <div ref={actualInputRef}>
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
                                defaultChecked={row.defaultChecked(values, category)}
                                key={category + catIndex}
                              />{' '}
                              {category}
                            </Label>
                          ))
                        ) : row.labelName === 'pictures' ? (
                          <>
                            <input
                              type="file"
                              name={row.labelName}
                              className="form-control"
                              multiple
                              onChange={(event) => {
                                const filesToUpload = event.currentTarget.files
                                event.preventDefault()
                                setFieldValue(row.labelName, filesToUpload)
                              }}
                            />
                            {errors.pictures && touched.pictures}
                            <Label className="title pl-0">Imagen Cargada</Label>
                            <Row>
                              {values.pictures &&
                                Array.isArray(values.pictures) &&
                                values.pictures.map((picture, indexImage) => {
                                  if (picture) {
                                    return (
                                      <Col key={`picture-${indexImage}`}>
                                        <img src={picture} style={{ width: '50%' }} />
                                      </Col>
                                    )
                                  }
                                  return 'Nueva imagen a cargar'
                                })}
                            </Row>
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
                      </div>
                    }
                    {<span style={errorStyle}>{errors[`${row.labelName}`]}</span>}
                  </FormGroup>
                )
              })}
            </Row>
          )
        }
        return <></>
      })}
    </>
  )
}

export default GeneralLabelForm

GeneralLabelForm.defaultProps = {
  categories: [],
  handleBlur: () => {},
  handleChange: () => {},
  setFieldValue: () => {},
  values: {},
  errors: {},
  touched: {},
}

GeneralLabelForm.propTypes = {
  categories: PropTypes.array,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  setFieldValue: PropTypes.func,
  values: PropTypes.object,
  errors: PropTypes.object,
  touched: PropTypes.object,
}
