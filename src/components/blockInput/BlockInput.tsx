import React from 'react'
import "./BlockInput.css"

import IconAdd from "../../assets/images/icon-add.png"
import { TBlockInput } from '../../types/types'

function BlockInput({ value, setInputValue, handleClick }: TBlockInput) {
    return (
        <div className="BlockInput container__customInput invalid">
            <input type="url"
                name="blockUrl"
                id="blockUrl_input"
                value={value}
                placeholder="Enter a web address (ex: https://www.youtube.com)"
                onChange={(event: any) => setInputValue(event.target.value)}
                onKeyUp={(event: any) => {
                    if (event.key === "Enter") {
                        setInputValue(event.target.value)
                        handleClick(event)
                    }
                }}
            />
            <img
                id="blockUrl_img"
                title="Add"
                src={IconAdd}
                alt="Add"
                draggable="false"
                onClick={(event: any) => handleClick(event)}
            />
        </div>
    )
}

export default BlockInput
