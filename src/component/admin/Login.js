/**
 *  Admin Profile Page
 */
import React, { useState } from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { Row, Container, Input, Nav, NavItem, Modal, ModalBody, ModalHeader } from 'reactstrap'
import PropTypes from 'prop-types'

import validators from '../../helpers/validators'

const Login = (props) => {
  const [modal] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState('')

  const handleLoginValidation = async () => {
    const validatorResponse = await validators.validateLoginForm(email, password)
    return validatorResponse
  }

  const onLoginSubmit = async (e) => {
    e.preventDefault()
    const loginValidation = await handleLoginValidation()
    if (loginValidation) {
      props.history.push('/admin-dashboard/reports')
    } else {
      const errorsMessage = 'Usuario o contraseña incorrecta'
      setErrors(errorsMessage)
    }
  }

  const handleInputEmail = (emailInput) => {
    setEmail(emailInput)
  }

  const handleInputPassword = (passwordInput) => {
    setPassword(passwordInput)
  }

  const renderError = () => {
    const errorStyle = {
      fontWeight: 'bold',
      color: 'chocolate',
    }
    return <div style={errorStyle}>{errors}</div>
  }

  return (
    <Container>
      <Row>
        <Modal isOpen={modal} className="modal-login modal-dialog-centered">
          <ModalHeader>
            <h4 className="mb-0">Login</h4>
          </ModalHeader>
          <ModalBody>
            <Nav tabs>
              <NavItem>
                <NavLink>Login</NavLink>
              </NavItem>
            </Nav>
            <form onSubmit={onLoginSubmit}>
              <div className="form-group">
                <label>Email address</label>
                <Input
                  type="email"
                  className="form-control"
                  name="login_email"
                  id="login_email"
                  placeholder="Ingresa tu correo"
                  value={email}
                  autocomplete="email"
                  onChange={(e) => handleInputEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Password </label>
                <Input
                  type="password"
                  className="form-control"
                  name="login_password"
                  id="login_password"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  autocomplete=""
                  onChange={(e) => handleInputPassword(e.target.value)}
                />
              </div>

              {errors !== '' ? renderError() : null}

              <div className="form-group">
                <button className="btn btn-primary mt-1" type="submit">
                  Log in
                </button>
                <Link className="btn btn-secondary ml-2 mt-1">Cancel</Link>
              </div>
            </form>
          </ModalBody>
        </Modal>
      </Row>
    </Container>
  )
}
export default withRouter(Login)

Login.defaultProps = {
  history: {},
}

Login.propTypes = {
  history: PropTypes.object,
}
