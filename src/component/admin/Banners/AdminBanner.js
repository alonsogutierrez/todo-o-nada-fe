import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import PropTypes from 'prop-types'
import { Col, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import Loader from 'react-loader-spinner'

const AdminBanner = (props) => {
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

  if (props.banner && Object.keys(props.banner).length > 0) {
    const { bannerNumber, images, position, isActive } = props.banner

    return (
      <Col key={1} sm={6} lg={3}>
        <ToastContainer autoClose={1000} />
        <div className="banner banner_tag-black banner-hover-style-default banner-hover-button-style-light banner_title_type-single_line banner_icon_type-line-icon">
          <div className="banner-inner element-hovered">
            <div className="banner-thumbnail">
              <div className="banner-thumbnail-inner">
                <Link to="#">
                  {images['desktop'] ? (
                    <div className="banner-thumbnail-main">
                      <img src={images['desktop']} className="img-fluid img-slider" />
                    </div>
                  ) : (
                    <>Img not found</>
                  )}
                </Link>
              </div>
              <div className="banner-action banner-action-quick-view">
                <Link
                  to={`/admin-dashboard/banners-edit/${bannerNumber}`}
                  className="open-edit-view"
                >
                  <i className="fa fa-pencil-square-o"></i>
                </Link>
                <Link to="#" className="product-delete" onClick={() => onDeleteInvoicePopup()}>
                  <i className="fa fa-trash-o"></i>
                </Link>
              </div>
              <div className="banner-actions"></div>
            </div>
            <div className="banner-info">
              {bannerNumber ? (
                <span className="banner-name">
                  Numero:
                  <Link to={`/admin-dashboard/banners-edit/${bannerNumber}`}>{bannerNumber}</Link>
                </span>
              ) : null}
            </div>
            <div className="banner-info">
              {position ? (
                <span className="banner-name">
                  Posición:
                  <Link to={`/admin-dashboard/banners-edit/${bannerNumber}`}>{position}</Link>
                </span>
              ) : null}
            </div>
            <div className="banner-info">
              {isActive ? (
                <span className="banner-name">Visible</span>
              ) : (
                <h5 className="banner-name">Oculto</h5>
              )}
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
          <ModalBody>Estas seguro que deseas eliminar este banner ?</ModalBody>
          <ModalFooter className="justify-content-center pt-4">
            <Link className="action-button" onClick={(e) => toggle1(e)}>
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

export default AdminBanner

AdminBanner.defaultProps = {
  banner: {},
  deletebanner: () => {},
}

AdminBanner.propTypes = {
  banner: PropTypes.object,
  deletebanner: PropTypes.func,
}
