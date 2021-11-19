import React from 'react'
import Actions from '../Actions'

const COLUMNS_TABLE = {
  orderNumber: {
    maxWidth: 75,
    Header: 'Nº orden',
  },
  clientNames: {
    minWidth: 160,
    Header: 'Cliente',
  },
  email: {
    Header: 'Email',
  },
  dni: {
    Header: 'Rut',
  },
  phone: {
    Header: 'Telefono',
  },
  createdAt: {
    Header: 'Fecha compra',
  },
  orderStatus: {
    Header: 'Estado',
  },
  paymentType: {
    Header: 'Tipo de pago',
  },
  totalPrice: {
    Header: 'Total',
  },
  action: {
    Header: 'Acciones',
    Cell: <Actions />,
  },
}

export default COLUMNS_TABLE
