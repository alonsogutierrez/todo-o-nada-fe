/**
 *  Admin Site Product Add
 */
import React, { useState } from 'react'
import ImageUploader from 'react-images-upload'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import { Container, FormGroup, Input, Label, Row } from 'reactstrap'
import { Formik } from 'formik'

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
}
const productslider = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1
}
const productdata = {
  Product_single: 'product-single.jpg',
  product_gallery: [
    'product-single.jpg',
    'product-single.jpg',
    'product-single.jpg',
    'product-single.jpg'
  ],
  size: ['S', 'M', 'L', 'XL'],
  colors: ['Negro', 'Rojo', 'Azul', 'Verde', 'Blanco', 'Cafe'],
  categories: ['Hombres', 'Mujeres', 'niños', 'Irezumi Art', 'Todo o Nada'],
}

const productAdd = () => {
  window.scrollTo(0, 0)
  const [pictures, setPictures] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [photoIndex, setPhotoIndex] = useState(0)
  // eslint-disable-next-line no-unused-vars
  const [isOpen, setIsOpen] = useState(false)
  const [errorMsg, SetErrorMsg] = useState('')

  const uploadImage = (picture) => {
    if (picture === '') {
      SetErrorMsg('File Not Supported')
    } else {
      setPictures(pictures.concat(picture))
      SetErrorMsg('')
    }
  }

  return (
    <div>
      <div className='site-content'>
        <div className='content-wrapper section-ptb'>
          <Container>
            <div className='product-content-top single-product single-product-edit'>
              <Row>
                <div className='product-top-left col-xl-5 col-md-6'>
                  <div className='product-top-left-inner'>
                    <div className='ciyashop-product-images'>
                      <div className='ciyashop-product-images-wrapper ciyashop-gallery-style-default ciyashop-gallery-thumb_position-bottom ciyashop-gallery-thumb_vh-horizontal'>
                        <div className='ciyashop-product-gallery ciyashop-product-gallery--with-images slick-carousel'>
                          <Slider
                            {...settings}
                            className='ciyashop-product-gallery__wrapper popup-gallery'
                          >
                            <div className='ciyashop-product-gallery__image'>
                              <img
                                src='https://todo-o-nada-imagenes.s3.us-east-2.amazonaws.com/demo/product-single.jpg'
                                className='img-fluid'
                              />
                            </div>
                          </Slider>
                        </div>
                        <div className='ciyashop-product-thumbnails'>
                          <Slider
                            {...productslider}
                            className='ciyashop-product-thumbnails__wrapper'
                          >
                            {productdata.product_gallery.map(
                              (pictureImage, index) => (
                                <div key={index}>
                                  <div className='ciyashop-product-thumbnail__image'>
                                    <a href='javascript:void(0)'>
                                      <img
                                        src={`https://todo-o-nada-imagenes.s3.us-east-2.amazonaws.com/demo/${pictureImage}`}
                                        className='img-fluid'
                                      />
                                    </a>
                                    <div className='d-flex justify-content-center image-content align-items-center'>
                                      <ImageUploader
                                        buttonText=''
                                        withIcon={false}
                                        withPreview={true}
                                        fileTypeError={errorMsg}
                                        onChange={uploadImage}
                                        imgExtension={[
                                          '.jpg',
                                          '.jpeg',
                                          '.png'
                                        ]}
                                      />
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                          </Slider>
                        </div>
                        <div className='clearfix' />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='product-top-right col-xl-7 col-md-6'>
                  <div className='product-top-right-inner'>
                    <div className='summary entry-summary'>
                      <Formik
                        initialValues={{name: ''}}
                        validate={values => {
                          const errors = {}
                          if (!values.name) {
                            errors.name = 'nombre requerido'
                          }
                          return errors
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                          console.log(JSON.stringify(values, null, 2))
                          setSubmitting(false)
                        }}
                      >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            // isSubmitting,
                        }) => (
                          <form onSubmit={handleSubmit}>
                            <FormGroup className='edit-icon'>
                              <Input
                                type='text'
                                name='name'
                                className='form-control product_title'
                                placeholder='nombre'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                              />
                              {errors.name && touched.name && errors.name}
                            </FormGroup>
                          </form>
                        )}
                      </Formik>
                      <FormGroup className='edit-icon'>
                        <Input
                          type='text'
                          className='form-control price'
                          placeholder='Product Price'
                        />
                      </FormGroup>
                      <FormGroup className='edit-icon'>
                        <Input
                          type='textarea'
                          className='form-control'
                          rows='3'
                          placeholder='Product Description'
                        />
                      </FormGroup>
                      <Label className='title'>Size</Label>
                      <FormGroup>
                        {productdata.size.map((size, index) => (
                          <Label key={index}>
                            <Input type='checkbox' /> {size}
                          </Label>
                        ))}
                      </FormGroup>
                      <Label className='title'>Color</Label>
                      <FormGroup>
                        {productdata.colors.map((color, index) => (
                          <Label key={index}>
                            <Input type='checkbox' /> {color}
                          </Label>
                        ))}
                      </FormGroup>
                      <FormGroup>
                        <Label className='title pl-0'>Brand</Label>
                        <Input
                          type='text'
                          class='form-control'
                          placeholder='Product Brand'
                        />
                      </FormGroup>

                      <Label className='title mb-2'>Category</Label>
                      <FormGroup>
                        {productdata.categories.map((brand, index) => (
                          <Label key={index}>
                            <Input type='checkbox' /> {brand}
                          </Label>
                        ))}
                      </FormGroup>
                      <FormGroup>
                        <Label className='title pl-0'>Product Stock</Label>
                        <input
                          type='text'
                          className='form-control'
                          placeholder='Product Stock'
                        ></input>
                      </FormGroup>
                      <FormGroup>
                        <Label className='title pl-0'>Total Products</Label>
                        <input
                          type='text'
                          className='form-control'
                          placeholder='Total Product'
                        ></input>
                      </FormGroup>

                      <a href='#' className='btn btn-primary mb-2 mr-2'>
                        {' '}
                        Save{' '}
                      </a>
                      <Link
                        to='/admin-panel/Product'
                        class='btn btn-danger mb-2'
                      >
                        {' '}
                        Cancel{' '}
                      </Link>
                    </div>
                  </div>
                </div>
              </Row>
            </div>
          </Container>
        </div>
      </div>
    </div>
  )
}
export default productAdd
