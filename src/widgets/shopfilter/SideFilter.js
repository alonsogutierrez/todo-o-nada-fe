/**
 * Shop Page Side Bar Filter
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { categoryValue, colorValue, priceValue, searchValue, sizeValue } from '../../actions/filter'
import { uniqueCategory, uniqueColors, uniqueMinMaxPrice, uniqueSizes } from '../../services'
import { Scrollbars } from 'react-custom-scrollbars'
import './styles.css'

class SideFilter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      SearchValue: '',
      priceplace: [this.props.prices.min, this.props.prices.max],
      setfistprice: [this.props.prices.min, this.props.prices.max],
      sidebarmenu: false,
    }
    this.showfilter = this.showfilter.bind(this)
  }

  componentDidMount() {
    this.setState({
      SearchValue: '',
    })
    this.props.searchValue('')
    //this.nameInput.focus()
  }

  showfilter() {
    this.setState((prevState) => ({
      sidebarmenu: !prevState.sidebarmenu,
    }))
  }

  onClickColorFilter(event, colors) {
    var index = colors.indexOf(event.target.value)
    if (event.target.checked) {
      colors.push(event.target.value)
    } else {
      colors.splice(index, 1)
    }
    this.props.colorValue(colors)
  }

  onClickCategoryFilter(event, categorys) {
    var index = categorys.indexOf(event.target.value)
    if (event.target.checked) {
      categorys.push(event.target.value)
    } else {
      categorys.splice(index, 1)
    }
    this.props.categoryValue(categorys)
  }

  onClickSizeFilter(event, sizes) {
    var index = sizes.indexOf(event.target.value)
    if (event.target.checked) {
      sizes.push(event.target.value)
    } else {
      sizes.splice(index, 1)
    }
    this.props.sizeValue(sizes)
  }

  SearchTextchange(SearchText) {
    //TODO: Call to Search API
    this.setState({
      SearchValue: SearchText.target.value,
    })
    this.props.searchValue(SearchText.target.value)
  }

  // Clear Color Filter Code
  clearcolor() {
    var colors = []
    this.props.colorValue(colors)
  }

  // Clear Category Filter Code
  clearcategory() {
    var categorys = []
    this.props.categoryValue(categorys)
  }

  // Clear Size Filter Code
  clearsize() {
    var sizes = []
    this.props.sizeValue(sizes)
  }

  render() {
    const sizeFilterValues = this.props.filters.size
    const categoryFilterValues = this.props.filters.category
    const colorsFilterValues = this.props.filters.color
    return (
      <div>
        {/* <div className="widget">
          <h4 className="widget-title">Buscar</h4>
          <input
            type="text"
            id="btn-search"
            ref={(input) => {
              this.nameInput = input
            }}
            className="form-control"
            value={this.state.SearchValue}
            onChange={this.SearchTextchange.bind(this)}
            placeholder="Busca un producto"
          />
        </div> */}
        <div className="widget widget_layered_nav widget-layered-nav pgs_widget-layered-nav">
          <div className="d-flex align-items-center justify-content-between">
            <h4 className="widget-title">Filtrar por color</h4>
            <p>
              <a className="price-clear-filter" onClick={() => this.clearcolor()}>
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
                {this.props.colors.map((color, index) => {
                  return (
                    <div className="form-check pgs-filter-checkbox" key={index}>
                      <input
                        type="checkbox"
                        onClick={(e) => this.onClickColorFilter(e, colorsFilterValues)}
                        value={color}
                        defaultChecked={colorsFilterValues.includes(color) ? true : false}
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
              <a className="price-clear-filter" onClick={() => this.clearcategory()}>
                Limpiar
              </a>
            </p>
          </div>
          <div
            className="pgs-widget-layered-nav-list-container has-scrollbar"
            style={{ height: '215px' }}
          >
            <Scrollbars>
              {this.props.categorys.map((category, index) => {
                return (
                  <div className="form-check pgs-filter-checkbox" key={index}>
                    <input
                      type="checkbox"
                      onClick={(e) => this.onClickCategoryFilter(e, categoryFilterValues)}
                      value={category}
                      defaultChecked={categoryFilterValues.includes(category) ? true : false}
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
              <a className="price-clear-filter" onClick={() => this.clearsize()}>
                Limpiar
              </a>
            </p>
          </div>
          <div
            className="pgs-widget-layered-nav-list-container has-scrollbar"
            style={{ height: '215px' }}
          >
            <Scrollbars>
              {this.props.sizes.map((size, index) => {
                return (
                  <div key={index} className="form-check pgs-filter-checkbox">
                    <input
                      type="checkbox"
                      onClick={(e) => this.onClickSizeFilter(e, sizeFilterValues)}
                      value={size}
                      defaultChecked={sizeFilterValues.includes(size) ? true : false}
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
  categorys: uniqueCategory(state.data.products),
  sizes: uniqueSizes(state.data.products),
  colors: uniqueColors(state.data.products),
  prices: uniqueMinMaxPrice(state.data.products),
  filters: state.filters,
})

export default connect(mapStateToProps, {
  categoryValue,
  sizeValue,
  colorValue,
  priceValue,
  searchValue,
})(SideFilter)

SideFilter.defaultProps = {
  prices: {},
  sizes: [],
  categorys: [],
  filters: {},
  colors: [],
  searchValue: () => {},
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
  searchValue: PropTypes.func,
  colorValue: PropTypes.func,
  categoryValue: PropTypes.func,
  sizeValue: PropTypes.func,
  priceValue: PropTypes.func,
}
