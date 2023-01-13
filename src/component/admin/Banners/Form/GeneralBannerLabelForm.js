import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { FormGroup, Input, Label, Row, Col } from 'reactstrap'

import LabelConfigData from './LabelConfigData'

const GeneralBannerLabelForm = (props) => {
  const [objectReferences] = useState({
    bannerNumber: useRef(null),
    position: useRef(null),
    isActive: useRef(null),
    images: useRef(null),
  })
  const { handleBlur, handleChange, setFieldValue, values, errors, touched } = props

  const scrollIntoViewBehavior = {
    inline: 'end',
    block: 'center',
    behavior: 'smooth',
  }

  useEffect(() => {
    if (errors) {
      if (errors['bannerNumber']) {
        objectReferences['bannerNumber'].current.scrollIntoView(scrollIntoViewBehavior)
        return
      }
      if (errors['position']) {
        objectReferences['position'].current.scrollIntoView(scrollIntoViewBehavior)
        return
      }
      if (errors['isActive']) {
        objectReferences['isActive'].current.scrollIntoView(scrollIntoViewBehavior)
        return
      }
      if (errors['images']) {
        objectReferences['images'].current.scrollIntoView(scrollIntoViewBehavior)
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
                const val = row.getValue(values)

                return (
                  <FormGroup className={row.formClassName} key={row.labelName + index}>
                    <Label className="title pl-0">{row.labelTitle}</Label>
                    {
                      <div ref={actualInputRef}>
                        {row.labelName === 'images' ? (
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
                            {errors.images && touched.images}
                            <Label className="title pl-0">Imagen Cargada</Label>
                            <Row>
                              {values.images &&
                                Array.isArray(values.images) &&
                                values.images.map((picture, indexImage) => {
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
                            value={val}
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

export default GeneralBannerLabelForm

GeneralBannerLabelForm.defaultProps = {
  categories: [],
  handleBlur: () => {},
  handleChange: () => {},
  setFieldValue: () => {},
  values: {},
  errors: {},
  touched: {},
}

GeneralBannerLabelForm.propTypes = {
  categories: PropTypes.array,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  setFieldValue: PropTypes.func,
  values: PropTypes.object,
  errors: PropTypes.object,
  touched: PropTypes.object,
}
