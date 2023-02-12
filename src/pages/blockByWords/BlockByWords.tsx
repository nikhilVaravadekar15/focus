import React, { useEffect } from 'react'
import "./BlockByWords.css"
import { MuiChipsInput } from 'mui-chips-input'
import { ToastContainer } from 'react-toastify'
import { showToast } from '../../utility/utility'

function BlockByWords() {
  const unblock: string[] = ["file://", "about:blank", "chrome://", "chrome-extension://", "http", "https"]
  const [chips, setChips] = React.useState<string[]>([])

  useEffect(() => {
    chrome.storage.sync.get(["blockByWords"], (result: any) => {
      let blockedWords: string[] = result["blockByWords"]
      setChips(blockedWords)
    })
  }, [])

  useEffect(() => {
    chrome.storage.sync.set({ "blockByWords": chips })
  }, [chips])

  function chipExists(chipValue: string) {
    let flag: boolean = false
    for (let index = 0; index < chips.length; index++) {
      if (chips[index] === chipValue) {
        flag = true
        break
      }
    }
    return flag
  }

  function validChip(chipValue: string) {
    let flag: boolean = false
    for (let index = 0; index < unblock.length; index++) {
      if (chipValue === unblock[index] || unblock[index].includes(chipValue)) {
        flag = true
        break
      }
    }
    return flag
  }

  function onAddChip(chipValue: string, chipIndex: number) {
    chipValue = chipValue.trim().toLowerCase()

    if (chipExists(chipValue)) {
      showToast("error", `${chipValue} is alreary blocked`, 500)
    }
    else if (validChip(chipValue)) {
      showToast("error", `${chipValue} cannot be blocked`, 500)
    } else {
      var chipsSet: string[]
      setChips((prevData: string[]) => {
        chipsSet = [...prevData]
        chipsSet.push(chipValue)
        return chipsSet
      })
    }
  }

  function onDeleteChip(chipValue: string, chipIndex: number) {
    var chipsSet: string[]
    setChips((prevData: string[]) => {
      chipsSet = [...prevData]
      chipsSet.splice(chipIndex, 1)
      return chipsSet
    })
  }

  function onEditChip(chipValue: string, chipIndex: number) {
    chipValue = chipValue.toLowerCase()

    if (chipExists(chipValue)) {
      showToast("error", `${chipValue} is alreary blocked`, 500)
    }
    if (validChip(chipValue)) {
      showToast("error", `${chipValue} cannot be blocked`, 500)
    } else {
      var chipsSet: string[]
      setChips((prevData: string[]) => {
        chipsSet = [...prevData]
        chipsSet.splice(chipIndex, 1, chipValue);
        return chipsSet
      })
    }
  }

  return (
    <>
      <ToastContainer limit={1} pauseOnHover={false} />
      <div className='BlockByWords'>
        <div className="section">
          <div className="blockByWords__container">
            {/* header  */}
            <div className="blockByWords-container__header">
              <div className="header__titles">
                <h2>Block by Words</h2>
                <p>Block URLs containing specific words</p>
              </div>
            </div>
            {/* body */}
            <div className="blockByWords-container__body">
              <div>
                <MuiChipsInput
                  value={chips}
                  onAddChip={onAddChip}
                  onDeleteChip={onDeleteChip}
                  onEditChip={onEditChip}
                  disableDeleteOnBackspace
                />
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default BlockByWords
