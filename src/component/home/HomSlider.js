/**
 * Page 3 Home Slider
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
                src={require(`../../assets/images/home-slider/img-01.jpg`).default}
                alt="slide-1"
              />
            </div>
            <div className="slide-content text-left">
              <div className="container">
                <div className="row justify-content-center text-center">
                  <div className="col-lg-4 col-md-6">
                    <div className="slide-inner bg-white">
                      <img
                        className="mx-auto"
                        src={require(`../../assets/images/home-slider/sale.png`).default}
                        alt="slide-1"
                      />
                      <div className="slide-title">
                        <h1>50% off</h1>
                      </div>
                      <div className="slide-subtitle">Final Reductions</div>
                      <p>Layer up in style with our new arrivals</p>
                      <Link class="slide-button" to="/shop">
                        View the collection{' '}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div key={2} className="slide-04-item">
          <div className="slide-inner">
            <div className="slide-image">
              <img
                src={require(`../../assets/images/home-slider/img-02.jpg`).default}
                alt="slide-1"
              />
            </div>
            <div className="slide-content text-left">
              <div className="container">
                <div className="row justify-content-center text-center">
                  <div className="col-lg-7">
                    <div className="slide-inner-02 bg-white">
                      <img
                        className="mx-auto slide-sale"
                        src={require(`../../assets/images/home-slider/sale-02.png`).default}
                        alt="slide-1"
                      />
                      <div className="slide-subtitle">#Introducing</div>
                      <div className="slide-title">
                        <h1>24/7 style</h1>
                      </div>
                      <p className="h4 text-dark">For the girls</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slider>
    )
  }
}

export default HomSlider
