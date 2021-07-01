import React, { Component } from 'react'
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
    return (
      <>
        <div>
          <AdminHeader />
          <Route path={`/admin-dashboard/reports`} component={Reports} />
          <Route path={`/admin-dashboard/invoices`} component={SearchOrders} />
          <Route path={`/admin-dashboard/profile`} component={Profile} />
          <Route path={`/admin-dashboard/product`} component={AdminProductList} />
          <Route path={`/admin-dashboard/profileedit`} component={Profileedit} />
          <Route path={`/admin-dashboard/collaboration`} component={Collaboration} />
          <Route path={`/admin-dashboard/settings`} component={Settings} />
          <Route path={`/admin-dashboard/product-add`} component={Productadd} />
          <Route path={`/admin-dashboard/product-edit/:category/:id`} component={Productedit} />
        </div>
      </>
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
