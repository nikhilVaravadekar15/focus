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
                <div className={currentTab === 0 ? "section active BlockedSection" : "section BlockedSection"}>
                    BlockedSection
                </div>
                <div className={currentTab === 1 ? "section active FocusSection" : "section FocusSection"}>
                    FocusSection
                </div>
                <div
                    className={currentTab === 2 ? "section active InsightSection" : "section InsightSection"}>
                    InsightSection
                </div>
            </div>
        </div>
    )
}

export default Main
