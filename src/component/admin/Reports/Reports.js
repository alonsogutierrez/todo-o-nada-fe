/**
 *  Report Page
 */
import React, { useEffect, useState } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { Col, Container, Row } from 'reactstrap'

import 'react-tabs/style/react-tabs.css'

import CanvasJSReact from '../../../assets/canvasjs.react'

import TimeOptions from './TimeOptions'
import TrasactionList from './TransactionList'

import ClientAPI from '../../../common/ClientAPI'

var CanvasJSChart = CanvasJSReact.CanvasJSChart

const Reports = () => {
  const [weekSales, setWeekSales] = useState({})

  const getWeekSalesAPI = async () => {
    const clientAPI = new ClientAPI()
    try {
      const weekSalesAPIResponse = await clientAPI.getWeekSales()
      const dataWeekSalesObject = TimeOptions['week'].data[0]
      setWeekSales({
        ...TimeOptions['week'],
        data: [
          {
            ...dataWeekSalesObject,
            dataPoints: weekSalesAPIResponse
          }
        ]
      })
    } catch (err) {
      console.error('Error trying to get week sales')
    }
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
    //TODO: Call todo-o-nada-bff to get Reports API
    await triggerGetWeekSales()
    //1º: Get week, month and year sales
    //2º: Get 10 last transactions
  }, [])

  console.log('render and weekSales: ', weekSales)

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

export default Reports
