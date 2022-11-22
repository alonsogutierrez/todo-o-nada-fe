import React, { useState, useEffect } from 'react'
import { Input, Row, Col } from 'reactstrap'

const PaymentMethods = () => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  const renderDesktopScreen = () => {
    return (
      <>
        <Row>
          <Col xs={2}>Pagos</Col>
          <Col xs={10}>
            <Row>
              <Col>
                <img src={require(`./../../../assets/images/logo_onepay.png`)} alt="OnePay" />
              </Col>
              <Col>
                <img src={require(`./../../../assets/images/logo_mach.png`)} alt="MACH" />
              </Col>
              <Col>
                <img src={require(`./../../../assets/images/logo_webpay.png`)} alt="WebPay" />
              </Col>
              <Col>
                <img src={require(`./../../../assets/images/BP_Servipag_peq.png`)} alt="WebPay" />
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    )
  }

  const renderMobileScreen = () => {
    return (
      <>
        <Row>
          <Col xs={3}>Pagos</Col>
          <Col xs={9}>
            <Row>
              <img src={require(`./../../../assets/images/logo_onepay.png`)} alt="OnePay" />
            </Row>
            <Row>
              <img src={require(`./../../../assets/images/logo_mach.png`)} alt="MACH" />
            </Row>
            <Row>
              <img src={require(`./../../../assets/images/logo_webpay.png`)} alt="WebPay" />
            </Row>
            <Row>
              <img src={require(`./../../../assets/images/BP_Servipag_peq.png`)} alt="WebPay" />
            </Row>
          </Col>
        </Row>
      </>
    )
  }

  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize, false)
  }, [])

  const isMobileScreen = dimensions.width < 500

  return (
    <>
      <div id="payment" className="checkout-payment">
        <ul className="payment_methods methods">
          <li className="payment_method_paypal">
            <Row>
              <Col xs={1}>
                <input
                  id="payment_method_paypal"
                  type="radio"
                  checked
                  className="input-radio"
                  name="payment_method"
                  value="paypal"
                  data-order_button_text="Proceed to PayPal"
                />
              </Col>
              <Col xs={11}>{isMobileScreen ? renderMobileScreen() : renderDesktopScreen()}</Col>
            </Row>
          </li>
        </ul>
        <div className="form-row place-order">
          <div className="terms-and-conditions-wrapper">
            <div className="privacy-policy-text">
              <p>
                Tus datos personales seran usados para procesar tu orden, y para ayudar en caso de
                cualquier duda con la compra.
              </p>
            </div>
            <p className="form-row validate-required ml-5">
              <label className="form__label form__label-for-checkbox checkbox">
                <Input
                  checked
                  enabled
                  type="checkbox"
                  className="form__input form__input-checkbox input-checkbox"
                  name="terms"
                  id="terms"
                />
                <span className="terms-and-conditions-checkbox-text">
                  He leído los términos y condiciones del sitio
                </span>
                &nbsp;<span className="required">*</span>
              </label>
              <Input type="hidden" name="terms-field" value="1" />
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default PaymentMethods
