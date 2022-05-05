import React, { useState } from 'react'
import { Input, Button } from 'reactstrap'
import Loader from 'react-loader-spinner'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import ClientAPI from './../../../common/ClientAPI'

const UploadProducts = () => {
  const [clientAPI] = useState(new ClientAPI())
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState()

  const handleChangeFile = (e) => {
    e.preventDefault()
    setFile(e.target.files[0])
  }

  const handleSubmitProducts = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)
      await clientAPI.uploadLotsProducts(file)
      setLoading(false)
      toast.success('Productos cargados en base de datos')
    } catch (err) {
      setLoading(false)
      toast.error('Problema al cargar, reintentar porfavor')
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
          <Input
            type="file"
            name="products"
            className="form-control"
            multiple
            onChange={(e) => handleChangeFile(e)}
          />
          <Button
            onClick={(event) => {
              handleSubmitProducts(event)
            }}
          >
            Subir productos
          </Button>
        </>
      )}
    </>
  )
}

export default UploadProducts
