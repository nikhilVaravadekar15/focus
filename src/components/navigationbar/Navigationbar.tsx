import React, { useContext, useState } from 'react'
import "./Navigationbar.css"

import { navigationbarData } from "../../data/Data"
import { TNavigationbarData, TNavigationbarTabs } from '../../types/types';
import IconCoverFocus from "../../assets/images/cover-focus.gif"

function Navigation() {

  return (
    <div className="Navigationbar">
      <div className="nav__header">
        <div className="header__logo">
          <div className="header__title-image">
            <img src={IconCoverFocus} alt="" draggable="false" />
          </div>
        </div>
        <ul>
          {
            navigationbarData.map((item: TNavigationbarData, index: number) => {
              return (
                <NavItem key={index} index={index} title={item["title"]} image={item["image"]} url={item["url"]} />
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}

function NavItem({ index, title, image, url }: TNavigationbarTabs) {

  return (
    <div
      style={{ textDecoration: 'none' }}>
      <li className={index === 0 ? "list active" : "list"}>
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
