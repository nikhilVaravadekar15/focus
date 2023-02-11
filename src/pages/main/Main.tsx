import React, { useEffect, useState } from 'react'
import "./Main.css"
import Focustabs from "../../components/focustabs/Focustabs";
import BlockedSection from '../blockedSection/BlockedSection';
import FocusSection from '../focusSection/FocusSection';
import InsightSection from '../insightSection/InsightSection';
import { TData } from '../../types/types';


function Main() {
    const [currentTab, setCurrentTab] = useState<number>(0)
    const [mainActiveStatus, setMainActiveStatusFlag] = useState<boolean>(true)

    useEffect(() => {
        chrome.storage.sync.get(["mainActive"], (result: any) => {
            const mainActive: boolean = result["mainActive"]
            setMainActiveStatusFlag(mainActive)
        })
    }, [])


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
            <div className={!mainActiveStatus ? "container__main-section blur" : "container__main-section"}>
                <BlockedSection
                    classname={currentTab === 0 ? "section active" : "section"}
                />
                <FocusSection
                    classname={currentTab === 1 ? "section active" : "section"}
                />
                <InsightSection
                    classname={currentTab === 2 ? "section active" : "section"}
                />
            </div>
        </div>
    )
}

export default Main
