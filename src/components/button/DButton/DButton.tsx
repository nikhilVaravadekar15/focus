import React from 'react'
import "./DButton.css"
import { TDButton } from '../../../types/types'


function DButton({ icon, title, handler }: TDButton) {
    return (
        <div
            className="custom-button redirect"
            onClick={() => handler(true)}
        >
            <div className="button-image" title="Redirect">
                <img src={icon} alt="" draggable="false" />
            </div>
            <h3>{title}</h3>
        </div>
    )
}

export default DButton
