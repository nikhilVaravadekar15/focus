import React from 'react'
import TopSites from './component/topSites/TopSites'
import "./Insights.css"

function Insights() {

    return (
        <>
            <div className="Insights">
                <div className="section">
                    <div className="Insights__container">
                        {/* header  */}
                        <div className="header">
                            <div className="header__titles">
                                <h2>Insights</h2>
                            </div>
                        </div>
                        {/* body */}
                        <div className="Insights-container__body">
                            <div className="body__graph">
                                graph
                            </div>
                            <div className="body__topsites">
                                <TopSites />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Insights
