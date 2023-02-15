import React, { useEffect, useState } from 'react'
import "./FocusBlockList.css"
import BackgroundFocusModeGif from "../../../../assets/images/background-focus.gif"
import { isAvailableInChromePaths, showToast, validURL } from '../../../../utility/utility'
import BlockInput from '../../../../components/blockInput/BlockInput'
import GetBlockedSiteList from '../../../../components/getBlockedSiteList/GetBlockedSiteList'
import BlockSubstitute from '../../../../components/blockSubstitute/BlockSubstitute'
import { ToastContainer } from 'react-toastify'
import { TBlockedWebsite } from '../../../../types/types'

function FocusBlockList() {

    const [substitute, setSubstitute] = useState<boolean>(false)
    const [focusBlockInput, setFocusBLockInput] = useState<string>("")
    const [focusBlockList, setFocusBlockList] = useState<TBlockedWebsite[]>([])

    useEffect(() => {
        if (focusBlockList.length != 0) {
            setSubstitute(true)
        } else {
            setSubstitute(false)
        }
    })

    useEffect(() => {
        chrome.storage.sync.get(["focusBlockList"], (result: any) => {
            setFocusBlockList(result["focusBlockList"])
            if (result["focusBlockList"].length) {
                setSubstitute(true)
            }
        })
    }, [])

    useEffect(() => {
        chrome.storage.sync.set({ "focusBlockList": focusBlockList })
    }, [focusBlockList])

    function setBlockInput(value: string) {
        setFocusBLockInput(value)
    }

    function setListBlock({ websiteFavIcon, websiteOrigin, hostname, blockedStatus }: TBlockedWebsite) {
        var currentData: TBlockedWebsite[]
        setFocusBlockList((prevData: TBlockedWebsite[]) => {
            currentData = [...prevData];
            currentData.push({ websiteFavIcon, websiteOrigin, hostname, blockedStatus })
            return currentData
        })
    }

    function updateFocusBlockList(websiteOrigin: string) {
        var currentData: TBlockedWebsite[]
        setFocusBlockList((prevData: TBlockedWebsite[]) => {
            currentData = [...prevData];
            for (let index = 0; index < currentData.length; index++) {
                let item: TBlockedWebsite = currentData[index];
                if (websiteOrigin === item.websiteOrigin) {
                    item.blockedStatus = !item.blockedStatus
                }
            }

            return currentData
        })
    }

    function deleteFocusBlockListItem(websiteOrigin: string, index: number) {
        var currentData: TBlockedWebsite[]
        setFocusBlockList((prevData: TBlockedWebsite[]) => {
            currentData = [...prevData];
            currentData.splice(index, 1);
            return currentData
        })
        showToast("info", `${websiteOrigin} deleted`, 500)
    }

    function addToFocusBlockList(event: any) {
        if (focusBlockInput === null || focusBlockInput === "" || isAvailableInChromePaths(focusBlockInput) || !validURL(focusBlockInput)) {
            showToast("error", "Incorrect URL !", 500)
        } else {
            let flag: boolean = false
            for (let index = 0; index < focusBlockList.length; index++) {
                const item: TBlockedWebsite = focusBlockList[index];
                try {
                    if (item["websiteOrigin"] === new URL(focusBlockInput).origin) {
                        flag = true
                        break
                    }
                } catch {
                    showToast("error", "Incorrect URL !", 500)
                }
            }

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
                    setListBlock({ websiteFavIcon, websiteOrigin, hostname, blockedStatus })
                    showToast("success", "Site added.", 500)
                    console.log('%c Added to focus-mode block list ', 'background: #222; color: red; font-size:16px;');
                } catch {
                    showToast("error", "Incorrect URL !", 500)
                }

            }
        }
        setBlockInput("")
    }

    return (
        <>
            <ToastContainer limit={1} pauseOnHover={false} />
            <div className="Focusblock">
                <div className="options__focus-blockedsites">
                    <div className="Focusblock__header">
                        <h2>Blocked Sites</h2>
                        <div className="Focusblock__block-input">
                            <BlockInput
                                value={focusBlockInput}
                                setInputValue={setBlockInput}
                                handleClick={addToFocusBlockList}
                            />
                        </div>
                    </div>
                    <div className="Focusblock__list-content">
                        {
                            substitute ? (
                                <div className="block-added-list">
                                    <GetBlockedSiteList
                                        list={focusBlockList}
                                        updateBlockList={updateFocusBlockList}
                                        deleteBlockListItem={deleteFocusBlockListItem}
                                    />
                                </div>
                            ) : (
                                <div className="list-content__substitute">
                                    <BlockSubstitute coverup_image={BackgroundFocusModeGif} />
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default FocusBlockList
