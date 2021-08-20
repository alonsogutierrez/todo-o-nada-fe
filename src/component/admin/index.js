import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import AdminHeader from './Adminheader'
import AdminProductList from './AdminProductList'
import Collaboration from './Collaboration'
import SearchOrders from './SearchOrders'
import ProductForm from './Product/ProductForm'
import Profile from './Profile'
import EditProduct from './Product/EditProduct'
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
          <Route path={`/admin-dashboard/collaboration`} component={Collaboration} />
          <Route path={`/admin-dashboard/settings`} component={Settings} />
          <Route path={`/admin-dashboard/product-add`} component={ProductForm} />
          <Route path={`/admin-dashboard/product-edit/:itemNumber`} component={EditProduct} />
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
