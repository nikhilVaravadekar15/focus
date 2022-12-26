import React from 'react'
import "./CoverUpSection.css"
import BackgroundFocusGif from "../../../../assets/images/background-focus.gif"
import { TCoverUpSection } from '../../../../types/types'

function CoverUpSection({ classname, title }: TCoverUpSection) {
    return (
        <div className={`section_cover-image ${classname}`}>
            <div className="cover__background">
                <img src={BackgroundFocusGif} alt="" draggable="false" />
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
