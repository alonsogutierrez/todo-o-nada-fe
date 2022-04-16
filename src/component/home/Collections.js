import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import PropTypes from 'prop-types'

import { categoryValue } from './../../actions/filter'

import setCategorySelectedData from './../../actions/setCategorySelected'

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
    name: 'print-art',
    link: '/category/print-art',
  },
  {
    id: 3,
    imageSrc: require(`../../assets/images/japonesa_collection_banner-01.jpg`).default,
    name: 'irezumi',
    link: '/category/irezumi',
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
    props.setCategorySelectedData(categoryName)
    props.categoryValue([categoryName])
    props.history.push(`/category/${categoryName}`)
  }

  return (
    <Container>
      <Row className="margin-top-8 mb-7 pb-3 pb-sm-0">
        <Col sm={12} className="text-center">
          <div className="section-title">
            <h1>Colecciones</h1>
          </div>
          <Row>
            {collections.map((collection) => (
              <div className="col-lg-3" key={collection.id}>
                <Link
                  key={collection.id}
                  to={`/category/${collection.name}`}
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => handleCollectionClick(e, collection.name)}
                >
                  <div className="ciyashop_banner_wrapper">
                    <div className="ciyashop_banner ciyashop_banner-style-style-1 ciyashop_banner-effect-border banner-2">
                      <img
                        className="ciyashop_banner-image img-fluid inline"
                        alt="Banner"
                        src={collection.imageSrc}
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

const mapDistpachToProps = (dispatch) => ({
  setCategorySelectedData: (categorySelectedData) =>
    dispatch(setCategorySelectedData(categorySelectedData)),
  categoryValue: (categorySelectedData) => dispatch(categoryValue(categorySelectedData)),
})

export default connect(null, mapDistpachToProps)(withRouter(Collections))

Collections.defaultProps = {
  history: {},
  setCategorySelectedData: () => {},
  categoryValue: () => {},
}

Collections.propTypes = {
  history: PropTypes.object,
  setCategorySelectedData: PropTypes.func,
  categoryValue: PropTypes.func,
}
