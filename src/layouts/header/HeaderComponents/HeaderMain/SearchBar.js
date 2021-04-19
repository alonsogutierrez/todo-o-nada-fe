import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Container, Row, Col, Input } from 'reactstrap'
import PropTypes from 'prop-types'

import ClientAPI from '../../../../common/ClientAPI'
import setActualProductsData from '../../../../actions/setActualProductsData'
import setChangeProducts from '../../../../actions/setChangeProducts'

const SearchBar = (props) => {
  const [searchText, setSearchText] = useState('')
  const [clientAPI] = useState(new ClientAPI())
  const [errors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleSearchInput = (e) => {
    const searchTextInput = e.target.value
    const searchTextFormatted = searchTextInput.replace(/[^a-zA-ZáéíñóúüÁÉÍÑÓÚÜ´'\s]/g, '')
    setSearchText(searchTextFormatted)
  }

  const handleSearchValidation = () => {
    //TODO: Add search input validation logic
    return true
  }

  const onSearchSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const searchValidation = handleSearchValidation()
    if (searchValidation) {
      try {
        const searchResult = await clientAPI.getSearch(searchText)
        //TODO: Save product search result into reducer
        props.setProducts(searchResult)
        props.setChangeProducts(!props.changeProducts)
        console.log('searchResult: ', searchResult)
        setLoading(false)
        props.history.push(`/search?query=${searchText}`)
      } catch (err) {
        setLoading(false)
        console.log('error en busqueda: ', err.message)
      }
    } else {
      setLoading(false)
      console.log('busqueda invalida')
    }
  }

  useEffect(() => {
    var evt = document.createEvent('Event')
    evt.initEvent('load', false, false)
    window.dispatchEvent(evt)
    window.scrollTo(0, 0)
  }, [])

  const rowStyle = {
    paddingTop: '15px',
  }

  return (
    <>
      <Container>
        <form role="search" onSubmit={(e) => onSearchSubmit(e)}>
          <Row style={rowStyle} className="ciya-tools-action ciya-tools-search">
            <Col xs="10">
              <Input
                type="search"
                className="form-control"
                maxLength={150}
                name="search_text_input"
                id="search_text_input"
                placeholder="Ingresa tu búsqueda"
                value={searchText}
                onChange={(e) => handleSearchInput(e)}
              />
              <span className="error">{errors['search-error']}</span>
            </Col>

            <Col xs="2">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-solid glyph-icon pgsicon-ecommerce-magnifying-glass"
                onClick={(e) => onSearchSubmit(e)}
              ></button>
            </Col>
          </Row>
        </form>
      </Container>
    </>
  )
}

const mapDispatchToProps = (dispatch) => ({
  setProducts: (products) => dispatch(setActualProductsData(products)),
  setChangeProducts: (changeProducts) => dispatch(setChangeProducts(changeProducts)),
})

export default connect(null, mapDispatchToProps)(withRouter(SearchBar))

SearchBar.defaultProps = {
  history: {},
  setProducts: () => {},
  changeProducts: false,
  setChangeProducts: () => {},
}

SearchBar.propTypes = {
  history: PropTypes.object,
  setProducts: PropTypes.func,
  changeProducts: PropTypes.bool,
  setChangeProducts: PropTypes.func,
}
