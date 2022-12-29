import React, { useContext, useState } from 'react'
import "./Navigationbar.css"

import { navigationbarData } from "../../data/Data"
import { TFocusTabsSection, TNavigationbarData, TNavigationbarTabs } from '../../types/types';
import IconCoverFocus from "../../assets/images/cover-focus.gif"
import { pageContext } from '../../context/context';
import { setHref } from "../../utility/utility"

function Navigation() {

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
                />
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}


function NavItem({ index, title, image, url }: TNavigationbarTabs) {
  const { currentTab, setMenuItemClick } = useContext(pageContext);
  return (
    <div style={{ textDecoration: "none" }}>
      <li
        className={index === currentTab ? "list active" : "list"}
        onClick={() => {
          setMenuItemClick(index)
          setHref(url)
        }}
      >
        <div className="item">
          <div className="icon" title={title}>
            <img src={image} alt="" draggable="false" />
          </div>
          <span className="title">{title}</span>
        </div>
      </li>
    </div>
  )
}


export default Navigation
