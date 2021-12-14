import React from 'react'
import { withRouter } from 'react-router-dom'
import ReactGA from 'react-ga'
import PropTypes from 'prop-types'

const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID //set this var in env vars

class Spy extends React.Component {
  constructor(props) {
    super(props)
    ReactGA.initialize(GOOGLE_ANALYTICS_ID)
    this.props.history.listen((location) => ReactGA.pageview(location.pathname + location.search))
  }

  render() {
    return null
  }
}

const GlobalHistory = withRouter(Spy)

export default GlobalHistory

Spy.defaultProps = {
  history: {},
}

Spy.propTypes = {
  history: PropTypes.object,
}
