import axios from 'axios'

import CategoriesAPI from './CategoriesAPI'

export default class ClientAPI {
  bffInstance() {
    const bffInstance = axios.create({
      baseURL: process.env.API_BFF_URL,
      timeout: process.env.TIMEOUT,
    })
    return bffInstance
  }

  createOrder(data) {
    return new Promise((resolve, reject) => {
      const client = this.bffInstance()
      client
        .request({
          url: '/orders',
          method: 'post',
          timeout: 10 * 1000,
          data,
        })
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  loginUser(data) {
    return new Promise((resolve, reject) => {
      const client = this.bffInstance()
      client
        .request({
          url: '/users/login',
          method: 'post',
          timeout: 10 * 1000,
          data,
        })
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  getWeekSales() {
    return new Promise((resolve, reject) => {
      const client = this.bffInstance()
      const userToken = localStorage.getItem('userToken')
      client
        .request({
          url: '/reports/week',
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

  getOrderPaymentStatus(orderNumber) {
    return new Promise((resolve, reject) => {
      const client = this.bffInstance()
      client
        .request({
          url: '/payments',
          method: 'get',
          params: {
            orderNumber,
          },
          timeout: 20 * 1000,
        })
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  downloadSales(startDate, endDate) {
    return new Promise((resolve, reject) => {
      const client = this.bffInstance()
      const userToken = localStorage.getItem('userToken')
      client
        .request({
          url: '/reports/betweenDates',
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          method: 'get',
          params: {
            startDate,
            endDate,
          },
          timeout: 40 * 1000,
          responseType: 'blob',
        })
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  downloadProducts() {
    return new Promise((resolve, reject) => {
      const client = this.bffInstance()
      const userToken = localStorage.getItem('userToken')
      client
        .request({
          url: '/reports/products',
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          method: 'get',
          params: {},
          timeout: 40 * 1000,
          responseType: 'blob',
        })
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  getOrders(paymentType) {
    return new Promise((resolve, reject) => {
      const client = this.bffInstance()
      const userToken = localStorage.getItem('userToken')
      client
        .request({
          url: '/reports/orders',
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          method: 'get',
          params: {
            paymentType,
          },
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

  getOrderByOrderNumber(orderNumber, id) {
    return new Promise((resolve, reject) => {
      const client = this.bffInstance()
      client
        .request({
          url: '/orders',
          method: 'get',
          params: {
            orderNumber,
            id,
          },
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

  getAdminOrderData(orderNumber, id) {
    return new Promise((resolve, reject) => {
      const client = this.bffInstance()
      const userToken = localStorage.getItem('userToken')
      client
        .request({
          url: '/orders/admin',
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          method: 'get',
          params: {
            orderNumber,
            id,
          },
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

  getProfileInfo(userId) {
    return new Promise((resolve, reject) => {
      const client = this.bffInstance()
      const userToken = localStorage.getItem('userToken')
      client
        .request({
          url: '/users/profile',
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          method: 'get',
          params: {
            userId,
          },
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

  getProductByItemNumber(itemNumber) {
    return new Promise((resolve, reject) => {
      const client = this.bffInstance()
      client
        .request({
          url: `/product/itemnumber/${itemNumber}`,
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

  getSearch(searchText) {
    return new Promise((resolve, reject) => {
      const client = this.bffInstance()
      client
        .request({
          url: '/search',
          method: 'get',
          params: {
            query: searchText,
          },
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

  getProductsByCategory(category) {
    return new Promise((resolve, reject) => {
      const client = this.bffInstance()
      client
        .request({
          url: `/search/category/${category}`,
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

  processProduct(productData) {
    return new Promise((resolve, reject) => {
      const client = this.bffInstance()
      const userToken = localStorage.getItem('userToken')
      client
        .request({
          url: '/product',
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'multipart/form-data',
          },
          method: 'post',
          timeout: 30 * 1000,
          data: productData,
        })
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  getMoreInterestingProducts() {
    return new Promise((resolve, reject) => {
      const client = this.bffInstance()
      client
        .request({
          url: `/search/interesting-products`,
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

  getAdminAllProducts() {
    return new Promise((resolve, reject) => {
      const client = this.bffInstance()
      const userToken = localStorage.getItem('userToken')
      client
        .request({
          url: `/search/admin-products`,
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

  uploadLotsProducts(file) {
    return new Promise((resolve, reject) => {
      const client = this.bffInstance()
      const userToken = localStorage.getItem('userToken')
      let formData = new FormData()
      formData.append('file', file)
      client
        .request({
          url: `/product/upload`,
          headers: {
            'content-type': 'multipart/form-data',
            Authorization: `Bearer ${userToken}`,
          },
          method: 'post',
          timeout: 180 * 1000,
          data: formData,
        })
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  async getCategoriesNavLinks() {
    try {
      const client = this.bffInstance()
      return await CategoriesAPI.getCategoriesNavLinks(client)
    } catch (err) {
      throw new Error('Cant get categories navlinks from api')
    }
  }

  async createCategories() {
    try {
      const client = this.bffInstance()
      return await CategoriesAPI.createCategories(client)
    } catch (err) {
      throw new Error('Cant create categories from api')
    }
  }

  async getCategories() {
    try {
      const client = this.bffInstance()
      return await CategoriesAPI.getCategories(client)
    } catch (err) {
      throw new Error('Cant get categories from api')
    }
  }
}
