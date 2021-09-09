/**
 *  Contact Detail Page
 */
import React from 'react'
import { Row, Col, Container } from 'reactstrap'
import { Link } from 'react-router-dom'

const handleInstagramClick = (e) => {
  e.preventDefault()
  window.open('https://www.instagram.com/todoonadatattooart', '_blank')
}

const contactDataList = [
  {
    title: 'Ubicación',
    data: (
      <>
        <p>Casa Brasil (Catedral 2116, metro Cumming), Santiago, Chile</p>
      </>
    ),
    symbol: 'fa-map-marker',
  },
  {
    title: 'Correo',
    data: (
      <>
        <p>todoonadatattooart2017@gmail.com</p>
      </>
    ),
    symbol: 'fa-envelope-o',
  },
  {
    title: 'Instagram',
    data: (
      <>
        <Link onClick={(e) => handleInstagramClick(e)}>@todoonadatattooart</Link>
      </>
    ),
    symbol: 'fa fa-instagram',
  },
]

const ContactDetail = () => {
  return (
    <div className="section-wrapper section-pt pb-6">
      <Container>
        <Row>
          <Col sm={12} className="col-sm-12">
            <div className="section-title text-center mb-2">
              <h2 className="title">Estamos atentos a tus dudas y consultas</h2>
              <p>
                Buscamos dar la mejor atención a nuestros clientes asi que no dudes en escribirnos y
                tomar nota para visitarnos.
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          {contactDataList.map((contactData) => (
            <>
              <Col md={6} lg={4}>
                <div className="ciyashop_info_box_2 ciyashop_info_box_2-layout-style_2 ciyashop_info_box_2-content_alignment-left ciyashop_info_box_2-with-icon ciyashop_info_box_2-icon-source-font ciyashop_info_box_2-icon-style-border ciyashop_info_box_2-icon-size-lg ciyashop_info_box_2-icon-shape-round ciyashop_info_box_2-icon_position-left mb-3 mb-sm-0">
                  <div className="ciyashop_info_box_2-inner clearfix">
                    <div className="ciyashop_info_box_2-icon">
                      <div className="ciyashop_info_box_2-icon-wrap">
                        <div className="ciyashop_info_box_2-icon-outer">
                          <div className="ciyashop_info_box_2-icon-inner">
                            <i className={`fa ${contactData.symbol}`} />{' '}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ciyashop_info_box_2-content">
                      <div className="ciyashop_info_box_2-content-wrap">
                        <div className="ciyashop_info_box_2-content-inner">
                          <h6 className="ciyashop_info_box_2-title inline_hover">
                            {contactData.title}:{' '}
                          </h6>
                          <div className="ciyashop_info_box_2-content">{contactData.data}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default ContactDetail
