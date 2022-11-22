/**
 * InterestingFacts Widget
 */
import React from 'react'
import { Row, Col } from 'reactstrap'

const interestingDataLeft = [
  {
    number: 1,
    title: 'PINTURA',
    description: '',
    symbol: 'fa-birthday-cake',
    img: 'PINTURA_RANA.jpg',
  },
  {
    number: 2,
    title: 'SELECCIÓN DE TELAS',
    description: '',
    symbol: 'fa-times-circle-o',
  },
  {
    number: 3,
    title: 'CONFECCIÓN TEXTIL',
    description: '',
    symbol: 'fa-share-square-o',
  },
]

const interestingDataRight = [
  {
    number: 4,
    title: 'EL ARTE DE LA SERIGRAFÍA',
    description: '',
    symbol: 'fa-magic',
  },
  {
    number: 5,
    title: 'PRODUCTO FINAL',
    description: '',
    symbol: 'fa-street-view',
  },
  {
    number: 6,
    title: 'EXPERIENCIA TODO O NADA',
    description: '',
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
              <h2 className="font-bold title">COMO NACEN NUESTRAS CREACIONES</h2>
              <p className="text-center">
                El proceso de creación de los productos de nuestra marca
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
          <Col sm={4} className="">
            <img
              src={require(`../../assets/images/proceso_produccion.jpg`)}
              className="img-fluid"
              style={{ borderRadius: '4px' }}
            />
            <br />
          </Col>
          <Col lg={4} md={6}>
            {interestingDataRight.map((dataRight) => (
              <>
                <div className="mb-4 mb-md-6 mt-0 ciyashop_info_box ciyashop_info_box-layout-style_2 ciyashop_info_box-content_alignment-left ciyashop_info_box-with-icon ciyashop_info_box-icon-source-font ciyashop_info_box-icon-style-border ciyashop_info_box-icon-size-md ciyashop_info_box-icon-shape-round ciyashop_info_box-icon_position-left info_box-step_position-above_title">
                  <div className="ciyashop_info_box-inner clearfix left-info-icon-bottom">
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
