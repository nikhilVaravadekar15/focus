import React, { useEffect, useState } from 'react'
import "./Main.css"
import BlockedSection from '../blockedSection/BlockedSection';

function Main() {
    const [mainActiveStatus, setMainActiveStatusFlag] = useState<boolean>(true)

    useEffect(() => {
        chrome.storage.sync.get(["mainActive"], (result: any) => {
            const mainActive: boolean = result["mainActive"]
            setMainActiveStatusFlag(mainActive)
        })
    }, [])

    return (
        <div className='Main'>
            <div className={!mainActiveStatus ? "container__main-section blur" : "container__main-section"}>
                <BlockedSection classname="section active" />
            </div>
        </div>
    )
}

export default Main
