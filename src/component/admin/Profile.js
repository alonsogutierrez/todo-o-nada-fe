/**
 *  Admin Profile Page
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'

import Common1 from '../../api/common'
import AdminProfileDetail from './AdminProfileDetail'
import Adminsitebar from './Adminsitebar'

class Profile extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    const Profile = Common1['0']['profile']
    return (
      <div className="section-ptb">
        <Container>
          <AdminProfileDetail />
          <Row>
            <Adminsitebar />
            <Col lg={9} className="mt-4 mt-lg-0">
              <Row>
                <Col lg={12}>
                  <div className="woocommerce-Address">
                    <div className="woocommerce-Address-title">
                      <h5 className="mb-0">Información de perfil</h5>
                      <Link class="edit" to="/admin-panel/Profileedit">
                        Editar
                      </Link>
                    </div>
                    <div className="woocommerce-Address-info mt-4">
                      <ul className="list-unstyled mb-0">
                        <li>
                          <span>Nombre:</span>
                          <strong>{Profile.firstname}</strong>
                        </li>
                        <li>
                          <span>Apellido:</span>
                          <strong>{Profile.lastname}</strong>
                        </li>
                        <li>
                          <span>Genero:</span>
                          <strong>{Profile.gender}</strong>
                        </li>
                        <li>
                          <span>Cargo:</span>
                          <strong>{Profile.dob}</strong>
                        </li>
                        <li>
                          <span>Telefono:</span>
                          <strong>{Profile.phoneno}</strong>
                        </li>
                        <li>
                          <span>Email:</span>
                          <strong>{Profile.email}</strong>
                        </li>
                        <li>
                          <span>Dirección:</span>
                          <strong>{Profile.address}</strong>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
export default Profile