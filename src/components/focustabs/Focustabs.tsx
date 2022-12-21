import React from 'react'
import "./Focustabs.css"

import { focusTabs } from "../../data/Data"
import { TFocusTabsSection, TTabsSection } from "../../types/types"

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
      <a href="#/dash-board" target={"_blank"}>
        <div className="Tab teal" title="Settings" id="settings">
          <div className="tab-image">
            <img src="/images/icon-settings.png" alt="" draggable="false" />
          </div>
        </div>
      </a>
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
