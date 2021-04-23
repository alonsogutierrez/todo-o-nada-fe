export const uniqueColors = (products) => {
  let uniqueColors = []
  const { hits } = products
  if (hits) {
    hits.forEach((hit) => {
      const { _source } = hit
      if (_source) {
        const { colors } = _source
        if (colors) {
          colors.forEach((color) => {
            if (uniqueColors.indexOf(color) == -1) {
              uniqueColors.push(color)
            }
          })
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
        if (categories) {
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
        if (sizeDetail) {
          sizeDetail.forEach((size) => {
            if (uniqueSizes.indexOf(size) == -1) {
              uniqueSizes.push(size)
            }
          })
        }
      }
    })
  }
  return uniqueSizes
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
                sizeMatchValue =
                  sizeDetail.length > 0 ? sizeDetail.some((sD) => size.includes(sD)) : false
              } else {
                sizeMatchValue = false
              }
            }

            let colorMatchValue
            if (color.length > 0) {
              if (colors && colors.length > 0) {
                colorMatchValue =
                  colors.length > 0 ? colors.some((col) => color.includes(col)) : false
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
        .sort((sortpro1, sortpro2) => {
          const { _source } = sortpro1
          const { price } = _source
          if (price) {
            switch (sortOrder) {
              case 'Pricehigh':
                return sortpro2.price.BasePriceSales < sortpro1.price.BasePriceSales ? -1 : 1
              case 'Pricelow':
                return sortpro2.price.BasePriceSales > sortpro1.price.BasePriceSales ? -1 : 1
              default:
                return sortpro2.price.BasePriceSales > sortpro1.price.BasePriceSales ? -1 : 1
            }
          } else {
            return true
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
