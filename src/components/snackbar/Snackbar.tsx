import React from 'react'
import "./Snackbar.css"
import IconWarning from "../../assets/images/icon__warning.png"

function Snackbar() {
  return (
    <div className="Snackbar">
      <div className="snack__icon">
        <img src={IconWarning} alt="warning" draggable="false" />
      </div>
      <div className="snack__title">snackbar</div>
    </div>
  )
}

export default Snackbar
