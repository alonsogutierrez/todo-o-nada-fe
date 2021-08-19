import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import setViewOrderToggle from './../../../actions/setViewOrderToggle'

const Actions = (props) => {
  const handleViewAction = (e) => {
    e.preventDefault()
    const { setViewOrderToggle, viewOrderToggle } = props
    setViewOrderToggle(!viewOrderToggle)
  }

  return (
    <div>
      <Link className="view-button" onClick={(e) => handleViewAction(e)}>
        {' '}
        Ver <i className="fa fa-eye pl-2"></i>
      </Link>
    </div>
  )
}

const mapStateToProps = (state) => ({
  viewOrderToggle: state.viewOrderToggleReducer.viewOrderToggleData,
})

const mapDispatchToProps = (dispatch) => ({
  setViewOrderToggle: (viewOrderToggle) => dispatch(setViewOrderToggle(viewOrderToggle)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Actions)

Actions.defaultProps = {
  setViewOrderToggle: () => {},
  viewOrderToggle: false,
}

Actions.propTypes = {
  setViewOrderToggle: PropTypes.func,
  viewOrderToggle: PropTypes.bool,
}
