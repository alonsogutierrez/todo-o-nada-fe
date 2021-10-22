export default [
  {
    rows: [
      {
        labelTitle: 'Item number',
        labelName: 'itemNumber',
        type: 'text',
        formClassName: 'edit-icon col-md-12',
        inputClassName: 'form-control product_title',
        className: 'form-control product_title',
        placeHolder: 'Ingresa el n° del producto',
        getValue: (values) => (values['itemNumber'] ? values['itemNumber'] : ''),
      },
    ],
  },
  {
    rows: [
      {
        labelTitle: 'Nombre',
        labelName: 'name',
        type: 'text',
        formClassName: 'edit-icon col-md-12',
        inputClassName: 'form-control product_title',
        className: 'form-control product_title',
        placeHolder: 'Ingresa el nombre del producto',
        getValue: (values) => (values['name'] ? values['name'] : ''),
      },
    ],
  },
  {
    rows: [
      {
        labelTitle: 'Tipo de medidas',
        labelName: 'productSizeType',
        type: 'select',
        formClassName: 'edit-icon col-md-6',
        inputClassName: 'form-control product_title',
        className: 'form-control product_title',
        placeHolder: 'Ingresa el n° del producto',
        getValue: (values) => (values['productSizeType'] ? values['productSizeType'] : ''),
        options: [
          {
            value: '',
            text: 'selecciona tipo de medidas',
          },
          {
            value: 'clothesSizes',
            text: 'Tallas de ropa',
          },
          {
            value: 'uniqueMeasures',
            text: 'Medidas unicas',
          },
        ],
      },
    ],
  },
  {
    rows: [
      {
        labelTitle: 'Color',
        labelName: 'color',
        type: 'select',
        formClassName: 'edit-icon col-md-6',
        inputClassName: 'form-control product_title',
        className: 'form-control product_title',
        placeHolder: 'color',
        getValue: (values) => (values['color'] ? values['color'] : ''),
        options: [
          {
            value: '',
            text: 'selecciona un color',
          },
          {
            value: 'Rojo',
            text: 'Rojo',
          },
          {
            value: 'Azul',
            text: 'Azul',
          },
          {
            value: 'Negro',
            text: 'Negro',
          },
          {
            value: 'Verde',
            text: 'Verde',
          },
          {
            value: 'Amarillo',
            text: 'Amarillo',
          },
          {
            value: 'Blanco',
            text: 'Blanco',
          },
          {
            value: 'Gris',
            text: 'Gris',
          },
          {
            value: 'Turquesa',
            text: 'Turquesa',
          },
          {
            value: 'Gris carbón',
            text: 'Gris carbón',
          },
          {
            value: 'Rosado',
            text: 'Rosado',
          },
          {
            value: 'Sin color',
            text: 'Sin color',
          },
        ],
      },
    ],
  },
  {
    rows: [
      {
        labelTitle: 'Precio venta',
        labelName: 'price.basePriceSales',
        type: 'number',
        formClassName: 'edit-icon col-md-6',
        inputClassName: 'form-control price',
        className: 'form-control price',
        placeHolder: 'Precio Venta',
        getValue: (values) => {
          return values['price']
            ? values['price']['basePriceSales']
              ? values['price']['basePriceSales']
              : 0
            : 0
        },
      },
      {
        labelTitle: 'Precio costo',
        labelName: 'price.basePriceReference',
        type: 'number',
        formClassName: 'edit-icon col-md-6',
        inputClassName: 'form-control price',
        className: 'form-control price',
        placeHolder: 'Precio costo',
        getValue: (values) => {
          return values['price']
            ? values['price']['basePriceReference']
              ? values['price']['basePriceReference']
              : 0
            : 0
        },
      },
    ],
  },
  {
    rows: [
      {
        labelTitle: 'Descripción',
        labelName: 'description',
        type: 'textarea',
        formClassName: 'edit-icon col-md-12',
        inputClassName: 'form-control',
        className: 'form-control',
        placeHolder: 'Ingresa la descripción de tu producto',
        getValue: (values) => (values['description'] ? values['description'] : ''),
      },
    ],
  },
  {
    rows: [
      {
        labelTitle: 'Producto publicado',
        labelName: 'published',
        type: 'checkbox',
        formClassName: 'col-md',
        inputClassName: '',
        className: '',
        placeHolder: 'Visible',
        getValue: (values) => (values['published'] ? values['published'] : ''),
      },
    ],
  },
  {
    rows: [
      {
        labelTitle: 'Categorias',
        labelName: 'categories',
        type: 'checkbox',
        formClassName: 'col-md-12',
        inputClassName: '',
        className: '',
        placeHolder: '',
        getValue: (value) => (value ? value : ''),
        defaultChecked: (values, value) => {
          return values['categories'] ? values['categories'].includes(value) : false
        },
      },
    ],
  },
  {
    rows: [
      {
        labelTitle: 'Imágenes',
        labelName: 'pictures',
        type: 'file',
        formClassName: 'col-md-12',
        inputClassName: 'form-control',
        className: '',
        placeHolder: '',
        getValue: (value) => (value ? value : ''),
        defaultChecked: (values, value) => {
          return values['pictures'] ? values['pictures'].includes(value) : false
        },
      },
    ],
  },
]
