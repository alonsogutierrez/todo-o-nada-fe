import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'reactstrap'
import Loader from 'react-loader-spinner'

import productdata from '../../api/product'
import Pagination from '../../services/Pagination'
import AdminproductList from './AdminProduct'
import ClientAPI from './../../common/ClientAPI'

const AdminProduct = () => {
  const [productsearch, setProductSearch] = useState('')
  const [productList, setProductList] = useState(productdata)
  const [currentPage, setCurrentPage] = useState(null)
  const [IsDeleteProcess, setIsDeleteProcess] = useState(false)
  const [allProducts, setAllProducts] = useState([])
  const [clientAPI] = useState(new ClientAPI())
  const [loading, setLoading] = useState(true)

  useEffect(async () => {
    if (productsearch === '') {
      const adminProductResponse = await clientAPI.getAdminAllProducts()
      if (adminProductResponse.total > 0) {
        setAllProducts(adminProductResponse.hits)
        setLoading(false)
      } else {
        setAllProducts([])
        setLoading(false)
      }
    }

    window.scrollTo(0, 0)
  }, [productsearch])

  const onProductSearch = (searchproduct) => {
    let curr_products
    let actualProducts = []
    if (allProducts) {
      actualProducts = allProducts
    }
    if (searchproduct === '') {
      curr_products = actualProducts.slice((currentPage - 1) * 12, (currentPage - 1) * 12 + 12)
      setProductSearch(searchproduct)
      setProductList(actualProducts)
      setAllProducts(curr_products)
      setIsDeleteProcess(true)
    } else {
      let searchData = actualProducts.filter((productData) => {
        const { _source } = productData
        if (_source && Object.keys(_source).length > 0) {
          const { name } = _source
          if (searchproduct === searchproduct.toLowerCase()) {
            let product = name.toLowerCase().indexOf(searchproduct.toLowerCase()) > -1
            return product
          } else {
            let product = name.toUpperCase().indexOf(searchproduct.toUpperCase()) > -1
            return product
          }
        }
      })
      curr_products = null
      if (searchData.length > 12) {
        curr_products = searchData.slice(0, 12)
      } else {
        curr_products = searchData
      }

      setProductSearch(searchproduct)
      setProductList(searchData)
      setAllProducts(curr_products)
      setIsDeleteProcess(false)
    }
  }

  const onPageChanged = (data) => {
    const { currentPage, pageLimit } = data

    const offset = (currentPage - 1) * pageLimit
    const currentProduct = allProducts.slice(offset, offset + pageLimit)
    setCurrentPage(currentPage)
    setAllProducts(currentProduct)
  }

  const onDeleteProduct = (productdata) => {
    if (productdata) {
      let deletedproduct = productdata
      let newproduct = productList.filter(
        (CurrentProductList) => CurrentProductList.id !== deletedproduct.id
      )
      let curr_products = newproduct.filter(
        (CurrentProductList) => CurrentProductList.id !== deletedproduct.id
      )
      curr_products = curr_products.slice((currentPage - 1) * 12, (currentPage - 1) * 12 + 12)

      setProductList(newproduct)
      setAllProducts(curr_products)
      setIsDeleteProcess(true)
    }
  }
  let actualProducts = []
  if (allProducts) {
    actualProducts = allProducts
  }

  return (
    <div>
      <div className="section-ptb">
        <Container>
          <Row>
            {loading ? (
              <>
                <div>
                  <Loader type="Puff" color="#04d39f" height="100" width="100" />
                </div>
              </>
            ) : (
              <>
                <Col lg={12}>
                  <div className="mb-0">
                    <h4>Lista de productos</h4>
                  </div>
                  <div className="mb-4">
                    <form>
                      <div className="form-group mb-0">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search product"
                          value={productsearch}
                          onChange={(e) => {
                            onProductSearch(e.target.value)
                          }}
                        ></input>
                      </div>
                    </form>
                  </div>

                  <div className="mb-0 mb-md-4">
                    {actualProducts.length > 0 ? (
                      <Row className="products products-loop grid ciyashop-products-shortcode pgs-product-list">
                        {actualProducts.map((product, index) => (
                          <AdminproductList
                            product={product}
                            key={index}
                            deleteproduct={() => onDeleteProduct(product)}
                          />
                        ))}
                      </Row>
                    ) : (
                      <Row className="products products-loop grid ciyashop-products-shortcode">
                        <div className="col-sm-12 text-center  mt-4 mt-md-5">
                          <img
                            src={require(`../../assets/images/empty-search.jpg`)}
                            className="img-fluid mb-4"
                          />
                          <h3>Lo sentimos! No hay productos encontrados para tu selección! </h3>
                          <p>Intenta otras palabras por favor.</p>
                        </div>
                      </Row>
                    )}
                  </div>
                  <div className="row mt-md-3">
                    <div className="col-12">
                      {actualProducts.length > 12 ? (
                        <div>
                          <Pagination
                            totalRecords={actualProducts.length}
                            pageLimit={12}
                            onPageChanged={onPageChanged}
                            IsDeleteProcess={IsDeleteProcess}
                          />
                        </div>
                      ) : (
                        <div style={{ display: 'none' }}>
                          <Pagination
                            totalRecords={actualProducts.length}
                            pageLimit={12}
                            onPageChanged={onPageChanged}
                            IsDeleteProcess={IsDeleteProcess}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </Col>
              </>
            )}
          </Row>
        </Container>
      </div>
    </div>
  )
}
export default AdminProduct
