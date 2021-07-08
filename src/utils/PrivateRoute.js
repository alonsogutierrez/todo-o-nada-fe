import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import jwt from 'jsonwebtoken'

const PrivateRoute = ({ children, ...rest }) => {
  const isSessionExpired = (token, dateNow) => {
    if (!token) {
      return true
    } else {
      const tokenDecoded = jwt.decode(token, { complete: true })
      const isTokenExpired = !tokenDecoded.payload.exp > dateNow.getTime() / 1000
      return isTokenExpired
    }
  }

  const token = localStorage.getItem('userToken')
  const dateNow = new Date()

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isSessionExpired(token, dateNow) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/admin/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute

PrivateRoute.defaultProps = {
  children: <></>,
  rest: {},
}

PrivateRoute.propTypes = {
  children: PropTypes.instanceOf(React.Component),
  rest: PropTypes.object,
}
