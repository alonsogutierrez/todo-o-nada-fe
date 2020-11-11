/**
 *  Admin Site Bar
 */
import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Col, Nav, NavItem } from 'reactstrap'

class Adminsitebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Coll_act: false,
      Prof_act: false,
      Sett_act: false,
    }
    this.SetActiveClass = this.SetActiveClass.bind(this)
    this.isSomeActiveClass = this.isSomeActiveClass.bind(this)
  }

  SetActiveClass() {
    let pathname = document.location.href
    let pathArray = pathname.split('/')
    let pageName = pathArray[pathArray.length - 1]
    if (!this.isSomeActiveClass()) {
      if (pageName.toLowerCase() == 'collaboration') {
        this.setState({
          Coll_act: true,
        })
      } else if (pageName.toLowerCase() == 'profile' || pageName.toLowerCase() == 'profileedit') {
        this.setState({
          Prof_act: true,
        })
      } else if (pageName.toLowerCase() == 'settings') {
        this.setState({
          Sett_act: true,
        })
      }
      return true
    }
    return false
  }

  isSomeActiveClass() {
    const { Prof_act, Coll_act, Sett_act } = this.state
    if (Prof_act || Coll_act || Sett_act) {
      return true
    }
    return false
  }

  render() {
    const { Prof_act, Coll_act, Sett_act } = this.state
    return (
      <Fragment>
        {this.SetActiveClass() ? (
          <Col lg={3}>
            <div className="woocommerce-MyAccount-navigation">
              <Nav className="flex-column">
                <NavItem>
                  <Link
                    className={`${
                      Prof_act == true ? 'active' : ''
                    } adminprofile nav-link admin-nav`}
                    to="/admin-panel/Profile"
                  >
                    {' '}
                    <i className="fa fa-user-o"></i> Profile
                  </Link>
                </NavItem>
                <NavItem>
                  <Link
                    className={`${
                      Coll_act == true ? 'active' : ''
                    } collaboration nav-link admin-nav`}
                    to="/admin-panel/Collaboration"
                  >
                    {' '}
                    <i className="fa fa-map-marker"></i> Collaboration
                  </Link>
                </NavItem>
                <NavItem>
                  <Link
                    className={`${Sett_act == true ? 'active' : ''} account nav-link admin-nav`}
                    to="/admin-panel/Settings"
                  >
                    {' '}
                    <i className="fa fa-cogs"></i> Account Settings
                  </Link>
                </NavItem>
              </Nav>
            </div>
          </Col>
        ) : (
          <div></div>
        )}
      </Fragment>
    )
  }
}
export default Adminsitebar
