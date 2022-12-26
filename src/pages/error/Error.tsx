import React from 'react'
import "./Error.css"
import IconNotFound from "../../assets/images/not-fount-404.gif"

import { Link } from 'react-router-dom'

function Error() {
  const mainTextArray = ["🚫 Page not found 🚫", "🙅 No way ... 🚫", "👏👍 Nice try ... 🙌", "🤫 Forget about it 😡😐"]

  function openOptions() {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL('options.html'));
    }
  }

  return (
    <div className="Error">
      <div className="notFound">
        <div className="notFound-404">
          <div className="notFount__image">
            <img src={IconNotFound} alt="404-not-found" draggable="false" />
          </div>
          <h2 className="main-text">
            {mainTextArray[Math.floor(Math.random() * mainTextArray.length)]}
          </h2>
          <div className="message">
            <h3> You put <span className="website-name">this</span> in your Block Sites list. It’s probably there for a reason. </h3>
            <h3>Add more distracting sites to become even more productive.</h3>
          </div>
        </div>
        <div className="redirect-button"
        onClick={() => openOptions()}>
          <p className="edit-tab">Edit your list</p>
        </div>
      </div>
    </div>
  )
}

export default Error
