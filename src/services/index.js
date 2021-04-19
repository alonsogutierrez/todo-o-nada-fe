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
export const getFilterProductsdata = (data, { category, size, color, sortOrder, ratings }) => {
  let sizes = size
  let filteredProducts = []
  if (data) {
    const { hits } = data
    if (hits) {
      filteredProducts = hits
        .filter((product) => {
          let categoryMatchValue
          const { _source } = product
          if (_source) {
            const { categories } = _source
            if (categories) {
              categoryMatchValue = categories
                ? categories.some((cat) => cat === category.includes(cat))
                : true

              let sizeMatchValue
              if (product.size) sizeMatchValue = product.size.some((size) => sizes.includes(size))
              else sizeMatchValue = true

              let colorMatchValue
              if (color && product.colors) {
                colorMatchValue = product.colors.some((colors) => color.includes(colors))
              } else {
                colorMatchValue = false
              }

              let ratingMatchValue
              if (product.rating == ratings) {
                ratingMatchValue = true
              } else if (ratings == '') {
                ratingMatchValue = true
              } else {
                ratingMatchValue = false
              }

              if (
                category.length > 0 &&
                color.length > 0 &&
                size.length > 0 &&
                ratings.length > 0
              ) {
                return categoryMatchValue && colorMatchValue && sizeMatchValue && ratingMatchValue
              }
              if (category.length > 0 && color.length > 0 && size.length > 0) {
                return categoryMatchValue && colorMatchValue && sizeMatchValue
              }
              if (category.length > 0 && size.length > 0 && ratings.length > 0) {
                return categoryMatchValue && colorMatchValue && ratingMatchValue
              }
              if (category.length > 0 && color.length > 0 && ratings.length > 0) {
                return categoryMatchValue && colorMatchValue && ratingMatchValue
              }
              if (color.length > 0 && size.length > 0 && ratings.length > 0) {
                return colorMatchValue && sizeMatchValue && ratingMatchValue
              }
              if (category.length > 0 && color.length > 0) {
                return categoryMatchValue && colorMatchValue
              }
              if (category.length > 0 && size.length > 0) {
                return categoryMatchValue && sizeMatchValue
              }
              if (category.length > 0 && ratings.length > 0) {
                return categoryMatchValue && ratingMatchValue
              }
              if (color.length > 0 && size.length > 0) {
                return colorMatchValue && sizeMatchValue
              }
              if (color.length > 0 && ratings.length > 0) {
                return colorMatchValue && ratingMatchValue
              }
              if (size.length > 0 && ratings.length > 0) {
                return sizeMatchValue && ratingMatchValue
              }
              if (color.length > 0) {
                return colorMatchValue
              }
              if (category.length > 0) {
                return categoryMatchValue
              }
              if (size.length > 0) {
                return sizeMatchValue
              }
              if (ratings.length > 0) {
                return ratingMatchValue
              } else {
                return false
              }
            }
          }
        })
        .sort((sortpro1, sortpro2) => {
          switch (sortOrder) {
            case 'Pricehigh':
              return sortpro2.price.BasePriceSales < sortpro1.price.BasePriceSales ? -1 : 1
            case 'Pricelow':
              return sortpro2.price.BasePriceSales > sortpro1.price.BasePriceSales ? -1 : 1
            default:
              return sortpro2.price.BasePriceSales > sortpro1.price.BasePriceSales ? -1 : 1
          }
        })
      return filteredProducts
    } else {
      console.log('hits not exist')
    }
  }
  console.log('filteredProducts: ', filteredProducts)

  return filteredProducts
}
