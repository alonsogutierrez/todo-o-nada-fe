import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import {
  Col,
  Row,
  Container,
  Navbar,
  NavbarToggler,
  Collapse,
  Nav,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  NavItem,
} from 'reactstrap'
import { Link, NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

import navLinks from '../../../../NavLinks'
import LogoWrapper from '../LogoWrapper'

const getSearchName = (pageName) => {
  switch (pageName) {
    case '/todo-o-nada':
      return '/todo-o-nada'
    case '/irezumi-art':
      return '/irezumi-art'
    case '/hombres':
      return '/hombres'
    case '/mujeres':
      return '/mujeres'
    default:
      return '/niños'
  }
}

const HeaderMain = ({ productsCart, changeCart }) => {
  const [productsCartItems, setProductsCartItems] = useState(productsCart)
  const [cartHide, setCartHide] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [classset] = useState('')

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const readCartItems = () => {
    const itemsInCart = productsCartItems
    return itemsInCart
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

  const openSubMenuOpen = (id) => {
    var elm = document.getElementById(id)
    if (elm !== null) {
      document.getElementById(id).setAttribute('class', 'dropdown-menu dropdown-menu-right show')
    }
  }

  const openSubMenuClose = (id) => {
    var elm = document.getElementById(id)
    if (elm !== null) {
      document.getElementById(id).setAttribute('class', 'dropdown-menu dropdown-menu-right')
    }
  }

  const renderHeaderNavLinks = (pageName) => {
    return navLinks.map((navLink, index) => (
      <Nav className="ml-auto" navbar key={index}>
        {navLink.type && navLink.type === 'subMenu' ? (
          <Fragment>
            <UncontrolledDropdown
              nav
              inNavbar
              onMouseEnter={() => openSubMenuOpen(`submenu_${index}`)}
              onMouseLeave={() => openSubMenuClose(`submenu_${index}`)}
            >
              <Link
                aria-haspopup="true"
                to={navLink.path}
                className="dropdown-toggle nav-link"
                aria-expanded="true"
              >
                {' '}
                {navLink.menu_title}
              </Link>
              <DropdownMenu right id={`submenu_${index}`}>
                {navLink.child_routes &&
                  navLink.child_routes.map((subNavLink, index) => (
                    <DropdownItem
                      key={index}
                      tag={Link}
                      className={`nav-item  ${
                        pageName == subNavLink.path ||
                        (subNavLink.path == '/shop/clothing/29' && pageName == '/29')
                          ? 'active'
                          : ''
                      }`}
                      to={subNavLink.path}
                    >
                      {subNavLink.menu_title}
                    </DropdownItem>
                  ))}
              </DropdownMenu>
            </UncontrolledDropdown>
          </Fragment>
        ) : (
          <Fragment>
            <NavItem>
              <NavLink className="nav-link" to={`${navLink.path}`}>
                {navLink.menu_title}
              </NavLink>
            </NavItem>
          </Fragment>
        )}
      </Nav>
    ))
  }

  useEffect(() => {
    setProductsCartItems(productsCart)
  }, [changeCart])
  
  const pathnames = document.location.href
  const pathArray = pathnames.split('/')
  const pageName = '/' + pathArray[pathArray.length - 1]
  const searchName = getSearchName(pageName)
  const itemsInCart = readCartItems()
  const isItemsInCart = itemsInCart.length > 0
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
                                        {renderHeaderNavLinks(pageName)}
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
                              <span className="cart-count count">
                                {' '}
                                {itemsInCart.length}
                                {' '}
                              </span>
                            </Link>

                            {isItemsInCart ? (
                              <div className="cart-contents" id="DivCartContent">
                                <div className="widget ciyashop widget-shopping-cart">
                                  <div className="widget-shopping-cart-content">
                                    <div className="pgs-product-list-widget-container has-scrollbar">
                                      <ul className="ciyashop-mini-cart cart-list">
                                        {itemsInCart.map((CartItem, index) => (
                                          <li className="ciya-mini-cart-item" key={index}>
                                            <Link
                                              onClick={() => this.removeFromCart(index)}
                                              id={`Product_${CartItem.ProductID}`}
                                              className="remove remove_from_cart_button"
                                            >
                                              ×
                                            </Link>
                                            <div className="media">
                                              <Link to="#">
                                                <img
                                                  width={60}
                                                  height={76}
                                                  src={require(`../../../../assets/images/${CartItem.ProductImage}`)}
                                                  className="img-fluid"
                                                  alt
                                                />
                                              </Link>
                                              <div className="media-body">
                                                <Link to="#" className="product-title">
                                                  {CartItem.ProductName}
                                                </Link>
                                                <span className="quantity">
                                                  {CartItem.Qty} ×{' '}
                                                  <span className="woocs-special_price_code">
                                                    <span className="ciya-Price-amount amount">
                                                      <span className="ciya-Price-currencySymbol">
                                                        $
                                                      </span>
                                                      {CartItem.Rate.toLocaleString(
                                                        navigator.language,
                                                        {
                                                          minimumFractionDigits: 0,
                                                        }
                                                      )}
                                                    </span>
                                                  </span>
                                                </span>
                                              </div>
                                            </div>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                    <p className="ciyashop-mini-cart__total total">
                                      <strong>Subtotal:</strong>{' '}
                                      <span className="woocs_special_price_code">
                                        <span className="ciyashop-Price-amount amount">
                                          <span className="ciyashop-Price-currencySymbol">$</span>{' '}
                                          {itemsInCart
                                            .reduce(
                                              (fr, CartItem) => fr + CartItem.Qty * CartItem.Rate,
                                              0
                                            )
                                            .toLocaleString(navigator.language, {
                                              minimumFractionDigits: 0,
                                            })}
                                        </span>
                                      </span>
                                    </p>
                                    <p className="ciyashop-mini-cart__buttons buttons">
                                      <Link
                                        to="/shopping-cart"
                                        className="button wc-forward"
                                      >
                                        View cart
                                      </Link>
                                      <Link
                                        to="/CheckOut"
                                        className="button checkout wc-forward"
                                      >
                                        Checkout
                                      </Link>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="cart-contents" id="DivCartContent">
                                <div className="widget ciyashop widget-shopping-cart">
                                  <div className="widget-shopping-cart-content">
                                    <p className="ciyashop-mini-cart__total total">
                                      <img
                                        src={require(`../../../../assets/images/empty-cart.png`)}
                                        className="img-fluid mr-3"
                                      />
                                      <strong>Your cart is currently empty.</strong>{' '}
                                      <span className="woocs_special_price_code">
                                        <span className="ciyashop-Price-amount amount">
                                          <span className="ciyashop-Price-currencySymbol"></span>{' '}
                                        </span>
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </li>
                          <li className="ciya-tools-action ciya-tools-search">
                            <Link to={searchName}>
                              <i className="glyph-icon pgsicon-ecommerce-magnifying-glass" />
                            </Link>
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
                          className={`nav-item ${
                            classset === navLink.menu_title ? 'show' : ''
                          }`}
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
                                  classset === navLink.menu_title
                                    ? 'showcollapsed'
                                    : 'submenu'
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
  productsCart: state.productsCartDataReducer.productsCartData,
  changeCart: state.changeCartDataReducer.changeCartData,
})

export default connect(mapStateToProps)(HeaderMain)

HeaderMain.defaultProps = {
  productsCart: [],
  changeCart: false,
}

HeaderMain.propTypes = {
  productsCart: PropTypes.array,
  changeCart: PropTypes.bool,
}
