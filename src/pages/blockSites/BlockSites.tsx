import React from 'react'
import "./BlockSites.css"
import Navigation from '../../components/navigationbar/Navigationbar'
import DButton from '../../components/button/DButton/DButton'
import BlockInput from './components/blockInput/BlockInput'
import GetBlockedSiteList from './components/getBlockedSiteList/GetBlockedSiteList'

function BlockSites() {

  return (
    <div className='BlockSites'>
      <Navigation />
      {/* BlockSites section */}
      <div className="section">
        <div className="block__container">
          {/* header  */}
          <div className="header">
            <div className="block-container__header">
              <div className="header__titles">
                <h2>Block Sites</h2>
                <p>Block site permanently or by schedule</p>
              </div>
              <div className="buttons">
                <div className="single-button">
                  <DButton />
                </div>
                <div className="single-button">
                  <DButton />
                </div>
              </div>
            </div>
            <div className="block-input">
              <BlockInput />
            </div>
          </div>
          {/* body  */}
          <div className="block-container__body">
            <h2> BLOCKED SITES </h2>
            {/* list  */}
            <div className="block-added-list">
              {/* item  */}
              <GetBlockedSiteList />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default BlockSites
