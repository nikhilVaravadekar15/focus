import React from 'react'
import "./Focustabs.css"
import IconSettings from "../../assets/images/icon-settings.png"

import { focusTabs } from "../../data/Data"
import { TFocusTabsSection, TTabsSection } from "../../types/types"
import { openOptions } from '../../utility/utility'

function Focustabs({ currentTab, setMenuItemClick }: TFocusTabsSection) {

  return (
    <div className='Focustabs'>
      {
        focusTabs.map((item, index) => {
          return <Tab
            key={index}
            index={index}
            title={item["title"]}
            image={item["image"]}
            background={item["background"]}
            currentTab={currentTab}
            handleMenuItemClick={setMenuItemClick}
          />
        })
      }
      <div onClick={() => openOptions()}>
        <div className="Tab teal" title="Settings" id="settings">
          <div className="tab-image">
            <img src={IconSettings} alt="dashboard" draggable="false" />
          </div>
        </div>
      </div>
    </div>
  )
}

function Tab({ index, title, image, background, currentTab, handleMenuItemClick }: TTabsSection) {
  return (
    <div className={index === currentTab ? `Tab ${background} active` : `Tab ${background} `}
      key={index}
      title={title}
      onClick={() => handleMenuItemClick(index)}
    >
      <div className="tab-image">
        <img src={image} alt="" draggable="false" />
      </div>
      <p>{title}</p>
    </div>
  )
}

export default Focustabs
