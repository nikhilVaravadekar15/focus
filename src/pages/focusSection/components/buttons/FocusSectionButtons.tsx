import React from 'react'
import "./FocusSectionButtons.css"

function FocusSectionButtons() {
    return (
        <>
            <div className="button start-session-btn">
                <h3>Start a session</h3>
            </div>
            <div className="button go-options-btn" title="Edit block list">
                <h3 className="name">Go to options</h3>
            </div>
        </>
    )
}


export default FocusSectionButtons
