import React from 'react'
import "./GetBlockedSiteList.css"
import IconFocus from "../../../../assets/images/icon-focus_main_128.png"
import IconRemove from "../../../../assets/images/icon-remove.png"

function GetBlockedSiteList() {
    return (
        <div className="GetBlockedSiteList">
            <GetBlockedSiteItem />
        </div>
    )
}


function GetBlockedSiteItem() {
    return (
        <div className="block-list-item .removed" id="">
            <div className="item__left">
                <div className="item__left_toggle" title="Toggle">
                    <div className="outer-circle isActive">
                        <div className="inner-circle"></div>
                    </div>
                </div>
                <div className="item__left_details">
                    <div className="left__icon" title="google">
                        <img src={IconFocus} alt="" draggable="false" />
                    </div>
                    <div className="left__websiteOrigin">www.google.com</div>
                </div>
            </div>
            <div className="item__right" title="Remove">
                <img src={IconRemove} alt="" draggable="false" />
            </div>
        </div>
    )
}

export default GetBlockedSiteList
