'use strict'
import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import {
  Col,
  Collapse,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem,
  Row,
  UncontrolledDropdown,
} from 'reactstrap'
import PropTypes from 'prop-types'
import profileImg from '../../assets/images/testimonials/img-02.jpg'

const AdminHeader = (props) => {
  const [dropdownOpen, setDropDownOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isCategoriesFeatureFlagOn] = useState(false)
  const [isBannersFeatureFlagOn] = useState(true)
  const [isCarrouselsFeatureFlagOn] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const toggle2 = () => {
    setDropDownOpen(!dropdownOpen)
  }

  const toggle3 = () => {
    setIsOpen(!isOpen)
  }

  const changeClass = (val) => {
    Array.from(document.getElementsByClassName('nav-item')).forEach(function (element) {
      element.classList.remove('active')
    })

    if (val === 'report') {
      document.querySelector('.report').classList.add('active')
    }
    if (val === 'invoice') {
      document.querySelector('.invoice').classList.add('active')
    }
    if (val === 'profile') {
      document.querySelector('.profile').classList.add('active')
    }
    if (val === 'backhome') {
      document.querySelector('.backhome').classList.add('active')
    }
  }

  const logout = () => {
    localStorage.removeItem('userToken')
    props.history.push('/')
  }

  const profileData = {
    firstName: 'Name',
    lastName: 'Lastname',
    email: 'todo@ton.cl',
  }
  return (
    <div className="admin-menu">
      <Container>
        <Row className="align-items-center">
          <Col md={12}>
            <div className="d-flex align-items-center positive-reletive">
              <Dropdown isOpen={dropdownOpen} toggle={toggle2} className="profile-dropdown ml-auto">
                <DropdownToggle caret className="btn-white">
                  <img
                    className="img-fluid rounded-circle profile-img"
                    src={profileImg}
                    alt="profile"
                  />
                  <div className="d-none d-sm-block">
                    <h6 className="mb-0">{profileData.firstName + ' ' + profileData.lastName}</h6>
                    <span className="text-dark">{profileData.email}</span>
                  </div>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => changeClass('profile')}
                    className="nav-link"
                    tag={Link}
                    to="/admin-dashboard/profile"
                  >
                    <i className="fa fa-user-circle-o"></i>Perfil
                  </DropdownItem>
                  <DropdownItem onClick={() => logout()} className="nav-link" tag={Link} to="/">
                    <i className="fa fa-sign-out"></i>Cerrar sesión
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <Navbar light expand="md" className="bg-white">
              <NavbarToggler onClick={toggle3} />
              <Collapse isOpen={isOpen} navbar>
                <Nav navbar>
                  <NavItem className="report">
                    <Link
                      to="/admin-dashboard/reports"
                      className="nav-link"
                      onClick={() => changeClass('report')}
                    >
                      <i className="fa fa-line-chart"></i>Reportes
                    </Link>
                  </NavItem>
                  <NavItem className="invoice">
                    <Link
                      to="/admin-dashboard/invoices"
                      className="nav-link"
                      onClick={() => changeClass('invoice')}
                    >
                      <i className="fa fa-inbox"></i>Ordenes
                    </Link>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      <i className="fa fa-shopping-cart"></i>Productos
                    </DropdownToggle>
                    <DropdownMenu left>
                      <DropdownItem
                        onClick={() => changeClass('product')}
                        className="nav-link"
                        tag={Link}
                        to="/admin-dashboard/product"
                      >
                        <i className="fa fa-cart-plus"></i>Productos
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => changeClass('product')}
                        className="nav-link"
                        tag={Link}
                        to="/admin-dashboard/product-add"
                      >
                        <i className="fa fa-cart-arrow-down"></i>Agregar Producto
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  {isCategoriesFeatureFlagOn && (
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret>
                        Categorias
                      </DropdownToggle>
                      <DropdownMenu left>
                        <DropdownItem
                          onClick={() => changeClass('product')}
                          className="nav-link"
                          tag={Link}
                          to="/admin-dashboard/categories"
                        >
                          Categorias
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => changeClass('product')}
                          className="nav-link"
                          tag={Link}
                          to="/admin-dashboard/edit-categories"
                        >
                          Editar Categorias
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  )}
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      <i className="fa fa-inbox"></i>Descuentos
                    </DropdownToggle>
                    <DropdownMenu left>
                      <DropdownItem
                        onClick={() => changeClass('discount')}
                        className="nav-link"
                        tag={Link}
                        to="/admin-dashboard/discounts"
                      >
                        <i className="fa fa-cart-plus"></i>Descuentos
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => changeClass('discount')}
                        className="nav-link"
                        tag={Link}
                        to="/admin-dashboard/discount-add"
                      >
                        <i className="fa fa-cart-arrow-down"></i>Crear Cupon
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>

                  {isBannersFeatureFlagOn && (
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret>
                        <i className="fa fa-image"></i>Banners
                      </DropdownToggle>
                      <DropdownMenu left>
                        <DropdownItem
                          onClick={() => changeClass('product')}
                          className="nav-link"
                          tag={Link}
                          to="/admin-dashboard/banners"
                        >
                          <i className="fa fa-photo"></i>Banners
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => changeClass('product')}
                          className="nav-link"
                          tag={Link}
                          to="/admin-dashboard/banners-add"
                        >
                          <i className="fa fa-picture-o"></i>Agregar Banner
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  )}

                  {isCarrouselsFeatureFlagOn && (
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret>
                        <i className="fa fa-image"></i>Carrousels
                      </DropdownToggle>
                      <DropdownMenu left>
                        <DropdownItem
                          onClick={() => changeClass('product')}
                          className="nav-link"
                          tag={Link}
                          to="/admin-dashboard/carrousels"
                        >
                          <i className="fa fa-photo"></i>Config
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  )}

                  <NavItem className="profile">
                    <Link
                      to="/admin-dashboard/profile"
                      className="nav-link"
                      onClick={() => changeClass('profile')}
                    >
                      <i className="fa fa-user-circle-o"></i>Perfil
                    </Link>
                  </NavItem>
                  <NavItem className="backhome">
                    <Link to="/" className="nav-link" onClick={() => changeClass('backhome')}>
                      <i className="fa fa-home"></i>Volver al home
                    </Link>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default withRouter(AdminHeader)

AdminHeader.defaultProps = {
  history: {},
}

AdminHeader.propTypes = {
  history: PropTypes.object,
}
