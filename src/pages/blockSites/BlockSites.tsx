import React, { useContext, useEffect, useState } from 'react'
import "./BlockSites.css"
import 'react-toastify/dist/ReactToastify.css';
import IconRedirect from "../../assets/images/icon_redirect.png"
import IconSchedule from "../../assets/images/icon_schedule.png"
import backgroundBlocksitesGif from "../../assets/images/background-blocksites.gif"
import DButton from '../../components/button/DButton/DButton'
import BlockInput from '../../components/blockInput/BlockInput'
import GetBlockedSiteList from '../../components/getBlockedSiteList/GetBlockedSiteList'
import BlockSubstitute from '../../components/blockSubstitute/BlockSubstitute'
import { validURL, isAvailableInChromePaths, showToast } from '../../utility/utility'
import { TBlockedWebsite, TSnackbar } from '../../types/types'
import { ToastContainer, toast } from 'react-toastify';
import { redirectContext } from '../../context/context';

function BlockSites() {

  const [inputBlock, setInputBlock] = useState<string>("")
  const [substitute, setSubstitute] = useState<boolean>(false)
  const [blockList, setBlockList] = useState<TBlockedWebsite[]>([])
  const { redirectFlag, setRedirectFlagStatus } = useContext(redirectContext)

  useEffect(() => {
    if (blockList.length != 0) {
      setSubstitute(true)
    } else {
      setSubstitute(false)
    }
  })

  useEffect(() => {
    chrome.storage.sync.get(["blockedWebsites"], (result: any) => {
      let blockedWebsites: TBlockedWebsite[] = result["blockedWebsites"]
      setBlockList(blockedWebsites)
    })
  }, [])

  useEffect(() => {
    chrome.storage.sync.set({ "blockedWebsites": blockList })
  }, [blockList])

  function setBlockInput(value: string) {
    setInputBlock(value)
  }

  function setListBlock({ websiteFavIcon, websiteOrigin, hostname, blockedStatus }: TBlockedWebsite) {
    var currentData: TBlockedWebsite[]
    setBlockList((prevData: TBlockedWebsite[]) => {
      currentData = [...prevData];  // spreading operator which doesn't mutate the array and returns new array
      currentData.push({ websiteFavIcon, websiteOrigin, hostname, blockedStatus })
      return currentData
    })
  }

  function updateBlockList(websiteOrigin: string) {
    var currentData: TBlockedWebsite[]
    setBlockList((prevData: TBlockedWebsite[]) => {
      currentData = [...prevData]; // spreading operator which doesn't mutate the array and returns new array
      for (let index = 0; index < currentData.length; index++) {
        let item: TBlockedWebsite = currentData[index];
        if (websiteOrigin === item.websiteOrigin) {
          item.blockedStatus = !item.blockedStatus
        }
      }

      return currentData
    })
  }

  function deleteBlockListItem(websiteOrigin: string, index: number) {
    var currentData: TBlockedWebsite[]
    setBlockList((prevData: TBlockedWebsite[]) => {
      currentData = [...prevData]; // spreading operator which doesn't mutate the array and returns new array
      currentData.splice(index, 1);
      return currentData
    })
    showToast("info", `${websiteOrigin} deleted`, 500)
  }

  function addToBlockList(event: any) {
    if (inputBlock === null || inputBlock === "" || isAvailableInChromePaths(inputBlock) || !validURL(inputBlock)) {
      showToast("error", "Incorrect URL !", 500)
    } else {
      let flag: boolean = false
      for (let index = 0; index < blockList.length; index++) {
        let item: TBlockedWebsite = blockList[index]
        try {
          if (item["websiteOrigin"] === new URL(inputBlock).origin) {
            flag = true
            break
          }
        } catch {
          showToast("error", "Incorrect URL !", 500)
        }

      }

      if (flag) {
        showToast("info", "Already blocked !", 500)
        console.log('%c Already blocked ', 'background: #222; color: purple; font-size:16px;');
      }
      else {
        try {
          const websiteOrigin: string = new URL(inputBlock).origin
          const hostname: string = new URL(inputBlock).hostname
          const websiteFavIcon: string = "https://s2.googleusercontent.com/s2/favicons?domain_url=" + websiteOrigin
          const blockedStatus = true
          setListBlock({ websiteFavIcon, websiteOrigin, hostname, blockedStatus })
          showToast("success", "Site added.", 500)
          console.log('%c Added to blocked list ', 'background: #222; color: red; font-size:16px;');
        } catch {
          showToast("error", "Incorrect URL !", 500)
        }

      }
    }
    setBlockInput("")
  }

  return (
    <>
      <ToastContainer limit={1} pauseOnHover={false} />
      <div className='BlockSites'>
        <div className="section">
          <div className="block__container">
            {/* header  */}
            <div className="header">
              <div className="block-container__header">
                <div className="header__titles">
                  <h2>Block Sites</h2>
                  <p>Block site permanently or by schedule</p>
                </div>
                <div className="buttons">
                  <div className="single-button">
                    <DButton icon={IconRedirect} title={"Redirect"} handler={setRedirectFlagStatus} />
                  </div>
                </div>
              </div>
              <div className="block-input">
                <BlockInput
                  value={inputBlock}
                  setInputValue={setBlockInput}
                  handleClick={addToBlockList}
                />
              </div>
            </div>
            {/* body  */}
            <div className="block-container__body">
              <h2> BLOCKED SITES </h2>
              {
                substitute ? (
                  <div className="block-added-list">
                    <GetBlockedSiteList
                      list={blockList}
                      updateBlockList={updateBlockList}
                      deleteBlockListItem={deleteBlockListItem}
                    />
                  </div>
                ) : (
                  <BlockSubstitute coverup_image={backgroundBlocksitesGif} />
                )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default BlockSites
