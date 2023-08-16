import React from 'react'
import PropTypes from 'prop-types'
import { Droppable, Draggable } from 'react-beautiful-dnd'

import ProductInfo from './../../search/ProductInfo'

const Carrousel = ({ carrouselData, index }) => {
  return (
    <Draggable draggableId={`titlex-drag-idx${index}`} index={index} key={`draggable-${index}`}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <h4 {...provided.dragHandleProps}>{carrouselData.title}</h4>
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
                  carrouselData.products.map((product, indexProd) => (
                    <Draggable
                      key={indexProd}
                      draggableId={`drag-${product.name}-${indexProd}`}
                      index={indexProd}
                    >
                      {(provided, snapshot) => (
                        <li
                          className="carrouselStyle"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          style={{
                            ...provided.draggableProps.style,
                            background: snapshot.isDragging ? 'lightgreen' : 'white',
                            userSelect: 'none',
                            padding: 8 * 2,
                            margin: `0 ${8}px 0 0`,
                          }}
                        >
                          <ProductInfo
                            product={product}
                            style={{
                              ...provided.draggableProps.style,
                              background: snapshot.isDragging ? 'lightgreen' : 'white',
                              userSelect: 'none',
                              padding: 8 * 2,
                              margin: `0 ${8}px 0 0`,
                            }}
                          />
                        </li>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>
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
  carrouselsLists: [],
  setCarrouselsList: () => {},
  index: -1,
}

Carrousel.propTypes = {
  carrouselData: PropTypes.object,
  carrouselsLists: PropTypes.object,
  setCarrouselsList: PropTypes.func,
  index: PropTypes.number,
}
