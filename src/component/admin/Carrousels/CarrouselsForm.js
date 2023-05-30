import React, { useState } from 'react'
import Carrousel from './Carrousel'

import './carrouselsStyle.css'

// TODO: Call to BFF to get carrouself config data
const carrouselsData = [
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
      {
        name: 'Polera 2',
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
      {
        name: 'Polera Irezumi 2',
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
  const [carrousels] = useState(carrouselsData)

  return (
    <>
      <h2>Carrousels Form</h2>
      {carrousels.map((carrousel) => {
        return (
          <Carrousel key={`key-${carrousel.id}-carrousel`} carrouselData={carrousel}></Carrousel>
        )
      })}
    </>
  )
}

export default CarrouselsForm
