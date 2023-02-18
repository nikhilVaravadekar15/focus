import React, { useEffect, useState } from 'react'
import "./Main.css"
import BlockedSection from '../blockedSection/BlockedSection';
import { openOptions } from '../../utility/utility';

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
            <div className="container__main-section">
                {
                    mainActiveStatus ? (
                        <BlockedSection classname="section" />
                    ) : (
                        <div className="warning">
                            <div>
                                Please, Enable the
                                <span>focus</span>
                                chrome extension in
                                <span
                                    className="settings"
                                    onClick={() => openOptions()}
                                >
                                    Settings
                                </span>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Main
