import React from 'react'
import "./DButton.css"

import IconRedirect from "../../assets/images/icon_redirect.png"

function DButton() {
    return (
        <div className="custom-button redirect">
            <div className="button-image" title="Redirect">
                <img src={IconRedirect} alt="" draggable="false" />
            </div>
            <h3>Redirect</h3>
        </div>
    )
}

export default DButton
