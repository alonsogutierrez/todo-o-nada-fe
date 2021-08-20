/**
 * Contact Form
 */
import React from 'react'
import { Row, Col } from 'reactstrap'
import { Form, Input } from 'reactstrap'
import { toast, ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.min.css'

const ContactForm = () => {
  const handleContactFormSubmit = (e) => {
    e.preventDefault()
    toast.success('Mensaje enviado')
  }

  //TODO: Create logic to validate form and save a message in db

  return (
    <>
      <ToastContainer autoClose={1000} draggable={false} />
      <div className="contact-wrapper bg-gray w-100">
        <div className="section-title">
          <h2 className="title text-left">Envianos un mensaje!</h2>
          <p>
            Si tienes dudas o buscas ayuda en lo que sea en cuanto a nuestro productos, no dudes en
            escribirnos!
          </p>
        </div>
        <Form
          onSubmit={(e) => {
            handleContactFormSubmit(e)
          }}
        >
          <Row>
            <Col lg={4}>
              <div className="form-group">
                <Input type="text" className="form-control" placeholder="Nombres" />
              </div>
            </Col>
            <Col lg={4}>
              <div className="form-group">
                <Input type="text" className="form-control" placeholder="Mail" />
              </div>
            </Col>
            <Col lg={4}>
              <div className="form-group">
                <Input type="text" className="form-control" placeholder="Asunto" />
              </div>
            </Col>
            <Col md={12}>
              <div className="form-group">
                <textarea
                  name="your-message"
                  cols={30}
                  rows={4}
                  className="form-control"
                  placeholder="Escribe aqui tu mensaje"
                  defaultValue={''}
                />
              </div>
            </Col>
            <Col md={12}>
              <Input type="submit" defaultValue="Enviar mensaje" className="btn btn-default" />
            </Col>
          </Row>
        </Form>
      </div>
    </>
  )
}

export default ContactForm
