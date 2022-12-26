/*global chrome*/
import React, { useEffect, useState } from 'react'
import "./BlockedSection.css"
import IconInternetCoverUp from "../../assets/images/internet_cover.gif"
import logo from "../../assets/images/icon-focus_main_64.png"

import { TCustomClassName, TWebsiteContent } from '../../types/types'
import WebsiteContent from "./components/websiteContent/WebsiteContent"
import AlreadyBlocked from "./components/alreadyBlocked/AlreadyBlocked"
import CoverUpSection from "./components/coverUpSection/CoverUpSection"
import PButton from '../../components/button/PButton/PButton'



export function validURL(url: string) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(url);
}

export function isAvailableInChromePaths(url: string) {
    // check if the current tab is in chrome-paths
    let chrome_paths = ["file://", "about:blank", "chrome://", "chrome-extension://"]
    for (var i = 0; i < chrome_paths.length; i++) {
        if (url.includes(chrome_paths[i])) {
            return true
        }
    }
    return false
}


function BlockedSection({ classname }: TCustomClassName) {

    const [validSection, setValidSection] = useState<boolean>(false)
    const [title, setTitle] = useState<string>("__FOCUS__")
    const [websiteContent, setWebsiteContent] = useState<TWebsiteContent>({
        currentWebsiteOrigin: "",
        currentWebsiteHostname: "__FOCUS__",
        currentWebsiteFavIcon: ""
    })

    useEffect(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
            const currentWebsiteOrigin: string = new URL(tabs[0].url).origin
            const currentWebsiteHostname: string = tabs[0].url === undefined ? "" : new URL(tabs[0].url).hostname
            const currentWebsiteFavIcon: string = tabs[0].favIconUrl === undefined ? IconInternetCoverUp
                : "https://s2.googleusercontent.com/s2/favicons?domain_url=" + currentWebsiteOrigin

            if (validURL(currentWebsiteOrigin) && !isAvailableInChromePaths(currentWebsiteOrigin)) {
                setValidSection(true)
                setWebsiteContent({
                    currentWebsiteOrigin: currentWebsiteOrigin,
                    currentWebsiteHostname: currentWebsiteHostname,
                    currentWebsiteFavIcon: currentWebsiteFavIcon
                })
            }
            else {
                setValidSection(false)
                setTitle(currentWebsiteOrigin)
            }
        })

    }, [])


    return (
        <div className={`${classname} BlockedSection`}>
            <div className="section__upper"></div>
            {
                validSection ?
                    (
                        <div className="section__lower">
                            <div className="lower__content">
                                <WebsiteContent
                                    currentWebsiteOrigin={websiteContent.currentWebsiteOrigin}
                                    currentWebsiteHostname={websiteContent.currentWebsiteHostname}
                                    currentWebsiteFavIcon={websiteContent.currentWebsiteFavIcon}
                                />
                                <AlreadyBlocked />
                            </div>
                            <div className="lower__edit-buttons">
                                <div className="BlockedSectionButtons">
                                    <PButton
                                        classname={"block-current-btn"}
                                        title={"Block this site"}
                                        clickEventHandler={() => { }}
                                    />
                                    <a href="#/dash-board" target="_blank"
                                        style={{
                                            textDecoration: "none",
                                            width: "100%",
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <PButton
                                            classname={"edit-list-btn"}
                                            title={"Edit block list"}
                                            clickEventHandler={() => { }}
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <CoverUpSection
                            title={title}
                        />
                    )
            }
        </div>
    )
}


export default BlockedSection
