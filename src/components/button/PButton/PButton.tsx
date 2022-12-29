import React from 'react'
import "./PButton.css"

type TPButton = {
    classname: string
    title: string
    clickEventHandler: (event: any) => void
}

function PButton({ classname, title, clickEventHandler }: TPButton) {
    return (
        <div className={`PButton button ${classname}`} 
            title={title}
            onClick={(event) => {clickEventHandler(event)}}
        >
            <h3>{title}</h3>
        </div>
    )
}

export default PButton
