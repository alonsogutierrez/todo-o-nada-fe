import React, { useState } from 'react'
import { Button } from 'reactstrap'
import Loader from 'react-loader-spinner'
import { format } from 'date-fns'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import ClientAPI from './../../../common/ClientAPI'

const DownloadProducts = () => {
  const [clientAPI] = useState(new ClientAPI())
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState()

  const handleDownloadProducts = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)
      const productDownloadResponse = await clientAPI.downloadProducts()
      setFile(
        new Blob([productDownloadResponse], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
        })
      )
      const excelFileName = `TodoONada_Products_Report_${format(new Date(), 'yyyy-MM-dd')})}.xlsx`
      const fileURL = URL.createObjectURL(file)
      const anchor = document.createElement('a')
      anchor.href = fileURL
      anchor.download = excelFileName
      anchor.click()
      anchor.remove()
      setLoading(false)
      toast.success('Productos descargados')
    } catch (err) {
      setLoading(false)
      toast.error('Problema al descargar, reintentar porfavor')
    }
  }

  return (
    <>
      <ToastContainer autoClose={1000} draggable={false} />
      {loading ? (
        <>
          <div>
            <Loader type="Puff" color="#04d39f" height="100" width="100" />
            <h3>Esto puede tardar un par de minutos, paciencia por favor.</h3>
          </div>
        </>
      ) : (
        <>
          <Button
            onClick={(event) => {
              handleDownloadProducts(event)
            }}
          >
            Descargar productos
          </Button>
        </>
      )}
    </>
  )
}

export default DownloadProducts
