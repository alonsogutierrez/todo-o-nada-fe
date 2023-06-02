import React from 'react'
import PropTypes from 'prop-types'
import { Droppable, Draggable } from 'react-beautiful-dnd'

import ProductInfo from './../../search/ProductInfo'

const Carrousel = ({ carrouselData }) => {
  return (
    <>
      <h1>{carrouselData.title}</h1>
      <Droppable
        key={`key-drop-${carrouselData.id}`}
        droppableId={`${carrouselData.id}`}
        direction="horizontal"
      >
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
            {carrouselData.products.map((product, index) => (
              <Draggable
                key={`drag-${product.name}-${index}`}
                draggableId={`drag-${product.name}-${index}`}
                index={index}
              >
                {(provided, snapshot) => (
                  <>
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
                  </>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </>
  )
}

export default Carrousel

Carrousel.defaultProps = {
  carrouselData: {
    id: -1,
    title: '',
    products: [],
  },
}

Carrousel.propTypes = {
  carrouselData: PropTypes.object,
}
