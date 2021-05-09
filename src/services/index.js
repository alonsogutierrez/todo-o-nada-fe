export const uniqueColors = (products) => {
  let uniqueColors = []
  const { hits } = products
  if (hits) {
    hits.forEach((hit) => {
      const { _source } = hit
      if (_source) {
        const { colors } = _source
        if (colors && colors.length > 0) {
          if (uniqueColors.indexOf(colors) == -1) {
            uniqueColors.push(colors)
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
            if (uniqueCategorys.indexOf(category) == -1) {
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
        const { sizeDetail } = _source
        if (sizeDetail && sizeDetail.length > 0) {
          if (uniqueSizes.indexOf(sizeDetail) == -1) {
            uniqueSizes.push(sizeDetail)
          }
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
      const { BasePriceSales } = price
      if (BasePriceSales) {
        productPrice = BasePriceSales
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
            const { categories, sizeDetail, colors } = _source

            if (category.length === 0 && size.length === 0 && color.length === 0) return true
            let categoryMatchValue
            if (category.length > 0) {
              if (categories && categories.length > 0) {
                categoryMatchValue =
                  categories.length > 0 ? categories.some((cat) => category.includes(cat)) : false
              } else {
                categoryMatchValue = false
              }
            }

            let sizeMatchValue
            if (size.length > 0) {
              if (sizeDetail && sizeDetail.length > 0) {
                sizeMatchValue = sizeDetail.length > 0 ? size.includes(sizeDetail) : false
              } else {
                sizeMatchValue = false
              }
            }

            let colorMatchValue
            if (color.length > 0) {
              if (colors && colors.length > 0) {
                colorMatchValue = colors.length > 0 ? color.includes(colors) : false
              } else {
                colorMatchValue = false
              }
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
