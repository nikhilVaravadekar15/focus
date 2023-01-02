import React, { useEffect, useState } from 'react'
import "./Error.css"
import IconForbidden403 from "../../assets/images/forbidden_403.gif"

import { openOptions } from '../../utility/utility'

function Error() {
  const mainTextArray = ["No way ... ", "Nice try ... ", "Forget about it"]
  const [blockedWebsiteName, setBlockedWebsiteName] = useState<string>("this")

  useEffect(() => {
    const href: string = document.location.href.split("#")[1]
    setBlockedWebsiteName(href)
  }, [])

  return (
    <div className="Error">
      <div className="notFound">
        <div className="notFound-404">
          <div className="notFount__image">
            <img src={IconForbidden403} alt="404-not-found" draggable="false" />
          </div>
          <h2 className="main-text">
            {mainTextArray[Math.floor(Math.random() * mainTextArray.length)]}
          </h2>
          <div className="message">
            <h3> You put <span className="website-name">{blockedWebsiteName}</span> in your Block Sites list. <br /> It’s probably there for a reason. </h3>
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
