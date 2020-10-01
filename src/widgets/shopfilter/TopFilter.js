/**
 * Shop Page Top Filter
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Col, Form, Row } from 'reactstrap'
import PropTypes from 'prop-types'

import { ratingValue, sortValue } from '../../actions/filter'
import MyProduct from '../../api/product'
import { getFilterProductsdata } from '../../services'

class TopFilter extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    var removeelems = document.getElementsByClassName('gridlist-button');
    [].forEach.call(removeelems, function(el) {
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
      document.querySelector('.grid-3-column').classList.add('active')
    }
  }
  // Grid List View Display
  GridListview() {
    var removeelems = document.getElementsByClassName('gridlist-button');
    [].forEach.call(removeelems, function(el) {
      el.classList.remove('active')
    })

    document.querySelector('.gridlist-toggle-list').classList.add('active')
    document.querySelector('.pgs-product-list').classList.remove('grid')
    document.querySelector('.pgs-product-list').classList.add('list')
    localStorage.setItem('setLayoutStyle', 'col-sm-12')
    var elems = document.querySelector('.pgs-product-list').childNodes;
    [].forEach.call(elems, function(el) {
      el.className = ''
      el.classList.add('col-sm-12')
    })
  }

  // Change Col List On Click Grid List
  LayoutTwoView(Size) {
    var removeelems = document.getElementsByClassName('gridlist-button');
    [].forEach.call(removeelems, function(el) {
      el.classList.remove('active')
    })

    document.querySelector('.pgs-product-list').classList.remove('list')
    if (Size == '6') {
      document.querySelector('.grid-2-column').classList.add('active')
      localStorage.setItem('setLayoutStyle', 'col-sm-6')
    } else {
      document.querySelector('.grid-3-column').classList.add('active')
      localStorage.setItem('setLayoutStyle', 'col-sm-6 col-md-4')
    }

    if (!document.querySelector('.pgs-product-list').classList.contains('list-view')) {
      var elems = document.querySelector('.pgs-product-list').childNodes;
      [].forEach.call(elems, function(el) {
        el.className = ''
        el.classList.add('col-sm-' + Size)
      })
    }
  }
  LayoutViewFour(Size) {
    var removeelems = document.getElementsByClassName('gridlist-button');
    [].forEach.call(removeelems, function(el) {
      el.classList.remove('active')
    })
    document.querySelector('.pgs-product-list').classList.remove('list')
    if (Size == '3') {
      document.querySelector('.grid-4-column').classList.add('active')
      localStorage.setItem('setLayoutStyle', 'col-sm-6 col-xl-3 col-lg-4')
    }
    if (!document.querySelector('.pgs-product-list').classList.contains('list-view')) {
      var elems = document.querySelector('.pgs-product-list').childNodes;
      [].forEach.call(elems, function(el) {
        el.className = ''
        el.classList.add('col-sm-6')
        el.classList.add('col-xl-3')
        el.classList.add('col-lg-4')
      })
    }
  }
  LayoutViewThree(Size) {
    var removeelems = document.getElementsByClassName('gridlist-button');
    [].forEach.call(removeelems, function(el) {
      el.classList.remove('active')
    })
    document.querySelector('.pgs-product-list').classList.remove('list')
    if (Size == '4') {
      document.querySelector('.grid-3-column').classList.add('active')
      localStorage.setItem('setLayoutStyle', 'col-sm-6 col-md-4')
    }
    if (!document.querySelector('.pgs-product-list').classList.contains('list-view')) {
      var elems = document.querySelector('.pgs-product-list').childNodes;
      [].forEach.call(elems, function(el) {
        el.className = ''
        el.classList.add('col-sm-6')
        el.classList.add('col-md-4')
      })
    }
  }

  render() {
    const productsLength = this.props.productsLength
    return (
      <Row>
        <Col>
          {productsLength > 0 ? (
            <p className="result-count">
              Mostrando 1–{productsLength} resultados de {MyProduct.length}
            </p>
          ) : (
            <p className="result-count">Mostrando 0 resultados de {MyProduct.length}</p>
          )}
          <div className="gridlist-toggle-wrap">
            <div className="gridlist-button-wrap">
              <div className="gridlist-toggle">
                <Link
                  title="Grid view"
                  className="gridlist-button grid-2-column"
                  onClick={() => this.LayoutTwoView(6)}
                >
                  <em>Vista de cuadros</em>
                </Link>
                <Link
                  to="#"
                  title="Grid view"
                  className="gridlist-button grid-3-column active"
                  onClick={() => this.LayoutViewThree(4)}
                >
                  <em>Vista de cuadros</em>
                </Link>
                <Link
                  to="#"
                  title="Grid view"
                  className="gridlist-button grid-4-column"
                  onClick={() => this.LayoutViewFour(3)}
                >
                  <em>Vista de cuadros</em>
                </Link>
                <Link
                  to="#"
                  title="List view"
                  className="gridlist-button gridlist-toggle-list"
                  onClick={() => this.GridListview()}
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
              onChange={e => this.props.ratingValue(e.target.value)}
              tabIndex={-1}
              aria-hidden="true"
            >
              <option value="" selected="selected">
                Rating
              </option>
              <option value="5">5 Estrellas</option>
              <option value="4">4 Estrellas</option>
              <option value="3">3 Estrellas</option>
              <option value="2">2 Estrellas</option>
              <option value="1">1 Estrellas</option>
            </select>
          </Form>
          <Form className="ordering">
            <select
              name="orderby"
              className="orderby select2"
              onChange={e => this.props.sortValue(e.target.value)}
              tabIndex={-1}
              aria-hidden="true"
            >
              <option value=" " selected="selected">
                Ordernar por
              </option>
              <option value="NewProduct">Los más nuevos</option>
              <option value="Pricehigh">Precio: Mayor a menor</option>
              <option value="Pricelow">Precio: Menor a mayor</option>
            </select>
          </Form>
        </Col>
      </Row>
    )
  }
}

const mapDispatchToProps = state => ({
  products: getFilterProductsdata(state.data, state.filters),
  filters: state.filters
})

export default connect(mapDispatchToProps, { sortValue, ratingValue })(TopFilter)

TopFilter.defaultProps = {
  productsLength: 0,
  ratingValue: () => {},
  sortValue: () => {}
}

TopFilter.propTypes = {
  productsLength: PropTypes.number,
  ratingValue: PropTypes.func,
  sortValue: PropTypes.func
}
