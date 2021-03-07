/**
 *  Admin Dashboard Menu
 */
import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import AdminHeader from './Adminheader'
import AdminProductList from './AdminProductList'
import Collaboration from './Collaboration'
import SearchOrders from './SearchOrders'
import Productadd from './Product/Productadd'
import Productedit from './Product/Productedit'
import Profile from './Profile'
import Profileedit from './Profileedit'
import Reports from './Reports/Reports'
import Settings from './Settings'

class AdminDashboard extends Component {
  render() {
    const { match } = this.props
    return (
      <Fragment>
        <div>
          <AdminHeader />
          <Route path={`${match.url}/reports`} component={Reports} />
          <Route path={`${match.url}/invoices`} component={SearchOrders} />
          <Route path={`${match.url}/profile`} component={Profile} />
          <Route path={`${match.url}/product`} component={AdminProductList} />
          <Route path={`${match.url}/profileedit`} component={Profileedit} />
          <Route path={`${match.url}/collaboration`} component={Collaboration} />
          <Route path={`${match.url}/settings`} component={Settings} />
          <Route path={`${match.url}/product-add`} component={Productadd} />
          <Route path={`${match.url}/product-edit/:category/:id`} component={Productedit} />
        </div>
      </Fragment>
    )
  }
}
export default AdminDashboard

AdminDashboard.defaultProps = {
  location: {},
  match: {},
}

AdminDashboard.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object,
}
