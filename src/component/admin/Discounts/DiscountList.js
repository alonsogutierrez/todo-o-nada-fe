import React, { useState, useEffect } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { Col, Container, Row } from 'reactstrap'
import Loader from 'react-loader-spinner'

import Pagination from '../../../services/Pagination'
import AdminDiscount from './AdminDiscount'
import UploadProducts from './UploadDiscounts'
import DownloadProducts from './DownloadDiscounts'
import DiscountAPI from '../../../common/DiscountAPI'

const DiscountList = () => {
  const [discountTextSearch, setDiscountSearch] = useState('')
  const [discountList, setDiscountList] = useState([])
  const [currentPage, setCurrentPage] = useState(null)
  const [IsDeleteProcess, setIsDeleteProcess] = useState(false)
  const [allDiscounts, setAllDiscounts] = useState([])
  const [clientAPI] = useState(new DiscountAPI())
  const [loading, setLoading] = useState(true)

  useEffect(async () => {
    if (discountTextSearch === '') {
      const adminDiscountResponse = await clientAPI.getAllAdminDiscounts()
      if (adminDiscountResponse.discounts.length > 0) {
        setAllDiscounts(adminDiscountResponse.discounts)
        setLoading(false)
      } else {
        setAllDiscounts([])
        setLoading(false)
      }
    }

    window.scrollTo(0, 0)
  }, [discountTextSearch])

  const onDiscountSearch = (event) => {
    const inputDiscountTextSearch = event.target.value
    let curr_discounts
    let actualDiscounts = []
    if (allDiscounts) {
      actualDiscounts = allDiscounts
    }
    if (inputDiscountTextSearch === '' || !inputDiscountTextSearch) {
      setDiscountSearch(inputDiscountTextSearch)
      setDiscountList([])
      setAllDiscounts([])
      //setIsDeleteProcess(true)
    } else {
      let searchData = actualDiscounts.filter((discountData) => {
        const { _source } = discountData
        if (_source && Object.keys(_source).length > 0) {
          const { name } = _source
          if (!name) return false
          if (inputDiscountTextSearch === inputDiscountTextSearch.toLowerCase()) {
            let discount = name.toLowerCase().indexOf(inputDiscountTextSearch.toLowerCase()) > -1
            return discount
          } else {
            let discount = name.toUpperCase().indexOf(inputDiscountTextSearch.toUpperCase()) > -1
            return discount
          }
        }
      })
      curr_discounts = null
      if (searchData.length > 12) {
        curr_discounts = searchData.slice(0, 12)
      } else {
        curr_discounts = searchData
      }

      setDiscountSearch(inputDiscountTextSearch)
      setDiscountList(searchData)
      setAllDiscounts(curr_discounts)
      setIsDeleteProcess(false)
    }
  }

  const onPageChanged = (data) => {
    const { currentPage, pageLimit } = data
    const offset = (currentPage - 1) * pageLimit
    const currentProduct = allDiscounts.slice(offset, offset + pageLimit)
    setCurrentPage(currentPage)
    setAllDiscounts(currentProduct)
  }

  const onDeleteDiscount = (discountData) => {
    if (discountData) {
      let deletedDiscount = discountData
      let newDiscount = discountList.filter(
        (CurrentdiscountList) => CurrentdiscountList.id !== deletedDiscount.id
      )
      let curr_discounts = newDiscount.filter(
        (CurrentdiscountList) => CurrentdiscountList.id !== deletedDiscount.id
      )
      curr_discounts = curr_discounts.slice((currentPage - 1) * 12, (currentPage - 1) * 12 + 12)

      setDiscountList(newDiscount)
      setAllDiscounts(curr_discounts)
      setIsDeleteProcess(true)
    }
  }
  let actualDiscounts = []
  if (allDiscounts) {
    actualDiscounts = allDiscounts
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
                  <Tabs>
                    <TabList>
                      <Tab>Lista de descuentos</Tab>
                      <Tab>Cargar descuentos</Tab>
                      <Tab>Descargas</Tab>
                    </TabList>

                    <TabPanel>
                      <>
                        <div className="mb-0">
                          <h4>Lista de productos</h4>
                        </div>
                        <div className="mb-4">
                          <form>
                            <div className="form-group mb-0">
                              <input
                                type="search"
                                className="form-control"
                                placeholder="Search discount"
                                value={discountTextSearch}
                                onChange={(e) => {
                                  onDiscountSearch(e)
                                }}
                              ></input>
                            </div>
                          </form>
                        </div>

                        <div className="mb-0 mb-md-4">
                          {actualDiscounts.length > 0 ? (
                            <Row className="products products-loop grid ciyashop-products-shortcode pgs-product-list">
                              {actualDiscounts.map((discount, index) => (
                                <AdminDiscount
                                  discount={discount}
                                  key={index}
                                  deleteproduct={() => onDeleteDiscount(discount)}
                                />
                              ))}
                            </Row>
                          ) : (
                            <Row className="products products-loop grid ciyashop-products-shortcode">
                              <div className="col-sm-12 text-center  mt-4 mt-md-5">
                                <img
                                  src={require(`../../../assets/images/empty-search.jpg`)}
                                  className="img-fluid mb-4"
                                />
                                <h3>
                                  Lo sentimos! No hay descuentos encontrados para tu selección!{' '}
                                </h3>
                                <p>Intenta otras palabras por favor.</p>
                              </div>
                            </Row>
                          )}
                        </div>
                        <div className="row mt-md-3">
                          <div className="col-12">
                            {actualDiscounts.length > 12 ? (
                              <div>
                                <Pagination
                                  totalRecords={actualDiscounts.length}
                                  pageLimit={100}
                                  onPageChanged={onPageChanged}
                                  IsDeleteProcess={IsDeleteProcess}
                                />
                              </div>
                            ) : (
                              <div style={{ display: 'none' }}>
                                <Pagination
                                  totalRecords={actualDiscounts.length}
                                  pageLimit={12}
                                  onPageChanged={onPageChanged}
                                  IsDeleteProcess={IsDeleteProcess}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    </TabPanel>
                    <TabPanel>
                      <div className="row mt-mb-0">
                        <h4>Cargar descuentos desde planilla Excel</h4>
                        <UploadProducts />
                      </div>
                    </TabPanel>
                    <TabPanel>
                      <h3>Descargas de descuentos</h3>
                      <DownloadProducts />
                    </TabPanel>
                  </Tabs>
                </Col>
              </>
            )}
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default DiscountList
