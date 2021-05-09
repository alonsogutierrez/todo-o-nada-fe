import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Col, Form, Row } from 'reactstrap'
import PropTypes from 'prop-types'

import { ratingValue, sortValue } from '../../../actions/filter'

class TopFilter extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    var removeelems = document.getElementsByClassName('gridlist-button')
    ;[].forEach.call(removeelems, function (el) {
      el.classList.remove('active')
    })
    let layoutstyle = localStorage.getItem('setLayoutStyle')
    if (layoutstyle == 'col-sm-6 col-xl-3 col-lg-4') {
      document.querySelector('.grid-4-column').classList.add('active')
    } else if (layoutstyle == 'col-sm-6') {
      document.querySelector('.grid-2-column').classList.add('active')
    } else if (layoutstyle == 'col-sm-12') {
      document.querySelector('.gridlist-toggle-list').classList.add('active')
      if (document.querySelector('.pgs-product-list') !== null) {
        document.querySelector('.pgs-product-list').classList.remove('grid')
        document.querySelector('.pgs-product-list').classList.add('list')
      }
    } else {
      const querySelector = document.querySelector('.grid-3-column')
      console.log('querySelector: ', querySelector)
      if (querySelector) {
        querySelector.classList.add('active')
      }
    }
  }

  LayoutViewFour(Size) {
    var removeelems = document.getElementsByClassName('gridlist-button')
    ;[].forEach.call(removeelems, function (el) {
      el.classList.remove('active')
    })
    document.querySelector('.pgs-product-list').classList.remove('list')
    if (Size == '3') {
      document.querySelector('.grid-4-column').classList.add('active')
      localStorage.setItem('setLayoutStyle', 'col-sm-6 col-xl-3 col-lg-4')
    }
    if (!document.querySelector('.pgs-product-list').classList.contains('list-view')) {
      var elems = document.querySelector('.pgs-product-list').childNodes
      ;[].forEach.call(elems, function (el) {
        el.className = ''
        el.classList.add('col-sm-6')
        el.classList.add('col-xl-3')
        el.classList.add('col-lg-4')
      })
    }
  }

  render() {
    const totalProducts = this.props.totalProducts
    return (
      <Row>
        <Col>
          {totalProducts > 0 ? (
            <p className="result-count">
              Mostrando 1–{totalProducts} resultados de {totalProducts}
            </p>
          ) : (
            <p className="result-count">Mostrando 0 resultados de {totalProducts}</p>
          )}
          <div className="gridlist-toggle-wrap">
            <div className="gridlist-button-wrap">
              <div className="gridlist-toggle">
                <Link
                  to="#"
                  title="Grid view"
                  className="gridlist-button grid-4-column"
                  onClick={() => this.LayoutViewFour(3)}
                >
                  <em>Vista de cuadros</em>
                </Link>
              </div>
            </div>
          </div>
          <Form className="ordering">
            <select
              name="orderby"
              className="orderby select2"
              onChange={(e) => this.props.sortValue(e.target.value)}
              tabIndex={-1}
              aria-hidden="true"
            >
              <option value=" " selected="selected">
                Ordernar por
              </option>
              <option value="Pricehigh">Precio: Mayor a menor</option>
              <option value="Pricelow">Precio: Menor a mayor</option>
            </select>
          </Form>
        </Col>
      </Row>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  sortValue: (value) => dispatch(sortValue(value)),
  ratingValue: (value) => dispatch(ratingValue(value)),
})

export default connect(null, mapDispatchToProps)(TopFilter)

TopFilter.defaultProps = {
  totalProducts: 0,
  ratingValue: () => {},
  sortValue: () => {},
}

TopFilter.propTypes = {
  totalProducts: PropTypes.number,
  ratingValue: PropTypes.func,
  sortValue: PropTypes.func,
}
