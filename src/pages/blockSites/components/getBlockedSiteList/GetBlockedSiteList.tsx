import React, { Key } from 'react'
import "./GetBlockedSiteList.css"
import IconFocus from "../../../../assets/images/icon-focus_main_128.png"
import IconRemove from "../../../../assets/images/icon-remove.png"
import { TBlockedWebsite } from '../../../../types/types'

type TBlockedSiteList = {
    list: TBlockedWebsite[]
    setBlockList: ({ websiteFavIcon, websiteOrigin, hostname, blockedStatus }: TBlockedWebsite) => void
}

function GetBlockedSiteList({ list, setBlockList }: TBlockedSiteList) {
    return (
        <div className="GetBlockedSiteList">
            {
                list.map((item: TBlockedWebsite, index: number) => {
                    return (
                        <GetBlockedSiteItem
                            key={index}
                            websiteFavIcon={item["websiteFavIcon"]}
                            websiteOrigin={item["websiteOrigin"]}
                            hostname={item["hostname"]}
                            blockedStatus={item["blockedStatus"]}
                        />
                    )
                })
            }
        </div>
    )
}


function GetBlockedSiteItem({ websiteFavIcon, websiteOrigin, hostname, blockedStatus }: TBlockedWebsite) {
    return (
        <div className="block-list-item .removed" id="">
            <div className="item__left">
                <div className="item__left_toggle" title="Toggle">
                    <div className={blockedStatus ? "outer-circle isActive" : "outer-circle"}>
                        <div className="inner-circle"></div>
                    </div>
                </div>
                <div className="item__left_details">
                    <div className="left__icon" title={websiteOrigin}>
                        <img src={websiteFavIcon} alt={IconFocus} draggable="false" />
                    </div>
                    <div className="left__websiteOrigin">{hostname}</div>
                </div>
            </div>
            <div className="item__right" title="Remove">
                <img src={IconRemove} alt="" draggable="false" />
            </div>
        </div>
    )
}

export default GetBlockedSiteList
