import React from 'react'
import "./FocusSection.css"

import { TCustomClassName, TFocusSectionInput } from '../../types/types'
import { focusSectionInput } from "../../data/Data"
import FocusInput from './components/focusInput/FocusInput'
import PButton from '../../components/button/PButton/PButton'

function FocusSection({ classname }: TCustomClassName) {

  function handleOnChange(event: any): void { }

  return (
    <div className={`${classname} FocusSection`}>
      <div className="main__focus_section_top">
        <div className="section_focus-top">
          <div className="top__info">
            <h1>Focus mode Timer</h1>
            <h4>Focus on task and be more productive with focus mode</h4>
          </div>
        </div>
        <div className="section_focus-middle">
          {
            focusSectionInput.map((item: TFocusSectionInput, index: number) => {
              return (
                <FocusInput
                  key={index}
                  title={item["title"]}
                  type={item["type"]}
                  name={item["name"]}
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
            clickEventHandler={() => { }}
          />
          <a href="#/dash-board" target="_blank"
            style={{
              textDecoration: "none",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <PButton
              classname={"edit-list-btn"}
              title={"Go to options"}
              clickEventHandler={() => { }}
            />
          </a>
        </div>
      </div>

    </div>
  )
}

export default FocusSection
