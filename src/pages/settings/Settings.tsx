import React from 'react'
import "./Settings.css"
import { TSetting } from '../../types/types'
import { settingData } from '../../data/Data'

function Settings() {
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
                                        <div className="item">
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
                                                <div className={item["flag"] ? "outer-circle isActive" : "outer-circle"}>
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
        </div>
    )
}

export default Settings
