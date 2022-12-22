import React from 'react'
import { TFocusSectionInput } from '../../../../types/types'
import "./FocusInput.css"

function FocusInput({ title, type, name, min, max, value, unit, handleOnChange }: TFocusSectionInput) {
  return (
    <div className="middle__input-area">
      <div className="input-area__time">
        <div className="time__title">
          <h3>{title}</h3>
        </div>
        <div className="time__input">
          <div className="input-area">
            <input 
              type={type} 
              name={name} 
              min={min} 
              max={max} 
              value={value} 
              onChange={(event) => handleOnChange(event)}
              />
          </div>
          <div className="input-unit">
            <h3>{unit}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FocusInput
