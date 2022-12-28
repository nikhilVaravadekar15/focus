import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./common.css"
import Navigation from "./components/navigationbar/Navigationbar";
import BlockSites from "./pages/blockSites/BlockSites";


function Options() {

  const [currentNavTab, setCurrentNavTab] = useState<number>(0)

  function handleTabClick(id: number) {
    setCurrentNavTab(() => {
      return id
    })
  }

  return (
    <div className="Options">
      <div className="options__navbar">
        <Navigation
          currentTab={currentNavTab}
          setMenuItemClick={handleTabClick}
        />
      </div>
      <div className="options__container">

        <div id="/block-sites"
          className={`options_section ${currentNavTab === 0 && "active"}`}>
          <BlockSites />
        </div>
        <div id="/focus-mode"
          className={`options_section ${currentNavTab === 1 && "active"}`}>
          focusMode
        </div>
        <div id="/insights"
          className={`options_section ${currentNavTab === 2 && "active"}`}>
          insights
        </div>
        <div id="/block-by-words"
          className={`options_section ${currentNavTab === 3 && "active"}`}>
          BlockByWords
        </div>
        <div id="/categories"
          className={`options_section ${currentNavTab === 4 && "active"}`}>
          Categories
        </div>
        <div id="/settings"
          className={`options_section ${currentNavTab === 5 && "active"}`}>
          Settings
        </div>
        <div id="/about"
          className={`options_section ${currentNavTab === 6 && "active"}`}>
          About
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>,
  document.getElementById("root")
);
