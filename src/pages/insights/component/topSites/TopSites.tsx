import React, { useEffect, useState } from 'react'
import "./TopSites.css"

function TopSites() {

    return (
        <div className="TopSites">
            <div className="TopSites__header">
                <h2>Top Sites</h2>
            </div>
            <div className="TopSites__list-content">
                <div className="item" key="">
                    <span className="number">1</span>
                    <span className="title">www.google.com</span>
                </div>
            </div>
        </div>
    )
}

export default TopSites
