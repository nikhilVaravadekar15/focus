import React from 'react'
import "./BlockSubstitute.css"
import BackgroundFocusGif from "../../../../assets/images/background-focus.gif"

function BlockSubstitute() {
    return (
        <div className="BlockSubstitute">
            <div className="substitute__image">
                <img src={BackgroundFocusGif} alt="substitute-image" draggable="false" />
            </div>
            <div className="substitute__text">
                <div className="substitute__text__title">No blocked sites yet</div>
                <div className="substitute__text__description">When you add sites to block, you’ll see it here.</div>
            </div>
        </div>
    )
}

export default BlockSubstitute
