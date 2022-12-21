import React from 'react'
import "./BlockedSectionButtons.css"

function BlockedSectionButtons() {
    return (
        <div className='BlockedSectionButtons'>
            <div className="button block-current-btn" title="Block this site">
                <h3>Block this site</h3>
            </div>
            <a href="#/dash-board" target="_blank"
                style={{ textDecoration: 'none' }}
                className="button edit-list-btn"
                title="Edit block list">
                <h3 className="name">Edit block list</h3>
            </a>
        </div>
    )
}


export default BlockedSectionButtons
