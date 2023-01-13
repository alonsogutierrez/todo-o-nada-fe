export default [
  {
    rows: [
      {
        labelTitle: 'Banner number',
        labelName: 'bannerNumber',
        type: 'text',
        formClassName: 'edit-icon col-md-12',
        inputClassName: 'form-control product_title',
        className: 'form-control product_title',
        placeHolder: 'Ingresa el n° del banner',
        getValue: (values) => (values['bannerNumber'] ? values['bannerNumber'] : ''),
      },
    ],
  },
  {
    rows: [
      {
        labelTitle: 'Posición',
        labelName: 'position',
        type: 'text',
        formClassName: 'edit-icon col-md-12',
        inputClassName: 'form-control product_title',
        className: 'form-control product_title',
        placeHolder: 'Ingresa el n° de posición del banner',
        getValue: (values) => (values['position'] ? values['position'] : ''),
      },
    ],
  },
  {
    rows: [
      {
        labelTitle: 'Banner publicado',
        labelName: 'isActive',
        type: 'checkbox',
        formClassName: 'col-md',
        inputClassName: '',
        className: '',
        placeHolder: 'Visible',
        getValue: (values) => {
          return values['isActive']
        },
        defaultChecked: (values) => {
          return values['isActive']
        },
      },
    ],
  },
  {
    rows: [
      {
        labelTitle: 'Imagen',
        labelName: 'images',
        type: 'file',
        formClassName: 'col-md-12',
        inputClassName: 'form-control',
        className: '',
        placeHolder: '',
        getValue: (value) => (value ? value : ''),
        defaultChecked: (values, value) => {
          return values['images'] ? values['images'].includes(value) : false
        },
      },
    ],
  },
]
