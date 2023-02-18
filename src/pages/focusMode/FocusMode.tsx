import React, { useEffect, useState } from 'react'
import "./FocusMode.css"
import Timer from '../../components/timer/Timer'
import Focusio from './component/focusio/Focusio'
import FocusBlockList from './component/FocusBlockList/FocusBlockList'

// focusSectionInput
export type TFocusSectionInput = {
    title: string
    type: string
    name: string
    description: string
    min: number
    max: number
    value: number
    unit: string
}

function FocusMode() {

    const [status, setStatus] = useState<boolean>(false);
    const [tempStatus, setTempStatus] = useState<boolean>(false);
    const [duration, setDuration] = useState<number>(0);
    const [current, setCurrent] = useState<number>(1);
    const [focusArray, setFocusArray] = useState<TFocusSectionInput[]>([]);

    useEffect(() => {
        chrome.storage.sync.get(["focusMode"], (result: any) => {
            const focusArray: TFocusSectionInput[] = result["focusMode"]["focusArray"]
            setFocusArray(focusArray)
            setStatus(result["focusMode"]["status"])
            for (let index = 0; index < focusArray.length; index++) {
                const element: TFocusSectionInput = focusArray[index];
                if (element["name"] === "focus-time") {
                    setDuration(element["value"] * 60)
                }
            }
        })
    }, [])

    useEffect(() => {
        chrome.storage.sync.set({
            "focusMode": {
                "status": status,
                "tempStatus": tempStatus,
                "current": 1,
                "focusArray": focusArray
            }
        })
    }, [status, focusArray])

    function handleOnChange(event: any): void {
        let updatedFocusArray: TFocusSectionInput[] = []
        setFocusArray((prevData: TFocusSectionInput[]) => {
            updatedFocusArray = [...prevData]
            for (let index = 0; index < updatedFocusArray.length; index++) {
                const element: TFocusSectionInput = updatedFocusArray[index];
                if (element["name"] === event.target.name &&
                    element["min"] <= event.target.value &&
                    event.target.value <= element["max"]
                ) {
                    element["value"] = event.target.value
                    if (element["name"] === "focus-time") {
                        setDuration(event.target.value * 60)
                    }
                }
            }
            return updatedFocusArray
        })
    }

    function handleFocusMode(event: any): void {
        setStatus(true)
        setTempStatus(true)
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
