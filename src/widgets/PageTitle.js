/**
 * Page title component
 */
import React from 'react'
import { Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const PageTitle = ({ title }) => (
  <Col>
    <div className='intro-title-inner'>
      <h1>{title}</h1>
    </div>
    <ul className='ciyashop_breadcrumbs page-breadcrumb breadcrumbs'>
      <li className='home'>
        <span>
          <Link className='bread-link  ' to='/'>
            Home
          </Link>
        </span>
      </li>
      <li>
        <span>{title}</span>
      </li>
    </ul>
  </Col>
)

export default PageTitle

PageTitle.defaultProps = {
  title: ''
}

PageTitle.propTypes = {
  title: PropTypes.string
}
