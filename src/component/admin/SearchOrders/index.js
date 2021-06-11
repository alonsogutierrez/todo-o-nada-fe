import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ReactTable from 'react-table'
import { Col, Container, Row, Input } from 'reactstrap'
import { format } from 'date-fns'

import ClientAPI from '../../../common/ClientAPI'
import OrderDetailModal from './OrderDetailModal'
import COLUMNS_TABLE from './constants/columnsTable'
import setViewOrderToggle from './../../../actions/setViewOrderToggle'

class SearchOrders extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      orderNumber: '',
      invoices: [],
      orderData: {},
      userData: {},
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    const { viewOrderToggle, setViewOrderToggle } = this.props
    setViewOrderToggle(!viewOrderToggle)
  }

  generateTableOrderData(orderNumber, paymentData, createdDate) {
    const userData = paymentData.user
    const clientNames = userData.firstName + ' ' + userData.lastName
    const orderDataTableResponse = {
      orderNumber,
      clientNames,
      email: userData.email,
      phone: userData.phone,
      createdAt: format(new Date(createdDate), 'yyyy-MM-dd'),
      orderStatus: paymentData.state,
      paymentType: 'Webpay', //TODO: Change by real payment channel
      totalPrice: paymentData.transaction.subTotal + paymentData.transaction.shipping,
    }
    return orderDataTableResponse
  }

  async onSearchOrder(e) {
    e.preventDefault()
    const { orderNumber } = this.state
    if (orderNumber !== '') {
      const clientAPI = new ClientAPI()
      try {
        const orderDataAPIResponse = await clientAPI.getOrderByOrderNumber(orderNumber)
        if (orderDataAPIResponse && Object.keys(orderDataAPIResponse).length > 0) {
          const { orderNumber, paymentData, createdAt } = orderDataAPIResponse
          const orderDataTableResponse = this.generateTableOrderData(
            orderNumber,
            paymentData,
            createdAt
          )
          this.setState({
            userData: paymentData.user,
            orderData: orderDataAPIResponse,
            invoices: [orderDataTableResponse],
          })
        } else {
          this.setState({
            userData: {},
            orderData: {},
            invoices: [],
          })
        }
      } catch (err) {
        console.error('Error trying to get order: ', err.message)
      }
    }
  }

  handleSearchOrder(e) {
    const lastInputCharacter = e.target.value
    const orderNumberFormatted = lastInputCharacter.replace(/[^0-9'\s]/g, '')
    this.setState({
      orderNumber: orderNumberFormatted,
    })
  }

  isEmptyUserData(userData) {
    return Object.entries(userData).length > 0
  }

  getTableColumns() {
    const tableColumnsData = COLUMNS_TABLE
    let columnsResponse = []
    for (let key in tableColumnsData) {
      let objectResponse = {}
      objectResponse.accessor = key
      for (let keyData in tableColumnsData[key]) {
        objectResponse[keyData] = tableColumnsData[key][keyData]
      }
      columnsResponse.push(objectResponse)
    }
    return columnsResponse
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    const columns = this.getTableColumns()
    const { orderNumber, userData, orderData, invoices } = this.state
    const { viewOrderToggle } = this.props

    return (
      <div>
        <div className="section-ptb">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="mb-0">
                  <h4>Lista de ordenes</h4>
                </div>
                <form role="search" onSubmit={async (e) => await this.onSearchOrder(e)}>
                  <Row className="ciya-tools-action ciya-tools-search">
                    <Col xs="10">
                      <Input
                        type="search"
                        className="form-control"
                        maxLength={50}
                        name="search_order_input"
                        id="search_order_input"
                        placeholder="Ingresa una orden"
                        value={orderNumber}
                        onChange={(e) => this.handleSearchOrder(e)}
                      />
                    </Col>
                    <Col xs="2">
                      <button
                        type="submit"
                        className="btn btn-solid glyph-icon pgsicon-ecommerce-magnifying-glass"
                        onClick={async (e) => await this.onSearchOrder(e)}
                      ></button>
                    </Col>
                  </Row>
                </form>

                <ReactTable
                  className="invoices-table"
                  data={invoices}
                  columns={columns}
                  minRows={1}
                  defaultPageSize={5}
                />
                {this.isEmptyUserData(userData) ? (
                  <OrderDetailModal
                    userData={userData}
                    orderData={orderData}
                    openModal={viewOrderToggle}
                    setToggle={this.toggle}
                  />
                ) : (
                  <></>
                )}
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  viewOrderToggle: state.viewOrderToggleReducer.viewOrderToggleData,
})

const mapDispatchToProps = (dispatch) => ({
  setViewOrderToggle: (viewOrderToggle) => dispatch(setViewOrderToggle(viewOrderToggle)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchOrders)

SearchOrders.defaultProps = {
  viewOrderToggle: false,
  setViewOrderToggle: () => {},
}

SearchOrders.propTypes = {
  viewOrderToggle: PropTypes.bool,
  setViewOrderToggle: PropTypes.func,
}
