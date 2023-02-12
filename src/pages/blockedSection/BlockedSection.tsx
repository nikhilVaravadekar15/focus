/*global chrome*/
import React, { useEffect, useState } from 'react'
import "./BlockedSection.css"
import IconInternetCoverUp from "../../assets/images/internet_cover.gif"

import { TCustomClassName, TWebsiteContent, TBlockedWebsite } from '../../types/types'
import WebsiteContent from "./components/websiteContent/WebsiteContent"
import AlreadyBlocked from "./components/alreadyBlocked/AlreadyBlocked"
import CoverUpSection from "./components/coverUpSection/CoverUpSection"
import PButton from '../../components/button/PButton/PButton'
import { isAvailableInChromePaths, openOptions, validURL } from '../../utility/utility'


function BlockedSection({ classname }: TCustomClassName) {

    const [isAlreadyBlocked, setIsAlreadyBlocked] = useState<boolean>(false)
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

    function addToBlockList(event: any) {
        chrome.storage.sync.get(["redirectUrl", "blockedWebsites", "data"], (result: any) => {
            let flag: boolean = false
            let redirectUrl: string = result["redirectUrl"]
            let blockedWebsites: TBlockedWebsite[] = result["blockedWebsites"]

            for (let index = 0; index < blockedWebsites.length; index++) {
                let item: TBlockedWebsite = blockedWebsites[index]
                if (item["websiteOrigin"] === websiteContent.currentWebsiteOrigin && item["blockedStatus"]) {
                    flag = true
                    break
                }
            }

            if (flag) {
                setIsAlreadyBlocked(true)
                setTimeout(() => {
                    setIsAlreadyBlocked(false)
                }, 10000)
                console.log('%c Already blocked ', 'background: #222; color: purple; font-size:16px;');
            } else {
                blockedWebsites.push({
                    "websiteFavIcon": websiteContent.currentWebsiteFavIcon,
                    "websiteOrigin": websiteContent.currentWebsiteOrigin,
                    "hostname": websiteContent.currentWebsiteHostname,
                    "blockedStatus": true,
                })
                console.log('%c Added to blocked list ', 'background: #222; color: red; font-size:16px;');
            }

            chrome.storage.sync.set({ "blockedWebsites": blockedWebsites })
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (redirectUrl === "redirect.html") {
                    chrome.tabs.update({ url: chrome.runtime.getURL(`redirect.html#href=${websiteContent.currentWebsiteOrigin}`) });
                } else {
                    chrome.tabs.update({ url: redirectUrl });
                }
                console.log('%c Blocked ', 'background: #222; color: #bada55; font-size:16px;');
            })
        })
    }

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
                                {
                                    isAlreadyBlocked && <AlreadyBlocked />
                                }
                            </div>
                            <div className="lower__edit-buttons">
                                <div className="BlockedSectionButtons">
                                    <PButton
                                        classname={"block-current-btn"}
                                        title={"Block this site"}
                                        clickEventHandler={addToBlockList}
                                    />
                                    <PButton
                                        classname={"edit-list-btn"}
                                        title={"Edit block list"}
                                        clickEventHandler={openOptions}
                                    />
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
