import React from 'react'
import "./Popup.css"
import IconClosePopup from "../../../../assets/images/icon_cancel.png"

type TCurrentCategoryPopup = {
  title: string
  setCurrentCategoryPopupState: (flag: boolean) => void
}

function Popup({ title, setCurrentCategoryPopupState }: TCurrentCategoryPopup) {

  return (

    <div className="Popup category">
      <div className="header">
        <div className="header-title">
          <h3>{title}</h3>
        </div>
        <div 
          title="close" 
          className="popup-close"
          onClick={() => setCurrentCategoryPopupState(false)}
        >
          <img src={IconClosePopup} alt="close" draggable="false" />
        </div>
      </div>
      <div className="popup-body">
        <div className="table">
          <div className="item">
            <span className="number">1</span>
            <span className="title">https://www.google.com</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Popup
