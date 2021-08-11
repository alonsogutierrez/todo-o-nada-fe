import React from 'react'
import Loader from 'react-loader-spinner'

import Topbar from './HeaderComponents/Topbar'
import HeaderMain from './HeaderComponents/HeaderMain'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timeout: true,
      modal: false,
      activeTab: '1',
      isOpen: false,
      collapsed: true,
      CartHide: true,
      classset: '',
    }
    this.toggleNavbar = this.toggleNavbar.bind(this)
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  logintoggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      })
    }
  }

  removeFromCart(Index) {
    var UpdatedCart = JSON.parse(localStorage.getItem('LocalCartItems'))
    UpdatedCart = UpdatedCart.slice(0, Index).concat(
      UpdatedCart.slice(Index + 1, UpdatedCart.length)
    )
    localStorage.removeItem('LocalCartItems')
    localStorage.setItem('LocalCartItems', JSON.stringify(UpdatedCart))
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll() {
    var scrollTop =
      (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop

    if (scrollTop > 100) {
      document
        .getElementById('site-header')
        .setAttribute('class', 'site-header header-style-menu-center is-sticky')
    } else {
      document
        .getElementById('site-header')
        .setAttribute('class', 'site-header header-style-menu-center')
    }
  }

  HideCart() {
    var elm = document.getElementById('DivCartContent')
    if (elm !== null) {
      document.getElementById('DivCartContent').setAttribute('style', 'display:none')
      this.setState({
        CartHide: true,
      })
    }
  }

  closeNavbar() {
    if (this.state.collapsed !== true) {
      this.toggleNavbar()
    }
  }

  onClickClassAdd(pages) {
    if (this.state.classset !== pages) {
      this.setState({
        classset: pages,
      })
    } else {
      if (Object.keys(this.state.classset).length === 0) {
        this.setState({
          classset: pages,
        })
      } else {
        this.setState({
          classset: '',
        })
      }
    }
  }

  render() {
    if (this.state.timeout === true) {
      setTimeout(
        function () {
          this.setState({ timeout: false })
        }.bind(this),
        2000
      ) // wait 5 seconds, then reset to false
    }
    return (
      <header className="site-header header-style-menu-center" id="site-header">
        {this.state.timeout === false ? (
          <div>
            <Topbar />
            <HeaderMain />
          </div>
        ) : (
          <div id="preloader">
            <Loader type="Puff" color="#04d39f" height="100" width="100" />
          </div>
        )}
      </header>
    )
  }
}
export default Header
