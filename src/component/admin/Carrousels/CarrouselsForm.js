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
    'HO-Ō, LA LEYENDA DEL FÉNIX polera blanca': {
      _index: 'products',
      _type: '_doc',
      _id: 'Wq2x4okBxo3iZx04rsQ6',
      _version: 5,
      _score: 1,
      _source: {
        itemNumber: '1039',
        name: 'HO-Ō, LA LEYENDA DEL FÉNIX polera blanca',
        categories: [
          'hombre',
          'irezumi',
          'mujer',
          'poleras',
          'tattoo-collection',
          'unisex',
          'remate',
        ],
        description:
          'HO-Ō, La Leyenda del Fénix es una pintura original de @diamantetattart basado en la Leyenda del Fénix de la cultura japonesa y oriental.\nPrenda de confección propia con tela jersey de la más alta calidad, estampada a mano en serigrafía. El pecho tiene 5 tintas (cuatricromía + tinta color azul metálico) y la espalda tiene 1 tinta color negro perla. Incluye un elegante packaging estampado a mano en serigrafía a dos tintas. Producto de calidad premium',
        color: 'Blanco',
        price: {
          basePriceSales: 25000,
          basePriceReference: 25000,
          discount: 0,
        },
        picture:
          'https://todo-o-nada-imagenes.s3.us-east-2.amazonaws.com/images/products/FENIXP1.jpg',
        details: {
          '10391': {
            quantity: 0,
            size: 'S',
          },
          '10392': {
            quantity: 0,
            size: 'M',
          },
          '10393': {
            quantity: 0,
            size: 'L',
          },
          '10394': {
            quantity: 0,
            size: 'XL',
          },
          '10395': {
            quantity: 0,
            size: 'XXL',
          },
        },
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        is_active: true,
      },
    },
    'HO-Ō, LA LEYENDA DEL FÉNIX HOODIE': {
      _index: 'products',
      _type: '_doc',
      _id: 'bK2x4okBxo3iZx0478S-',
      _version: 5,
      _score: 1,
      _source: {
        itemNumber: '1052',
        name: 'HO-Ō, LA LEYENDA DEL FÉNIX HOODIE',
        categories: ['irezumi', 'hombre', 'mujer', 'polerones', 'tattoo-collection', 'unisex'],
        description:
          'HO-Ō de @diamantetattart basado en la Leyenda del Fénix de la cultura japonesa y oriental.\nHoodie de confección propia con franela de la más alta calidad, tinta plateada en el pecho + cuatricromía espalda completa estampada a mano en serigrafía.\nBolsillos con cierre para mayor comodidad y  seguridad de tus pertenencias.\nEdición limitada y coleccionable. Producto de calidad premium.',
        color: 'Negro',
        price: {
          basePriceSales: 50000,
          basePriceReference: 50000,
          discount: 0,
        },
        picture:
          'https://todo-o-nada-imagenes.s3.us-east-2.amazonaws.com/images/products/FENIX3.jpg',
        details: {
          '10521': {
            quantity: 0,
            size: 'S',
          },
          '10522': {
            quantity: 0,
            size: 'M',
          },
          '10523': {
            quantity: 0,
            size: 'L',
          },
          '10524': {
            quantity: 0,
            size: 'XL',
          },
          '10525': {
            quantity: 0,
            size: 'XXL',
          },
        },
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        is_active: true,
      },
    },
    'VIAJE – BLANCO': {
      _index: 'products',
      _type: '_doc',
      _id: 'Da2z4okBxo3iZx04N8XO',
      _version: 5,
      _score: 1,
      _source: {
        itemNumber: '9',
        name: 'VIAJE – BLANCO',
        categories: [
          'traditional',
          'tattoo-collection',
          'hombre',
          'mujer',
          'unisex',
          'poleras',
          'remate',
        ],
        description:
          'EL VIAJE  es una colaboracion del artista Danilo Ahumada ( @Gatogordo_tattooing) Argentina , basada en la obra del mismo nombre  , pintada el año 2020 .\n\nPolera de algodon Jersey ( 80 % algodon / 20% polyester ) estampada en serigrafia por @todo_o_nada_serigrafia . Confeccionada y producida por manos libres de explotacion . Confeccion y estampado de la mas alta calidad del mercado . \n\nEste producto viene en un box pack coleccionable.',
        color: 'Blanco',
        price: {
          basePriceSales: 25000,
          basePriceReference: 25000,
          discount: 0,
        },
        picture:
          'https://todo-o-nada-imagenes.s3.us-east-2.amazonaws.com/images/products/csc-112.jpg',
        details: {
          '1032': {
            quantity: 0,
            size: 'S',
          },
          '1033': {
            quantity: 0,
            size: 'M',
          },
          '1034': {
            quantity: 0,
            size: 'L',
          },
          '1035': {
            quantity: 0,
            size: 'XL',
          },
          '1036': {
            quantity: 0,
            size: 'XXL',
          },
        },
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        is_active: false,
      },
    },
    AWARE: {
      _index: 'products',
      _type: '_doc',
      _id: 'fa2y4okBxo3iZx04G8TC',
      _version: 5,
      _score: 1,
      _source: {
        itemNumber: '30',
        name: 'AWARE',
        categories: [
          'hombre',
          'mujer',
          'unisex',
          'poleras',
          'remate',
          'irezumi',
          'tattoo-collection',
        ],
        description:
          'AWARE es una colaboración de la artista TATTOOCATALINA ( @tattoocatalina) , basada en la obra AWARE , pintada el año 2021 . Polera de algodon Jersey ( 80 % algodón / 20% polyester ) estampada en serigrafia por @todo_o_nada_serigrafia . Confeccionada y producida por manos libres de explotación . Confección y estampado hechos a mano. Producto de calidad premium.\nEste producto contiene : AWARE + caja coleccionable estampada a mano + filtros de regalo',
        color: 'Negro',
        price: {
          basePriceSales: 25000,
          basePriceReference: 25000,
          discount: 0,
        },
        picture:
          'https://todo-o-nada-imagenes.s3.us-east-2.amazonaws.com/images/products/AWARE1.jpg',
        details: {
          '3001': {
            quantity: 0,
            size: 'S',
          },
          '3002': {
            quantity: 0,
            size: 'M',
          },
          '3003': {
            quantity: 0,
            size: 'L',
          },
          '3004': {
            quantity: 0,
            size: 'XL',
          },
          '3005': {
            quantity: 0,
            size: 'XXL',
          },
        },
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        is_active: false,
      },
    },
    'RYU NOREN': {
      _index: 'products',
      _type: '_doc',
      _id: '9a2w4okBxo3iZx043cOz',
      _version: 1,
      _score: 1,
      _source: {
        itemNumber: '404',
        name: 'RYU NOREN',
        categories: ['accesorios', 'tattoo-collection', 'traditional', 'irezumi', 'print-art'],
        description:
          'RYU NOREN es parte de una nueva línea de productos de TODO O NADA TATTOO ART\n\nEl diseño de Dragón pertenece a una nueva colección de Pablo Esquivel (pablo_esquivel_decorazon), y es una de sus pinturas más recientes del 2023.\nCortinas de confección textil propia con tela crea y estampada de forma manual en serigrafía\n\nArtículo decorativo hecho a mano, edición limitada y coleccionable.',
        color: 'Blanco',
        price: {
          basePriceSales: 30000,
          basePriceReference: 30000,
          discount: 0,
        },
        picture:
          'https://todo-o-nada-imagenes.s3.us-east-2.amazonaws.com/images/products/ryunoren1.jpg',
        details: {
          '4041': {
            quantity: 0,
            size: '120X80',
          },
        },
        sizes: ['120X80'],
        is_active: true,
      },
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
      products: ['HO-Ō, LA LEYENDA DEL FÉNIX polera blanca', 'HO-Ō, LA LEYENDA DEL FÉNIX HOODIE'],
    },
    'dropIdx-2': {
      id: 'dropIdx-2',
      title: 'Irezumi Art Collection',
      products: ['VIAJE – BLANCO', 'AWARE'],
    },
    'dropIdx-3': {
      id: 'dropIdx-3',
      title: 'Todo o nada Art Collection',
      products: ['RYU NOREN'],
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
    }
  }

  const handlerShowAddCarrouselModal = (e) => {
    e.preventDefault()
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
        console.log('newColumnOrder after: ', newColumnOrder)
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
              products: updatedProducts,
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

    // Case 5: Move from one list to another
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

  const handleOnClickAddButton = (product) => {
    const newProductData = carrouselsLists.products[product.name]
    setCarrouselsList({
      ...carrouselsLists,
      products: {
        ...carrouselsLists.products,
        [product.name]: newProductData,
      },
      carrousels: {
        ...carrouselsLists.carrousels,
        ['dropIdx-0']: {
          ...carrouselsLists.carrousels['dropIdx-0'],
          [products]: carrouselsLists.carrousels['dropIdx-0']['products'].push(product.name),
        },
      },
    })
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
