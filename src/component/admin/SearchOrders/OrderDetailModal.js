import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

import PaymentDetail from '../../shop/checkout/PaymentDetail'

const OrderDetailModal = ({ userData, orderData, openModal, setToggle }) => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [closeModal, setCloseModal] = useState(openModal)
  const [totalShippingCarge, setTotalShippingCarge] = useState(0)

  const handleCloseModal = () => {
    setCloseModal(true)
    setToggle(false)
    setIsOpenModal(false)
  }

  useEffect(() => {
    setIsOpenModal(openModal)
    if (openModal) {
      setCloseModal(false)
    }
    const { paymentData } = orderData
    setTotalShippingCarge(paymentData.transaction.shipping)
  }, [openModal, closeModal])

  return (
    <>
      <Modal
        isOpen={isOpenModal && !closeModal}
        toogle={handleCloseModal}
        className="modal-view modal-lg modal-dialog-centered"
      >
        <ModalHeader toggle={handleCloseModal}></ModalHeader>

        <ModalBody>
          <PaymentDetail
            orderData={orderData}
            userData={userData}
            totalShippingCarge={totalShippingCarge}
          ></PaymentDetail>
        </ModalBody>
      </Modal>
    </>
  )
}

export default OrderDetailModal

OrderDetailModal.defaultProps = {
  openModal: false,
  setToggle: () => {},
  userData: {},
  orderData: {},
}

OrderDetailModal.propTypes = {
  openModal: PropTypes.bool,
  setToggle: PropTypes.func,
  userData: PropTypes.object,
  orderData: PropTypes.object,
}
