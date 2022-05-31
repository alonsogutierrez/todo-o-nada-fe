import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Scrollbars } from 'react-custom-scrollbars'

import { categoryValue, colorValue, priceValue, sizeValue } from '../../../actions/filter'
import setActualProductsData from '../../../actions/setActualProductsData'
import setChangeProducts from '../../../actions/setChangeProducts'

import { uniqueCategory, uniqueColors, uniqueSizes, getFilterProductsdata } from '../../../services'

import './styles.css'

const SideFilter = (props) => {
  const [width, setWidth] = useState(window.innerWidth)
  const [openAllFilters, setOpenAllFilters] = useState(width < 992 ? false : true)
  const [openColorFilter, setOpenColorFilter] = useState(width < 992 ? false : true)
  const [openCategoryFilter, setOpenCategoryFilter] = useState(width < 992 ? false : true)
  const [openSizeFilter, setOpenSizeFilter] = useState(width < 992 ? false : true)

  const updateDimensions = () => {
    setWidth(window.innerWidth)
  }

  useEffect(async () => {
    window.addEventListener('resize', updateDimensions)
    setOpenAllFilters(width < 992 ? false : true)
    setOpenColorFilter(width < 992 ? false : true)
    setOpenCategoryFilter(width < 992 ? false : true)
    setOpenSizeFilter(width < 992 ? false : true)
    window.scrollTo(0, 0)
  }, [width])

  const onClickColorFilter = (event, colors) => {
    const { colorValue, setChangeProducts, changeProducts } = props
    const index = colors.indexOf(event.target.value)
    if (event.target.checked) {
      colors.push(event.target.value)
    } else {
      colors.splice(index, 1)
    }
    colorValue(colors)
    setChangeProducts(!changeProducts)
  }

  const onClickCategoryFilter = (event, categorys) => {
    const { categoryValue, setChangeProducts, changeProducts } = props
    const index = categorys.indexOf(event.target.value)
    if (event.target.checked) {
      categorys.push(event.target.value)
    } else {
      categorys.splice(index, 1)
    }
    categoryValue(categorys)
    setChangeProducts(!changeProducts)
  }

  const onClickSizeFilter = (event, sizes) => {
    const { sizeValue, setChangeProducts, changeProducts } = props
    const index = sizes.indexOf(event.target.value)
    if (event.target.checked) {
      sizes.push(event.target.value)
    } else {
      sizes.splice(index, 1)
    }
    sizeValue(sizes)
    setChangeProducts(!changeProducts)
  }

  const clearColor = () => {
    const { colorValue, setChangeProducts, changeProducts } = props
    colorValue([])
    setChangeProducts(!changeProducts)
  }

  const clearCategory = () => {
    const { categoryValue, setChangeProducts, changeProducts } = props
    categoryValue([])
    setChangeProducts(!changeProducts)
  }

  const clearSize = () => {
    const { sizeValue, setChangeProducts, changeProducts } = props
    sizeValue([])
    setChangeProducts(!changeProducts)
  }

  const setOpenAllFiltersHandler = (e, isOpen) => {
    e.preventDefault()
    setOpenAllFilters(isOpen)
  }

  const setOpenColorFilterHandler = (e, isOpen) => {
    e.preventDefault()
    setOpenColorFilter(isOpen)
  }

  const setOpenCategoryFilterHandler = (e, isOpen) => {
    e.preventDefault()
    setOpenCategoryFilter(isOpen)
  }

  const setOpenSizeFilterHandler = (e, isOpen) => {
    e.preventDefault()
    setOpenSizeFilter(isOpen)
  }

  const { filters, colors, categorys, sizes } = props
  const sizeFilterValues = filters.size
  const categoryFilterValues = filters.category
  const colorsFilterValues = filters.color

  const colorFilterMessageToggle = openColorFilter ? 'Ocultar' : 'Mostrar'
  const colorFilterIsOpenStyle = openColorFilter
    ? { height: '210px' }
    : { height: '210px', display: 'none' }

  const categoryFilterMessageToggle = openCategoryFilter ? 'Ocultar' : 'Mostrar'
  const categoryFilterIsOpenStyle = openCategoryFilter
    ? { height: '215px' }
    : { height: '215px', display: 'none' }

  const sizeFilterMessageToggle = openSizeFilter ? 'Ocultar' : 'Mostrar'
  const sizeFilterIsOpenStyle = openSizeFilter
    ? { height: '215px' }
    : { height: '215px', display: 'none' }
  return (
    <div>
      {openAllFilters ? (
        <>
          <div className="widget widget_layered_nav widget-layered-nav pgs_widget-layered-nav">
            <div className="d-flex align-items-center justify-content-between">
              <h4 className="widget-title">Ocultar los filtros</h4>
              <p
                className="btn btn-solid"
                onClick={(e) => setOpenAllFiltersHandler(e, !openAllFilters)}
              >
                {' - '}
              </p>
            </div>
          </div>
          <div className="widget widget_layered_nav widget-layered-nav pgs_widget-layered-nav">
            <div className="d-flex align-items-center justify-content-between">
              <h4 className="widget-title">Filtrar por color</h4>
              <p
                className="btn btn-solid"
                onClick={(e) => setOpenColorFilterHandler(e, !openColorFilter)}
              >
                {colorFilterMessageToggle}
              </p>
              <p>
                <a className="price-clear-filter" onClick={() => clearColor()}>
                  Limpiar
                </a>
              </p>
            </div>

            <div
              className="pgs-widget-layered-nav-list-container has-scrollbar"
              style={colorFilterIsOpenStyle}
            >
              <Scrollbars>
                <ul className="pgs-widget-layered-nav-list" tabIndex={0} style={{ right: '-17px' }}>
                  {colors.map((color, index) => {
                    return (
                      <div className="form-check pgs-filter-checkbox" key={index}>
                        <input
                          type="checkbox"
                          onClick={(e) => onClickColorFilter(e, colorsFilterValues)}
                          value={color}
                          checked={colorsFilterValues.includes(color)}
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
              <p
                className="btn btn-solid"
                onClick={(e) => setOpenCategoryFilterHandler(e, !openCategoryFilter)}
              >
                {categoryFilterMessageToggle}
              </p>
              <p>
                <a className="price-clear-filter" onClick={() => clearCategory()}>
                  Limpiar
                </a>
              </p>
            </div>
            <div
              className="pgs-widget-layered-nav-list-container has-scrollbar"
              style={categoryFilterIsOpenStyle}
            >
              <Scrollbars>
                {categorys.map((category, index) => {
                  return (
                    <div className="form-check pgs-filter-checkbox" key={index}>
                      <input
                        type="checkbox"
                        onClick={(e) => onClickCategoryFilter(e, categoryFilterValues)}
                        value={category}
                        checked={categoryFilterValues.includes(category)}
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
              <p
                className="btn btn-solid"
                onClick={(e) => setOpenSizeFilterHandler(e, !openSizeFilter)}
              >
                {sizeFilterMessageToggle}
              </p>
              <p>
                <a className="price-clear-filter" onClick={() => clearSize()}>
                  Limpiar
                </a>
              </p>
            </div>
            <div
              className="pgs-widget-layered-nav-list-container has-scrollbar"
              style={sizeFilterIsOpenStyle}
            >
              <Scrollbars>
                {sizes.map((size, index) => {
                  return (
                    <div key={index} className="form-check pgs-filter-checkbox">
                      <input
                        type="checkbox"
                        onClick={(e) => onClickSizeFilter(e, sizeFilterValues)}
                        value={size}
                        checked={sizeFilterValues.includes(size)}
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
        </>
      ) : (
        <div className="widget widget_layered_nav widget-layered-nav pgs_widget-layered-nav">
          <div className="d-flex align-items-center justify-content-between">
            <h4 className="widget-title">Mostrar los filtros</h4>
            <p
              className="btn btn-solid"
              onClick={(e) => setOpenAllFiltersHandler(e, !openAllFilters)}
            >
              {' + '}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  actualProductsData: getFilterProductsdata(
    state.actualProductsDataReducer.actualProductsData,
    state.filters
  ),
  changeProducts: state.changeProductsDataReducer.changeProductsData,
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
  setActualProductsData,
  setChangeProducts,
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
  actualProductsData: {},
  setActualProductsData: () => {},
  setChangeProducts: () => {},
  changeProducts: false,
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
  actualProductsData: PropTypes.object,
  setActualProductsData: PropTypes.func,
  setChangeProducts: PropTypes.func,
  changeProducts: PropTypes.bool,
}
