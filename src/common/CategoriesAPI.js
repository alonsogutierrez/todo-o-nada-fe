const getCategoriesNavLinks = (client) => {
  const userToken = localStorage.getItem('userToken')
  return new Promise((resolve, reject) => {
    client
      .request({
        url: '/categories/nav-links',
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        method: 'get',
        timeout: 10 * 1000,
      })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

const getCategories = (client) => {
  const userToken = localStorage.getItem('userToken')
  return new Promise((resolve, reject) => {
    client
      .request({
        url: '/categories',
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        method: 'get',
        timeout: 10 * 1000,
      })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

const createCategories = (client) => {
  const userToken = localStorage.getItem('userToken')
  return new Promise((resolve, reject) => {
    client
      .request({
        url: '/categories',
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        method: 'post',
        timeout: 10 * 1000,
      })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

module.exports = {
  getCategoriesNavLinks,
  getCategories,
  createCategories,
}
