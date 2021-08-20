import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Nav, UncontrolledDropdown, DropdownMenu, DropdownItem } from 'reactstrap'
import { Link, NavLink, withRouter } from 'react-router-dom'

import setCategorySelected from './../../../../actions/setCategorySelected'
import setSubCategorySelected from './../../../../actions/setSubCategorySelected'

import { categoryValue } from './../../../../actions/filter'

const HeaderNavLinks = ({
  navLinks,
  pageName,
  setCategorySelected,
  setSubCategorySelected,
  history,
  categoryValue,
  setChangeProducts,
  changeProducts,
}) => {
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

  const handleCategoryClick = (e, categoryName) => {
    e.preventDefault()
    setCategorySelected(categoryName.toLowerCase())
    setSubCategorySelected('')
    const categories = [categoryName.toLowerCase()]
    categoryValue(categories)
    setChangeProducts(!changeProducts)
    history.push(`/category/${categoryName.toLowerCase()}`)
  }

  const handleSetSubCategorySelected = (e, categoryName, subCategoryName) => {
    e.preventDefault()
    setCategorySelected(categoryName.toLowerCase())
    setSubCategorySelected(subCategoryName.toLowerCase().split(' ').join('-'))
    categoryValue([categoryName.toLowerCase(), subCategoryName.toLowerCase().split(' ').join('-')])
    setChangeProducts(!changeProducts)
    history.push(`/category/${categoryName.toLowerCase()}`)
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
              onClick={(e) => handleCategoryClick(e, navLink.category_name)}
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
                    className={`nav-item  ${pageName == subNavLink.path ? 'active' : ''}`}
                    to={subNavLink.path}
                    onClick={(e) =>
                      handleSetSubCategorySelected(e, navLink.category_name, subNavLink.menu_title)
                    }
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

const mapStateToProps = (state) => ({
  changeProducts: state.changeProductsDataReducer.changeProductsData,
})

const mapDispatchToProps = (dispatch) => ({
  setCategorySelected: (categoryName) => dispatch(setCategorySelected(categoryName)),
  setSubCategorySelected: (subCategoryName) => dispatch(setSubCategorySelected(subCategoryName)),
  categoryValue: (categoryName) => dispatch(categoryValue(categoryName)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HeaderNavLinks))

HeaderNavLinks.defaultProps = {
  navLinks: [],
  pageName: '',
  setCategorySelected: () => {},
  setSubCategorySelected: () => {},
  history: {},
  categoryValue: () => {},
  setChangeProducts: () => {},
}

HeaderNavLinks.propTypes = {
  navLinks: PropTypes.array,
  pageName: PropTypes.string,
  setCategorySelected: PropTypes.func,
  setSubCategorySelected: PropTypes.func,
  history: PropTypes.object,
  categoryValue: PropTypes.func,
  setChangeProducts: PropTypes.func,
}
