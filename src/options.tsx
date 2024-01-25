import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./common.css"
import Navigation from "./components/navigationbar/Navigationbar";
import BlockSites from "./pages/blockSites/BlockSites";
import About from "./pages/about/About";
import BlockByWords from "./pages/blockByWords/BlockByWords";
import Redirect from "./components/redirect/Redirect";
import Categories from "./pages/categories/Categories";
import Insights from "./pages/insights/Insights";
import { pageContext, mainActiveContext, redirectContext } from "./context/context";


function Options() {

  const [currentTab, setCurrentNavTab] = useState<number>(0)
  const [mainActiveStatus, setMainActiveStatus] = useState<boolean>(true)
  const [redirectFlag, setRedirectFlag] = useState<boolean>(false)
  const [scheduleFlag, setScheduleFlag] = useState<boolean>(false)

  useEffect(() => {
    chrome.storage.sync.get(["mainActive", "navigation"], (result: any) => {
      const mainActive: boolean = result["mainActive"]
      const navigation: number = result["navigation"]
      setMainActiveStatus(mainActive)
      setCurrentNavTab(navigation)
    })
  }, [])

  useEffect(() => {
    // current navigation tab    
    chrome.storage.sync.set({ "navigation": currentTab })
  }, [currentTab])

  useEffect(() => {
    // main active status
    chrome.storage.sync.set({ "mainActive": mainActiveStatus })
  }, [mainActiveStatus])

  function setMainActiveStatusFlag(flag: boolean) {
    //set main active status flag
    setMainActiveStatus(flag)
  }

  function setRedirectFlagStatus(flag: boolean) {
    //set redirect popup status flag
    setRedirectFlag(flag)
  }

  function setScheduleFlagStatus(flag: boolean) {
    //set schedule popup status flag
    setScheduleFlag(flag)
  }

  function setMenuItemClick(index: number) {
    setCurrentNavTab(() => {
      return index
    })
  }

  return (
    <pageContext.Provider value={{ currentTab, setMenuItemClick }}>
      <mainActiveContext.Provider value={{ mainActive: mainActiveStatus, setMainActiveFlagStatus: setMainActiveStatusFlag }}>
        <redirectContext.Provider value={{ redirectFlag, setRedirectFlagStatus }}>
          <div className="Options">
            <div className={redirectFlag ? "options__navbar blur" : "options__navbar"}>
              <Navigation />
            </div>
            <>
              <Redirect />
            </>
            <div className={redirectFlag || scheduleFlag || !mainActiveStatus ? "options__container blur" : "options__container"}>
              <div id="/block-sites"
                className={`options_section ${currentTab === 0 && "active"}`}>
                <BlockSites />
              </div>
              <div id="/insights"
                className={`options_section ${currentTab === 1 && "active"}`}>
                <Insights />
              </div>
              <div id="/block-by-words"
                className={`options_section ${currentTab === 2 && "active"}`}>
                <BlockByWords />
              </div>
              <div id="/categories"
                className={`options_section ${currentTab === 3 && "active"}`}>
                <Categories />
              </div>
              <div id="/about"
                className={`options_section ${currentTab === 4 && "active"}`}>
                <About />
              </div>
            </div>
          </div>
        </redirectContext.Provider>
      </mainActiveContext.Provider>
    </pageContext.Provider >
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>,
  document.getElementById("root")
);
