import React, { Key } from 'react'
import "./GetBlockedSiteList.css"
import IconFocus from "../../../../assets/images/icon-focus_main_128.png"
import IconRemove from "../../../../assets/images/icon-remove.png"
import { TBlockedWebsite, TBlockedSiteList } from '../../types/types'


function GetBlockedSiteList({ list, updateBlockList, deleteBlockListItem }: TBlockedSiteList) {
    return (
        <div className="GetBlockedSiteList">
            {
                list.map((item: TBlockedWebsite, index: number) => {
                    return (
                        <div className="block-list-item .removed" id={item.websiteOrigin} key={item.websiteOrigin}>
                            <div className="item__left">
                                <div className="item__left_toggle" title="Toggle">
                                    <div
                                        className={item.blockedStatus ? "outer-circle isActive" : "outer-circle"}
                                        onClick={() => {
                                            updateBlockList(item.websiteOrigin)
                                        }}
                                    >
                                        <div className="inner-circle"></div>
                                    </div>
                                </div>
                                <div className="item__left_details">
                                    <div className="left__icon" title={item.websiteOrigin}>
                                        <img src={item.websiteFavIcon} alt="" draggable="false" />
                                    </div>
                                    <div className="left__websiteOrigin">{item.hostname}</div>
                                </div>
                            </div>
                            <div
                                className="item__right" title="Remove"
                                onClick={() => {
                                    deleteBlockListItem(item.websiteOrigin, index)
                                }}
                            >
                                <img src={IconRemove} alt="" draggable="false" />
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}


export default GetBlockedSiteList
