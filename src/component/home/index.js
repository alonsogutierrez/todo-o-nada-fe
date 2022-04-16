/**
 *  Home Classic Page
 */
import React from 'react'

import HomSlider from './HomSlider'

import ProductSliderHome from './ProductSliderHome'
import Collections from './Collections'
import Youtube from './Youtube'

const HomePage = () => {
  return (
    <>
      <HomSlider />
      <div id="content" className="site-content">
        <div className="content-wrapper">
          <ProductSliderHome />
        </div>
        <div>
          <Youtube />
        </div>
        <div className="content-wrapper">
          <Collections />
        </div>
      </div>
    </>
  )
}
export default HomePage
