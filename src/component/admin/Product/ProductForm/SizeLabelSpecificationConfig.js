const getClothesSizes = [
  {
    rows: [
      {
        formGroupList: [
          {
            labelList: [
              {
                labelTitle: 'Talla 10',
                inputType: 'number',
                inputName: 'stockBySize10',
                inputClassName: 'form-control product_title',
                getInputValue: (values) => (values ? values['stockBySize10'] : 0),
              },
              {
                labelTitle: 'SKU talla 10',
                inputType: 'text',
                inputName: 'skuBySize10',
                inputClassName: 'form-control product_title',
                getInputValue: (values) => (values ? values['skuBySize10'] : ''),
              },
            ],
            formClassName: 'edit-icon col-md-6',
          },
          {
            labelList: [
              {
                labelTitle: 'Talla 12',
                inputType: 'number',
                inputName: 'stockBySize12',
                inputClassName: 'form-control product_title',
                getInputValue: (values) => (values ? values['stockBySize12'] : 0),
              },
              {
                labelTitle: 'SKU talla 12',
                inputType: 'text',
                inputName: 'skuBySize12',
                inputClassName: 'form-control product_title',
                getInputValue: (values) => (values ? values['skuBySize12'] : ''),
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
                labelTitle: 'Talla 14',
                inputType: 'number',
                inputName: 'stockBySize14',
                inputClassName: 'form-control product_title',
                getInputValue: (values) => (values ? values['stockBySize14'] : 0),
              },
              {
                labelTitle: 'SKU talla 14',
                inputType: 'text',
                inputName: 'skuBySize14',
                inputClassName: 'form-control product_title',
                getInputValue: (values) => (values ? values['skuBySize14'] : ''),
              },
            ],
            formClassName: 'edit-icon col-md-6',
          },
          {
            labelList: [
              {
                labelTitle: 'Talla 16',
                inputType: 'number',
                inputName: 'stockBySize16',
                inputClassName: 'form-control product_title',
                getInputValue: (values) => (values ? values['stockBySize16'] : 0),
              },
              {
                labelTitle: 'SKU talla 16',
                inputType: 'text',
                inputName: 'skuBySize16',
                inputClassName: 'form-control product_title',
                getInputValue: (values) => (values ? values['skuBySize16'] : ''),
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
                labelTitle: 'Talla S',
                inputType: 'number',
                inputName: 'stockBySizeS',
                inputClassName: 'form-control product_title',
                getInputValue: (values) => (values ? values['stockBySizeS'] : 0),
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
                getInputValue: (values) => (values ? values['stockBySizeM'] : 0),
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
                getInputValue: (values) => (values ? values['stockBySizeL'] : 0),
              },
              {
                labelTitle: 'SKU talla L',
                inputType: 'text',
                inputName: 'skuBySizeL',
                inputClassName: 'form-control product_title',
                getInputValue: (values) => (values ? values['skuBySizeL'] : 0),
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
                getInputValue: (values) => (values ? values['stockBySizeXL'] : 0),
              },
              {
                labelTitle: 'SKU talla XL',
                inputType: 'text',
                inputName: 'skuBySizeXL',
                inputClassName: 'form-control product_title',
                getInputValue: (values) => (values ? values['skuBySizeXL'] : 0),
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
                getInputValue: (values) => (values ? values['stockBySizeXXL'] : 0),
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

const getUniqueMeasures = [
  {
    rows: [
      {
        formGroupList: [
          {
            labelList: [
              {
                labelTitle: 'Medida única 1',
                inputType: 'text',
                inputName: 'measureBySize1',
                inputClassName: 'form-control product_title',
                getInputValue: (values) => (values ? values['measureBySize1'] : 0),
              },
              {
                labelTitle: 'Stock Medida única 1',
                inputType: 'number',
                inputName: 'stockBySize1',
                inputClassName: 'form-control product_title',
                getInputValue: (values) => (values ? values['stockBySize1'] : 0),
              },
              {
                labelTitle: 'SKU medida 1',
                inputType: 'text',
                inputName: 'skuBySize1',
                inputClassName: 'form-control product_title',
                getInputValue: (values) => (values ? values['skuBySize1'] : ''),
              },
            ],
            formClassName: 'edit-icon col-md-6',
          },
          {
            labelList: [
              {
                labelTitle: 'Medida única 2',
                inputType: 'text',
                inputName: 'measureBySize2',
                inputClassName: 'form-control product_title',
                getInputValue: (values) => (values ? values['measureBySize2'] : 0),
              },
              {
                labelTitle: 'Stock Medida única 2',
                inputType: 'number',
                inputName: 'stockBySize2',
                inputClassName: 'form-control product_title',
                getInputValue: (values) => (values ? values['stockBySize2'] : 0),
              },
              {
                labelTitle: 'SKU medida 2',
                inputType: 'text',
                inputName: 'skuBySize2',
                inputClassName: 'form-control product_title',
                getInputValue: (values) => (values ? values['skuBySize2'] : ''),
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
                labelTitle: 'Medida única 3',
                inputType: 'text',
                inputName: 'measureBySize3',
                inputClassName: 'form-control product_title',
                getInputValue: (values) => (values ? values['measureBySize3'] : 0),
              },
              {
                labelTitle: 'Stock Medida única 3',
                inputType: 'number',
                inputName: 'stockBySize3',
                inputClassName: 'form-control product_title',
                getInputValue: (values) => (values ? values['stockBySize3'] : 0),
              },
              {
                labelTitle: 'SKU medida 3',
                inputType: 'text',
                inputName: 'skuBySize3',
                inputClassName: 'form-control product_title',
                getInputValue: (values) => (values ? values['skuBySize3'] : ''),
              },
            ],
            formClassName: 'edit-icon col-md-6',
          },
          {
            labelList: [
              {
                labelTitle: 'Medida única 4',
                inputType: 'text',
                inputName: 'measureBySize4',
                inputClassName: 'form-control product_title',
                getInputValue: (values) => (values ? values['measureBySize4'] : 0),
              },
              {
                labelTitle: 'Medida única 4',
                inputType: 'number',
                inputName: 'stockBySize4',
                inputClassName: 'form-control product_title',
                getInputValue: (values) => (values ? values['stockBySize4'] : 0),
              },
              {
                labelTitle: 'SKU medida 4',
                inputType: 'text',
                inputName: 'skuBySize4',
                inputClassName: 'form-control product_title',
                getInputValue: (values) => (values ? values['skuBySize4'] : ''),
              },
            ],
            formClassName: 'edit-icon col-md-6',
          },
        ],
      },
    ],
  },
]

export default {
  getClothesSizes,
  getUniqueMeasures,
}
