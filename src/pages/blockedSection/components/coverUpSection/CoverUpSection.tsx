import React from 'react'
import "./CoverUpSection.css"
import backgroundBlocksitesGif from "../../../../assets/images/background-blocksites.gif"
import { openOptions } from '../../../../utility/utility'

function CoverUpSection({ title }: any) {
    return (
        <div className="section_cover-image">
            <div className="cover__background">
                <img src={backgroundBlocksitesGif} alt="" draggable="false" />
            </div>
            <div className="cover__text-message">
                <h3>Not available on</h3>
                <span id="text__site-name">
                    {title}
                </span>
            </div>
            <span
                className="settings-option"
                onClick={() => openOptions()}
            >
                settings
            </span>
        </div>
    )
}

export default CoverUpSection
