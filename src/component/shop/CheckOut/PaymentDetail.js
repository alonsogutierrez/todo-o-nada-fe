import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Col, Row } from 'reactstrap'

const PaymentDetail = ({ orderData, totalShippingCarge }) => {
  const { orderNumber, paymentData, products, createdAt } = orderData
  const createdDate = new Date(createdAt).toLocaleDateString('es-CL')

  const getOrderTotal = (products, totalShippingCarge) => {
    return getOrderSubTotal(products) + parseInt(totalShippingCarge, 10)
  }

  const getOrderSubTotal = (products) => {
    let total = 0
    products.forEach((product) => {
      total += parseInt(product.quantity, 10) * parseInt(product.price.basePriceSales, 10)
    })
    return total
  }

  const isValidParams = (order) => {
    const isValid = order && Object.keys(order).length > 0
    return isValid
  }

  // const getProductImage = (product) => {
  //   const productFind = productsAPI.find((productAPI) => {
  //     return product.sku === productAPI['id']
  //   })
  //   if (productFind) {
  //     return productFind.pictures[0]
  //   }
  // }
  let user = {}
  if (!isValidParams(orderData)) {
    return <div>Cargando data...</div>
  }
  if (paymentData && Object.keys(paymentData).length > 0) {
    user = paymentData.user
  }
  const userData = user

  return (
    <div className="success-screen">
      <div className="thank-you text-center">
        <i className="fa fa-check-circle-o"></i>
        <h1 className="text-white">¡Muchas gracias {userData.firstName}!</h1>
        <span>Perfecto! Recibimos tu pago. Tu orden será procesada pronto.</span>
        <h1>
          <strong className="text-white">Nº de orden: {orderNumber}</strong>
        </h1>
      </div>
      <div className="delivery p-4 p-md-5 bg-light text-center">
        <span className="h5">Fecha estimada de llegada</span>
        <h2 className="mb-0 mt-2">Entre 3 a 5 días hábiles</h2>
      </div>
      <div className="pt-4 px-4 pt-md-5 px-md-5 pb-3">
        <Row>
          <Col lg={6}>
            <h6>Despacho a</h6>
            <ul className="list-unstyled mb-0">
              <li>
                {userData.firstName} {userData.lastName}
              </li>
              <li>{userData.address.address}</li>
              <li>{userData.address.num_address}</li>
              <li>{userData.address.country}</li>
            </ul>
          </Col>
          {products !== null && products.length > 0 ? (
            <Col lg={6} className="text-lg-right mt-4 mt-lg-0">
              <h6>Resumen</h6>
              <ul className="list-unstyled mb-0">
                <li>
                  <span>Nº de orden:</span> <strong>{orderNumber}</strong>
                </li>
                <li>
                  <span>Fecha de compra:</span> <strong>{createdDate}</strong>
                </li>
                <li>
                  <span>Totales orden:</span>{' '}
                  <strong>${getOrderTotal(products, totalShippingCarge)} </strong>
                </li>
              </ul>
            </Col>
          ) : (
            <div>No hay productos encontrados</div>
          )}
        </Row>
      </div>
      {products !== null && products.length > 0 ? (
        <div className="ordered-detail">
          <h5 className="mb-4">Los detalles de tu orden</h5>
          <div className="table-responsive">
            {products !== null && products.length > 0 ? (
              <table className="table mb-0">
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index} className="ordered-item">
                      <td className="ordered-image">
                        <img
                          alt="img 01"
                          //src={require(`../../../assets/images/${getProductImage(product)}`)}
                          src="https://funky-t-shirt.com/assets/funkytshirt/img/products/4032/image/skull-snake-illustration-tattoo-design-shirt.jpg"
                          className="img-fluid"
                        />
                      </td>
                      <td className="ordered-name">
                        <h6 className="mb-0">Producto</h6>
                        <span>{product.name}</span>
                      </td>
                      <td className="ordered-quantity">
                        <h6 className="mb-0">Cantidad</h6>
                        <span>{product.quantity}</span>
                      </td>
                      <td className="ordered-price">
                        <h6 className="mb-0">Precio</h6>
                        <span>
                          $
                          {product.price.basePriceSales.toLocaleString(navigator.language, {
                            minimumFractionDigits: 0,
                          })}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>No hay productos encontrados</div>
            )}
          </div>
          <div className="table-responsive">
            <table className="table total-table table-borderless mt-4 mb-0">
              <tbody>
                <tr>
                  <td>Subtotal</td>
                  <td className="text-right">
                    $
                    {parseFloat(getOrderSubTotal(products)).toLocaleString(navigator.language, {
                      minimumFractionDigits: 0,
                    })}
                  </td>
                </tr>
                <tr>
                  <td>Despacho</td>
                  <td className="text-right">${parseFloat(totalShippingCarge)}</td>
                </tr>
                <tr className="border-top">
                  <td>
                    <strong className="h5">Total</strong>
                  </td>
                  <td className="text-right h5">
                    <strong>
                      $
                      {getOrderTotal(products, totalShippingCarge).toLocaleString(
                        navigator.language,
                        {
                          minimumFractionDigits: 0,
                        }
                      )}
                    </strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>No hay productos encontrados</div>
      )}
      <div className="d-sm-flex px-4 pb-4 px-md-5 pb-md-5">
        <Link className="button ml-auto" to="/">
          Ir al Home
        </Link>
      </div>
    </div>
  )
}

export default PaymentDetail

PaymentDetail.defaultProps = {
  userData: {},
  orderData: {},
  totalShippingCarge: 0,
}

PaymentDetail.propTypes = {
  userData: PropTypes.object,
  orderData: PropTypes.object,
  totalShippingCarge: PropTypes.number,
}
