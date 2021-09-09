/**
 * InterestingFacts Widget
 */
import React from 'react'
import { Row, Col } from 'reactstrap'

const interestingDataLeft = [
  {
    number: 1,
    title: 'Nuestro comienzo',
    description:
      'Partimos a mediados del año 2017, desde ese entonces hemos crecido bastante y queremos seguir haciendolo, entregando nuestro arte.',
    symbol: 'fa-birthday-cake',
  },
  {
    number: 2,
    title: 'Hacemos devoluciones',
    description:
      'Si dentro de 30 días tu producto presenta algún desperfecto ocasionado por problemas de confección te devolveremos el dinero',
    symbol: 'fa-times-circle-o',
  },
  {
    number: 3,
    title: 'Canales oficiales',
    description:
      'Siguenos en instagram en @todoonadatattooart, tenemos muchas promociones y novedades, no te las pierdas',
    symbol: 'fa-share-square-o',
  },
]

const interestingDataRight = [
  {
    number: 4,
    title: 'Diseños',
    description: 'Nuestros diseños son únicos y hechos por los mejores tatuadores',
    symbol: 'fa-magic',
  },
  {
    number: 5,
    title: 'Tienda oficial',
    description: 'Casa Brasil (Catedral 2116, metro Cumming), Santiago, Chile.',
    symbol: 'fa-street-view',
  },
  {
    number: 6,
    title: 'Nuestra insignia',
    description: 'Nuestros productos y trabajo son libre de explotación y fascismo!',
    symbol: 'fa-gift',
  },
]

function InterestingFacts() {
  return (
    <div className="section-wrapper section-ptb bg-gray">
      <div className="container">
        <Row>
          <Col sm={12}>
            <div className="section-title text-center">
              <h2 className="font-bold title">Hitos interesantes</h2>
              <p className="text-center">
                Descubre las mejores colecciones del arte tattoo en prendas únicas, ven a conocer
                parte de lo que somos y como trabajamos
              </p>
            </div>
          </Col>
        </Row>
        <Row className="align-items-center">
          <Col lg={4} md={6}>
            {interestingDataLeft.map((leftData) => (
              <>
                <div className="mb-4 mb-md-6 mt-4 mt-md-6 ciyashop_info_box ciyashop_info_box-layout-style_2 ciyashop_info_box-content_alignment-right ciyashop_info_box-with-icon ciyashop_info_box-icon-source-font ciyashop_info_box-icon-style-border ciyashop_info_box-icon-size-md ciyashop_info_box-icon-shape-round ciyashop_info_box-icon_position-right info_box-step_position-above_title">
                  <div className="ciyashop_info_box-inner clearfix">
                    <div className="ciyashop_info_box-icon">
                      <div className="ciyashop_info_box-icon-wrap">
                        <div className="ciyashop_info_box-icon-outer">
                          <div
                            className="ciyashop_info_box-icon-inner"
                            style={{
                              borderColor: '#04d39f',
                              borderWidth: '2px',
                              borderStyle: 'solid',
                            }}
                          >
                            <i className={`fa ${leftData.symbol}`} style={{ color: '#04d39f' }} />{' '}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ciyashop_info_box-content">
                      <div className="ciyashop_info_box-content-wrap">
                        <div className="ciyashop_info_box-content-inner">
                          <div className="ciyashop_info_box-step-wrapper">
                            <span className="ciyashop_info_box-step">{`0${leftData.number}`} </span>
                          </div>
                          <h4 className="ciyashop_info_box-title" style={{ color: '#323232' }}>
                            {leftData.title}{' '}
                          </h4>
                          <div className="ciyashop_info_box-description">
                            <p>{leftData.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}{' '}
          </Col>
          <Col sm={4} className="d-none d-lg-block">
            <img
              src={require(`../../assets/images/interesting-image-1.jpg`).default}
              className="img-fluid"
              style={{ borderRadius: '4px' }}
            />
          </Col>
          <Col lg={4} md={6}>
            {interestingDataRight.map((dataRight) => (
              <>
                <div className="mb-4 mb-md-6 mt-0 ciyashop_info_box ciyashop_info_box-layout-style_2 ciyashop_info_box-content_alignment-left ciyashop_info_box-with-icon ciyashop_info_box-icon-source-font ciyashop_info_box-icon-style-border ciyashop_info_box-icon-size-md ciyashop_info_box-icon-shape-round ciyashop_info_box-icon_position-left info_box-step_position-above_title">
                  <div className="ciyashop_info_box-inner clearfix left-info-icon-bottom">
                    <div className="ciyashop_info_box-icon">
                      <div className="ciyashop_info_box-icon-wrap">
                        <div className="ciyashop_info_box-icon-outer">
                          <div
                            className="ciyashop_info_box-icon-inner"
                            style={{
                              borderColor: '#04d39f',
                              borderWidth: '2px',
                              borderStyle: 'solid',
                            }}
                          >
                            <i className={`fa ${dataRight.symbol}`} style={{ color: '#04d39f' }} />{' '}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ciyashop_info_box-content">
                      <div className="ciyashop_info_box-content-wrap">
                        <div className="ciyashop_info_box-content-inner">
                          <div className="ciyashop_info_box-step-wrapper">
                            <span className="ciyashop_info_box-step">{`0${dataRight.number}`}</span>
                          </div>
                          <h4 className="ciyashop_info_box-title" style={{ color: '#323232' }}>
                            {dataRight.title}{' '}
                          </h4>
                          <div className="ciyashop_info_box-description">
                            <p>{dataRight.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default InterestingFacts
