/**
 * Shop Page Top Filter
 */
import React, { Component } from 'react'
import { Row, Col, Form } from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { sortValue, ratingValue } from '../../actions/filter'
import { getFilterProductsdata } from '../../services'
import MyProduct from '../../api/product'

class ListviewFilter extends Component {
  componentDidMount() {}
  render() {
    const productlength = this.props.productlength
    return (
      <Row>
        <Col>
          {productlength > 0 ? (
            <p className='result-count'>
              Showing 1–{productlength} results of {MyProduct.length}
            </p>
          ) : (
            <p className='result-count'>
              Showing 0 results of {MyProduct.length}
            </p>
          )}

          <Form className='ordering'>
            <select
              name='orderby'
              className='orderby select2'
              onChange={e => this.props.ratingValue(e.target.value)}
              tabIndex={-1}
              aria-hidden='true'
            >
              <option value='' selected='selected'>
                Any Rating
              </option>
              <option value='5'>5 Star</option>
              <option value='4'>4 Star</option>
              <option value='3'>3 Star</option>
              <option value='2'>2 Star</option>
              <option value='1'>1 Star</option>
            </select>
          </Form>
          <Form className='ordering'>
            <select
              name='orderby'
              className='orderby select2'
              onChange={e => this.props.sortValue(e.target.value)}
              tabIndex={-1}
              aria-hidden='true'
            >
              <option value=' ' selected='selected'>
                Default sorting
              </option>
              <option value='NewProduct'>Newest Items</option>
              <option value='Pricehigh'>Price: High to Low</option>
              <option value='Pricelow'>Price: Low to High</option>
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

export default connect(mapDispatchToProps, { sortValue, ratingValue })(
  ListviewFilter
)

ListviewFilter.defaultProps = {
  productlength: 0,
  ratingValue: () => {},
  sortValue: () => {}
}

ListviewFilter.propTypes = {
  productlength: PropTypes.number,
  ratingValue: PropTypes.func,
  sortValue: PropTypes.func
}
