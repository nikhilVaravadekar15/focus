import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./common.css"
import Navigation from "./components/navigationbar/Navigationbar";
import BlockSites from "./pages/blockSites/BlockSites";
import { pageContext } from "./context/context";
import About from "./pages/about/About";


function Options() {

  const [currentTab, setCurrentNavTab] = useState<number>(0)

  function setMenuItemClick(index: number) {
    setCurrentNavTab(() => {
      return index
    })
  }

  return (
    <pageContext.Provider value={{ currentTab, setMenuItemClick }}>
      <div className="Options">
        <div className="options__navbar">
          <Navigation />
        </div>
        <div className="options__container">
          <div id="/block-sites"
            className={`options_section ${currentTab === 0 && "active"}`}>
            <BlockSites />
          </div>
          <div id="/focus-mode"
            className={`options_section ${currentTab === 1 && "active"}`}>
            focusMode
          </div>
          <div id="/insights"
            className={`options_section ${currentTab === 2 && "active"}`}>
            insights
          </div>
          <div id="/block-by-words"
            className={`options_section ${currentTab === 3 && "active"}`}>
            BlockByWords
          </div>
          <div id="/categories"
            className={`options_section ${currentTab === 4 && "active"}`}>
            Categories
          </div>
          <div id="/settings"
            className={`options_section ${currentTab === 5 && "active"}`}>
            Settings
          </div>
          <div id="/about"
            className={`options_section ${currentTab === 6 && "active"}`}>
            <About />
          </div>
        </div>
      </div>
    </pageContext.Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>,
  document.getElementById("root")
);
