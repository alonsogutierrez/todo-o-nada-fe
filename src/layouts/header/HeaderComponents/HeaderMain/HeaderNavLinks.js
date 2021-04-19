import React from 'react'
import PropTypes from 'prop-types'
import { Nav, UncontrolledDropdown, DropdownMenu, DropdownItem } from 'reactstrap'
import { Link, NavLink } from 'react-router-dom'

const HeaderNavLinks = ({ navLinks, pageName }) => {
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

  return navLinks.map((navLink, index) => (
    <Nav className="ml-auto" navbar key={index}>
      {navLink.type && navLink.type === 'subMenu' ? (
        <>
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
        </>
      ) : (
        <>
          <NavLink className="nav-link" to={`${navLink.path}`}>
            {navLink.menu_title}
          </NavLink>
        </>
      )}
    </Nav>
  ))
}

export default HeaderNavLinks

HeaderNavLinks.defaultProps = {
  navLinks: [],
  pageName: '',
}

HeaderNavLinks.propTypes = {
  navLinks: PropTypes.array,
  pageName: PropTypes.string,
}
