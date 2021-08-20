import React, { Component } from 'react'
//import { Link } from 'react-router-dom'
import Slider from 'react-slick'

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  arrows: true,
  slidesToShow: 1,
  slidesToScroll: 1,
}

class HomSlider extends Component {
  render() {
    return (
      <Slider className="slider-04 slider-simple-arrow" {...settings}>
        <div key={1} className="slide-04-item">
          <div className="slide-inner">
            <div className="slide-image">
              <img
                src={
                  require(`../../assets/images/home-slider/soul_of_dragon_banner-01.jpg`).default
                }
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
                alt="slide-1"
              />
            </div>
          </div>
        </div>
      </Slider>
    )
  }
}

export default HomSlider
