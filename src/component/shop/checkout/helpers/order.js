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

const getUserInfo = (data, dispatchType) => {
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
  let addressData =
    dispatchType === 'HOME_DELIVERY'
      ? {
          country: country_selected.name,
          city: region_selected.region,
          commune: commune_selected,
          zip_code: zip_code,
          address: address,
          num_address: num_address,
        }
      : {
          country: 'Chile',
          city: 'Región Metropolitana',
          commune: 'Santiago',
          zip_code: '',
          address: 'Catedral',
          num_address: '#2116',
        }
  return {
    firstName: first_name,
    lastName: last_name,
    email: email,
    dni: dni,
    phone: phone,
    address: addressData,
  }
}

const orderCreator = (cartItems, formValues, dispatchType, discountData) => {
  const productsInfo = getProductsInfo(cartItems)
  const userInfo = getUserInfo(formValues, dispatchType)

  let discountCode = ''
  if (discountData && Object.keys(discountData).length > 0 && discountData.isValid) {
    discountCode = discountData.code
  }

  const orderDataToSave = {
    products: productsInfo,
    paymentData: {
      user: userInfo,
    },
    dispatchData: dispatchType,
    discounts: {
      code: discountCode,
    },
  }
  return orderDataToSave
}

export default orderCreator
