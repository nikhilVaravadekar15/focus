/*global chrome*/
import React, { useEffect, useState } from 'react'
import "./BlockedSection.css"
import { TCustomClassName } from '../../types/types'

import WebsiteContent from "./components/websiteContent/WebsiteContent"
import AlreadyBlocked from "./components/alreadyBlocked/AlreadyBlocked"
import CoverUpSection from "./components/coverUpSection/CoverUpSection"

import logo from "../../assets/images/icon-focus_main_64.png"
import PButton from '../../components/PButton/PButton'

function BlockedSection({ classname }: TCustomClassName) {
    return (
        <div className={`${classname} BlockedSection`}>
            <div className="section__upper"></div>
            <div className="section__lower isValid">
                <div className="lower__content">
                    <WebsiteContent
                        currentWebsiteOrigin={"github"}
                        currentWebsiteHostname={"githib.com"}
                        currentWebsiteFavIcon={logo}
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
            {/* <CoverUpSection
                classname={"isValid"}
                title={""}
            /> */}
        </div>
    )
}


export default BlockedSection
