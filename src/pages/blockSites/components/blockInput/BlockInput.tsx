import React from 'react'
import "./BlockInput.css"

import IconAdd from "../../../../assets/images/icon-add.png"

function BlockInput() {
    return (
        <div className="BlockInput container__customInput invalid">
            <input type="url" name="blockUrl" id="blockUrl_input" placeholder="Enter a web address (ex: https://www.youtube.com)" />
            <img src={IconAdd} alt="" id="blockUrl_img" draggable="false" title="Add" />
            <h3>INVALID URL (must start with http or https)</h3>
        </div>
    )
}

export default BlockInput
