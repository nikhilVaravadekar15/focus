import React from 'react'
import "./Popup.css"
import IconClosePopup from "../../../../assets/images/icon_cancel.png"

type TCurrentCategoryPopup = {
  title: string
  array: string[]
  setCurrentCategoryPopupState: (flag: boolean) => void
}

function Popup({ title, array, setCurrentCategoryPopupState }: TCurrentCategoryPopup) {

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
          {
            array.map((value: string, index: number) => {
              return (
                <div className="item" key={index}>
                  <span className="number">{index+1}</span>
                  <span className="title">{value}</span>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Popup
