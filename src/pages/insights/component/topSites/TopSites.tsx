import React, { useEffect, useState } from 'react'
import "./TopSites.css"

type MostVisitedURL = {
    title: string
    url: string
}

function TopSites() {

    const [topSitesArray, setTopSitesArray] = useState<MostVisitedURL[]>([])

    useEffect(() => {
        chrome.topSites.get((data: MostVisitedURL[]) => {
            setTopSitesArray(data)
        })
    }, [])

    return (
        <div className="TopSites">
            <div className="TopSites__header">
                <h2>Top Sites</h2>
            </div>
            <div className="TopSites__body">
                {
                    topSitesArray === null || topSitesArray.length != 0 ? (
                        <div className="TopSites__list-content">
                            {
                                topSitesArray.map((site: MostVisitedURL, index: number) => {
                                    return (
                                        <div className="item" key={index} title={site.url}>
                                            <span className="number">{index + 1}</span>
                                            <a className="title" href={site.url} target="_blank">{site["title"]}</a>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ) : (
                        <div className="substitute">Please wait for at least 24 hrs</div>
                    )
                }
            </div>
        </div>
    )
}

export default TopSites
