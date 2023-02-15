import React, { useEffect, useState } from 'react'
import "./FocusSection.css"

import PButton from '../../components/button/PButton/PButton'
import { openOptions } from '../../utility/utility'
import FocusInput from '../../components/focusInput/FocusInput'
import { TCustomClassName, TFocusSectionInput } from '../../types/types'
import Timer from '../../components/timer/Timer'

function FocusSection({ classname }: TCustomClassName) {

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
    <div className={`${classname} FocusSection`}>
      {
        !focusStatus ? (
          <div className="main__focus_section_top">
            <div className="section_focus-top">
              <div className="top__info">
                <h1>Focus mode Timer</h1>
                <h4>Focus on task and be more productive with focus mode</h4>
              </div>
            </div>
            <div className="section_focus-middle">
              {
                focusArray.map((item: TFocusSectionInput, index: number) => {
                  return (
                    <FocusInput
                      key={index}
                      title={item["title"]}
                      type={item["type"]}
                      name={item["name"]}
                      description={item["description"]}
                      min={item["min"]}
                      max={item["max"]}
                      value={item["value"]}
                      unit={item["unit"]}
                      handleOnChange={handleOnChange}
                    />
                  )
                })
              }
            </div>
            <div className="section_focus-bottom">
              <PButton
                classname={"start-session-btn"}
                title={"Start a session"}
                clickEventHandler={() => { setFocusStatus(true) }}
              />
              <PButton
                classname={"edit-list-btn"}
                title={"Go to options"}
                clickEventHandler={openOptions}
              />
            </div>
          </div>
        ) : (
          <Timer />
        )
      }


    </div>
  )
}

export default FocusSection
