import React, { useEffect, useState } from 'react'
import "./BlockSites.css"
import DButton from '../../components/button/DButton/DButton'
import BlockInput from './components/blockInput/BlockInput'
import GetBlockedSiteList from './components/getBlockedSiteList/GetBlockedSiteList'
import BlockSubstitute from './components/blockSubstitute/BlockSubstitute'
import Snackbar from '../../components/snackbar/Snackbar'
import { validURL, isAvailableInChromePaths } from '../../utility/utility'
import { TBlockedWebsite, TData, TSnackbar } from '../../types/types'

function BlockSites() {

  const [snackbar, setSnackBar] = useState<boolean>(false)
  const [inputBlock, setInputBlock] = useState<string>("")
  const [substitute, setSubstitute] = useState<boolean>(false)
  const [blockList, setBlockList] = useState<TBlockedWebsite[]>([])
  // const [blockList1, setBlockList1] = useState<Map<number, TBlockedWebsite>>()

  useEffect(() => {
    chrome.storage.sync.get(["data"], (result: any) => {
      let data: TData = result["data"]
      setBlockList(data["blockedWebsites"])
    })
  }, [])

  useEffect(() => {
    console.log(`blockList ${blockList}`)
    if (blockList.length == 0) {
      setSubstitute(true)
    } else {
      setSubstitute(false)
    }
    chrome.storage.sync.get(["data"], (result: any) => {
      let data: TData = result["data"]
      data["blockedWebsites"] = blockList
      chrome.storage.sync.set({ "data": data })
    })
  }, [blockList])

  function setBlockInput(value: string) {
    setInputBlock(value)
  }

  function setListBlock({ websiteFavIcon, websiteOrigin, hostname, blockedStatus }: TBlockedWebsite) {
    setBlockList((prevData: TBlockedWebsite[]) => {
      prevData.push({ websiteFavIcon, websiteOrigin, hostname, blockedStatus })
      return prevData
    })
  }

  function addToBlockList(event: any) {
    if (inputBlock === null || inputBlock === "" || isAvailableInChromePaths(inputBlock) || !validURL(inputBlock)) {
      setSnackBar(true);
      setTimeout(() => {
        setSnackBar(false);
      }, 5000)
    } else {
      let flag: boolean = false
      for (let index = 0; index < blockList.length; index++) {
        let item: TBlockedWebsite = blockList[index]
        if (item["websiteOrigin"] === new URL(inputBlock).origin) {
          flag = true
          break
        }
      }

      if (flag) {
        setSnackBar(true);
        setTimeout(() => {
          setSnackBar(false);
        }, 5000)
        console.log('%c Already blocked ', 'background: #222; color: purple; font-size:16px;');
      }
      else {
        const websiteOrigin: string = new URL(inputBlock).origin
        const hostname: string = new URL(inputBlock).hostname
        const websiteFavIcon: string = "https://s2.googleusercontent.com/s2/favicons?domain_url=" + websiteOrigin
        const blockedStatus = true
        setListBlock({ websiteFavIcon, websiteOrigin, hostname, blockedStatus })
        console.log('%c Added to blocked list ', 'background: #222; color: red; font-size:16px;');
      }

    }
    setBlockInput("")
  }

  return (
    <>
      {snackbar && <Snackbar />}
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
                    <DButton />
                  </div>
                  <div className="single-button">
                    <DButton />
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
                    <GetBlockedSiteList list={blockList} setBlockList={setListBlock} />
                  </div>
                ) : (
                  <BlockSubstitute />
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
