import React, { useContext, useEffect, useState } from 'react'
import "./Redirect.css"
import IconClosePopup from "../../assets/images/icon_cancel.png"
import { toast, ToastContainer } from 'react-toastify';
import { redirectContext } from "../../context/context";
import { validURL, isAvailableInChromePaths, showToast } from "../../utility/utility";
import { TBlockedWebsite } from '../../types/types';


function Redirect() {

  const [inputUrl, setInputUrl] = useState<string>("")
  const { redirectFlag, setRedirectFlagStatus } = useContext(redirectContext);

  useEffect(() => {
    chrome.storage.sync.get(["redirectUrl"], (result: any) => {
      let redirectUrl: string = result["redirectUrl"]
      if (redirectUrl === "redirect.html") {
        setInputUrl("")
      } else {
        setInputUrl(redirectUrl)
      }
    })
  }, [])

  function addCustomBlockUrl() {
    if (validURL(inputUrl) && !isAvailableInChromePaths(inputUrl)) {

      chrome.storage.sync.get(["redirectUrl", "blockByWords", "blockedWebsites", "data"], (result: any) => {
        let flag: boolean = false
        const origin: string = new URL(inputUrl).origin
        let blockedWebsites: TBlockedWebsite[] = result["blockedWebsites"]

        for (let index = 0; index < blockedWebsites.length; index++) {
          let item: TBlockedWebsite = blockedWebsites[index]
          if (origin === item["websiteOrigin"]) {
            flag = true
            break
          }
        }

        if (flag) {
          setInputUrl("")
          showToast("error", "Cannot set this url because it is in the blocklist. Please try again!", 500)
        } else {
          let flag: boolean = false
          for (let index = 0; index < result["blockByWords"].length; index++) {
            let item: string = result["blockByWords"][index]
            if (origin.search(item) != -1) {
              flag = true
              break
            }
          }

          if (flag) {
            setInputUrl("")
            showToast("error", "Cannot set this url because it contains words that are in the block-by-words list. Please try again!", 500)
          } else {
            chrome.storage.sync.set({ "redirectUrl": inputUrl })
            showToast("success", `${inputUrl} set as custom redirect url`, 500)
            console.log('%c Custom redirect url added ', 'background: #222; color: purple; font-size:16px;');
          }

        }

      })

    } else {
      setInputUrl("")
      showToast("error", "Invalid Url. Please try again!", 500)
    }

  }

  return redirectFlag ? (
    <>
      <ToastContainer limit={1} pauseOnHover={false} />
      <div className="Popup Redirect">
        <div
          title="close"
          className="popup-close"
          onClick={() => {
            toast.dismiss();
            setRedirectFlagStatus(false)
          }}
        >
          <img src={IconClosePopup} alt="close" draggable="false" />
        </div>
        <div className="popup-body">
          <div className="body-title">
            <h3>Redirect your blocked pages</h3>
          </div>
          <div className="body-input">
            <input
              type="url"
              value={inputUrl}
              placeholder="Web Address (ex: https://www.google.com/)"
              onChange={(event: any) => setInputUrl(event.target.value)}
              onKeyUp={(event: any) => {
                if (event.key === "Enter") {
                  setInputUrl(event.target.value)
                  addCustomBlockUrl()
                }
              }}
            />
          </div>
          <div
            className="redirect-ok-button"
            onClick={() => addCustomBlockUrl()}
          >
            OK
          </div>
        </div>
      </div>
    </>
  ) : (<></>)


}

export default Redirect
