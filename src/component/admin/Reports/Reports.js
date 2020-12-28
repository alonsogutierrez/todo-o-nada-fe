/**
 *  Report Page
 */
import React, { Component } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { Col, Container, Row } from 'reactstrap'

import 'react-tabs/style/react-tabs.css'

import CanvasJSReact from '../../../assets/canvasjs.react'

import TimeOptions from './TimeOptions'
import TrasactionList from './TransactionList'

var CanvasJSChart = CanvasJSReact.CanvasJSChart

class Reports extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
    //TODO: Call todo-o-nada-bff to get Reports API
    //1º: Get week, month and year sales
    //2º: Get 10 last transactions
  }

  getTimeCharts() {
    const times = Object.keys(TimeOptions)
    return times.map((time, index) => (
        <TabPanel key={index}>
          <CanvasJSChart options={TimeOptions[time]} />
        </TabPanel>)
    )
  }

  render() {
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
                  <Tab>Mes</Tab>
                  <Tab>Año</Tab>
                </TabList>
                {
                  this.getTimeCharts()
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
}
export default Reports
