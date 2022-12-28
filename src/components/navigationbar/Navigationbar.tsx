import React, { useContext, useState } from 'react'
import "./Navigationbar.css"

import { navigationbarData } from "../../data/Data"
import { TFocusTabsSection, TNavigationbarData, TNavigationbarTabs } from '../../types/types';
import IconCoverFocus from "../../assets/images/cover-focus.gif"

function Navigation({ currentTab, setMenuItemClick }: TFocusTabsSection) {

  return (
    <div className="Navigationbar">
      <div className="nav__header">
        <div className="header__logo">
          <div className="header__title-image">
            <img src={IconCoverFocus} alt="" draggable="false" />
          </div>
        </div>
      </div>
      <div className="nav__body">
        <ul>
          {
            navigationbarData.map((item: TNavigationbarData, index: number) => {
              return (
                <NavItem
                  key={index}
                  index={index}
                  title={item["title"]}
                  image={item["image"]}
                  url={item["url"]}
                  currentTab={currentTab}
                  handleMenuItemClick={setMenuItemClick}
                />
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}

function NavItem({ index, title, image, url, currentTab, handleMenuItemClick }: TNavigationbarTabs) {

  return (
    <a href={url} style={{ textDecoration: "none" }}>
      <li
        className={index === currentTab ? "list active" : "list"}
        onClick={() => handleMenuItemClick(index)}
      >
        <div className="item">
          <div className="icon" title={title}>
            <img src={image} alt="" draggable="false" />
          </div>
          <span className="title">{title}</span>
        </div>
      </li>
    </a>
  )
}


export default Navigation
