import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Col, Row, Navbar, NavbarToggler } from 'reactstrap'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import ClientAPI from './../../../../common/ClientAPI'

import LogoWrapper from './../LogoWrapper'
import HeaderNavLinks from './HeaderNavLinks'
import SearchBar from './SearchBar'
import ShoppingCart from './ShoppingCart'
import EmptyShoppingCart from './EmptyShoppingCart'

const MobileHeaderMain = ({ changeCart }) => {
  const [isOpenSearchBar, setIsOpenSearchBar] = useState(false)
  const [cartHide, setCartHide] = useState(true)
  const [productsCartItems, setProductsCartItems] = useState([])
  const [navLinks, setNavLinks] = useState([])
  const [isNavLinksMenuOpen, setIsNavLinksMenuOpen] = useState(false)

  const toggleNavLinks = () => {
    setIsNavLinksMenuOpen(!isNavLinksMenuOpen)
  }

  const readCartItems = () => {
    return productsCartItems === null ? [] : productsCartItems
  }

  const showCart = () => {
    if (cartHide) {
      const divCartElement = document.getElementById('DivCartContent')
      if (divCartElement !== null) {
        document.getElementById('DivCartContent').setAttribute('style', 'display:block')
        setCartHide(false)
      }
    }
  }

  useEffect(() => {
    const getCategoriesNavLinks = async () => {
      const categoriesNavLinksResponse = await new ClientAPI().getCategoriesNavLinks()
      setNavLinks(categoriesNavLinksResponse)
    }
    getCategoriesNavLinks()
    setProductsCartItems(JSON.parse(localStorage.getItem('LocalCartItems')))
  }, [changeCart, isNavLinksMenuOpen])

  const pathnames = document.location.href
  const pathArray = pathnames.split('/')
  const pageName = '/' + pathArray[pathArray.length - 1]

  const cartItems = readCartItems()
  const isItemsInCart = cartItems.length > 0
  const urlRedirectShoppingCart = !isItemsInCart ? '#' : '/shopping-cart'

  return (
    <>
      <div className="header-main header-main-bg-color-default">
        <div className="container-fluid">
          <Row>
            <Col lg={12}>
              <div className="row align-items-center justify-content-md-center">
                <Col xl={2} lg={2} className="col-6">
                  <LogoWrapper />
                </Col>
                <Col xl={2} lg={2} className="col-6">
                  <div className="header-nav-right-wrapper">
                    <div className="ciya-tools">
                      <div className="ciya-tools-wrapper">
                        <ul className="ciya-tools-actions">
                          <li className="ciya-tools-action ciya-tools-search">
                            <i
                              style={{ cursor: 'pointer' }}
                              className="glyph-icon pgsicon-ecommerce-magnifying-glass"
                              onClick={() => setIsOpenSearchBar(!isOpenSearchBar)}
                            />
                          </li>
                          <li className="ciya-tools-action ciya-tools-cart">
                            <Link
                              className="cart-link"
                              to={urlRedirectShoppingCart}
                              onClick={() => showCart()}
                            >
                              <span className="cart-icon">
                                <i className="glyph-icon pgsicon-ecommerce-empty-shopping-cart" />
                              </span>
                              <span className="cart-count count"> {cartItems.length} </span>
                            </Link>

                            {isItemsInCart ? (
                              <ShoppingCart cartItems={cartItems} />
                            ) : (
                              <EmptyShoppingCart />
                            )}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </Col>
                <Navbar color="faded" light>
                  <NavbarToggler onClick={toggleNavLinks} className="mr-2" />
                  {isNavLinksMenuOpen && (
                    <HeaderNavLinks
                      navLinks={navLinks}
                      pageName={pageName}
                      toggleNavLinks={toggleNavLinks}
                    />
                  )}
                </Navbar>
              </div>
              {isOpenSearchBar && (
                <Row style={{ marginBottom: '5px', marginTop: '-10px' }}>
                  <SearchBar />
                </Row>
              )}
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  changeCart: state.changeCartDataReducer.changeCartData,
})
export default connect(mapStateToProps, null)(MobileHeaderMain)

MobileHeaderMain.defaultProps = {
  changeCart: false,
}

MobileHeaderMain.propTypes = {
  changeCart: PropTypes.bool,
}
