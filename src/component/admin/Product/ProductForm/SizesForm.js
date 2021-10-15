import React from 'react'
import PropTypes from 'prop-types'
import { FormGroup, Input, Label, Row } from 'reactstrap'

import SizeLabelSpecificationConfig from './SizeLabelSpecificationConfig'

const SizesForm = (props) => {
  const { productSizeType, handleBlur, handleChange, values } = props
  const configLabelData =
    productSizeType === 'clothesSizes'
      ? SizeLabelSpecificationConfig.getClothesSizes
      : SizeLabelSpecificationConfig.getUniqueMeasures

  if (!productSizeType) {
    return <></>
  }
  return (
    <>
      {productSizeType === 'clothesSizes' ? 'Stock por Tallas de ropa' : 'Stock por Medidas únicas'}
      {configLabelData.map((labelData) => {
        const { rows } = labelData
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
                        <FormGroup key={idxFormGroup} className={formClassName}>
                          {labelList.map((actualLabel) => {
                            return (
                              <>
                                <Label className="title pl-0">{actualLabel.labelTitle}</Label>
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
    </>
  )
}

export default SizesForm

SizesForm.defaultProps = {
  productSizeType: '',
  handleChange: () => {},
  handleBlur: () => {},
  values: {},
}

SizesForm.propTypes = {
  productSizeType: PropTypes.string,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  values: PropTypes.object,
}
