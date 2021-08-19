/**
 * Shop Page Social Info
 */
import React from 'react'

function SocialFilter() {
  return (
    <div className="widget widget_pgs_social_profiles">
      <h4 className="widget-title">Redes sociales</h4>
      <div className="social-profiles-wrapper">
        <div className="social-profiles-wrapper-inner social-profiles-default social-profiles-shape-square">
          <div className="social-profiles">
            <ul>
              <li>
                <a
                  href="https://www.facebook.com"
                  title="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-facebook" />
                </a>
              </li>
            </ul>
            <div className="clearfix" />
          </div>
        </div>
      </div>
    </div>
  )
}
export default SocialFilter
