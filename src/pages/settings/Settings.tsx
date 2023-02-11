import React, { useEffect, useState } from 'react'
import "./Settings.css"
import { TData, TSetting } from '../../types/types'

function Settings() {
    const [settingData, setSettingData] = useState<TSetting[]>([])

    useEffect(() => {
        chrome.storage.sync.get(["data"], (result: any) => {
            const data: TData = result["data"]
            setSettingData(data["settings"])
        })
    }, [])

    useEffect(() => {
        chrome.storage.sync.get(["data"], (result: any) => {
            const data: TData = result["data"]
            data["settings"] = settingData
            chrome.storage.sync.set({ "data": data })
        })
    }, [settingData])

    function updateSettingItem(index: number) {
        var updatedSetting: TSetting[] = []
        setSettingData((prevData: TSetting[]) => {
            updatedSetting = [...prevData]
            const item: TSetting = updatedSetting[index]
            updatedSetting.splice(index, 1, {
                "title": item.title,
                "description": item.description,
                "reditect": item.reditect,
                "flag": !item.flag
            })
            return updatedSetting
        })
    }

    return (
        <div className='Settings'>
            <div className="section">
                <div className="Settings__container">
                    {/* header  */}
                    <div className="header">
                        <div className="Settings-container__header">
                            <div className="header__titles">
                                <h2>Settings</h2>
                            </div>
                        </div>
                    </div>
                    {/* body */}
                    <div className="Settings-container__body">
                        <div className="Settings-list">
                            {
                                settingData.map((item: TSetting, index: number) => {
                                    return (
                                        <div className="item" key={index}>
                                            <div className="item-left">
                                                <div className="title">{item["title"]}</div>
                                                <div className="description">
                                                    {item["description"]}
                                                    {
                                                        item["reditect"] && <span className="to-reditect">{item["reditect"]}</span>
                                                    }
                                                </div>
                                            </div>
                                            <div className="item-right">
                                                <div
                                                    className={item["flag"] ? "outer-circle isActive" : "outer-circle"}
                                                    onClick={() => updateSettingItem(index)}
                                                >
                                                    <div className="inner-circle"></div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Settings
