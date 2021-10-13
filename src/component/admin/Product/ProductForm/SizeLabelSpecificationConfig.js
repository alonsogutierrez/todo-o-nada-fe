export default [
  {
    rows: [
      {
        formGroupList: [
          {
            labelList: [
              {
                labelTitle: 'Talla S',
                inputType: 'number',
                inputName: 'stockBySizeS',
                inputClassName: 'form-control product_title',
                getInputValue: (values) => (values ? values['stockBySizeS'] : ''),
              },
              {
                labelTitle: 'SKU talla S',
                inputType: 'text',
                inputName: 'skuBySizeS',
                inputClassName: 'form-control product_title',
                getInputValue: (values) => (values ? values['skuBySizeS'] : ''),
              },
            ],
            formClassName: 'edit-icon col-md-6',
          },
          {
            labelList: [
              {
                labelTitle: 'Talla M',
                inputType: 'number',
                inputName: 'stockBySizeM',
                inputClassName: 'form-control product_title',
                getInputValue: (values) => (values ? values['stockBySizeM'] : ''),
              },
              {
                labelTitle: 'SKU talla M',
                inputType: 'text',
                inputName: 'skuBySizeM',
                inputClassName: 'form-control product_title',
                getInputValue: (values) => (values ? values['skuBySizeM'] : ''),
              },
            ],
            formClassName: 'edit-icon col-md-6',
          },
        ],
      },
    ],
  },
  {
    rows: [
      {
        formGroupList: [
          {
            labelList: [
              {
                labelTitle: 'Talla L',
                inputType: 'number',
                inputName: 'stockBySizeL',
                inputClassName: 'form-control product_title',
                getInputValue: (values) => (values ? values['stockBySizeL'] : ''),
              },
              {
                labelTitle: 'SKU talla L',
                inputType: 'text',
                inputName: 'skuBySizeL',
                inputClassName: 'form-control product_title',
                getInputValue: (values) => (values ? values['skuBySizeL'] : ''),
              },
            ],
            formClassName: 'edit-icon col-md-6',
          },
          {
            labelList: [
              {
                labelTitle: 'Talla XL',
                inputType: 'number',
                inputName: 'stockBySizeXL',
                inputClassName: 'form-control product_title',
                getInputValue: (values) => (values ? values['stockBySizeXL'] : ''),
              },
              {
                labelTitle: 'SKU talla XL',
                inputType: 'text',
                inputName: 'skuBySizeXL',
                inputClassName: 'form-control product_title',
                getInputValue: (values) => (values ? values['skuBySizeXL'] : ''),
              },
            ],
            formClassName: 'edit-icon col-md-6',
          },
        ],
      },
    ],
  },
  {
    rows: [
      {
        formGroupList: [
          {
            labelList: [
              {
                labelTitle: 'Talla XXL',
                inputType: 'number',
                inputName: 'stockBySizeXXL',
                inputClassName: 'form-control product_title',
                getInputValue: (values) => (values ? values['stockBySizeXXL'] : ''),
              },
              {
                labelTitle: 'SKU talla XXL',
                inputType: 'text',
                inputName: 'skuBySizeXXL',
                inputClassName: 'form-control product_title',
                getInputValue: (values) => (values ? values['skuBySizeXXL'] : ''),
              },
            ],
            formClassName: 'edit-icon col-md-6',
          },
        ],
      },
    ],
  },
]
