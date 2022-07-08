import React, { useState, useEffect } from 'react'
import Slider from 'react-slick'

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 2000,
  autoplaySpeed: 5000,
}

const banners = [
  {
    key: 'slide-1',
    image: 'BANNER_FENIX.jpg',
    alt: 'slide-1',
  },
  {
    key: 'slide-2',
    image: 'banner_shuter_doji-05.jpg',
    alt: 'slide-2',
  },
  {
    key: 'slide-3',
    image: 'irezumi_banner-01.jpg',
    alt: 'slide-3',
  },
  {
    key: 'slide-4',
    image: 'soul_of_dragon_banner-01.jpg',
    alt: 'slide-4',
  },
]

const HomSlider = () => {
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

  useEffect(() => {
    window.addEventListener('resize', handleResize, false)
  }, [])

  const handleOnClickBanner = () => {} // TODO: implement logic

  const renderDesktopScreen = () => {
    const bannerDesktopStyle = {
      margin: 'auto',
      width: '140vh',
      height: '60vh',
    }
    const sliderDesktopStyle = {
      width: '160vh',
      margin: 'auto',
    }
    return (
      <div style={sliderDesktopStyle}>
        <Slider className="slider-04 slider-simple-arrow" style={sliderDesktopStyle} {...settings}>
          {banners.map((banner) => {
            return (
              <div key={banner.key} className="slide-04-item" onClick={() => handleOnClickBanner()}>
                <div className="slide-inner">
                  <div className="slide-image">
                    <img
                      style={bannerDesktopStyle}
                      src={require(`../../assets/images/home-slider/${banner.image}`).default}
                      alt={banner.alt}
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
        {banners.map((banner) => {
          const imageStyle = banner.image.includes('FENIX')
            ? {
                minHeight: '100%',
              }
            : {}
          return (
            <div key={banner.key} className="slide-04-item" onClick={() => handleOnClickBanner()}>
              <div className="slide-inner">
                <div className="slide-image">
                  <img
                    style={imageStyle}
                    src={require(`../../assets/images/home-slider/${banner.image}`).default}
                    alt={banner.alt}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </Slider>
    )
  }
  const isMobileScreen = dimensions.width < 500
  return !isMobileScreen
    ? renderDesktopScreen() //null
    : renderMobileScreen()
}

export default HomSlider
