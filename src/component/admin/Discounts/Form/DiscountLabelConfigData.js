export default [
  {
    rows: [
      {
        labelTitle: 'Codigo',
        labelName: 'code',
        type: 'text',
        formClassName: 'edit-icon col-md-12',
        inputClassName: 'form-control product_title',
        className: 'form-control product_title',
        placeHolder: 'Ingresa el codigo',
        getValue: (values) => (values['code'] ? values['code'] : ''),
      },
    ],
  },
  {
    rows: [
      {
        labelTitle: 'Porcentual',
        labelName: 'isPercentual',
        type: 'checkbox',
        formClassName: 'col-md-2',
        inputClassName: '',
        className: '',
        placeHolder: '',
        getValue: (values) => (values['isPercentual'] ? values['isPercentual'] : ''),
      },
    ],
  },
  {
    rows: [
      {
        labelTitle: 'Cantidad',
        labelName: 'amount',
        type: 'text',
        formClassName: 'edit-icon col-md-12',
        inputClassName: 'form-control product_title',
        className: 'form-control product_title',
        placeHolder: 'Si es porcentual debe ser entre 0-100, de lo contrario en CLP',
        getValue: (values) => (values['amount'] ? values['amount'] : ''),
      },
    ],
  },
  {
    rows: [
      {
        labelTitle: 'Fecha de vencimiento',
        labelName: 'expireDate',
        type: 'text',
        formClassName: 'edit-icon col-md-12',
        inputClassName: 'form-control product_title',
        className: 'form-control product_title',
        placeHolder: 'Ingresa fecha de vencimiento',
        getValue: (values) => (values['expireDate'] ? values['expireDate'] : ''),
      },
    ],
  },
  {
    rows: [
      {
        labelTitle: 'Activo',
        labelName: 'isActive',
        type: 'checkbox',
        formClassName: 'col-md-2',
        inputClassName: '',
        className: '',
        placeHolder: 'Activo',
        getValue: (values) => (values['isActive'] ? values['isActive'] : ''),
      },
    ],
  },
]
