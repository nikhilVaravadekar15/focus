import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./common.css"
import { TData } from "./types/types";
import Navigation from "./components/navigationbar/Navigationbar";
import BlockSites from "./pages/blockSites/BlockSites";
import About from "./pages/about/About";
import BlockByWords from "./pages/blockByWords/BlockByWords";
import Redirect from "./components/redirect/Redirect";
import Schedule from "./components/schedule/Schedule";
import Categories from "./pages/categories/Categories";
import Settings from "./pages/settings/Settings";
import { pageContext, mainActiveContext, redirectContext, scheduleContext } from "./context/context";


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
          <scheduleContext.Provider value={{ scheduleFlag, setScheduleFlagStatus }}>
            <div className="Options">
              <div className={redirectFlag || scheduleFlag ? "options__navbar blur" : "options__navbar"}>
                <Navigation />
              </div>
              <>
                <Redirect />
              </>
              <>
                <Schedule />
              </>
              <div className={redirectFlag || scheduleFlag || !mainActiveStatus ? "options__container blur" : "options__container"}>
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
                  <Categories />
                </div>
                <div id="/settings"
                  className={`options_section ${currentTab === 5 && "active"}`}>
                  <Settings />
                </div>
                <div id="/about"
                  className={`options_section ${currentTab === 6 && "active"}`}>
                  <About />
                </div>
              </div>
            </div>
          </scheduleContext.Provider>
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
