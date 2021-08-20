/**
 * About Banner 2
 */
import React from 'react'
import { Col, Row } from 'reactstrap'

function OurHistory() {
  return (
    <div className="section-wrapper section-ptb">
      <div className="container">
        <Row>
          <Col lg={5}>
            <img
              // eslint-disable-next-line no-undef
              src={require(`./../../assets/images/quienes-somos-01.jpg`).default}
              className="img-fluid"
            />
          </Col>
          <Col lg={7} className="mt-4 mt-lg-0">
            <div className="section-title mb-3">
              <h2 className="font-bold">Conocenos mejor !</h2>
            </div>
            <p>
              Somos un colectivo de serigrafistas dedicados a la reproducción de obras de arte. El
              arte tattoo es parte de la contracultura que nos representa como equipo de trabajo.
              Parte de nuestra misión consiste en establecer relaciones colaborativas con artistas
              visuales, diseñadores y tatuadores de todo el mundo.
            </p>
            <div className="ciyashop_list_wrapper mb-3">
              <ul className="ciyashop_list list icon-list-type-none">
                <li>
                  <i className="fa fa-check-square" />
                  <p className="ciyashop-list-info">
                    Amamos lo que hacemos por eso siempre damos lo mejor de nosotros
                  </p>
                </li>
                <li>
                  <i className="fa fa-check-square" />
                  <p className="ciyashop-list-info">
                    Respetamos mucho el arte tattoo y tenemos algunas ediciones limitadas
                  </p>
                </li>
                <li>
                  <i className="fa fa-check-square" />
                  <p className="ciyashop-list-info">Muchas gracias por preferir nuestro trabajo</p>
                </li>
              </ul>
            </div>
            <Row className="mt-4 pt-4 mt-sm-5 pt-sm-5 border-top no-gutters">
              <Col sm={6} className="pr-2">
                <div className="ciyashop_info_box ciyashop_info_box-layout-style_2 ciyashop_info_box-content_alignment-left ciyashop_info_box-with-icon ciyashop_info_box-icon-source-font ciyashop_info_box-icon-style-border ciyashop_info_box-icon-size-sm ciyashop_info_box-icon-shape-round ciyashop_info_box-icon_position-left info_box-step_position-above_title">
                  <div className="ciyashop_info_box-inner clearfix ciyashop-info-left-icon">
                    <div className="ciyashop_info_box-icon">
                      <div className="ciyashop_info_box-icon-wrap">
                        <div className="ciyashop_info_box-icon-outer">
                          <div
                            className="ciyashop_info_box-icon-inner"
                            style={{
                              borderColor: '#dbdbdb',
                              borderWidth: '2px',
                              borderStyle: 'solid',
                            }}
                          >
                            <i className="fa fa-archive" style={{ color: '#dbdbdb' }} />{' '}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ciyashop_info_box-content">
                      <div className="ciyashop_info_box-content-wrap">
                        <div className="ciyashop_info_box-content-inner">
                          <h5 className="ciyashop_info_box-title" style={{ color: '#323232' }}>
                            Nuestro taller{' '}
                          </h5>
                          <div className="ciyashop_info_box-description">
                            <p>
                              Tenemos opción de retiro en nuestro taller ubicado en Santiago Centro,
                              o envíos a domicilio y regiones via Starken todas las semanas.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col sm={6}>
                <div className="ciyashop_info_box ciyashop_info_box-layout-style_2 ciyashop_info_box-content_alignment-left ciyashop_info_box-with-icon ciyashop_info_box-icon-source-font ciyashop_info_box-icon-style-border ciyashop_info_box-icon-size-sm ciyashop_info_box-icon-shape-round ciyashop_info_box-icon_position-left info_box-step_position-above_title mt-4 mt-sm-0">
                  <div className="ciyashop_info_box-inner clearfix ciyashop-info-left-icon">
                    <div className="ciyashop_info_box-icon">
                      <div className="ciyashop_info_box-icon-wrap">
                        <div className="ciyashop_info_box-icon-outer">
                          <div
                            className="ciyashop_info_box-icon-inner"
                            style={{
                              borderColor: '#dbdbdb',
                              borderWidth: '2px',
                              borderStyle: 'solid',
                            }}
                          >
                            <i className="fa fa-align-center" style={{ color: '#dbdbdb' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ciyashop_info_box-content">
                      <div className="ciyashop_info_box-content-wrap">
                        <div className="ciyashop_info_box-content-inner">
                          <h5 className="ciyashop_info_box-title" style={{ color: '#323232' }}>
                            Nuestra misión{' '}
                          </h5>
                          <div className="ciyashop_info_box-description">
                            <p>
                              TODO O NADA es una marca independiente inspirada en el arte tattoo y
                              dedicada al trabajo de excelencia hecho a mano. Buscamos rescatar y
                              valorizar elementos culturales y artísticos a través de la impresión
                              de las obras de arte de nuestros colaboradores.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default OurHistory
