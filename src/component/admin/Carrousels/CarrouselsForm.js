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
import { ToastContainer, toast } from 'react-toastify'
import Loader from 'react-loader-spinner'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import Carrousel from './Carrousel'
import AdminProduct from './../Product/AdminProduct'

import ClientAPI from '../../../common/ClientAPI'

const CarrouselsForm = () => {
  const [clientAPI] = useState(new ClientAPI())
  const [carrouselsLists, setCarrouselsList] = useState(null)
  const [productTextSearch, setProductTextSearch] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddCarrouselModal, setShowCarrouselModal] = useState(false)
  const [newCarrouselName, setNewCarrouselName] = useState('')

  useEffect(async () => {
    async function getConfigData() {
      try {
        const response = await clientAPI.getCarrouselConfig()
        setCarrouselsList(response.data)
      } catch (err) {
        console.log('error trying to get carrousel config')
      }
    }

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

    if (!carrouselsLists) {
      getConfigData()
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
    }
  }

  const onCarrouselDelete = (event, carrouselIdx) => {
    event.preventDefault()
    const newCarrousels = carrouselsLists.carrousels
    delete newCarrousels[carrouselIdx]
    let newCarrouselsOrder = carrouselsLists.carrouselsOrder
    newCarrouselsOrder = newCarrouselsOrder.filter((key) => key !== carrouselIdx)
    setCarrouselsList({
      ...carrouselsLists,
      carrousels: newCarrousels,
      carrouselsOrder: newCarrouselsOrder,
    })
    return
  }

  const onCarrouselEdit = (carrouselIdx, carrouselTitle) => {
    const actualCarrouselTitle = carrouselsLists.carrousels[carrouselIdx]['title']
    const newCarrouselOrder = carrouselsLists.carrouselsOrder.map((carrousel) =>
      carrousel === actualCarrouselTitle ? carrouselTitle : carrousel
    )
    setCarrouselsList({
      ...carrouselsLists,
      carrousels: {
        ...carrouselsLists.carrousels,
        [carrouselIdx]: {
          ...carrouselsLists.carrousels[carrouselIdx],
          title: carrouselTitle,
        },
      },
      carrouselsOrder: newCarrouselOrder,
    })
    return
  }

  const handlerShowAddCarrouselModal = () => {
    setShowCarrouselModal(!showAddCarrouselModal)
  }

  const handleDragEnd = (result) => {
    const { source, destination, type } = result

    // Case 1: Move columns
    if (type === 'column') {
      const newColumnOrder = Array.from(carrouselsLists.carrouselsOrder)
      if (destination && destination.index) {
        newColumnOrder.splice(source.index, 1)
        newColumnOrder.splice(destination.index, 0, carrouselsLists.carrouselsOrder[source.index])
        setCarrouselsList({ ...carrouselsLists, carrouselsOrder: newColumnOrder })
      }
      return
    }

    // Case 2: Item dropped outside any column
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
              products: updatedProducts.map((productsKey) =>
                Array.isArray(productsKey) ? productsKey[0] : productsKey
              ),
            },
          },
          products: carrouselsLists.products,
        }
        setCarrouselsList(newCarrouselsLists)
      }
      return
    }

    // Case 3: Item dropped to the same position
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    // Case 4: Dragging within the same column
    const sourceColumn = carrouselsLists.carrousels[source.droppableId]
    const destinationColumn = carrouselsLists.carrousels[destination.droppableId]

    if (sourceColumn.id === destinationColumn.id) {
      const newProductsKeys = Array.from(sourceColumn.products)
      newProductsKeys.splice(source.index, 1)
      newProductsKeys.splice(destination.index, 0, [sourceColumn.products[source.index]])

      const newSourceColumn = {
        ...sourceColumn,
        products: newProductsKeys.map((productsKey) =>
          Array.isArray(productsKey) ? productsKey[0] : productsKey
        ),
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

    // Case 5: Move from one list to another
    const newProductsKeys = Array.from(sourceColumn.products)
    newProductsKeys.splice(source.index, 1)

    const newSourceColumn = {
      ...sourceColumn,
      products: newProductsKeys.map((productsKey) =>
        Array.isArray(productsKey) ? productsKey[0] : productsKey
      ),
    }

    const destProductsKeys = Array.from(destinationColumn.products)
    destProductsKeys.splice(destination.index, 0, sourceColumn.products[source.index])
    const newDestCarrousel = {
      ...destinationColumn,
      products: destProductsKeys.map((productsKey) =>
        Array.isArray(productsKey) ? productsKey[0] : productsKey
      ),
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

  const handleOnClickAddButton = (product) => {
    const { _source } = product
    if (!(_source.name in carrouselsLists.products)) {
      setCarrouselsList({
        ...carrouselsLists,
        products: {
          ...carrouselsLists.products,
          [_source.name]: product,
        },
        carrousels: {
          ...carrouselsLists.carrousels,
          ['dropIdx-0']: {
            ...carrouselsLists.carrousels['dropIdx-0'],
            [products]: carrouselsLists.carrousels['dropIdx-0']['products'].push(_source.name),
          },
        },
      })
      return
    }
    // If product exists in carrousel
    toast.error('Product ya existe dentro de los carrouseles')
  }

  const onAddCarrouselSubmit = () => {
    if (newCarrouselName.length <= 0) {
      toast.error('Debes ingresar un nombre para el carrousel')
      return
    }
    const totalCarrousels = Object.keys(carrouselsLists.carrousels).length
    const newCarrouselIdx = `dropIdx-${totalCarrousels + 1}`
    const actualCarrouselOrder = carrouselsLists.carrouselsOrder
    actualCarrouselOrder.push(newCarrouselIdx)
    const newCarrouselOrder = actualCarrouselOrder
    setCarrouselsList({
      ...carrouselsLists,
      carrousels: {
        ...carrouselsLists.carrousels,
        [newCarrouselIdx]: {
          id: newCarrouselIdx,
          title: newCarrouselName,
          products: [],
        },
      },
      carrouselsOrder: newCarrouselOrder,
    })
    handlerShowAddCarrouselModal()
    toast.success('Carrousel agregado correctamente')
    return
  }

  const handleAddNewCarrouselName = (e) => {
    setNewCarrouselName(e.target.value)
  }

  const handlerUpdateCarrouselConfig = async () => {
    const allUsedProductsKeys = Object.keys(carrouselsLists.carrousels)
      .map((keyCarrousel) =>
        carrouselsLists.carrousels[keyCarrousel].products.map((productName) => productName)
      )
      .flat()
    for (const actualProductKey of Object.keys(carrouselsLists.products)) {
      if (!allUsedProductsKeys.includes(actualProductKey)) {
        delete carrouselsLists.products[actualProductKey]
      }
    }
    carrouselsLists.carrousels['dropIdx-0'].products = []
    await clientAPI.saveCarrouselConfig(carrouselsLists)
    toast.success('Configuración de carrousels correctamente guardada')
    setProductTextSearch('')
  }

  let actualProducts = []
  if (products) {
    actualProducts = products
  }

  return (
    <>
      <ToastContainer autoClose={5000} />
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
                        <AdminProduct
                          product={product}
                          key={index}
                          add={true}
                          handleOnClickAddButton={handleOnClickAddButton}
                        />
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
                        color="info"
                        style={{ marginLeft: '10px' }}
                        className="open-edit-view"
                        onClick={() => handlerShowAddCarrouselModal()}
                      >
                        <i className="fa fa-plus"></i>
                      </Button>
                      <Button
                        color="success"
                        style={{ marginLeft: '10px' }}
                        className="open-edit-view"
                        onClick={() => handlerUpdateCarrouselConfig()}
                      >
                        <i className="fa fa-save"></i>
                      </Button>
                      <Modal
                        isOpen={showAddCarrouselModal}
                        className="modal-delete modal-lg modal-dialog-centered"
                        toggle={handlerShowAddCarrouselModal}
                      >
                        <ModalHeader>Agregar carrousel</ModalHeader>
                        <ModalBody>
                          <div>
                            <form onSubmit={onAddCarrouselSubmit}>
                              <div className="form-group">
                                <label>Titulo</label>
                                <Input
                                  type="title"
                                  className="form-control"
                                  maxLength={200}
                                  name="title_carrousel"
                                  id="title_carrousel"
                                  placeholder="Ingresa nombre del carrousel"
                                  value={newCarrouselName}
                                  onChange={(e) => handleAddNewCarrouselName(e)}
                                />
                              </div>
                            </form>
                          </div>
                        </ModalBody>
                        <ModalFooter>
                          <Button color="primary" onClick={onAddCarrouselSubmit}>
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
              <div style={{ width: '100%', overflowX: 'auto' }}>
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
                        {carrouselsLists &&
                          carrouselsLists.carrouselsOrder.map((carrouselKey, index) => {
                            const carrouselData = carrouselsLists.carrousels[carrouselKey]
                            const carrouselDataProductsKey = carrouselData.products
                            const newCarrouselData = {
                              ...carrouselData,
                              products:
                                carrouselDataProductsKey.length > 0
                                  ? carrouselDataProductsKey.map(
                                      (productKey) => carrouselsLists.products[productKey]
                                    )
                                  : [],
                            }
                            return (
                              <Carrousel
                                key={`carrousel-${carrouselKey}`}
                                carrouselData={newCarrouselData}
                                index={index}
                                onCarrouselDelete={onCarrouselDelete}
                                onCarrouselEdit={onCarrouselEdit}
                              />
                            )
                          })}

                        {/* Outer droppable area */}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="content-wrapper mb-7"></div>
    </>
  )
}

export default CarrouselsForm
