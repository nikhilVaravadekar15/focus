import React from 'react'
import "./Insights.css"

function Insights() {

    return (
        <>
            <div className="Insights">
                <div className="section">
                    <div className="Insights__container">
                        {/* header  */}
                        <div className="header">
                            <div className="Insights-container__header">
                                <div className="header__titles">
                                    <h2>Insights</h2>
                                </div>
                            </div>
                        </div>
                        {/* body */}
                        <div className="Insights-container__body">
                            <div className="body__graph"></div>
                            <div className="body__topsites"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Insights
