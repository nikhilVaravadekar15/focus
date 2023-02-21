import React, { useEffect, useState } from 'react'
import "./FocusMode.css"
import Timer from '../../components/timer/Timer'
import Focusio from './component/focusio/Focusio'
import FocusBlockList from './component/FocusBlockList/FocusBlockList'
import { TFocusModeDetails } from '../../types/types'


function FocusMode() {

    const [status, setStatus] = useState<boolean>(false);
    const [current, setCurrent] = useState<number>(1);
    const [duration, setDuration] = useState<number>(1);
    const [details, setDetails] = useState<TFocusModeDetails>({
        "focusTime": 25,
        "breakTime": 5,
        "numberOfCycles": 2
    });

    useEffect(() => {
        chrome.storage.sync.get(["focusMode"], (result: any) => {
            setStatus(result["focusMode"]["status"])
            setCurrent(result["focusMode"]["current"])
            setDetails(result["focusMode"]["details"])
        })
    }, [])

    useEffect(() => {
        chrome.storage.sync.set({
            "focusMode": {
                "status": status,
                "current": current,
                "details": details
            }
        })
    }, [status, details])

    function handleOnChange(event: any): void {
        const name: string = event.target.name
        let value: number = event.target.value
        if (name === "focusTime") {
            if (value < 10) {
                value = 10
            }
            if (value > 999) {
                value = 999
            }
        }
        if (name === "breakTime") {
            if (value < 1) {
                value = 1
            }
            if (value > 60) {
                value = 60
            }
        }
        if (name === "numberOfCycles") {
            if (value < 1) {
                value = 1
            }
            if (value > 48) {
                value = 48
            }
        }
        setDetails((prevData: TFocusModeDetails) => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    function handleFocusMode(event: any): void {
        setStatus(true)
        chrome.runtime.sendMessage({
            type: "notification-start-focus-mode"
        })
    }

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
                            {
                                !status ? (
                                    <div className="body__options">
                                        <Focusio
                                            details={details}
                                            handleOnChange={handleOnChange}
                                            handleFocusMode={handleFocusMode}
                                        />
                                        <FocusBlockList />
                                    </div>
                                ) : (
                                    <div className="FocusMode-timer">
                                        <Timer
                                            counter={current}
                                            cycles={2}
                                            focus_time={1}
                                            duration={duration}
                                        />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FocusMode
