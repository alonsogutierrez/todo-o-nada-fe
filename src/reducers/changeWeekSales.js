import SET_CHANGE_WEEK_SALES from '../types/setChangeWeekSales'

const initState = {
  changeWeekSalesData: false,
}

export default (state = initState, action) => {
  switch (action.type) {
    case SET_CHANGE_WEEK_SALES:
      return { ...state, changeWeekSalesData: action.payload.changeWeekSalesData }
    default:
      return state
  }
}
