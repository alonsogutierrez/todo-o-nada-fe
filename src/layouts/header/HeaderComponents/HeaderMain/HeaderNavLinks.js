import React from 'react'

const HeaderNavLinks = ({ navLinks }) => {
  navLinks.map((navLink, index) => (
    <Nav className='ml-auto' navbar key={index}>
      {navLink.type && navLink.type === 'subMenu' ? (
        <Fragment>
          <UncontrolledDropdown
            nav
            inNavbar
            onMouseEnter={() => this.OpenSubmenuOpen(`submenu_${index}`)}
            onMouseLeave={() => this.OpenSubmenuClose(`submenu_${index}`)}
          >
            <Link
              aria-haspopup='true'
              to={navLink.path}
              className='dropdown-toggle nav-link'
              aria-expanded='true'
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
                      (subNavLink.path == '/shop/clothing/29' &&
                        pageName == '/29')
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
            <NavLink href={navLink.path}>{navLink.menu_title}</NavLink>
          </NavItem>
        </Fragment>
      )}
    </Nav>
  ))
}

export default HeaderNavLinks
