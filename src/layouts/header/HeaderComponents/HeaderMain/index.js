import React, { Component, Fragment } from 'react'
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

import navLinks from '../../../../NavLinks'
import LogoWrapper from '../LogoWrapper'

const getSearchName = (pageName) => {
  switch (pageName) {
    case '/topbar-with-load-more':
      return '/topbar-with-load-more'
    case '/sidebar-without-lazyload':
      return '/sidebar-without-lazyload'
    case '/topbar-without-lazyload':
      return '/topbar-without-lazyload'
    case '/sidebar-with-lazyload':
      return '/sidebar-with-lazyload'
    default:
      return '/sidebar-with-load-more'
  }
}

class HeaderMain extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.ReadWishListItems = this.ReadWishListItems.bind(this)
    this.state = {
      isOpen: false,
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  ReadCartItems() {
    return JSON.parse(localStorage.getItem('LocalCartItems'))
  }

  ShowCart() {
    if (this.state.CartHide === true) {
      var elm = document.getElementById('DivCartContent')
      if (elm != null) {
        document.getElementById('DivCartContent').setAttribute('style', 'display:block')
        this.setState({
          CartHide: false,
        })
      }
    }
  }

  ReadWishListItems() {
    return JSON.parse(localStorage.getItem('LocalWishListItems'))
  }

  OpenSubmenuOpen(id) {
    var elm = document.getElementById(id)
    if (elm != null) {
      document.getElementById(id).setAttribute('class', 'dropdown-menu dropdown-menu-right show')
    }
  }

  OpenSubmenuClose(id) {
    var elm = document.getElementById(id)
    if (elm != null) {
      document.getElementById(id).setAttribute('class', 'dropdown-menu dropdown-menu-right')
    }
  }

  renderHeaderNavLinks(pageName) {
    return navLinks.map((navLink, index) => (
      <Nav className="ml-auto" navbar key={index}>
        {navLink.type && navLink.type === 'subMenu' ? (
          <Fragment>
            <UncontrolledDropdown
              nav
              inNavbar
              onMouseEnter={() => this.OpenSubmenuOpen(`submenu_${index}`)}
              onMouseLeave={() => this.OpenSubmenuClose(`submenu_${index}`)}
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

  render() {
    const pathnames = document.location.href
    const pathArray = pathnames.split('/')
    const pageName = '/' + pathArray[pathArray.length - 1]
    const searchName = getSearchName(pageName)
    const isItemsInCart = this.ReadCartItems() === null || this.ReadCartItems().length === 0
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
                                        <NavbarToggler onClick={() => this.toggle()} />
                                        <Collapse isOpen={this.state.isOpen} navbar>
                                          {this.renderHeaderNavLinks(pageName)}
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
                                  onClick={() => this.ShowCart()}
                                >
                                <span className="cart-icon">
                                  <i className="glyph-icon pgsicon-ecommerce-empty-shopping-cart" />
                                </span>
                                <span className="cart-count count">
                                  {' '}
                                  {this.ReadCartItems() === null
                                    ? 0
                                    : this.ReadCartItems().length}{' '}
                                </span>
                              </Link>

                              {this.ReadCartItems() !== null && this.ReadCartItems().length > 0 ? (
                                <div className="cart-contents" id="DivCartContent">
                                  <div className="widget ciyashop widget-shopping-cart">
                                    <div className="widget-shopping-cart-content">
                                      <div className="pgs-product-list-widget-container has-scrollbar">
                                        <ul className="ciyashop-mini-cart cart-list">
                                          {this.ReadCartItems().map((CartItem, index) => (
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
                                            {this.ReadCartItems()
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
                                          onClick={() => this.HideCart()}
                                          to="/shopping-cart"
                                          className="button wc-forward"
                                        >
                                          View cart
                                        </Link>
                                        <Link
                                          onClick={() => this.HideCart()}
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
                            <li className="ciya-tools-action ciya-tools-wishlist">
                              {' '}
                              <Link to="/wishlist">
                                <i className="glyph-icon pgsicon-ecommerce-like" />{' '}
                                <span className="wishlist ciyashop-wishlist-count">
                                  {' '}
                                  {this.ReadWishListItems() == null
                                    ? 0
                                    : this.ReadWishListItems().length}{' '}
                                </span>{' '}
                              </Link>
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
                    <NavbarToggler onClick={this.toggle} className="mr-2" />
                    <Collapse isOpen={!this.state.isOpen} navbar>
                      <Nav className="ml-auto" navbar>
                        {navLinks.map((navLink, index) => (
                          <li
                            key={index}
                            className={`nav-item ${
                              this.state.classset == navLink.menu_title ? 'show' : ''
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
                                    this.state.classset == navLink.menu_title
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
}

export default HeaderMain
