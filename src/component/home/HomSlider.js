import React from 'react'
import Slider from 'react-slick'

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  arrows: true,
  slidesToShow: 1,
  slidesToScroll: 1,
}

const HomSlider = () => {
  const handleOnClickBanner = () => {}
  return (
    <Slider className="slider-04 slider-simple-arrow" {...settings}>
      <div key={1} className="slide-04-item" onClick={() => handleOnClickBanner()}>
        <div className="slide-inner">
          <div className="slide-image">
            <img
              src={require(`../../assets/images/home-slider/banner_shuter_doji-05.jpg`).default}
              alt="slide-1"
            />
          </div>
        </div>
      </div>
      <div key={2} className="slide-04-item">
        <div className="slide-inner">
          <div className="slide-image">
            <img
              src={require(`../../assets/images/home-slider/irezumi_banner-01.jpg`).default}
              alt="slide-2"
            />
          </div>
        </div>
      </div>
      <div key={3} className="slide-04-item">
        <div className="slide-inner">
          <div className="slide-image">
            <img
              src={require(`../../assets/images/home-slider/soul_of_dragon_banner-01.jpg`).default}
              alt="slide-3"
            />
          </div>
        </div>
      </div>
    </Slider>
  )
}

export default HomSlider
