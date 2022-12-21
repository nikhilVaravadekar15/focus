/*global chrome*/
import React, { useEffect, useState } from 'react'
import "./BlockedSection.css"
import { TCustomClassName } from '../../types/types'

import WebsiteContent from "./components/websiteContent/WebsiteContent"
import AlreadyBlocked from "./components/alreadyBlocked/AlreadyBlocked"
import CoverUpSection from "./components/coverUpSection/CoverUpSection"
import BlockedSectionButtons from "./components/buttons/BlockedSectionButtons"

import logo from "../../assets/images/icon-focus_main_64.png"

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
                    <BlockedSectionButtons />
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
