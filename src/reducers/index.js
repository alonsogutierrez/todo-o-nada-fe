/**
 * Combine Reducers Redux Data
 */
import { combineReducers } from 'redux'
import { IntlReducer as ReducersIntl } from 'react-redux-multilingual'

// Create Custome Reducers
import products from './products'
import filters from './filters'
import errorsForm from './errorsForm'
import userData from './userData'
import orderData from './orderData'
import changeCartData from './changeCartData'
import changeWeekSalesData from './changeWeekSales'

export const rootReducer = combineReducers({
  data: products,
  filters: filters,
  errorsForm,
  userDataReducer: userData,
  orderDataReducer: orderData,
  changeCartDataReducer: changeCartData,
  changeWeekSalesDataReducer: changeWeekSalesData,
  ReducersIntl,
})
