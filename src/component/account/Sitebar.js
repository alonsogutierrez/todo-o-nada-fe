/**
 *  Account Page Site bar
 */
import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Col, Nav, NavItem } from 'reactstrap'

class Sitebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Ord_Hist: true,
      Prof_act: true,
      Add_act: true,
      Saved_card: true,
    }
  }

  render() {
    const { Ord_Hist, Prof_act, Add_act, Saved_card } = this.state

    return (
      <Fragment>
        <Col lg={3}>
          <div className="woocommerce-MyAccount-navigation">
            <Nav className="flex-column">
              <NavItem>
                <Link
                  to="/Account/OrderHistory"
                  className={`${Ord_Hist == true ? 'active' : ''} nav-link nav-custo OrderHistory`}
                >
                  {' '}
                  <i className="fa fa-tachometer"></i> Order History{' '}
                </Link>
              </NavItem>
              <NavItem>
                <Link
                  to="/Account/AccountProfile"
                  className={`${
                    Prof_act == true ? 'active' : ''
                  } nav-link nav-custo AccountProfile`}
                >
                  {' '}
                  <i className="fa fa-user-o"></i> Profile{' '}
                </Link>
              </NavItem>
              <NavItem>
                <Link
                  to="/Account/Address"
                  className={`${Add_act == true ? 'active' : ''} nav-link nav-custo Address`}
                >
                  {' '}
                  <i className="fa fa-map-marker"></i> Address{' '}
                </Link>
              </NavItem>
              <NavItem>
                <Link
                  to="/Account/SavedCards"
                  className={`${Saved_card == true ? 'active' : ''} nav-link  nav-custo SavedCards`}
                >
                  {' '}
                  <i className="fa fa-credit-card"></i> Saved Cards{' '}
                </Link>
              </NavItem>
            </Nav>
          </div>
        </Col>
      </Fragment>
    )
  }
}
export default Sitebar
