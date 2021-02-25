import SET_CHANGE_WEEK_SALES from '../types/setChangeWeekSales'

export default (changeWeekSalesData) => (dispatch) => {
  dispatch({
    type: SET_CHANGE_WEEK_SALES,
    payload: {
      changeWeekSalesData,
    },
  })
}
