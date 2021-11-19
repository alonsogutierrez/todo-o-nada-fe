const getProductsInfo = (items) => {
  return items.map((item) => {
    const productInfo = {
      name: item.productName,
      sku: item.sku,
      itemNumber: item.itemNumber,
      price: {
        basePriceSales: item.price,
        basePriceReference: item.price,
        discount: 0,
      },
      quantity: parseInt(item.quantity, 10),
    }
    return productInfo
  })
}

const getUserInfo = (data) => {
  const {
    first_name,
    last_name,
    email,
    dni,
    phone,
    country_selected,
    region_selected,
    commune_selected,
    zip_code,
    address,
    num_address,
  } = data
  return {
    firstName: first_name,
    lastName: last_name,
    email: email,
    dni: dni,
    phone: phone,
    address: {
      country: country_selected.name,
      city: region_selected.region,
      commune: commune_selected,
      zip_code: zip_code,
      address: address,
      num_address: num_address,
    },
  }
}

const orderCreator = (cartItems, formValues, dispatchType) => {
  const productsInfo = getProductsInfo(cartItems)
  const userInfo = getUserInfo(formValues)
  const orderDataToSave = {
    products: productsInfo,
    paymentData: {
      user: userInfo,
    },
    dispatchData: dispatchType,
  }
  return orderDataToSave
}

export default orderCreator
