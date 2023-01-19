import React, { useState, useEffect } from 'react'
import Slider from 'react-slick'

import ClientAPI from './../../common/ClientAPI'

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 2000,
  autoplaySpeed: 5000,
}

const HomSlider = () => {
  const [clientAPI] = useState(new ClientAPI())
  const [bannersData, setBannersData] = useState({
    loading: false,
    data: [],
  })
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  const handleResize = () => {
    setDimensions({
      width: window.screen.width,
      height: window.screen.height,
    })
  }

  useEffect(async () => {
    // TODO: Call to BFF to get banners data and render it
    setBannersData({
      loading: true,
      data: bannersData.data,
    })
    const banners = await clientAPI.getAdminAllBanners()
    setBannersData({
      loading: false,
      data: banners,
    })
    window.addEventListener('resize', handleResize, false)
  }, [])

  const handleOnClickBanner = () => {} // TODO: implement logic

  const renderDesktopScreen = () => {
    const bannerDesktopStyle = {
      margin: 'auto',
      width: '140vh',
      height: '60vh',
      borderRadius: '1vh',
    }
    const sliderDesktopStyle = {
      width: '160vh',
      margin: 'auto',
    }
    return (
      <div style={sliderDesktopStyle}>
        <Slider className="slider-04 slider-simple-arrow" style={sliderDesktopStyle} {...settings}>
          {bannersData.data.map((bannerData) => {
            const { bannerNumber, images } = bannerData
            return (
              <div
                key={`slide-${bannerNumber}`}
                className="slide-04-item"
                onClick={() => handleOnClickBanner()}
              >
                <div className="slide-inner">
                  <div className="slide-image">
                    <img
                      style={bannerDesktopStyle}
                      src={images.desktop}
                      alt={`slide-${bannerNumber}`}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </Slider>
      </div>
    )
  }

  const renderMobileScreen = () => {
    return (
      <Slider className="slider-04 slider-simple-arrow" {...settings}>
        {bannersData.data.map((bannerData) => {
          const { bannerNumber, images } = bannerData
          const notRender = images.mobile.includes('BANNER_FENIX') && dimensions.width < 992
          const imageStyle = images.mobile.includes('FENIX')
            ? {
                minHeight: '100%',
                borderRadius: '1vh',
              }
            : {
                borderRadius: '1vh',
              }
          if (!notRender) {
            return (
              <div
                key={`slide-${bannerNumber}`}
                className="slide-04-item"
                onClick={() => handleOnClickBanner()}
              >
                <div className="slide-inner">
                  <div className="slide-image">
                    <img style={imageStyle} src={images.mobile} alt={`slide-${bannerNumber}`} />
                  </div>
                </div>
              </div>
            )
          }
        })}
      </Slider>
    )
  }
  const isMobileScreen = dimensions.width < 500
  return !isMobileScreen ? renderDesktopScreen() : renderMobileScreen()
}

export default HomSlider
