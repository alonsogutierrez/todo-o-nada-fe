import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Col, Row, Navbar, Container } from 'reactstrap'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import ClientAPI from './../../../../common/ClientAPI'
import LogoWrapper from './../LogoWrapper'
import HeaderNavLinks from './HeaderNavLinks'
import SearchBar from './SearchBar'
import ShoppingCart from './ShoppingCart'
import EmptyShoppingCart from './EmptyShoppingCart'

const DesktopHeaderMain = ({ changeCart }) => {
  const [navLinks, setNavLinks] = useState([])
  const [cartHide, setCartHide] = useState(true)
  const [productsCartItems, setProductsCartItems] = useState([])

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
  }, [changeCart])

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
                <div className="col" id="mainMenu">
                  <div className="header-nav header-nav-bg-color-default">
                    <div className="header-nav-wrapper">
                      <Container>
                        <Row>
                          <SearchBar />
                        </Row>
                      </Container>
                    </div>
                  </div>
                </div>
                <Col xl={2} lg={2} className="col-6">
                  <div className="header-nav-right-wrapper">
                    <div className="ciya-tools">
                      <div className="ciya-tools-wrapper">
                        <ul className="ciya-tools-actions">
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
              </div>
              <Row>
                <Col lg={12}>
                  <div className="col" id="mainMenu">
                    <div className="header-nav header-nav-bg-color-default">
                      <div className="header-nav-wrapper">
                        <Container>
                          <Row>
                            <div className="col-12">
                              <div className="primary-nav">
                                <div className="primary-nav-wrapper">
                                  <nav className="mega-menu">
                                    <div className="menu-list-items">
                                      <Navbar light expand="md" className="front_menu">
                                        <HeaderNavLinks navLinks={navLinks} pageName={pageName} />
                                      </Navbar>
                                    </div>
                                  </nav>
                                </div>
                              </div>
                            </div>
                          </Row>
                        </Container>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
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

export default connect(mapStateToProps, null)(DesktopHeaderMain)

DesktopHeaderMain.defaultProps = {
  changeCart: false,
}

DesktopHeaderMain.propTypes = {
  changeCart: PropTypes.bool,
}
