import products from '../../../../api/product.json'

const calculateSubTotal = (items) => {
  const subTotal = items
    .reduce((fr, CartItem) => fr + CartItem.Qty * CartItem.Rate, 0)
    .toLocaleString(navigator.language, {
      minimumFractionDigits: 0,
    })
  return subTotal
}

const orderCreator = (cartItems, formValues, shippingData) => {
  const productsInfo = cartItems.map((item) => {
    const product = products.find((product) => product.id === item.ProductID)
    const productInfo = {
      name: product.name,
      category: product.category,
      sku: product.id, //TODO: Change by real sku
      itemNumber: 0, //TODO: Change by real itemNumber
      prices: [
        {
          basePriceSales: product.salePrice,
          basePriceReference: product.price,
          discount: product.discount,
        },
      ],
      quantity: 1,
    }
    return productInfo
  })
  const orderDataToSave = {
    products: productsInfo,
    inventoryState: {},
    paymentData: {
      user: {
        firstName: formValues.first_name,
        lastName: formValues.last_name,
        email: formValues.email,
        phone: formValues.phone,
        address: {
          country: formValues.country_selected.name,
          city: formValues.region_selected.region,
          commune: formValues.commune_selected,
          zip_code: formValues.zip_code,
          address: formValues.address,
          num_address: formValues.num_address,
        },
      },
      state: 'created',
      transaction: {
        date: new Date(),
        subTotal: calculateSubTotal(cartItems),
        shipping: shippingData.total,
        id: 1,
      },
    },
  }
  return orderDataToSave
}

export default orderCreator
