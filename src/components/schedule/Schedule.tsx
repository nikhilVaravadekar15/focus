import React, { useContext } from 'react'
import "./Schedule.css"
import IconClosePopup from "../../assets/images/icon_cancel.png"
import { scheduleContext } from "../../context/context";


function Redirect() {

  const { scheduleFlag, setScheduleFlagStatus } = useContext(scheduleContext);

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
                <input id="start-time" type="time" min="09:00" max="18:00" />
                <span>to</span>
                <input id="end-time" type="time" min="09:00" max="18:00" />
              </div>
            </div>
            <div className="input__days">
              <div className="subtitle">SELECTED DAYS</div>
              <div className="days">
                <div className="day active" title="Monday">M</div>
                <div className="day" title="Tuesday">T</div>
                <div className="day" title="Wednesday">W</div>
                <div className="day" title="Thursday">T</div>
                <div className="day" title="Friday">F</div>
                <div className="day" title="Saturday">S</div>
                <div className="day" title="Sunday">S</div>
              </div>
            </div>
          </div>
          <div className="schedule-set-button">
            Set Schedule
          </div>
        </div>
      </div>
    </>
  ) : (<></>)


}

export default Redirect
