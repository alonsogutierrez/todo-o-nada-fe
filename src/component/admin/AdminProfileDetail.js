/**
 * Admin Profile Detail
 */
import React, { Component } from 'react'
import { Col, Row } from 'reactstrap'
import PropTypes from 'prop-types'

import adminprofile from '../../assets/images/testimonials/img-02.jpg'

class AdminProfileDetail extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { userData } = this.props
    const { name, email, phone } = userData
    return (
      <Row>
        <Col lg={12}>
          <div className="admin-profile">
            <div className="admin-profile-image">
              <img className="img-fluid rounded-circle" src={adminprofile} alt="profile" />
            </div>
            <div className="admin-profile-info">
              <h6 className="mb-0">{name}</h6>
              <span className="text-dark">{email}</span>
            </div>
            {phone !== '' ? (
              <div className="admin-profile-number ml-auto">
                <strong className="h2">
                  {' '}
                  <i className="fa fa-phone-square pr-2"></i>
                  {phone}
                </strong>
              </div>
            ) : null}
          </div>
        </Col>
      </Row>
    )
  }
}

export default AdminProfileDetail

AdminProfileDetail.defaultProps = {
  userData: {},
}

AdminProfileDetail.propTypes = {
  userData: PropTypes.object,
}
