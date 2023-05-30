import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const Carrousel = ({ carrouselData }) => {
  const [carrousel] = useState(carrouselData)
  const [products, setProducts] = useState(carrousel.products)

  const handleDragEnd = (result) => {
    if (!result.destination) {
      // If the item is dragged outside the carousel, remove it from the list
      const removedItemId = result.source.index
      const newItems = products.filter((item, idx) => idx !== removedItemId)
      setProducts(newItems)
      return
    }

    // Reorder items within the carousel
    const newItems = Array.from(products)
    const [reorderedItem] = newItems.splice(result.source.index, 1)
    newItems.splice(result.destination.index, 0, reorderedItem)
    setProducts(newItems)
  }

  return (
    <>
      <h1>{carrousel.title}</h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable
          key={`key-${carrousel.id}`}
          droppableId={`dropIdx-${carrousel.id}`}
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
              {products.map((product, index) => (
                <Draggable key={product.name} draggableId={`drag-${product.name}`} index={index}>
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
                      <h2>{product.name}</h2>
                      <h4>{product.price}</h4>
                      <img src={product.imgUrl} />
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
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
