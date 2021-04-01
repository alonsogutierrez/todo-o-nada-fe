import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { Col, Row, Container, Navbar, NavbarToggler, Collapse, Nav, NavItem } from 'reactstrap'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

//TODO: Get navLinks from BFF
import navLinks from '../../../../NavLinks'
import HeaderNavLinks from './HeaderNavLinks'
import LogoWrapper from '../LogoWrapper'
import ShoppingCart from './ShoppingCart'
import EmptyShoppingCart from './EmptyShoppingCart'
import SearchBar from './SearchBar'

const HeaderMain = ({ changeCart }) => {
  const [productsCartItems, setProductsCartItems] = useState([])
  const [cartHide, setCartHide] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [classset] = useState('')

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const readCartItems = () => {
    return productsCartItems === null ? [] : productsCartItems
  }

  const showCart = () => {
    if (cartHide === true) {
      var elm = document.getElementById('DivCartContent')
      if (elm !== null) {
        document.getElementById('DivCartContent').setAttribute('style', 'display:block')
        setCartHide(false)
      }
    }
  }

  useEffect(() => {
    setProductsCartItems(JSON.parse(localStorage.getItem('LocalCartItems')))
  }, [changeCart])

  const pathnames = document.location.href
  const pathArray = pathnames.split('/')
  const pageName = '/' + pathArray[pathArray.length - 1]
  const cartItems = readCartItems()
  const isItemsInCart = cartItems.length > 0
  const urlRedirectShoppingCart = !isItemsInCart ? '#' : '/shopping-cart'

  return (
    <Fragment>
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
                          <div className="col-12">
                            <div className="primary-nav">
                              <div className="primary-nav-wrapper">
                                <nav className="mega-menu">
                                  <div className="menu-list-items">
                                    <Navbar light expand="md" className="front_menu">
                                      <NavbarToggler onClick={() => toggle()} />
                                      <Collapse isOpen={isOpen} navbar>
                                        <SearchBar />
                                      </Collapse>
                                    </Navbar>
                                    <Navbar light expand="md" className="front_menu">
                                      <NavbarToggler onClick={() => toggle()} />
                                      <Collapse isOpen={isOpen} navbar>
                                        <HeaderNavLinks navLinks={navLinks} pageName={pageName} />
                                      </Collapse>
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
                <Navbar color="faded" light>
                  <NavbarToggler onClick={toggle} className="mr-2" />
                  <Collapse isOpen={!isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                      {navLinks.map((navLink, index) => (
                        <li
                          key={index}
                          className={`nav-item ${classset === navLink.menu_title ? 'show' : ''}`}
                        >
                          {navLink.type && navLink.type === 'subMenu' ? (
                            <Fragment>
                              <Link
                                href="#"
                                className="nav-link"
                                onClick={() => this.onClickClassAdd(navLink.menu_title)}
                              >
                                {navLink.menu_title}
                              </Link>
                              <ul
                                className={
                                  classset === navLink.menu_title ? 'showcollapsed' : 'submenu'
                                }
                              >
                                {navLink.child_routes &&
                                  navLink.child_routes.map((subNavLink, index) => (
                                    <li
                                      key={index}
                                      className={`nav-item  ${
                                        pageName == subNavLink.path ? 'active' : ''
                                      }`}
                                      toggle={false}
                                    >
                                      <Link
                                        className="nav-link"
                                        onClick={() => this.closeNavbar()}
                                        to={subNavLink.path}
                                      >
                                        {subNavLink.menu_title}
                                      </Link>
                                    </li>
                                  ))}
                              </ul>
                            </Fragment>
                          ) : (
                            <Fragment>
                              <NavItem>
                                <Link to={navLink.path} className="nav-admin-link">
                                  {navLink.menu_title}
                                </Link>
                              </NavItem>
                            </Fragment>
                          )}
                        </li>
                      ))}
                    </Nav>
                  </Collapse>
                </Navbar>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  changeCart: state.changeCartDataReducer.changeCartData,
})

export default connect(mapStateToProps)(HeaderMain)

HeaderMain.defaultProps = {
  changeCart: false,
}

HeaderMain.propTypes = {
  changeCart: PropTypes.bool,
}
