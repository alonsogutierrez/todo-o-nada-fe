import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import PropTypes from 'prop-types'
import { Col, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import Loader from 'react-loader-spinner'

const AdminProduct = (props) => {
  const [modal1, setModal1] = useState(false)

  const toggle1 = () => {
    setModal1(!modal1)
  }

  const onDeleteInvoicePopup = () => {
    toggle1()
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { product, deleteproduct } = props

  if (product && Object.keys(product).length > 0) {
    const { picture, itemNumber, name, price, details, is_active } = product._source
    let hasInventory = false
    for (let sku in details) {
      if (details[sku].quantity > 0) {
        hasInventory = true
      }
    }
    return (
      <Col key={1} sm={6} lg={3}>
        <ToastContainer autoClose={1000} />
        <div className="product product_tag-black product-hover-style-default product-hover-button-style-light product_title_type-single_line product_icon_type-line-icon">
          <div className="product-inner element-hovered">
            <div className="product-thumbnail">
              <div className="product-thumbnail-inner">
                <Link to="#">
                  {picture ? (
                    <div className="product-thumbnail-main">
                      <img src={picture} className="img-fluid img-slider" />
                    </div>
                  ) : (
                    <>Img not found</>
                  )}
                </Link>
              </div>
              <div className="product-action product-action-quick-view">
                <Link to={`/admin-dashboard/product-edit/${itemNumber}`} className="open-edit-view">
                  <i className="fa fa-pencil-square-o"></i>
                </Link>
                <Link to="#" className="product-delete" onClick={() => onDeleteInvoicePopup()}>
                  <i className="fa fa-trash-o"></i>
                </Link>
              </div>
              <div className="product-actions"></div>
            </div>
            <div className="product-info">
              {name ? (
                <h3 className="product-name">
                  <Link to={`/admin-dashboard/product-edit/${itemNumber}`}>{name}</Link>
                </h3>
              ) : null}
              {price && price.basePriceSales ? (
                <span className="price">
                  <ins>
                    <span className="price-amount amount">
                      <span className="currency-symbol">$</span>
                      {price.basePriceSales.toLocaleString(navigator.language, {
                        minimumFractionDigits: 0,
                      })}
                    </span>
                  </ins>
                </span>
              ) : null}
              {details && Object.keys(details).length > 0 ? (
                <span className="text">
                  <ins>
                    <span className="text">
                      {hasInventory ? 'Inventario disponible' : 'Sin stock'}
                    </span>
                  </ins>
                </span>
              ) : null}
              {is_active !== true ? (
                <div>
                  <span className="text" style={{ fontWeight: 'bold' }}>
                    {'Producto oculto'}
                  </span>
                </div>
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
          <ModalBody>Estas seguro que deseas eliminar este producto ?</ModalBody>
          <ModalFooter className="justify-content-center pt-4">
            <Link className="action-button" onClick={(e) => deleteproduct(toggle1(e))}>
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

export default AdminProduct

AdminProduct.defaultProps = {
  product: {},
  deleteproduct: () => {},
}

AdminProduct.propTypes = {
  product: PropTypes.object,
  deleteproduct: PropTypes.func,
}
