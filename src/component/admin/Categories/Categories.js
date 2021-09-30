import React, { useState, useEffect } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { Col, Container, Row } from 'reactstrap'

import 'react-tabs/style/react-tabs.css'

import ClientAPI from '../../../common/ClientAPI'
import EditCategories from './EditCategories'

const Categories = () => {
  const [categories, setCategories] = useState([])

  const geCategoriesAPI = async () => {
    const clientAPI = new ClientAPI()
    try {
      const categoriesResponse = await clientAPI.getCategories()
      setCategories(categoriesResponse)
    } catch (err) {
      console.error('Error trying to get categories: ', err.message)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    geCategoriesAPI()
  }, [categories.length])

  return (
    <div className="section-ptb">
      <Container>
        <Row>
          <Col lg={12}>
            <div className="d-sm-flex reports-tab w-100 mb-0">
              <h4>Categorias</h4>
            </div>
          </Col>
        </Row>
        <div>
          <div>
            <Tabs>
              <TabList>
                <Tab>Links de navegación</Tab>
                <Tab>Editar categorias</Tab>
              </TabList>

              <TabPanel>
                <h1>Links de navegación</h1>
              </TabPanel>
              <TabPanel>
                <EditCategories categories={categories}></EditCategories>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Categories
