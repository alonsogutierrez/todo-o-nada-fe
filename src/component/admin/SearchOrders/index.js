import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ReactTable from 'react-table'
import { Col, Container, Row } from 'reactstrap'
import invoice from '../../../api/invoice'

import OrderDetailModal from './OrderDetailModal'

class SearchOrders extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      dropdownOpen: false,
      isOpen: false,
      invoices: invoice,
      searchProduct: '',
      invoiceview: '',
      orderData: {
        __v: 0,
        _id: {
          $oid: '6044eb64a53ff53f436159b6',
        },
        createdAt: {
          $date: '2021-03-07T15:04:04.830Z',
        },
        inventoryState: {
          confirmed: {
            products: [],
          },
          reserved: {
            products: [],
          },
        },
        orderNumber: 78,
        paymentData: {
          state: 'created',
          transaction: {
            date: {
              $date: '2021-03-07T15:04:04.441Z',
            },
            shipping: 1000,
            subTotal: 1030,
          },
          user: {
            address: {
              address: 'Exequiel Fernandez 1575',
              city: 'Región Metropolitana de Santiago',
              commune: 'Cerrillos',
              country: 'Chile',
              num_address: 'depto 906',
              zip_code: '',
            },
            email: 'alonso.gutierrez@mail.udp.cl',
            firstName: 'Alonso',
            lastName: 'Gutierrez',
            phone: '989370610',
          },
        },
        products: [
          {
            _id: {
              $oid: '6044eb64a53ff53f436159b7',
            },
            itemNumber: 0,
            name: "Women's Cozy Leisure Top",
            prices: [
              {
                _id: {
                  $oid: '6044eb64a53ff53f436159b8',
                },
                basePriceReference: 500,
                basePriceSales: 500,
                discount: 0,
              },
            ],
            quantity: 1,
            sku: 3,
          },
          {
            _id: {
              $oid: '6044eb64a53ff53f436159b9',
            },
            itemNumber: 0,
            name: 'La-ta-da Boho Chic Head Wrap',
            prices: [
              {
                _id: {
                  $oid: '6044eb64a53ff53f436159ba',
                },
                basePriceReference: 330,
                basePriceSales: 165,
                discount: 50,
              },
            ],
            quantity: 2,
            sku: 2,
          },
          {
            _id: {
              $oid: '6044eb64a53ff53f436159bb',
            },
            itemNumber: 0,
            name: "Women's Crochet Shoulder Chevron Sweatshirt",
            prices: [
              {
                _id: {
                  $oid: '6044eb64a53ff53f436159bc',
                },
                basePriceReference: 580,
                basePriceSales: 200,
                discount: 380,
              },
            ],
            quantity: 1,
            sku: 4,
          },
        ],
        updatedAt: {
          $date: '2021-03-07T15:04:04.830Z',
        },
      },
      userData: {},
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    })
  }

  //TODO: Call to order API, and set userData and orderData from order
  onSearchProduct(searchText) {
    if (searchText === '') {
      this.setState({
        invoices: invoice,
        searchProduct: searchText,
      })
    } else {
      let SearchBuyer = invoice.filter((invo) => {
        if (searchText === searchText.toLowerCase()) {
          let buyer = invo.buyer.toLowerCase().indexOf(searchText.toLowerCase()) > -1
          return buyer
        } else {
          let buyer = invo.buyer.toUpperCase().indexOf(searchText.toUpperCase()) > -1
          return buyer
        }
      })
      this.setState({
        searchProduct: searchText,
        invoices: SearchBuyer,
      })
    }
  }

  onViewInvoicePopup(data) {
    this.setState({
      invoiceview: data,
    })
    this.toggle()
  }

  componentDidMount() {
    //TODO: Call to BFF to get orders paid
    this.setState({
      userData: this.state.orderData.paymentData.user,
    })
    window.scrollTo(0, 0)
  }

  render() {
    const columns = [
      {
        maxWidth: 75,
        Header: 'No.',
        accessor: 'id',
      },
      {
        sortable: false,
        Header: 'Transaction Id',
        accessor: 'invoiceid',
      },
      {
        minWidth: 160,
        Header: 'Buyer',
        accessor: 'buyer',
      },
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Payment',
        accessor: 'payment',
      },
      {
        Header: 'Price',
        accessor: 'price',
      },
      {
        Header: 'Debit',
        accessor: 'debit',
      },
      {
        Header: 'Action',
        accessor: 'action',
        Cell: (props) => {
          return (
            <div>
              <Link className="view-button" onClick={() => this.onViewInvoicePopup(props.original)}>
                {' '}
                View <i className="fa fa-eye pl-2"></i>
              </Link>
            </div>
          )
        },
      },
    ]

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
                        value={this.state.searchProduct}
                        onChange={(e) => this.onSearchProduct(e.target.value)}
                      ></input>
                    </div>
                  </form>
                </div>
                <ReactTable
                  className="invoices-table"
                  data={this.state.invoices}
                  columns={columns}
                  minRows={1}
                  defaultPageSize={5}
                />
                {/* modal-view */}
                <OrderDetailModal
                  userData={this.state.userData}
                  orderData={this.state.orderData}
                  openModal={this.state.modal}
                  setToggle={this.toggle}
                />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}
export default SearchOrders
