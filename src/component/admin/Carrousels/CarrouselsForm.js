import React, { useState, useEffect } from 'react'
import {
  Row,
  Container,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from 'reactstrap'
import Loader from 'react-loader-spinner'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import Carrousel from './Carrousel'
import AdminProduct from './../Product/AdminProduct'

import ClientAPI from '../../../common/ClientAPI'

import './carrouselsStyle.css'

// TODO: Call to BFF to get carrouself config data
const carrouselData = {
  products: {
    'Polera 1': {
      name: 'Polera 1',
      price: 1990,
      picture:
        'https://todo-o-nada-imagenes.s3.us-east-2.amazonaws.com/images/products/KANNONBLANCA1.jpg',
    },
    'Polera 2': {
      name: 'Polera 2',
      price: 1990,
      picture:
        'https://todo-o-nada-imagenes.s3.us-east-2.amazonaws.com/images/products/KANNONBLANCA1.jpg',
    },
    'Polera Irezumi': {
      name: 'Polera Irezumi',
      price: 1990,
      picture: 'https://todo-o-nada-imagenes.s3.us-east-2.amazonaws.com/images/products/4.jpg',
    },
    'Polera Irezumi 2': {
      name: 'Polera Irezumi 2',
      price: 1990,
      picture: 'https://todo-o-nada-imagenes.s3.us-east-2.amazonaws.com/images/products/4.jpg',
    },
    'Polera Irezumix v2': {
      name: 'Polera Irezumix v2',
      price: 1990,
      picture: 'https://todo-o-nada-imagenes.s3.us-east-2.amazonaws.com/images/products/4.jpg',
    },
  },
  carrousels: {
    'dropIdx-0': {
      id: 'dropIdx-0',
      title: 'Agregar items',
      products: [],
    },
    'dropIdx-1': {
      id: 'dropIdx-1',
      title: 'Nuevos Lanzamientos',
      products: ['Polera 1', 'Polera 2'],
    },
    'dropIdx-2': {
      id: 'dropIdx-2',
      title: 'Irezumi Art Collection',
      products: ['Polera Irezumi', 'Polera Irezumi 2'],
    },
    'dropIdx-3': {
      id: 'dropIdx-3',
      title: 'Todo o nada Art Collection',
      products: ['Polera Irezumix v2'],
    },
  },
  carrouselsOrder: ['dropIdx-0', 'dropIdx-1', 'dropIdx-2', 'dropIdx-3'],
}

const CarrouselsForm = () => {
  const [carrouselsLists, setCarrouselsList] = useState(carrouselData)
  const [productTextSearch, setProductTextSearch] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [clientAPI] = useState(new ClientAPI())
  const [showAddCarrouselModal, setShowCarrouselModal] = useState(false)

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

  const handlerShowAddCarrouselModal = (e) => {
    e.preventDefault()
    setShowCarrouselModal(!showAddCarrouselModal)
  }

  const handleDragEnd = (result) => {
    const { source, destination, type } = result

    // Case 2: Move columns
    if (type === 'column') {
      const newColumnOrder = Array.from(carrouselsLists.carrouselsOrder)
      if (destination && destination.index) {
        newColumnOrder.splice(source.index, 1)
        newColumnOrder.splice(destination.index, 0, carrouselsLists.carrouselsOrder[source.index])
        console.log('newColumnOrder after: ', newColumnOrder)
        setCarrouselsList({ ...carrouselsLists, carrouselsOrder: newColumnOrder })
      }
      return
    }

    // Case 0: Item dropped outside any column
    if (!destination) {
      if (type === 'carrousel') {
        const sourceColumn = carrouselsLists.carrousels[source.droppableId]
        const productKey = sourceColumn.products[source.index]
        const updatedProducts = sourceColumn.products.filter(
          (product, index) => index !== source.index
        )
        delete carrouselsLists.products[productKey]
        const newCarrouselsLists = {
          ...carrouselsLists,
          carrousels: {
            ...carrouselsLists.carrousels,
            [source.droppableId]: {
              ...sourceColumn,
              products: updatedProducts,
            },
          },
          products: carrouselsLists.products,
        }
        setCarrouselsList(newCarrouselsLists)
      }
      return
    }

    // Case 1: Item dropped to the same position
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    // Case 3: Dragging within the same column
    const sourceColumn = carrouselsLists.carrousels[source.droppableId]
    const destinationColumn = carrouselsLists.carrousels[destination.droppableId]

    if (sourceColumn.id === destinationColumn.id) {
      const newProductsKeys = Array.from(sourceColumn.products)
      newProductsKeys.splice(source.index, 1)
      newProductsKeys.splice(destination.index, 0, [sourceColumn.products[source.index]])

      const newSourceColumn = {
        ...sourceColumn,
        products: newProductsKeys,
      }

      const newCarrouselsLists = {
        ...carrouselsLists,
        carrousels: {
          ...carrouselsLists.carrousels,
          [newSourceColumn.id]: newSourceColumn,
        },
      }

      setCarrouselsList(newCarrouselsLists)
      return
    }

    // Case 4: Move from one list to another
    const newProductsKeys = Array.from(sourceColumn.products)
    newProductsKeys.splice(source.index, 1)
    const newSourceColumn = {
      ...sourceColumn,
      products: newProductsKeys,
    }

    const destProductsKeys = Array.from(destinationColumn.products)
    destProductsKeys.splice(destination.index, 0, sourceColumn.products[source.index])
    const newDestCarrousel = {
      ...destinationColumn,
      products: destProductsKeys,
    }

    const newCarrouselsLists = {
      ...carrouselsLists,
      carrousels: {
        ...carrouselsLists.carrousels,
        [newSourceColumn.id]: newSourceColumn,
        [newDestCarrousel.id]: newDestCarrousel,
      },
    }
    setCarrouselsList(newCarrouselsLists)
    return
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

              <Row>
                <Col lg={12}>
                  <Row>
                    <h2>Lista de carrousels</h2>
                    <div className="product-action product-action-quick-view">
                      <Button
                        color="success"
                        className="open-edit-view"
                        onClick={(e) => handlerShowAddCarrouselModal(e)}
                      >
                        <i className="fa fa-pencil-square-o"></i>
                      </Button>
                      <Modal isOpen={showAddCarrouselModal} toggle={handlerShowAddCarrouselModal}>
                        <ModalHeader>Agregar carrousel</ModalHeader>
                        <ModalBody>
                          <Input></Input>
                        </ModalBody>
                        <ModalFooter>
                          <Button color="primary" onClick={handlerShowAddCarrouselModal}>
                            Guardar
                          </Button>{' '}
                          <Button color="secondary" onClick={handlerShowAddCarrouselModal}>
                            Cancelar
                          </Button>
                        </ModalFooter>
                      </Modal>
                    </div>
                  </Row>
                </Col>
              </Row>

              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable
                  droppableId="outerDroppable"
                  key={`key-drop-outer`}
                  direction="vertical"
                  type="column"
                >
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {/* Nested inner context component */}
                      {carrouselsLists.carrouselsOrder.map((carrouselKey, index) => {
                        const carrouselData = carrouselsLists.carrousels[carrouselKey]
                        const carrouselDataProductsKey = carrouselData.products
                        const newCarrouselData = {
                          ...carrouselData,
                          products: carrouselDataProductsKey.map(
                            (productKey) => carrouselsLists.products[productKey]
                          ),
                        }
                        return (
                          <Carrousel
                            key={carrouselKey}
                            carrouselData={newCarrouselData}
                            index={index}
                          />
                        )
                      })}

                      {/* Outer droppable area */}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
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
