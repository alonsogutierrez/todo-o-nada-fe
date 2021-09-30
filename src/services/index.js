export const uniqueColors = (products) => {
  let uniqueColors = []
  const { hits } = products
  if (hits) {
    hits.forEach((hit) => {
      const { _source } = hit
      if (_source) {
        const { color } = _source
        if (color) {
          if (!uniqueColors.includes(color)) {
            uniqueColors.push(color)
          }
        }
      }
    })
  }
  return uniqueColors
}

export const uniqueCategory = (products) => {
  let uniqueCategorys = []
  const { hits } = products
  if (hits) {
    hits.forEach((hit) => {
      const { _source } = hit
      if (_source) {
        const { categories } = _source
        if (categories && categories.length > 0) {
          categories.forEach((category) => {
            if (!uniqueCategorys.includes(category)) {
              uniqueCategorys.push(category)
            }
          })
        }
      }
    })
  }

  return uniqueCategorys
}

export const uniqueSizes = (products) => {
  let uniqueSizes = []
  const { hits } = products
  if (hits) {
    hits.forEach((hit) => {
      const { _source } = hit
      if (_source) {
        const { sizes } = _source
        if (sizes) {
          sizes.forEach((size) => {
            if (!uniqueSizes.includes(size)) {
              uniqueSizes.push(size)
            }
          })
        }
      }
    })
  }
  return uniqueSizes
}

const getBaseSalesPrice = (product) => {
  let productPrice = 0
  const { _source } = product
  if (_source) {
    const { price } = _source
    if (price) {
      const { basePriceSales } = price
      if (basePriceSales) {
        productPrice = basePriceSales
      }
    }
  }
  return productPrice
}

// All Filter Used And Get Final Response
export const getFilterProductsdata = (data, { category, size, color, sortOrder }) => {
  let filteredProducts = []
  if (data) {
    const { hits } = data
    if (hits) {
      filteredProducts = hits
        .filter((product) => {
          const { _source } = product
          if (_source) {
            const { categories, sizes, color: productColor } = _source

            if (category.length === 0 && size.length === 0 && color.length === 0) return true
            let categoryMatchValue = false
            if (category.length > 0 && categories) {
              categoryMatchValue = category.every((cat) => categories.includes(cat))
            }

            let sizeMatchValue = false
            if (size.length > 0 && sizes) {
              size.forEach((filterSize) => {
                if (sizes.some((productSize) => productSize === filterSize)) {
                  sizeMatchValue = true
                }
              })
            }

            let colorMatchValue = false
            if (color.length > 0 && color.includes(productColor)) {
              colorMatchValue = true
            }

            if (category.length > 0 && color.length > 0 && size.length > 0) {
              return categoryMatchValue && colorMatchValue && sizeMatchValue
            }
            if (category.length > 0 && size.length > 0) {
              return categoryMatchValue && sizeMatchValue
            }
            if (category.length > 0 && color.length > 0) {
              return categoryMatchValue && colorMatchValue
            }
            if (color.length > 0 && size.length > 0) {
              return colorMatchValue && sizeMatchValue
            }
            if (category.length > 0) {
              return categoryMatchValue
            }
            if (size.length > 0) {
              return sizeMatchValue
            }
            if (color.length > 0) {
              return colorMatchValue
            }
          } else {
            return false
          }
        })
        .sort((product1, product2) => {
          let product1Price = getBaseSalesPrice(product1)
          let product2Price = getBaseSalesPrice(product2)

          switch (sortOrder) {
            case 'Pricehigh':
              return product2Price < product1Price ? -1 : 1
            case 'Pricelow':
              return product2Price > product1Price ? -1 : 1
            default:
              return product2Price > product1Price ? -1 : 1
          }
        })
    } else {
      console.log('hits not exist')
    }
  }
  const responseFiltered = {
    ...data,
    total: { value: filteredProducts.length },
    hits: filteredProducts,
  }

  return responseFiltered
}
