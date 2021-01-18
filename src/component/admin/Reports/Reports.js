/**
 *  Report Page
 */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { Col, Container, Row } from 'reactstrap'

import 'react-tabs/style/react-tabs.css'

import CanvasJSReact from '../../../assets/canvasjs.react'

import TimeOptions from './TimeOptions'
import TrasactionList from './TransactionList'

import ClientAPI from '../../../common/ClientAPI'

import setChangeWeekSales from '../../../actions/setChangeWeekSales'

var CanvasJSChart = CanvasJSReact.CanvasJSChart

const Reports = ({ changeWeekSales, setChangeWeekSales }) => {
  const [weekSales, setWeekSales] = useState({})

  const getWeekSalesAPI = async () => {
    const clientAPI = new ClientAPI()
    try {
      const weekSalesAPIResponse = await clientAPI.getWeekSales()
      const dataWeekSalesObject = TimeOptions['week'].data[0]
      const timeWeekSales = {
        ...TimeOptions['week'],
        data: [
          {
            ...dataWeekSalesObject,
            dataPoints: getWeekDataOptions(weekSalesAPIResponse)
          }
        ]
      }
      setChangeWeekSales(!changeWeekSales)
      setWeekSales(timeWeekSales)
    } catch (err) {
      console.error('Error trying to get week sales')
    }
  }

  const getWeekDataOptions = (weekDateSales) => {
    const weekDataOptions = []
    for (let date in weekDateSales) {
      let weekSale = new Date(weekDateSales[date].x)
      let objectWeek = {
        x: weekSale,
        y: weekDateSales[date].y
      }
      weekDataOptions.push(objectWeek)
    }
    return weekDataOptions
  }

  const getTimeCharts = (weekSales) => {
    return <TabPanel >
        <CanvasJSChart options={weekSales} />
      </TabPanel>
    // const times = Object.keys(TimeOptions)
    // return times.map((time, index) => (
    //   <TabPanel key={index}>
    //       <CanvasJSChart options={TimeOptions[time]} />
    //     </TabPanel>)
    // )
  }

  const triggerGetWeekSales = async () => {
    await getWeekSalesAPI()
  }

  useEffect(async () => {
    window.scrollTo(0, 0)
    await triggerGetWeekSales()
    //1º: Get week, month and year sales
    //2º: Get 10 last transactions
  }, [changeWeekSales])

  return (
      <div className="section-ptb">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="d-sm-flex reports-tab w-100 mb-0">
                <h4>Reportes</h4>
              </div>
            </Col>
          </Row>
          <div>
            <div>
              <Tabs>
                <TabList>
                  <Tab onClick={() => triggerGetWeekSales()}>Semana</Tab>
                </TabList>
                {
                  getTimeCharts(weekSales)
                }
              </Tabs>
            </div>
            <div className="reports-table">
              <Tabs>
                <TabList>
                  <Tab>Transacciones</Tab>
                </TabList>

                <TabPanel>
                  <TrasactionList />
                </TabPanel>
              </Tabs>
            </div>
          </div>
        </Container>
      </div>
    )
}

const mapStateToProps = (state) => ({
  changeWeekSales: state.changeWeekSalesDataReducer.changeWeekSales,
})

const mapDispatchToProps = (dispatch) => ({
  setChangeWeekSales: (changeWeekSales) => dispatch(setChangeWeekSales(changeWeekSales))
})

export default connect(mapStateToProps, mapDispatchToProps)(Reports)

Reports.defaultProps = {
  changeWeekSales: null,
  setChangeWeekSales: () => {}
}

Reports.propTypes = {
  changeWeekSales: PropTypes.bool,
  setChangeWeekSales: PropTypes.func
}
