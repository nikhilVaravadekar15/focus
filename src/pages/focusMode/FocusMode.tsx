import React from 'react'
import Timer from '../../components/timer/Timer'
import "./FocusMode.css"

function FocusMode() {
    return (
        <>
            <div className="FocusMode">
                <div className="section">
                    <div className="FocusMode__container">
                        {/* header  */}
                        <div className="header">
                            <div className="FocusMode-container__header">
                                <div className="header__titles">
                                    <h2>Focus Mode</h2>
                                    <p>To focus on a task and be more productive use focus mode to set your work time and break intervals.</p>
                                    <p>Add sites to your block list to avoid distractions during a focus session</p>
                                </div>
                            </div>
                        </div>
                        {/* body */}
                        <div className="FocusMode-container__body">
                            {/* <div className="FocusMode-timer">
                                <Timer />
                            </div> */}
                            <div className="body__options">
                                <div className="options__focus-inputs">
                                    <h2> Blocked categories list </h2>
                                </div>
                                <div className="options__focus-blockedsites">
                                    <h2>session sites are blocked</h2>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FocusMode
