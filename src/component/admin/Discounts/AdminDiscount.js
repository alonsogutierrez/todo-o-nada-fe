import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import PropTypes from 'prop-types'
import { Col, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import Loader from 'react-loader-spinner'

const AdminDiscountList = (props) => {
  const [modal1, setModal1] = useState(false)

  const toggle1 = () => {
    setModal1(!modal1)
  }

  /*const onDeleteInvoicePopup = () => {
    toggle1()
  }*/

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { discount, deletediscount } = props

  if (discount && Object.keys(discount).length > 0) {
    const { code, isPercentual, amount, expireDate, isActive, createdAt } = discount

    return (
      <Col key={1} sm={6} lg={3}>
        <ToastContainer autoClose={1000} />
        <div className="product product_tag-black product-hover-style-default product-hover-button-style-light product_title_type-single_line product_icon_type-line-icon">
          <div className="product-inner element-hovered">
            <div className="product-info">
              <img
                className="img-fluid"
                src={require(`./../../../assets/images/Discount-Coupons.jpg`).default}
              />
              {code ? (
                <h3 className="product-name">
                  <Link to={`/admin-dashboard/discount-edit/${code}`}>{code}</Link>
                </h3>
              ) : null}
              <span className="price">
                <ins>
                  <span className="">{isPercentual ? 'Descuento en %' : 'Descuento en $'}</span>
                </ins>
              </span>
              {amount ? (
                <span className="price">
                  <ins>
                    <span className="">{isPercentual ? '%' + amount : '$' + amount}</span>
                  </ins>
                </span>
              ) : null}
              {createdAt ? (
                <span className="price">
                  <ins>
                    <span className="">
                      {createdAt
                        ? `Fecha de inicio: ${new Date(createdAt).toLocaleDateString()}`
                        : ''}
                    </span>
                  </ins>
                </span>
              ) : null}
              {expireDate ? (
                <span className="price">
                  <ins>
                    <span className="">
                      {expireDate
                        ? `Fecha de término: ${new Date(expireDate).toLocaleDateString()}`
                        : ''}
                    </span>
                  </ins>
                </span>
              ) : null}
              {isActive ? (
                <span className="price">
                  <ins>
                    <span className="price-amount amount">
                      {isActive ? 'Activo' : 'Desactivado'}
                    </span>
                  </ins>
                </span>
              ) : null}
            </div>
          </div>
        </div>

        {/* modal-delete */}
        <Modal
          isOpen={modal1}
          toggle={toggle1}
          className="modal-delete modal-lg modal-dialog-centered"
        >
          <ModalHeader toggle={toggle1}></ModalHeader>
          <ModalBody>Estas seguro que deseas eliminar este descuento ?</ModalBody>
          <ModalFooter className="justify-content-center pt-4">
            <Link className="action-button" onClick={(e) => deletediscount(toggle1(e))}>
              Si
            </Link>
            <Link className="action-button no" onClick={toggle1}>
              No
            </Link>
          </ModalFooter>
        </Modal>
      </Col>
    )
  }
  return (
    <>
      <div>
        <Loader type="Puff" color="#04d39f" height="100" width="100" />
      </div>
    </>
  )
}

export default AdminDiscountList

AdminDiscountList.defaultProps = {
  discount: {},
  deletediscount: () => {},
}

AdminDiscountList.propTypes = {
  discount: PropTypes.object,
  deletediscount: PropTypes.func,
}
