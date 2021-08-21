import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import PropTypes from 'prop-types'

const collections = [
  {
    id: 1,
    imageSrc: require(`../../assets/images/tradi_largo_banner-01.jpg`).default,
    name: 'traditional',
    link: '/category/traditional',
  },
  {
    id: 2,
    imageSrc: require(`../../assets/images/print_banner-01.jpg`).default,
    name: 'print',
    link: '/category/print',
  },
  {
    id: 3,
    imageSrc: require(`../../assets/images/japonesa_collection_banner-01.jpg`).default,
    name: 'japon',
    link: '/category/japon',
  },
  {
    id: 4,
    imageSrc: require(`../../assets/images/dragons_collection_banner-01.jpg`).default,
    name: 'dragon',
    link: '/category/dragon',
  },
]

const Collections = (props) => {
  const handleCollectionClick = (e, categoryName) => {
    e.preventDefault()
    props.history.push(`/category/${categoryName}`)
  }

  return (
    <Container>
      <Row className="margin-top-8 mb-7 pb-3 pb-sm-0">
        <Col sm={12}>
          <Row>
            {collections.map((collection) => (
              <div className="col-lg-3" key={collection.id}>
                <Link
                  key={collection.id}
                  to={`/category/${collection.name}`}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="ciyashop_banner_wrapper">
                    <div className="ciyashop_banner ciyashop_banner-style-style-1 ciyashop_banner-effect-border banner-2">
                      <img
                        className="ciyashop_banner-image img-fluid inline"
                        alt="Banner"
                        src={collection.imageSrc}
                        onClick={(e) => handleCollectionClick(e, collection.name)}
                      />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default withRouter(Collections)

Collections.defaultProps = {
  history: {},
}

Collections.propTypes = {
  history: PropTypes.object,
}
