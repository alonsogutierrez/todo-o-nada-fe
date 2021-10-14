import React from 'react'
import PropTypes from 'prop-types'
import { FormGroup, Input, Label, Row } from 'reactstrap'

import LabelConfigData from './LabelConfigData'

const GeneralLabelForm = (props) => {
  const { categories, handleBlur, handleChange, setFieldValue, values, errors, touched } = props
  return (
    <>
      {LabelConfigData.map((formLabel) => {
        const { rows } = formLabel
        if (rows && rows.length > 0) {
          return (
            <Row>
              {rows.map((row, index) => (
                <FormGroup className={row.formClassName} key={row.labelName + index}>
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
                        {values.pictures && typeof values.pictures[0] === 'string' ? (
                          <img src={values.pictures[0]} style={{ width: '50%' }} />
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
                  {errors[`${row.labelName}`]}
                </FormGroup>
              ))}
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
