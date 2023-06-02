import React, { useState, useEffect } from 'react'
import { Row, Container, Col } from 'reactstrap'
import Loader from 'react-loader-spinner'
import { DragDropContext } from 'react-beautiful-dnd'

import Carrousel from './Carrousel'
import AdminProduct from './../Product/AdminProduct'

import ClientAPI from '../../../common/ClientAPI'

import './carrouselsStyle.css'

// TODO: Call to BFF to get carrouself config data
const carrouselsListData = {
  'dropIdx-0': {
    id: 'dropIdx-0',
    title: 'Agregar items',
    products: [],
  },
  'dropIdx-1': {
    id: 'dropIdx-1',
    title: 'Nuevos Lanzamientos',
    products: [
      {
        name: 'Polera 1',
        price: 1990,
        picture:
          'https://todo-o-nada-imagenes.s3.us-east-2.amazonaws.com/images/products/KANNONBLANCA1.jpg',
      },
      {
        name: 'Polera 2',
        price: 1990,
        picture:
          'https://todo-o-nada-imagenes.s3.us-east-2.amazonaws.com/images/products/KANNONBLANCA1.jpg',
      },
    ],
  },
  'dropIdx-2': {
    id: 'dropIdx-2',
    title: 'Irezumi Art Collection',
    products: [
      {
        name: 'Polera Irezumi',
        price: 1990,
        picture: 'https://todo-o-nada-imagenes.s3.us-east-2.amazonaws.com/images/products/4.jpg',
      },
      {
        name: 'Polera Irezumi 2',
        price: 1990,
        picture: 'https://todo-o-nada-imagenes.s3.us-east-2.amazonaws.com/images/products/4.jpg',
      },
    ],
  },
  'dropIdx-3': {
    id: 'dropIdx-3',
    title: 'Todo o nada Art Collection',
    products: [
      {
        name: 'Polera Irezumix v2',
        price: 1990,
        picture: 'https://todo-o-nada-imagenes.s3.us-east-2.amazonaws.com/images/products/4.jpg',
      },
    ],
  },
}

const CarrouselsForm = () => {
  const [carrouselsLists, setCarrouselsList] = useState(carrouselsListData)
  const [productTextSearch, setProductTextSearch] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [clientAPI] = useState(new ClientAPI())

  useEffect(async () => {
    if (productTextSearch === '') {
      const adminProductResponse = await clientAPI.getAdminAllProducts()
      if (adminProductResponse.total > 0) {
        setProducts(adminProductResponse.hits)
        setLoading(false)
      } else {
        setProducts([])
        setLoading(false)
      }
    }

    window.scrollTo(0, 0)
  }, [productTextSearch])

  const onProductSearch = (event) => {
    const inputProductTextSearch = event.target.value
    let curr_products
    let actualProducts = []
    if (products) {
      actualProducts = products
    }
    if (inputProductTextSearch === '' || !inputProductTextSearch) {
      setProductTextSearch(inputProductTextSearch)
      setProducts([])
    } else {
      let searchData = actualProducts.filter((productData) => {
        const { _source } = productData
        if (_source && Object.keys(_source).length > 0) {
          const { name } = _source
          if (!name) return false
          if (inputProductTextSearch === inputProductTextSearch.toLowerCase()) {
            let product = name.toLowerCase().indexOf(inputProductTextSearch.toLowerCase()) > -1
            return product
          } else {
            let product = name.toUpperCase().indexOf(inputProductTextSearch.toUpperCase()) > -1
            return product
          }
        }
      })
      curr_products = null
      if (searchData.length > 12) {
        curr_products = searchData.slice(0, 12)
      } else {
        curr_products = searchData
      }

      setProductTextSearch(inputProductTextSearch)
      setProducts(curr_products)

      if (curr_products.length > 0) {
        const length =
          actualProducts.length > 0 && actualProducts.length < 5 ? actualProducts.length : 5
        const newItems = []

        for (let idx = 0; idx < length; idx++) {
          const prodData = {
            name: '',
            salesPrice: 0,
            defaultPrice: 0,
            imgUrl: [''],
          }
          const { _source } = actualProducts[idx]
          if (_source && Object.keys(_source).length > 0) {
            const {
              name,
              price: { basePriceSales, basePriceReference },
              picture,
            } = _source
            prodData.name = name
            prodData.salesPrice = basePriceSales
            prodData.defaultPrice = basePriceReference
            prodData.imgUrl = [picture]
            newItems.push(prodData)
          }
        }
        setCarrouselsList({
          ...carrouselsLists,
          ['dropIdx-0']: {
            id: 'dropIdx-0',
            title: 'Agregar items',
            products: newItems,
          },
        })
      }
    }
  }

  const handleDragEnd = (result) => {
    console.log('result: ', result)
    const { source, destination } = result
    if (!destination) {
      // If the item is dragged outside the carousel, remove it from the list
      const sourceListId = source.droppableId
      const removedItemId = source.index
      const newItems = carrouselsLists[sourceListId].products.filter(
        (item, idx) => idx !== removedItemId
      )
      // setProducts(newItems)
      setCarrouselsList({
        ...carrouselsLists,
        [sourceListId]: {
          id: carrouselsLists[sourceListId].id,
          title: carrouselsLists[sourceListId].title,
          products: newItems,
        },
      })
      return
    }

    const sourceListId = source.droppableId
    const destinationListId = destination.droppableId
    const sourceIndex = source.index
    const destinationIndex = destination.index

    // Dragging within the same list
    if (sourceListId === destinationListId) {
      const carrouselProducts = [...carrouselsLists[sourceListId]['products']]
      const [draggedItem] = carrouselProducts.splice(sourceIndex, 1)
      carrouselProducts.splice(destinationIndex, 0, draggedItem)
      const newItems = carrouselProducts
      const valueKey = {
        id: carrouselsLists[sourceListId].id,
        title: carrouselsLists[sourceListId].title,
        products: newItems,
      }

      setCarrouselsList({
        ...carrouselsLists,
        [sourceListId]: valueKey,
      })
    } else {
      // Dragging between different lists
      const sourceList = [...carrouselsLists[sourceListId]['products']]
      const destinationList = [...carrouselsLists[destinationListId]['products']]
      const [draggedItem] = sourceList.splice(sourceIndex, 1)
      destinationList.splice(destinationIndex, 0, draggedItem)
      const newItems = destinationList

      setCarrouselsList({
        ...carrouselsLists,
        [sourceListId]: {
          id: carrouselsLists[sourceListId].id,
          title: carrouselsLists[sourceListId].title,
          products: sourceList,
        },
        [destinationListId]: {
          id: carrouselsLists[destinationListId].id,
          title: carrouselsLists[destinationListId].title,
          products: newItems,
        },
      })
    }
  }

  let actualProducts = []
  if (products) {
    actualProducts = products
  }

  return (
    <>
      <div className="section-ptb">
        <Container>
          <Row>
            <Col lg={12}>
              <div>
                <h4>Configuración de Carrousels</h4>
                <form>
                  <input
                    role="search"
                    type="search"
                    className="form-control"
                    maxLength={50}
                    placeholder="Search products"
                    value={productTextSearch}
                    onChange={(e) => {
                      onProductSearch(e)
                    }}
                  ></input>
                </form>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              {loading ? (
                <>
                  <div>
                    <Loader type="Puff" color="#04d39f" height="100" width="100" />
                  </div>
                </>
              ) : (
                <div className="mb-0 mb-md-4">
                  {actualProducts.length > 0 && productTextSearch !== '' ? (
                    <Row className="products products-loop grid ciyashop-products-shortcode pgs-product-list">
                      {actualProducts.map((product, index) => (
                        <AdminProduct product={product} key={index} />
                      ))}
                    </Row>
                  ) : (
                    <Row className="products products-loop grid ciyashop-products-shortcode">
                      <div className="col-sm-12 text-center  mt-4 mt-md-5">
                        <img
                          src={require(`../../../assets/images/empty-search.jpg`)}
                          className="img-fluid mb-4"
                        />
                        <h3>Lo sentimos! No hay productos encontrados para tu selección! </h3>
                        <p>Intenta otras palabras por favor.</p>
                      </div>
                    </Row>
                  )}
                </div>
              )}

              <div className="mb-0">
                <h4>Lista de carrousels</h4>
              </div>
              <DragDropContext onDragEnd={handleDragEnd}>
                {Object.keys(carrouselsLists).map((key, index) => {
                  const carrouselData = carrouselsLists[key]
                  return (
                    <Carrousel key={`${key}-${index}`} carrouselData={carrouselData}></Carrousel>
                  )
                })}
              </DragDropContext>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="content-wrapper mb-7"></div>
    </>
  )
}

export default CarrouselsForm
