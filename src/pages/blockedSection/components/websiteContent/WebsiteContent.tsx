import React from 'react'
import { TWebsiteContent } from '../../../../types/types'
import "./WebsiteContent.css"

function WebsiteContent({ currentWebsiteOrigin, currentWebsiteHostname, currentWebsiteFavIcon }: TWebsiteContent) {
    return (
        <>
            <div className="content_website-icon" title={currentWebsiteHostname}>
                <img src={currentWebsiteFavIcon} alt={currentWebsiteHostname} draggable="false" />
            </div>
            <div className="content__website-name">
                <h2>
                    {currentWebsiteOrigin === null ? currentWebsiteOrigin : "__FOCUS__"}
                </h2>
            </div>
        </>
    )
}

export default WebsiteContent
