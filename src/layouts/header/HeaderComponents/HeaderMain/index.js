import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { Col, Row, Navbar, NavbarToggler, Collapse, Container, Nav, NavItem } from 'reactstrap'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import ClientAPI from './../../../../common/ClientAPI'
import HeaderNavLinks from './HeaderNavLinks'
import LogoWrapper from './../LogoWrapper'
import ShoppingCart from './ShoppingCart'
import EmptyShoppingCart from './EmptyShoppingCart'
import SearchBar from './SearchBar'

const HeaderMain = ({ changeCart }) => {
  const [productsCartItems, setProductsCartItems] = useState([])
  const [cartHide, setCartHide] = useState(true)
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [isOpenSearchBar, setIsOpenSearchBar] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)
  const [classset] = useState('')
  const [navLinks, setNavLinks] = useState([])

  const toggle = () => {
    setIsOpenMenu(!isOpenMenu)
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

  const updateDimensions = () => {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    const getCategoriesNavLinks = async () => {
      const categoriesResponse = await new ClientAPI().getCategories()
      setNavLinks(categoriesResponse)
    }
    getCategoriesNavLinks()
    setProductsCartItems(JSON.parse(localStorage.getItem('LocalCartItems')))
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [changeCart, isOpenMenu])

  const pathnames = document.location.href
  const pathArray = pathnames.split('/')
  const pageName = '/' + pathArray[pathArray.length - 1]
  const cartItems = readCartItems()
  const isItemsInCart = cartItems.length > 0
  const urlRedirectShoppingCart = !isItemsInCart ? '#' : '/shopping-cart'
  const isDesktopScreen = width >= 992

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
                          {width < 992 && (
                            <li className="ciya-tools-action ciya-tools-search">
                              <i
                                style={{ cursor: 'pointer' }}
                                className="glyph-icon pgsicon-ecommerce-magnifying-glass"
                                onClick={() => setIsOpenSearchBar(!isOpenSearchBar)}
                              />
                            </li>
                          )}
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
                  {isOpenMenu && !isDesktopScreen && (
                    <HeaderNavLinks navLinks={navLinks} pageName={pageName} toggle={toggle} />
                  )}
                  {isOpenMenu && isDesktopScreen && (
                    <Nav className="ml-auto" navbar>
                      {navLinks.map((navLink, index) => (
                        <li
                          key={index}
                          className={`nav-item ${classset === navLink.menu_title ? 'show' : ''}`}
                        >
                          {navLink.type && navLink.type === 'subMenu' ? (
                            <>
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
                            </>
                          ) : (
                            <>
                              <NavItem>
                                <Link to={navLink.path} className="nav-admin-link">
                                  {navLink.menu_title}
                                </Link>
                              </NavItem>
                            </>
                          )}
                        </li>
                      ))}
                    </Nav>
                  )}
                </Navbar>
              </div>
              {isOpenSearchBar && !isDesktopScreen && (
                <Row style={{ marginBottom: '5px', marginTop: '-10px' }}>
                  <SearchBar />
                </Row>
              )}
              {isDesktopScreen && (
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
                                          <NavbarToggler onClick={() => toggle()} />
                                          <Collapse isOpen={isOpenMenu} navbar>
                                            <HeaderNavLinks
                                              navLinks={navLinks}
                                              pageName={pageName}
                                            />
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
                  </Col>
                </Row>
              )}
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
