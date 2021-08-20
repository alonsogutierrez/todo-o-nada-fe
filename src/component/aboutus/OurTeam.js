/**
 * OurTeam Widget
 */
import React from 'react'
import Slider from 'react-slick'
import { Col, Container, Row } from 'reactstrap'
import PropTypes from 'prop-types'

const teamMembers = [
  {
    name: 'Jose',
    lastName: 'González',
    role: 'Administrador, diseñador',
    imageName: '',
  },
  {
    name: 'Camilo',
    lastName: 'González',
    role: 'Diseñador, artista',
    imageName: '',
  },
  {
    name: 'Nose',
    lastName: 'APellido',
    role: 'Administrador, diseñador',
    imageName: '',
  },
]

const OurTeam = (props) => {
  const settings = props.settings
  return (
    <div className="section-wrapper section-ptb">
      <Container>
        <Row className="justify-content-center">
          <Col sm={12} lg={7}>
            <div className="section-title text-center">
              <h2 className="title">Equipo</h2>
              <p className="text-center">
                Nuestor equipo esta conformado por José González, Camilo y etc...
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <div className="ciyashop_team_member_list ciyashop_team_members_style_style-3">
              <Slider {...settings} className="slider-arrow-hover slider-spacing-10">
                {teamMembers.map((member) => (
                  <>
                    <div className="item">
                      <div className="team shadow">
                        <div className="team-images">
                          <img
                            className="img-fluid"
                            src={require(`../../assets/images/team/img-01.jpg`).default}
                          />
                        </div>
                        <div className="team-info">
                          <div className="team-description">
                            <h4>{`${member.name} ${member.lastName}`}</h4>
                            <span>{member.role}</span>
                          </div>{' '}
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </Slider>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default OurTeam

OurTeam.defaultProps = {
  settings: {},
}

OurTeam.propTypes = {
  settings: PropTypes.object,
}
