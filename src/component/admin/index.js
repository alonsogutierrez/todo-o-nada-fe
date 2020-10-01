/**
 *  Admin Dashboard Menu
 */
import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import PageNotFound from '../../component/pages/PageNotFound'
import Footer from '../../layouts/footer/Footer'
import Headers from '../../layouts/header/Header'

// Component
import AdminHeader from './Adminheader'
import AdminProductList from './AdminProductList'
import Collaboration from './Collaboration'
import Invoices from './Invoices'
import Productadd from './Product/Productadd'
import Productedit from './Product/Productedit'
import Profile from './Profile'
import Profileedit from './Profileedit'
import Reports from './Reports'
import Settings from './Settings'

class AdminDashboard extends Component {
  IsAdminPage(pathname) {
    let pathArray = pathname.split('/')
    let productEditPage = pathArray[pathArray.length - 3]
    let pageName = pathArray[pathArray.length - 1]
    if (productEditPage == 'Product-edit') {
      return true
    } else {
      if (
        pageName == 'Reports' ||
        pageName == 'Invoices' ||
        pageName == 'Profile' ||
        pageName == 'Product' ||
        pageName == 'Profileedit' ||
        pageName == 'Profileedit' ||
        pageName == 'Collaboration' ||
        pageName == 'Settings' ||
        pageName == 'product-add' ||
        pageName == 'Product-edit'
      )
        return true
      else return false
    }
  }

  render() {
    const { location, match } = this.props
    return (
      <Fragment>
        {this.IsAdminPage(location.pathname) ? (
          <div>
            <AdminHeader />
            <Route path={`${match.url}/Reports`} component={Reports} />
            <Route path={`${match.url}/Invoices`} component={Invoices} />
            <Route path={`${match.url}/Profile`} component={Profile} />
            <Route path={`${match.url}/Product`} component={AdminProductList} />
            <Route path={`${match.url}/Profileedit`} component={Profileedit} />
            <Route
              path={`${match.url}/Collaboration`}
              component={Collaboration}
            />
            <Route path={`${match.url}/Settings`} component={Settings} />
            <Route path={`${match.url}/product-add`} component={Productadd} />
            <Route
              path={`${match.url}/Product-edit/:category/:id`}
              component={Productedit}
            />
          </div>
        ) : (
          <div>
            <Headers />
            <Route exact component={PageNotFound} />
            <Footer />
          </div>
        )}
      </Fragment>
    )
  }
}
export default AdminDashboard

AdminDashboard.defaultProps = {
  location: {},
  match: {}
}

AdminDashboard.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object
}
