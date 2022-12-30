import React, { useContext, useState } from 'react'
import "./Navigationbar.css"

import { navigationbarData } from "../../data/Data"
import { TFocusTabsSection, TNavigationbarData, TNavigationbarTabs } from '../../types/types';
import IconCoverFocus from "../../assets/images/cover-focus.gif"
import { pageContext } from '../../context/context';
import { setHref } from "../../utility/utility"
import IconBlock from "../../assets/images/icon__block.png"
import IconStar from "../../assets/images/start_us.gif"

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
      <div className="nav__footer">
        <div className="list">
          <div className="item">
            <div className="icon" title="Blocking">
              <img src={IconBlock} alt="" draggable="false" />
            </div>
            <span className="title">Blocking</span>
          </div>
          <div className="_toggle" title="Toggle">
            <div className="outer-circle isActive">
              <div className="inner-circle"></div>
            </div>
          </div>
        </div>
        <div className="list">
          <a href="https://github.com/nikhilVaravadekar15/focus" target="_blank" className="item">
            <div className="icon" title="Star us on Github">
              <img src={IconStar} alt="" draggable="false" style={{ width: "36px", height: "36px" }} />
            </div>
            <span className="title">Star us on Github</span>
          </a>
        </div>
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
