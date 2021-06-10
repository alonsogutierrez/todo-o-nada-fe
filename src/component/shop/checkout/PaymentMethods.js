import React from 'react'
import { Input } from 'reactstrap'

const PaymentMethods = () => {
  return (
    <>
      <div id="payment" className="checkout-payment">
        <ul className="payment_methods methods">
          <li className="payment_method_paypal">
            <input
              id="payment_method_paypal"
              type="radio"
              checked
              enabled
              className="input-radio"
              name="payment_method"
              value="paypal"
              data-order_button_text="Proceed to PayPal"
            />
            <label htmlFor="payment_method_paypal">
              Tranferencia{' '}
              <img
                src="https://www.paypalobjects.com/webstatic/mktg/logo/AM_mc_vs_dc_ae.jpg"
                alt="PayPal acceptance mark"
              />
            </label>
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
