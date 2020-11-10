/**
 *  Home Classic Page
 */
import React, { Fragment } from 'react'

import HomSlider from './HomSlider'
import Instagram from './Instafeed'

import ProductSliderHome from './ProductSliderHome'
import Collections from './Collections'

const HomePage = () => {
  return (
    <Fragment>
      <HomSlider />
      <div id="content" className="site-content">
        <div className="content-wrapper">
          <ProductSliderHome />
        </div>
        <div className="content-wrapper">
          <Collections />
        </div>
        <div className="content-wrapper overflow-hidden">
          <div className="container-fluid p-0">
            <div className="row">
              <div className="col-sm-12">
                <div className="instafeed insta-feeds">
                  <Instagram />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
export default HomePage
