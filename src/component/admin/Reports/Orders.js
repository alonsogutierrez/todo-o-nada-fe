import React, { Component } from 'react'
import ClientAPI from '../../../common/ClientAPI.js'
import { format } from 'date-fns'
import PropTypes from 'prop-types'

class Orders extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: [],
    }
  }

  async componentDidMount() {
    const { paymentType } = this.props
    const clientAPI = new ClientAPI()
    const ordersResponse = await clientAPI.getOrders(paymentType)
    this.setState({
      orders: ordersResponse,
    })
  }

  render() {
    const { orders } = this.state
    const { paymentType } = this.props
    const messagePaymentType = paymentType === 'paid' ? 'pagadas' : 'creadas'
    return (
      <div
        className="tab-pane fade show active"
        id="transaction-list"
        role="tabpanel"
        aria-labelledby="transaction-list-tab"
      >
        <h4>Últimas 10 ordenes {messagePaymentType}</h4>
        <div className="table-responsive">
          <table className="table table-striped mb-0">
            <thead>
              <tr>
                <th scope="col">Nº orden</th>
                <th scope="col">Fecha creación</th>
                <th scope="col">Cliente</th>
                <th scope="col">Email</th>
                <th scope="col">Subtotal</th>
                <th scope="col">Despacho</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.orderNumber}</td>
                  <td>{format(new Date(order.createdAt), 'yyyy-MM-dd')}</td>
                  <td>
                    {order.paymentData.user.firstName + ' ' + order.paymentData.user.lastName}
                  </td>
                  <td>{order.paymentData.user.email}</td>
                  <td>{order.paymentData.transaction.subTotal}</td>
                  <td>{order.paymentData.transaction.shipping}</td>
                  <td>
                    {order.paymentData.transaction.subTotal +
                      order.paymentData.transaction.shipping}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Orders

Orders.defaultProps = {
  paymentType: '',
}

Orders.propTypes = {
  paymentType: PropTypes.string,
}
