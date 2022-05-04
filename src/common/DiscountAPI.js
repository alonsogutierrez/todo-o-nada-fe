import axios from 'axios'

export default class DiscountAPI {
  constructor() {
    this.client = this.bffInstance()
  }

  bffInstance() {
    const bffInstance = axios.create({
      baseURL: process.env.API_BFF_URL,
      timeout: process.env.TIMEOUT,
    })
    return bffInstance
  }

  getDiscountByCode(code) {
    return new Promise((resolve, reject) => {
      this.client
        .request({
          url: code ? '/discount-coupon/' + code : '/discount-coupon',
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

  createDiscount(data) {
    const userToken = localStorage.getItem('userToken')
    return new Promise((resolve, reject) => {
      this.client
        .request({
          url: '/discount-coupon',
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          method: 'post',
          data,
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
