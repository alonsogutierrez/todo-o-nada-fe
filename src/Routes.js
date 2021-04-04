import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'
import { Switch, Route, BrowserRouter as Router, withRouter } from 'react-router-dom'

import HomeRoutePage from './RoutesPages/HomePage'
import AboutUsPage from './RoutesPages/AboutUsPage'
import ContactUsPage from './RoutesPages/ContactUsPage'
import ProductDetail from './RoutesPages/ProductDetailPage'
import SearchPage from './RoutesPages/SearchPage'
import CategoryPage from './RoutesPages/CategoryPage'

import './App.css'
import './Vendor.js'

import ShoppingCart from './component/shop/shoppingcart'
import MyAccount from './component/account/MyAccount'
import PageNotFound from './component/pages/PageNotFound'

import CheckOut from './component/shop/CheckOut'

import Address from './component/account/Address'
import Addressedit from './component/account/Addressedit'
import AccountProfile from './component/account/AccountProfile'
import AccountProfileedit from './component/account/AccountProfileedit'
import SavedCards from './component/account/SavedCards'
import SavedCardsedit from './component/account/SavedCardsedit'
import SuccessScreen from './component/shop/CheckOut/SuccessScreen'

import OrderHistory from './component/account/OrderHistory'
import AdminDashboard from './component/admin'
import Login from './component/admin/Login'
import SavedCardsadd from './component/account/SavedCardsadd'
import { receiveProducts } from './actions'

import Header from './layouts/header/Header'
import Footer from './layouts/footer/Footer'

const Routes = ({ receiveProducts }) => {
  receiveProducts()
  return (
    <Fragment>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={HomeRoutePage} />
          <Route path="/account/addressedit" component={Addressedit} />
          <Route exact path="/account/accoutprofile" component={AccountProfile} />
          <Route path="/address" component={Address} />
          <Route path="/admin-dashboard" component={AdminDashboard} />
          <Route path="/aboutus" component={AboutUsPage} />
          <Route path="/checkout" component={CheckOut} />
          <Route path="/contactus" component={ContactUsPage} />
          <Route exact path="/search" component={SearchPage} />
          <Route exact path="/category/:categoryName" component={CategoryPage} />
          <Route exact path="/shopping-cart" component={ShoppingCart} />
          <Route exact path="/myaccount" component={MyAccount} />
          <Route exact path="/account/address" component={Address} />
          <Route exact path="/account/orderhistory" component={OrderHistory} />
          <Route exact path="/account/savedcards" component={SavedCards} />
          <Route exact path="/account/AccountProfileedit" component={AccountProfileedit} />
          <Route exact path="/account/SavedCards" component={SavedCards} />
          <Route exact path="/account/SavedCardsedit" component={SavedCardsedit} />
          <Route exact path="/account/SavedCardsadd" component={SavedCardsadd} />
          <Route exact path="/SuccessScreen" component={SuccessScreen} />
          <Route exact path="/admin/login" component={Login} />
          <Route path={`/shop/:category/:id`} component={ProductDetail} />
          <Route component={PageNotFound} />
        </Switch>
        <Footer />
      </Router>
    </Fragment>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    receiveProducts: () => {
      dispatch(receiveProducts())
    },
  }
}

export default connect(null, mapDispatchToProps)(withRouter(Routes))

Routes.defaultProps = {
  receiveProducts: () => {},
}

Routes.propTypes = {
  receiveProducts: PropTypes.func,
}
