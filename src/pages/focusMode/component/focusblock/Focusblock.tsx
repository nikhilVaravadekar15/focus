import React, { useState } from 'react'
import "./Focusblock.css"
import { isAvailableInChromePaths, showToast, validURL } from '../../../../utility/utility'
import BlockInput from '../../../../components/blockInput/BlockInput'
import GetBlockedSiteList from '../../../blockSites/components/getBlockedSiteList/GetBlockedSiteList'
import BlockSubstitute from '../../../blockSites/components/blockSubstitute/BlockSubstitute'

function Focusblock() {

    const [substitute, setSubstitute] = useState<boolean>(false)
    const [focusBlockInput, setFocusBLockInput] = useState<string>("")

    function setBlockInput(value: string) {
        setFocusBLockInput(value)
    }

    function addToBlockList(event: any) {
        if (focusBlockInput === null || focusBlockInput === "" || isAvailableInChromePaths(focusBlockInput) || !validURL(focusBlockInput)) {
            showToast("error", "Incorrect URL !", 500)
        } else {
            let flag: boolean = false

            if (flag) {
                showToast("info", "Already blocked !", 500)
                console.log('%c Already blocked ', 'background: #222; color: purple; font-size:16px;');
            }
            else {
                try {
                    const websiteOrigin: string = new URL(focusBlockInput).origin
                    const hostname: string = new URL(focusBlockInput).hostname
                    const websiteFavIcon: string = "https://s2.googleusercontent.com/s2/favicons?domain_url=" + websiteOrigin
                    const blockedStatus = true
                    // setListBlock({ websiteFavIcon, websiteOrigin, hostname, blockedStatus })
                    showToast("success", "Site added.", 500)
                    console.log('%c Added to focus-mode block list ', 'background: #222; color: red; font-size:16px;');
                } catch {
                    showToast("error", "Incorrect URL !", 500)
                }

            }
        }
        setBlockInput("")
    }

    function updateFocusBlockList() { }

    function deleteFocusBlockListItem() { }

    return (
        <div className="Focusblock">
            <div className="options__focus-blockedsites">
                <div className="Focusblock__header">
                    <h2>Blocked Sites</h2>
                    <div className="Focusblock__block-input">
                        <BlockInput
                            value={focusBlockInput}
                            setInputValue={setBlockInput}
                            handleClick={addToBlockList}
                        />
                    </div>
                </div>
                <div className="Focusblock__list-content">
                    {
                        substitute ? (
                            <div className="block-added-list">
                                <GetBlockedSiteList
                                    list={[]}
                                    updateBlockList={updateFocusBlockList}
                                    deleteBlockListItem={deleteFocusBlockListItem}
                                />
                            </div>
                        ) : (
                            <div className="list-content__substitute">
                                <BlockSubstitute />
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Focusblock
