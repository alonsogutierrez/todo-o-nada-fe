import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Scrollbars } from 'react-custom-scrollbars'

import { categoryValue, colorValue, priceValue, sizeValue } from '../../../actions/filter'
import { uniqueCategory, uniqueColors, uniqueSizes } from '../../../services'

import './styles.css'

class SideFilter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sidebarmenu: false,
    }
    this.showfilter = this.showfilter.bind(this)
  }

  componentDidMount() {}

  showfilter() {
    this.setState((prevState) => ({
      sidebarmenu: !prevState.sidebarmenu,
    }))
  }

  onClickColorFilter(event, colors) {
    const { colorValue } = this.props
    const index = colors.indexOf(event.target.value)
    if (event.target.checked) {
      colors.push(event.target.value)
    } else {
      colors.splice(index, 1)
    }
    colorValue(colors)
  }

  onClickCategoryFilter(event, categorys) {
    const { categoryValue } = this.props
    const index = categorys.indexOf(event.target.value)
    if (event.target.checked) {
      categorys.push(event.target.value)
    } else {
      categorys.splice(index, 1)
    }
    categoryValue(categorys)
  }

  onClickSizeFilter(event, sizes) {
    const { sizeValue } = this.props
    const index = sizes.indexOf(event.target.value)
    if (event.target.checked) {
      sizes.push(event.target.value)
    } else {
      sizes.splice(index, 1)
    }
    sizeValue(sizes)
  }

  clearColor() {
    const { colorValue } = this.props
    colorValue([])
  }

  clearCategory() {
    const { categoryValue } = this.props
    categoryValue([])
  }

  clearSize() {
    const { sizeValue } = this.props
    sizeValue([])
  }

  render() {
    const { filters, colors, categorys, sizes } = this.props
    const sizeFilterValues = filters.size
    const categoryFilterValues = filters.category
    const colorsFilterValues = filters.color
    return (
      <div>
        <div className="widget widget_layered_nav widget-layered-nav pgs_widget-layered-nav">
          <div className="d-flex align-items-center justify-content-between">
            <h4 className="widget-title">Filtrar por color</h4>
            <p>
              <a className="price-clear-filter" onClick={() => this.clearColor()}>
                Limpiar
              </a>
            </p>
          </div>

          <div
            className="pgs-widget-layered-nav-list-container has-scrollbar"
            style={{ height: '210px' }}
          >
            <Scrollbars>
              <ul className="pgs-widget-layered-nav-list" tabIndex={0} style={{ right: '-17px' }}>
                {colors.map((color, index) => {
                  return (
                    <div className="form-check pgs-filter-checkbox" key={index}>
                      <input
                        type="checkbox"
                        onClick={(e) => this.onClickColorFilter(e, colorsFilterValues)}
                        value={color}
                        defaultChecked={colorsFilterValues.includes(color)}
                        className="form-check-input"
                        id={color}
                      />
                      <label className="form-check-label" htmlFor={color}>
                        {color}
                      </label>
                    </div>
                  )
                })}
              </ul>
            </Scrollbars>
          </div>
        </div>
        <div className="widget widget_layered_nav widget-layered-nav pgs_widget-layered-nav">
          <div className="d-flex align-items-center justify-content-between">
            <h4 className="widget-title">Filtrar por categoria</h4>
            <p>
              <a className="price-clear-filter" onClick={() => this.clearCategory()}>
                Limpiar
              </a>
            </p>
          </div>
          <div
            className="pgs-widget-layered-nav-list-container has-scrollbar"
            style={{ height: '215px' }}
          >
            <Scrollbars>
              {categorys.map((category, index) => {
                return (
                  <div className="form-check pgs-filter-checkbox" key={index}>
                    <input
                      type="checkbox"
                      onClick={(e) => this.onClickCategoryFilter(e, categoryFilterValues)}
                      value={category}
                      defaultChecked={categoryFilterValues.includes(category)}
                      className="form-check-input"
                      id={category}
                    />
                    <label className="form-check-label" htmlFor={category}>
                      {category}
                    </label>
                  </div>
                )
              })}
            </Scrollbars>
          </div>
        </div>
        <div className="widget widget_layered_nav widget-layered-nav pgs_widget-layered-nav">
          <div className="d-flex align-items-center justify-content-between">
            <h4 className="widget-title">Filtrar por tamaño</h4>
            <p>
              <a className="price-clear-filter" onClick={() => this.clearSize()}>
                Limpiar
              </a>
            </p>
          </div>
          <div
            className="pgs-widget-layered-nav-list-container has-scrollbar"
            style={{ height: '215px' }}
          >
            <Scrollbars>
              {sizes.map((size, index) => {
                return (
                  <div key={index} className="form-check pgs-filter-checkbox">
                    <input
                      type="checkbox"
                      onClick={(e) => this.onClickSizeFilter(e, sizeFilterValues)}
                      value={size}
                      defaultChecked={sizeFilterValues.includes(size)}
                      className="form-check-input"
                      id={size}
                    />
                    <label className="form-check-label" htmlFor={size}>
                      {size}
                    </label>
                  </div>
                )
              })}
            </Scrollbars>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  categorys: uniqueCategory(state.actualProductsDataReducer.actualProductsData),
  sizes: uniqueSizes(state.actualProductsDataReducer.actualProductsData),
  colors: uniqueColors(state.actualProductsDataReducer.actualProductsData),
  filters: state.filters,
})

export default connect(mapStateToProps, {
  categoryValue,
  sizeValue,
  colorValue,
  priceValue,
})(SideFilter)

SideFilter.defaultProps = {
  prices: {},
  sizes: [],
  categorys: [],
  filters: {},
  colors: [],
  colorValue: () => {},
  categoryValue: () => {},
  sizeValue: () => {},
  priceValue: () => {},
}

SideFilter.propTypes = {
  prices: PropTypes.object,
  sizes: PropTypes.array,
  categorys: PropTypes.array,
  filters: PropTypes.object,
  colors: PropTypes.array,
  colorValue: PropTypes.func,
  categoryValue: PropTypes.func,
  sizeValue: PropTypes.func,
  priceValue: PropTypes.func,
}
