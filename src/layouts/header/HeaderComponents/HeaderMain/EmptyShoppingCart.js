import React from 'react'

const EmptyShoppingCart = () => {
  const getEmptyCartImage = () => {
    return require(`./../../../../assets/images/empty-cart.png`).default
  }

  return (
    <>
      <div className="cart-contents" id="DivCartContent">
        <div className="widget ciyashop widget-shopping-cart">
          <div className="widget-shopping-cart-content">
            <p className="ciyashop-mini-cart__total total">
              <img src={getEmptyCartImage()} className="img-fluid mr-3" />
              <strong>Tu carrito esta vacío.</strong>{' '}
              <span className="woocs_special_price_code">
                <span className="ciyashop-Price-amount amount">
                  <span className="ciyashop-Price-currencySymbol"></span>{' '}
                </span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default EmptyShoppingCart
