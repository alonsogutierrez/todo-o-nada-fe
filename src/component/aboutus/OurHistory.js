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
              style={{ borderRadius: '4px' }}
            />
          </Col>
          <Col lg={7} className="mt-4 mt-lg-0">
            <div className="section-title mb-3">
              <h2 className="font-bold">DE LA SERIGRAFÍA AL ARTE TATTOO</h2>
            </div>
            <p>
              Todo o nada tattoo art , nace el año 2017 con mas ganas que capital $ . Nuestra
              incidencia en las movidas del underground y contra culturales nos hicieron siempre
              conectarnos y entender el arte tattoo como un arte parte de nosotros/as. Lo que inicio
              como un pequeño proyecto de amigos/as de la música y el tattoo termino convirtiéndose
              en una marca de alta calidad , en donde han realizado colaboraciones los mas
              respetados artistas del tatuaje japones de chile y argentina. Hemos viajado con
              nuestras mochilas llenas de sueños por varios países de Sudamérica mostrando nuestro
              trabajo y haciendo las mejores conexiones que están ya por verse. Mas que nada, somos
              un colectivo de serigrafistas dedicados a la reproducción de obras de arte. El arte
              tattoo es parte de la contracultura que vivimos día a día y que resiste a los clásicos
              conceptos de la moda y el arte de la sociedad del consumo. Nuestra visión es poder
              generar diferentes tipos de relaciones humanas en cuanto a lo económico, como también
              buscar colaborar oficios para crear productos de la mas alta calidad del mercado ,
              haciendo con nuestras propias manos , creaciones del mas alto nivel.
            </p>
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
                            <img
                              src={require('./../../assets/images/logo_icon_history.png').default}
                              alt="icon"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ciyashop_info_box-content">
                      <div className="ciyashop_info_box-content-wrap">
                        <div className="ciyashop_info_box-content-inner">
                          <h5 className="ciyashop_info_box-title" style={{ color: '#323232' }}>
                            Autogestión{' '}
                          </h5>
                          <div className="ciyashop_info_box-description">
                            <p>
                              La autogestión no solo consiste en ser independiente financieramente.
                              La autogestión se diferencia de las relaciones capitalistas clásicas
                              ya que primero , consiste en tomar las riendas de tu vida. Segundo y
                              mas importante, que toda creación es a base del APOYO MUTUO, no sirve
                              de nada solo vender si no consumes también creaciones de manos
                              autogestionadas. La única forma de crecer es crecer en colectivo.
                            </p>
                            <br />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>{' '}
              <Col sm={6} className="pr-2">
                <div className="ciyashop_info_box ciyashop_info_box-layout-style_2 ciyashop_info_box-content_alignment-left ciyashop_info_box-with-icon ciyashop_info_box-icon-source-font ciyashop_info_box-icon-style-border ciyashop_info_box-icon-size-sm ciyashop_info_box-icon-shape-round ciyashop_info_box-icon_position-left info_box-step_position-above_title">
                  <img
                    src={require('./../../assets/images/autogestion.jpg').default}
                    style={{ borderRadius: '4px' }}
                    alt="icon"
                  />
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
