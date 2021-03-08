import axios from 'axios'

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
      client
        .request({
          url: '/reports/week',
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

  downloadSales(startDate, endDate) {
    return new Promise((resolve, reject) => {
      const client = this.bffInstance()
      client
        .request({
          url: '/reports/betweenDates',
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

  getOrders(paymentType) {
    return new Promise((resolve, reject) => {
      const client = this.bffInstance()
      client
        .request({
          url: '/reports/orders',
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

  getOrderByOrderNumber(orderNumber) {
    return new Promise((resolve, reject) => {
      const client = this.bffInstance()
      client
        .request({
          url: '/orders',
          method: 'get',
          params: {
            orderNumber,
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
      client
        .request({
          url: '/users/profile',
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
}
