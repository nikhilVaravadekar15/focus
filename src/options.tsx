import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./common.css"
import Navigation from "./components/navigationbar/Navigationbar";
import BlockSites from "./pages/blockSites/BlockSites";
import { pageContext, redirectContext } from "./context/context";
import About from "./pages/about/About";
import BlockByWords from "./pages/blockByWords/BlockByWords";
import Redirect from "./components/redirect/Redirect";


function Options() {

  const [currentTab, setCurrentNavTab] = useState<number>(0)
  const [redirectFlag, setRedirectFlag] = useState<boolean>(false)

  function setRedirectFlagStatus(flag: boolean) {
    setRedirectFlag(flag)
  }

  function setMenuItemClick(index: number) {
    setCurrentNavTab(() => {
      return index
    })
  }

  return (
    <pageContext.Provider value={{ currentTab, setMenuItemClick }}>
      <redirectContext.Provider value={{ redirectFlag, setRedirectFlagStatus }}>
        <div className="Options">
          <div className={redirectFlag ? "options__navbar blur" : "options__navbar"}>
            <Navigation />
          </div>
          <>
            <Redirect />
          </>
          <div className={redirectFlag ? "options__container blur" : "options__container"}>
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
              <BlockByWords />
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
      </redirectContext.Provider>
    </pageContext.Provider >
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>,
  document.getElementById("root")
);
