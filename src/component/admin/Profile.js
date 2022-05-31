/**
 *  Admin Profile Page
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import { format } from 'date-fns'

import AdminProfileDetail from './AdminProfileDetail'
import Adminsitebar from './Adminsitebar'
import ClientAPI from '../../common/ClientAPI'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userProfileData: {
        name: '',
        createdAt: new Date(),
        position: '',
        email: '',
        address: '',
      },
    }
  }

  async getProfileInfoAPI(userId) {
    const clientAPI = new ClientAPI()
    try {
      const profileInfoResponse = await clientAPI.getProfileInfo(userId)
      this.setState({
        userProfileData: profileInfoResponse.user[0],
      })
    } catch (err) {
      console.error('Error trying to get profile info')
      this.setState({
        userProfileData: {},
      })
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    //TODO: Change this email by logged user
    const userId = 'jose@ton.cl'
    this.getProfileInfoAPI(userId)
  }

  render() {
    const { userProfileData } = this.state
    let { name, createdAt, position, email, address } = userProfileData
    //TODO: Change this logic when an user has this attributes
    position = !position ? 'Administrador' : ''
    address = !address ? 'Santiago, Chile' : ''

    const userData = {
      name,
      email,
    }
    return (
      <div className="section-ptb">
        <Container>
          <AdminProfileDetail userData={userData} />
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
                          <span>Nombres:</span>
                          <strong>{name}</strong>
                        </li>
                        <li>
                          <span>Creación:</span>
                          <strong>{format(new Date(createdAt), 'yyyy-MM-dd')}</strong>
                        </li>
                        <li>
                          <span>Cargo:</span>
                          <strong>{position}</strong>
                        </li>
                        <li>
                          <span>Email:</span>
                          <strong>{email}</strong>
                        </li>
                        <li>
                          <span>Dirección:</span>
                          <strong>{address}</strong>
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
