import React from 'react'
import { Switch, Route, BrowserRouter as Router, withRouter } from 'react-router-dom'

import HomeRoutePage from './RoutesPages/HomePage'
import AboutUsPage from './RoutesPages/AboutUsPage'
import ContactUsPage from './RoutesPages/ContactUsPage'
import ProductDetail from './RoutesPages/ProductDetailPage'
import SearchPage from './RoutesPages/SearchPage'
import CategoryPage from './RoutesPages/CategoryPage'

import './App.css'
import './Vendor.js'

import PrivateRoute from './utils/PrivateRoute'
import ShoppingCart from './component/shop/shoppingcart'
import PageNotFound from './component/pages/PageNotFound'
import CheckOut from './component/shop/checkout'
import SuccessScreen from './component/shop/checkout/SuccessScreen'
import AdminDashboard from './component/admin'
import Login from './component/admin/Login'

import Header from './layouts/header/Header'
import Footer from './layouts/footer/Footer'

const Routes = () => {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={HomeRoutePage} />
          <Route path="/aboutus" component={AboutUsPage} />
          <Route path="/checkout" component={CheckOut} />
          <Route path="/contactus" component={ContactUsPage} />
          <Route path="/search" component={SearchPage} />
          <Route path={`/product/:itemNumber`} component={ProductDetail} />
          <Route exact path="/category/:categoryName" component={CategoryPage} />
          <Route path="/shopping-cart" component={ShoppingCart} />
          <Route path="/successpayment" component={SuccessScreen} />
          <Route exact path="/admin/login" component={Login} />

          <PrivateRoute path="/admin-dashboard">
            <AdminDashboard />
          </PrivateRoute>

          <Route component={PageNotFound} />
        </Switch>
        <Footer />
      </Router>
    </>
  )
}

export default withRouter(Routes)
