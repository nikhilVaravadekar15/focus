import React, { useEffect, useState } from 'react'
import { TCategories, TData } from '../../types/types'
import "./Categories.css"
import Popup from './component/popup/Popup'

function Categories() {

  const [categories, setCategories] = useState<TCategories[]>([])
  const [popup, setPopup] = useState<boolean>(false)
  const [currentCategory, setCurrentCategory] = useState<string>("")

  useEffect(() => {
    chrome.storage.sync.get(["data"], (result: any) => {
      const data: TData = result["data"]
      setCategories(data["categoriesData"])
    })
  }, [])

  useEffect(() => {
    chrome.storage.sync.get(["data"], (result: any) => {
      let data: TData = result["data"]
      data["categoriesData"] = []
      for (let index = 0; index < categories.length; index++) {
        data["categoriesData"][index] = categories[index];
      }
      chrome.storage.sync.set({ "data": data })
    })
  }, [categories])

  function handleCategoriesToggle(index: number) {
    setCategories((prevdata: TCategories[]) => {
      let currentCategories = [...prevdata]
      const category: TCategories = currentCategories[index]
      currentCategories.splice(index, 1, {
        "image": category["image"],
        "title": category["title"],
        "status": !category["status"]
      })
      return currentCategories
    })
  }

  function setCurrentCategoryPopupState(flag: boolean) {
    setPopup(flag)
  }
  function handlePopup(category: string) {
    console.log(category)
    setCurrentCategoryPopupState(true)
    setCurrentCategory(category)
  }

  return (
    <>
      {popup && <Popup title={currentCategory} setCurrentCategoryPopupState={setCurrentCategoryPopupState} />}
      <div className='Categories'>
        <div className="section">
          <div className="Categories__container">
            {/* header  */}
            <div className="header">
              <div className="Categories-container__header">
                <div className="header__titles">
                  <h2>Categories</h2>
                  <p>Please select which categories to block</p>
                </div>
              </div>
            </div>
            {/* body */}
            <div className="Categories-container__body">
              <h2> Blocked categories list </h2>
              <div className="Categories-list">
                {
                  categories.map((category: TCategories, index: number) => {
                    return (
                      <div className="list-item" key={index}>
                        <div className="item-left" title={category["title"]}>
                          <div className="image">{category["image"]}</div>
                          <div
                            className="title"
                            onClick={() => { handlePopup(category["title"]) }}
                          >
                            {category["title"]}
                          </div>
                        </div>
                        <div className="item-right toggle">
                          <div
                            className={category["status"] ? "outer-circle isActive" : "outer-circle"}
                            onClick={() => handleCategoriesToggle(index)}
                          >
                            <div className="inner-circle"></div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default Categories
