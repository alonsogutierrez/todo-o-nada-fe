const calculateSubTotal = (items) => {
  const subTotal = items.reduce(
    (fr, cartItem) => fr + Number(cartItem.quantity) * Number(cartItem.price),
    0
  )

  return subTotal
}

const orderCreator = (cartItems, formValues, shippingData) => {
  const productsInfo = cartItems.map((item) => {
    //TODO: Validate if item exist in db and get it
    //const product = products.find((product) => product.id === item.ProductID)
    const productInfo = {
      name: item.productName,
      category: 'dummy category', //product.category,
      sku: item.sku, //TODO: Change by real sku
      itemNumber: item.itemNumber, //TODO: Change by real itemNumber
      prices: [
        {
          basePriceSales: item.price,
          basePriceReference: item.price,
          discount: 0,
        },
      ],
      quantity: parseInt(item.quantity, 10), //TODO: Change by real qty
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
