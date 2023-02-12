import React, { TimeHTMLAttributes, useContext, useEffect, useState } from 'react'
import "./Schedule.css"
import IconClosePopup from "../../assets/images/icon_cancel.png"
import { scheduleContext } from "../../context/context";
import { TScheduleData, TScheduleDay } from "../../types/types";


function Redirect() {

  const { scheduleFlag, setScheduleFlagStatus } = useContext(scheduleContext);
  const [starttime, setStarttime] = useState<string>("")
  const [endtime, setEndtime] = useState<string>("")
  const [days, setDays] = useState<TScheduleDay[]>([])

  useEffect(() => {
    chrome.storage.sync.get(["scheduleData"], (result: any) => {
      const scheduleData: TScheduleData = result["scheduleData"]
      setStarttime(scheduleData["starttime"])
      setEndtime(scheduleData["endtime"])
      setDays(scheduleData["days"])
    })
  }, [])

  useEffect(() => {
    chrome.storage.sync.set({
      "scheduleData": {
        "status": false,
        "starttime": starttime,
        "endtime": endtime,
        "days": days
      }
    })
  }, [starttime, endtime, days])

  function toggleDays(index: number) {
    setDays((prevData: TScheduleDay[]) => {
      let currentScheduleDays: TScheduleDay[] = [...prevData]
      const day: TScheduleDay = currentScheduleDays[index]
      currentScheduleDays.splice(index, 1, {
        "abbrev": day["abbrev"],
        "title": day["title"],
        "flag": !day["flag"]
      });
      return currentScheduleDays
    })
  }

  function handleSetSchedule() {
    if (starttime === endtime) {
      alert("Please Enter Time");
    }
    // TODO: 
  }

  return scheduleFlag ? (
    <>
      <div className="Popup Schedule">
        <div
          title="close"
          className="popup-close"
          onClick={() => {
            setScheduleFlagStatus(false)
          }}
        >
          <img src={IconClosePopup} alt="close" draggable="false" />
        </div>
        <div className="popup-body">
          <div className="body-title">
            <h3>Set up blocking schedule</h3>
          </div>
          <div className="body-input">
            <div className="input__times">
              <div className="subtitle">SET TIMES</div>
              <div className="time">
                <input
                  id="start-time"
                  type="time"
                  value={starttime}
                  min="00:00"
                  max="24:00"
                  onChange={(event: any) => {
                    setStarttime(event.target.value)
                  }}
                />
                <span>to</span>
                <input
                  id="end-time"
                  type="time"
                  value={endtime}
                  min="00:00"
                  max="24:00"
                  onChange={(event: any) => setEndtime(event.target.value)}
                />
              </div>
            </div>
            <div className="input__days">
              <div className="subtitle">SELECTED DAYS</div>
              <div className="days">
                {
                  days.map((day: TScheduleDay, index: number) => {
                    return (
                      <div
                        key={index}
                        title={day["title"]}
                        className={day["flag"] ? "day active" : "day"}
                        onClick={() => toggleDays(index)}
                      >
                        {day["abbrev"]}
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
          <div
            className="schedule-set-button"
            onClick={() => handleSetSchedule()}
          >
            Set Schedule
          </div>
        </div>
      </div>
    </>
  ) : (<></>)


}

export default Redirect
