import React from 'react'
import Slider from 'react-slick'

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 2000,
  autoplaySpeed: 5000
}

const banners = [
  {
    key: 'slide-1',
    image: 'banner_shuter_doji-05.jpg',
    alt: 'slide-1'
  },
  {
    key: 'slide-2',
    image: 'irezumi_banner-01.jpg',
    alt: 'slide-2'
  },
  {
    key: 'slide-3',
    image: 'soul_of_dragon_banner-01.jpg',
    alt: 'slide-4'
  }
]

const HomSlider = () => {
  const handleOnClickBanner = () => {}
  return (
    <Slider className="slider-04 slider-simple-arrow" {...settings}>
      {banners.map(banner => {
        return (
          <div key={banner.key} className="slide-04-item" onClick={() => handleOnClickBanner()}>
            <div className="slide-inner">
              <div className="slide-image">
                <img
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

export default HomSlider
