/**
 *  Report Page
 */
import React, { Component } from 'react'
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

const CanvasJSChart = CanvasJSReact.CanvasJSChart

class Reports extends Component {
  constructor(props) {
    super(props)
    this.state = {
      weekSales: {},
    }
  }

  async getWeekSalesAPI() {
    const clientAPI = new ClientAPI()
    const { changeWeekSales, setChangeWeekSales } = this.props
    try {
      const weekSalesAPIResponse = await clientAPI.getWeekSales()
      const weekTimeOptions = TimeOptions['week']
      weekTimeOptions.data[0].dataPoints = this.getWeekDataOptions(weekSalesAPIResponse)
      const newWeekSales = weekTimeOptions
      setChangeWeekSales(!changeWeekSales)
      this.setState({ weekSales: newWeekSales })
    } catch (err) {
      console.error('Error trying to get week sales: ', err.message)
    }
  }

  getWeekDataOptions(weekDateSales) {
    const weekDataOptions = []
    for (let date in weekDateSales) {
      const weekSaleDate = new Date(weekDateSales[date].x)
      const weekSalesAmount = weekDateSales[date].y
      let objectWeek = {
        x: weekSaleDate,
        y: weekSalesAmount,
      }
      weekDataOptions.push(objectWeek)
    }
    return weekDataOptions
  }

  getTimeCharts(weekSales) {
    return (
      <TabPanel>
        <CanvasJSChart options={weekSales} />
      </TabPanel>
    )
    // const times = Object.keys(TimeOptions)
    // return times.map((time, index) => (
    //   <TabPanel key={index}>
    //       <CanvasJSChart options={TimeOptions[time]} />
    //     </TabPanel>)
    // )
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    this.getWeekSalesAPI()
  }

  render() {
    const { weekSales } = this.state
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
                  <Tab>Semana</Tab>
                </TabList>
                {this.getTimeCharts(weekSales)}
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
}

const mapStateToProps = (state) => ({
  changeWeekSales: state.changeWeekSalesDataReducer.changeWeekSales,
})

const mapDispatchToProps = (dispatch) => ({
  setChangeWeekSales: (changeWeekSales) => dispatch(setChangeWeekSales(changeWeekSales)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Reports)

Reports.defaultProps = {
  changeWeekSales: false,
  setChangeWeekSales: () => {},
}

Reports.propTypes = {
  changeWeekSales: PropTypes.bool,
  setChangeWeekSales: PropTypes.func,
}
