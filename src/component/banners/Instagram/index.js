import React from 'react'

import Instagram from '../../../widgets/Instafeed'

const InstagramBanner = () => (
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
)

export default InstagramBanner
