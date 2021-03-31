import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import useAxios from '../../hooks/useAxios'
import { Container, Row } from 'reactstrap'

const ProductPDP = () => { // TODO: debe recibir el itemNumber como parametro
  window.scrollTo(0, 0) // TODO: Dejo esto ?

  const { loading, data } = useAxios('/product/itemNumber/1')
  console.log(loading, data)

  if (loading) {
    // TODO agregar ruedita !
    return (
      <div>cargando</div>
    )
  }

  return (
    <div className="site-content">
      <div className="inner-intro">
        <Container>
          <Row className="intro-title align-items-center">
            <div className="col-12">
              <ul className="ciyashop_breadcrumbs page-breadcrumb breadcrumbs">
                <li className="home">
                        <span>
                          <Link className="bread-link bread-home" to="/">
                            Home
                          </Link>
                        </span>
                </li>
                <li>
                  <span>{data.category[0]}</span>
                </li>
                <li>
                  <span>{data.name}</span>
                </li>
              </ul>
            </div>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default connect(null)(withRouter(ProductPDP))

ProductPDP.defaultProps = {
  data: {},
}

ProductPDP.propTypes = {
  data: PropTypes.shape({
    category: PropTypes.array,
    name: PropTypes.string,
  })
}
