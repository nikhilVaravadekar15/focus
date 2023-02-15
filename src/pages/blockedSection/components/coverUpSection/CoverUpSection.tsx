import React from 'react'
import "./CoverUpSection.css"
import backgroundBlocksitesGif from "../../../../assets/images/background-blocksites.gif"

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
        </div>
    )
}

export default CoverUpSection
