import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Input } from 'reactstrap'
import ClientAPI from '../../../../common/ClientAPI'

const SearchBar = () => {
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
    return true
  }

  const onSearchSubmit = async (e) => {
    e.preventDefault()
    setLoading(!loading)
    const searchValidation = handleSearchValidation()
    if (searchValidation) {
      try {
        const searchResult = await clientAPI.getSearch(searchText)
        console.log('searchResult: ', searchResult)
      } catch (err) {
        setLoading(!loading)
        console.log('error en busqueda: ', err.message)
      }
    } else {
      setLoading(!loading)
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
        <form onSubmit={onSearchSubmit}>
          <Row style={rowStyle} className="ciya-tools-action ciya-tools-search">
            <Col xs="10">
              <Input
                type="text"
                className="form-control"
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
              ></button>
            </Col>
          </Row>
        </form>
      </Container>
    </>
  )
}

export default SearchBar
