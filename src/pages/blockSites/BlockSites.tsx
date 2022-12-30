import React from 'react'
import "./BlockSites.css"
import DButton from '../../components/button/DButton/DButton'
import BlockInput from './components/blockInput/BlockInput'
import GetBlockedSiteList from './components/getBlockedSiteList/GetBlockedSiteList'
import BlockSubstitute from './components/blockSubstitute/BlockSubstitute'

function BlockSites() {

  return (
    <div className='BlockSites'>
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

            <div className="block-added-list">
              <GetBlockedSiteList />
            </div>

            {/* <BlockSubstitute /> */}

          </div>
        </div>

      </div>
    </div>
  )
}

export default BlockSites
