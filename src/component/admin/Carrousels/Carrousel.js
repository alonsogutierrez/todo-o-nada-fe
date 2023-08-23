import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import PropTypes from 'prop-types'
import { Droppable, Draggable } from 'react-beautiful-dnd'

import ProductCard from './../../search/ProductCard'

const Carrousel = ({ carrouselData, index, onCarrouselDelete, onCarrouselEdit }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const handleDeleteCarrousel = () => {
    setShowDeleteModal(!showDeleteModal)
  }

  const handleEditCarrousel = () => {
    setShowEditModal(!showEditModal)
    onEditCarrousel()
  }

  const onEditCarrousel = () => {
    // TODO: Show popup to edit
  }
  return (
    <Draggable
      draggableId={`titlex-drag-idx${index}-${carrouselData.title}`}
      index={index}
      key={`draggable-${index}-${carrouselData.title}`}
    >
      {(provided) => (
        <>
          <div {...provided.draggableProps} ref={provided.innerRef}>
            <div style={{ display: 'flex' }}>
              <h4 {...provided.dragHandleProps} style={{ marginRight: '10px' }}>
                {carrouselData.title}
              </h4>
              <Button
                className="open-edit-view"
                style={{ marginRight: '10px', marginBottom: '10px' }}
                onClick={() => handleEditCarrousel()}
              >
                <i className="fa fa-pencil-square-o"></i>
              </Button>
              <Button
                className="btn-danger"
                style={{ marginRight: '10px', marginBottom: '10px' }}
                onClick={() => handleDeleteCarrousel()}
              >
                <i className="fa fa-trash-o"></i>
              </Button>
            </div>

            <Droppable droppableId={`${carrouselData.id}`} type="carrousel" direction="horizontal">
              {(provided, snapshot) => (
                <ul
                  ref={provided.innerRef}
                  className="carrouselsId"
                  {...provided.droppableProps}
                  style={{
                    background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                    padding: 8,
                    overflow: 'auto',
                    display: 'flex',
                  }}
                >
                  {carrouselData.products &&
                    carrouselData.products.map((productData, indexProd) => {
                      return (
                        <Draggable
                          key={`prod-${productData._id}`}
                          draggableId={`dragIdCarrousel-${productData._id}`}
                          index={indexProd}
                        >
                          {(provided, snapshot) => (
                            <li
                              className="products products-loop grid ciyashop-products-shortcode pgs-product-list"
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              style={{
                                ...provided.draggableProps.style,
                                background: snapshot.isDragging ? 'lightgreen' : 'white',
                                userSelect: 'none',
                                padding: 8 * 2,
                                margin: `0 ${8}px 0 0`,
                                border: '2px',
                                borderColor: 'blue',
                                paddingRight: '2px',
                                width: '32vh',
                              }}
                            >
                              <ProductCard
                                key={`productCardKey-${productData._id}`}
                                product={productData}
                                layout={'col-sm-6 col-md-4'}
                                isAdminView={true}
                              />
                            </li>
                          )}
                        </Draggable>
                      )
                    })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </div>
          {/* modal-edit */}
          <Modal
            isOpen={showEditModal}
            toggle={handleEditCarrousel}
            className="modal-delete modal-lg modal-dialog-centered"
          >
            <ModalHeader toggle={handleEditCarrousel}></ModalHeader>
            <ModalBody>
              <div>
                <p>
                  Titulo: <input type="text" defaultValue={carrouselData.title}></input>
                </p>
              </div>
            </ModalBody>
            <ModalFooter className="justify-content-center pt-4">
              <Link className="action-button" onClick={(e) => onCarrouselEdit(e, carrouselData.id)}>
                Guardar
              </Link>
              <Link className="action-button no" onClick={handleEditCarrousel}>
                Cancelar
              </Link>
            </ModalFooter>
          </Modal>
          {/* modal-delete */}
          <Modal
            isOpen={showDeleteModal}
            toggle={handleDeleteCarrousel}
            className="modal-delete modal-lg modal-dialog-centered"
          >
            <ModalHeader toggle={handleDeleteCarrousel}></ModalHeader>
            <ModalBody>Estas seguro que deseas eliminar este carrousel ?</ModalBody>
            <ModalFooter className="justify-content-center pt-4">
              <Link
                className="action-button"
                onClick={(e) => onCarrouselDelete(e, carrouselData.id)}
              >
                Si
              </Link>
              <Link className="action-button no" onClick={handleDeleteCarrousel}>
                No
              </Link>
            </ModalFooter>
          </Modal>
        </>
      )}
    </Draggable>
  )
}

export default Carrousel

Carrousel.defaultProps = {
  carrouselData: {
    id: -1,
    title: '',
    products: [],
  },
  index: -1,
  onCarrouselDelete: () => {},
  onCarrouselEdit: () => {},
}

Carrousel.propTypes = {
  carrouselData: PropTypes.object,
  index: PropTypes.number,
  onCarrouselDelete: PropTypes.func,
  onCarrouselEdit: PropTypes.func,
}
