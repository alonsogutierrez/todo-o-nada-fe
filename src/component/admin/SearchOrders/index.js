import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ReactTable from 'react-table'
import { Col, Container, Row } from 'reactstrap'
import { format } from 'date-fns'

import OrderDetailModal from './OrderDetailModal'
import ClientAPI from '../../../common/ClientAPI'

class SearchOrders extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      invoices: [],
      searchText: '',
      orderData: {},
      userData: {},
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    })
  }

  onSearchOrder(orderNumber) {
    this.setState(
      {
        searchText: orderNumber,
      },
      async () => {
        if (orderNumber != '') {
          const clientAPI = new ClientAPI()
          try {
            const orderDataAPIResponse = await clientAPI.getOrderByOrderNumber(orderNumber)
            if (orderDataAPIResponse && Object.keys(orderDataAPIResponse).length > 0) {
              const { orderNumber, paymentData, createdAt } = orderDataAPIResponse
              const userData = paymentData.user
              const clientNames = userData.firstName + ' ' + userData.lastName
              let orderDataTableResponse = {
                orderNumber,
                clientNames,
                createdAt: format(new Date(createdAt), 'yyyy-MM-dd'),
                orderStatus: paymentData.state,
                paymentType: 'Webpay', //TODO: Change by real payment channel
                totalPrice: paymentData.transaction.subTotal + paymentData.transaction.shipping,
              }
              this.setState({
                userData,
                orderData: orderDataAPIResponse[0],
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
    )
  }

  onViewInvoicePopup() {
    this.toggle()
  }

  isEmptyUserData(userData) {
    return Object.entries(userData).length > 0
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    const columns = [
      {
        maxWidth: 75,
        Header: 'Nº orden',
        accessor: 'orderNumber',
      },
      {
        minWidth: 160,
        Header: 'Cliente',
        accessor: 'clientNames',
      },
      {
        Header: 'Fecha compra',
        accessor: 'createdAt',
      },
      {
        Header: 'Estado',
        accessor: 'orderStatus',
      },
      {
        Header: 'Tipo de pago',
        accessor: 'paymentType',
      },
      {
        Header: 'Total',
        accessor: 'totalPrice',
      },
      {
        Header: 'Acciones',
        accessor: 'action',
        Cell: (props) => {
          return (
            <div>
              <Link className="view-button" onClick={() => this.onViewInvoicePopup(props.original)}>
                {' '}
                Ver <i className="fa fa-eye pl-2"></i>
              </Link>
            </div>
          )
        },
      },
    ]
    const { searchText, userData, orderData, invoices, modal } = this.state

    return (
      <div>
        <div className="section-ptb">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="mb-0">
                  <h4>Lista de ordenes</h4>
                </div>
                <div className="mb-4">
                  <form>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Buscador de ordenes"
                        value={searchText}
                        onChange={(e) => this.onSearchOrder(e.target.value)}
                      ></input>
                    </div>
                  </form>
                </div>
                <ReactTable
                  className="invoices-table"
                  data={invoices}
                  columns={columns}
                  minRows={1}
                  defaultPageSize={5}
                />
                {/* modal-view */}
                {this.isEmptyUserData(userData) ? (
                  <OrderDetailModal
                    userData={userData}
                    orderData={orderData}
                    openModal={modal}
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
export default SearchOrders
