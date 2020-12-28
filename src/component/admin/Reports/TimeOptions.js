const xWeekValueFormatString = 'DDD DD MMM'

const xMonthValueFormatString = 'MMMM'

const xYearValueFormatString = 'YYYY'

const weekDataPoints = [
    { x: new Date(2019, 5, 16), y: 34875 },
    { x: new Date(2019, 5, 17), y: 35984 },
    { x: new Date(2019, 5, 18), y: 78547 },
    { x: new Date(2019, 5, 19), y: 42400 },
    { x: new Date(2019, 5, 20), y: 35687 },
    { x: new Date(2019, 5, 21), y: 46584 },
]

const monthDataPoints = [
    { x: new Date(2019, 0), y: 24875 },
    { x: new Date(2019, 1), y: 25984 },
    { x: new Date(2019, 2), y: 68547 },
    { x: new Date(2019, 3), y: 32400 },
    { x: new Date(2019, 4), y: 25687 },
    { x: new Date(2019, 5), y: 36584 },
    { x: new Date(2019, 6), y: 21458 },
    { x: new Date(2019, 7), y: 52500 },
    { x: new Date(2019, 8), y: 36587 },
    { x: new Date(2019, 9), y: 12479 },
    { x: new Date(2019, 10), y: 36857 },
    { x: new Date(2019, 11), y: 85478 },
]

const yearDataPoints = [
    { x: new Date(2014, 0), y: 24875 },
    { x: new Date(2015, 0), y: 24875 },
    { x: new Date(2016, 0), y: 25984 },
    { x: new Date(2017, 0), y: 68547 },
    { x: new Date(2018, 0), y: 32400 },
    { x: new Date(2019, 0), y: 25687 },
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
            dataPoints
        },
    ]
})

const timeOptions = {
    week: getChartOptions('week', xWeekValueFormatString, weekDataPoints),
    month: getChartOptions('month', xMonthValueFormatString, monthDataPoints),
    year: getChartOptions('year', xYearValueFormatString, yearDataPoints),
}

export default timeOptions