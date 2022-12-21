import React, { useState } from 'react'
import "./Main.css"

import Focustabs from "../../components/focustabs/Focustabs";

function Main() {
    const [currentTab, setCurrentTab] = useState<number>(0)

    function handleTabClick(id: number) {
        setCurrentTab(() => {
            return id
        })
    }

    return (
        <div className='Main'>
            <div className="container__header-section">
                <Focustabs
                    currentTab={currentTab}
                    setMenuItemClick={handleTabClick}
                />
            </div>
            <div className="container__main-section">
                POPUP
            </div>
        </div>
    )
}

export default Main
