import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import logo from '../../../../assets/images/todo_o_nada_letras_logo.jpg'

const LogoWrapper = () => (
  <Fragment>
    <div className="logo-wrapper">
      <Link to="/">
        <img className="img-fluid" src={logo} alt="logo" />
      </Link>
    </div>
    <div className="clearfix" />
  </Fragment>
)

export default LogoWrapper
