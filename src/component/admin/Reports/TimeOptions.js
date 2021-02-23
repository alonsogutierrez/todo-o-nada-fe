const xWeekValueFormatString = 'DDD DD MMM'

const weekDataPoints = [
  { x: new Date(2019, 5, 16), y: 34875 },
  { x: new Date(2019, 5, 17), y: 35984 },
  { x: new Date(2019, 5, 18), y: 78547 },
  { x: new Date(2019, 5, 19), y: 42400 },
  { x: new Date(2019, 5, 20), y: 35687 },
  { x: new Date(2019, 5, 21), y: 46584 },
]

const getChartOptions = (intervalType, xValueFormatString, dataPoints) => ({
  animationEnabled: true,
  title: {
    horizontalAlign: 'left',
  },
  axisX: {
    interval: 1,
    intervalType,
  },
  axisY: {
    title: 'Ventas (CLP)',
    prefix: '$',
    includeZero: false,
  },
  data: [
    {
      lineColor: '#03d39f',
      markerColor: '#03d39f',
      yValueFormatString: '$#,###',
      xValueFormatString,
      type: 'spline',
      dataPoints,
    },
  ],
})

const timeOptions = {
  week: getChartOptions('week', xWeekValueFormatString, weekDataPoints),
}

export default timeOptions
