import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import './carrouselsStyle.css'

// const reorder = (list, startIndex, endIndex) => {
//   const result = Array.from(list)
//   const [removed] = result.splice(startIndex, 1)
//   result.splice(endIndex, 0, removed)

//   return result
// }

const carrouselsMockList = [
  {
    id: 1,
    title: 'Nuevos Lanzamientos',
    products: [
      {
        name: 'Polera 1',
        salesPrice: 1990,
        defaultPrice: 2490,
        imgUrl: [
          'https://todo-o-nada-imagenes.s3.us-east-2.amazonaws.com/images/products/KANNONBLANCA1.jpg',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Irezumi Art Collection',
    products: [
      {
        name: 'Polera Irezumi',
        salesPrice: 1990,
        defaultPrice: 2490,
        imgUrl: ['https://todo-o-nada-imagenes.s3.us-east-2.amazonaws.com/images/products/4.jpg'],
      },
    ],
  },
  {
    id: 3,
    title: 'TOdo o nadaa Art Collection',
    products: [
      {
        name: 'Polera Irezumi',
        salesPrice: 1990,
        defaultPrice: 2490,
        imgUrl: ['https://todo-o-nada-imagenes.s3.us-east-2.amazonaws.com/images/products/4.jpg'],
      },
    ],
  },
]

const CarrouselsForm = () => {
  const [carrousels, setCarrousels] = useState(carrouselsMockList)

  const handleDragEnd = (result) => {
    console.log('hereeeee')
    if (!result.destination) return
    const newItems = Array.from(carrousels)
    const [reorderedItem] = newItems.splice(result.source.index, 1)
    newItems.splice(result.destination.index, 0, reorderedItem)
    setCarrousels(newItems)
  }
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <h2>Carrousels Form</h2>
      <Droppable droppableId="droppable" direction="horizontal">
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
            {carrousels.map((carrouselData, index) => (
              <Draggable key={carrouselData.id} draggableId={carrouselData.id} index={index}>
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
                    <h2>{carrouselData.title}</h2>
                    <img src={carrouselData.products[0].imgUrl} />
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default CarrouselsForm
