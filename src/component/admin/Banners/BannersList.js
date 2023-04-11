import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'reactstrap'
import Loader from 'react-loader-spinner'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'

import Pagination from '../../../services/Pagination'
import ClientAPI from '../../../common/ClientAPI'
import AdminBanner from './AdminBanner'
import UploadBanner from './UploadBanner'
import DownloadBanners from './DownloadBanners'

const BannersList = () => {
  const [bannerTextSearch, setBannerTextSearch] = useState('')
  const [IsDeleteProcess, setIsDeleteProcess] = useState(false)
  const [allBanners, setAllBanners] = useState([])
  const [clientAPI] = useState(new ClientAPI())
  const [loading, setLoading] = useState(true)
  const [refresh, setRefresh] = useState(false)

  useEffect(async () => {
    if (bannerTextSearch === '') {
      const bannersApiResponse = await clientAPI.getAdminAllBanners()
      if (bannersApiResponse.length > 0) {
        setAllBanners(bannersApiResponse)
        setLoading(false)
      } else {
        setAllBanners([])
        setLoading(false)
      }
    }

    window.scrollTo(0, 0)
  }, [bannerTextSearch, refresh])

  const onBannerSearch = (event) => {
    let inputBannerTextSearch = event.target.value.trim()
    let curr_banners
    let actualBanners = []
    if (allBanners) {
      actualBanners = allBanners
    }
    if (inputBannerTextSearch === '' || !inputBannerTextSearch) {
      setBannerTextSearch('')
      setIsDeleteProcess(true)
    } else {
      let searchData = actualBanners.filter((bannerData) => {
        const { position, bannerNumber } = bannerData
        if (!position) return false
        inputBannerTextSearch = parseInt(inputBannerTextSearch)
        let banner =
          position === parseInt(inputBannerTextSearch) ||
          bannerNumber === parseInt(inputBannerTextSearch)
        return banner
      })
      curr_banners = null
      if (searchData.length > 12) {
        curr_banners = searchData.slice(0, 12)
      } else {
        curr_banners = searchData
      }

      setBannerTextSearch(inputBannerTextSearch)
      setAllBanners(curr_banners)
      setIsDeleteProcess(false)
    }
  }

  const onPageChanged = (data) => {
    const { currentPage, pageLimit } = data
    const offset = (currentPage - 1) * pageLimit
    const currentProduct = allBanners.slice(offset, offset + pageLimit)
    setAllBanners(currentProduct)
  }

  const onDeleteBanner = (bannerData) => {
    if (bannerData) {
      setRefresh(!refresh)
      setBannerTextSearch('')
    }
  }

  let actualBanners = []
  if (allBanners) {
    actualBanners = allBanners
  }

  actualBanners = actualBanners.sort((a, b) => a.position < b.position)

  return (
    <>
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
                        <Tab>Lista de Banners</Tab>
                        <Tab>Cargar banners</Tab>
                        <Tab>Descargas</Tab>
                      </TabList>

                      <TabPanel>
                        <>
                          <div className="mb-0">
                            <h4>Lista de banners</h4>
                          </div>
                          <div className="mb-4">
                            <form>
                              <div className="form-group mb-0">
                                <input
                                  type="search"
                                  className="form-control"
                                  placeholder="Search banner"
                                  value={bannerTextSearch}
                                  onChange={(e) => {
                                    onBannerSearch(e)
                                  }}
                                ></input>
                              </div>
                            </form>
                          </div>

                          <div className="mb-0 mb-md-4">
                            {actualBanners.length > 0 ? (
                              <Row className="products products-loop grid ciyashop-products-shortcode pgs-product-list">
                                {actualBanners.map((banner, index) => (
                                  <AdminBanner
                                    banner={banner}
                                    key={index}
                                    deleteBanner={() => onDeleteBanner(banner)}
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
                                    Lo sentimos! No hay banners encontrados para tu selección!{' '}
                                  </h3>
                                  <p>Intenta otras palabras por favor.</p>
                                </div>
                              </Row>
                            )}
                          </div>
                          <div className="row mt-md-3">
                            <div className="col-12">
                              {actualBanners.length > 12 ? (
                                <div>
                                  <Pagination
                                    totalRecords={actualBanners.length}
                                    pageLimit={100}
                                    onPageChanged={onPageChanged}
                                    IsDeleteProcess={IsDeleteProcess}
                                  />
                                </div>
                              ) : (
                                <div style={{ display: 'none' }}>
                                  <Pagination
                                    totalRecords={actualBanners.length}
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
                          <h4>Cargar banners desde planilla Excel</h4>
                          <UploadBanner />
                        </div>
                      </TabPanel>
                      <TabPanel>
                        <h3>Descargas de banners</h3>
                        <DownloadBanners />
                      </TabPanel>
                    </Tabs>
                  </Col>
                </>
              )}
            </Row>
          </Container>
        </div>
      </div>
    </>
  )
}

export default BannersList
