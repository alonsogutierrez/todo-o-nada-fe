import React, { useState, useRef, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import PropTypes from 'prop-types'
import { FormGroup, Input, Label, Row } from 'reactstrap'
import DiscountLabelConfigData from './DiscountLabelConfigData'

const FormLabel = (props) => {
  const [expireDateForm, setExpireDateForm] = useState(
    props && Object.keys(props).length > 0 && props.values && Object.keys(props.values).length > 0
      ? new Date(props.values.expireDate ? props.values.expireDate : new Date())
      : new Date()
  )
  const [objectReferences] = useState({
    code: useRef(null),
    isPercentual: useRef(null),
    amount: useRef(null),
    expireDate: useRef(null),
    isActive: useRef(null),
  })
  const { handleBlur, handleChange, values, errors, setFieldValue } = props

  const scrollIntoViewBehavior = {
    inline: 'end',
    block: 'center',
    behavior: 'smooth',
  }

  useEffect(() => {
    if (errors) {
      if (errors['code']) {
        objectReferences['code'].current.scrollIntoView(scrollIntoViewBehavior)
        return
      }
      if (errors['isPercentual']) {
        objectReferences['isPercentual'].current.scrollIntoView(scrollIntoViewBehavior)
        return
      }
      if (errors['amount']) {
        objectReferences['amount'].current.scrollIntoView(scrollIntoViewBehavior)
        return
      }
      if (errors['expireDate']) {
        objectReferences['expireDate'].current.scrollIntoView(scrollIntoViewBehavior)
        return
      }
      if (errors['isActive']) {
        objectReferences['isActive'].current.scrollIntoView(scrollIntoViewBehavior)
        return
      }
    }
  })

  return (
    <>
      {DiscountLabelConfigData.map((formLabel, indexLabel) => {
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
                return (
                  <FormGroup className={row.formClassName} key={row.labelName + index}>
                    <Label className="title pl-0">{row.labelTitle}</Label>
                    <div ref={actualInputRef}>
                      {row.type == 'checkbox' ? (
                        <Input
                          type={row.type}
                          name={row.labelName}
                          className={row.inputClassName}
                          placeholder={row.placeHolder}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={row.getValue(values)}
                          defaultChecked={row.defaultChecked(values)}
                        >
                          {row.options && row.options.length > 0
                            ? row.options.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.text}
                                </option>
                              ))
                            : undefined}
                        </Input>
                      ) : row.type == 'datepicker' ? (
                        <DatePicker
                          name="expireDate"
                          selected={expireDateForm}
                          onBlur={handleBlur}
                          onChange={(val) => {
                            setExpireDateForm(val)
                            setFieldValue('expireDate', val)
                          }}
                        ></DatePicker>
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

export default FormLabel

FormLabel.defaultProps = {
  handleBlur: () => {},
  handleChange: () => {},
  setFieldValue: () => {},
  values: {},
  errors: {},
  touched: {},
}

FormLabel.propTypes = {
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  setFieldValue: PropTypes.func,
  values: PropTypes.object,
  errors: PropTypes.object,
  touched: PropTypes.object,
}
