import React from 'react'
import "./FocusInput.css"
import { TFocusSectionInputhandler } from '../../types/types'

function FocusInput({ title, type, name, description, min, max, value, unit, handleOnChange }: TFocusSectionInputhandler) {
  return (
    <div className="middle__input-area">
      <div className="input-area__time">
        <div className="time__title" title={description}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <div className="time__input">
          <div className="input-area">
            <input
              type={type}
              name={name}
              min={min}
              max={max}
              value={value}
              onChange={handleOnChange}
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
