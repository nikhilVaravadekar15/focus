import React, { useEffect, useState } from 'react'
import "./FocusMode.css"
import Timer from '../../components/timer/Timer'
import Focusio from './component/focusio/Focusio'
import Focusblock from './component/focusblock/Focusblock'
import { TFocusSectionInput } from '../../types/types'

function FocusMode() {

    const [focusStatus, setFocusStatus] = useState<boolean>(false);
    const [focusArray, setFocusArray] = useState<TFocusSectionInput[]>([]);

    useEffect(() => {
        chrome.storage.sync.get(["focusMode"], (result: any) => {
            setFocusStatus(result["focusMode"]["status"])
            setFocusArray(result["focusMode"]["focusArray"])
        })
    }, [])

    useEffect(() => {
        chrome.storage.sync.set({
            "focusMode": {
                "status": focusStatus,
                "focusArray": focusArray
            }
        })
    }, [focusStatus, focusArray])

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
                }
            }
            return updatedFocusArray
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
                                !focusStatus ? (
                                    <div className="body__options">
                                        <Focusio
                                            focusArray={focusArray}
                                            handleOnChange={handleOnChange}
                                        />
                                        <Focusblock />
                                    </div>
                                ) : (
                                    <div className="FocusMode-timer">
                                        <Timer />
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
