import React, { useEffect, useState } from 'react'
import { TCategories } from '../../types/types'
import "./Categories.css"
import Popup from './component/popup/Popup'

import adult from '../../data/categories/adult'
import arts_and_entertainment from '../../data/categories/arts-and-entertainment'
import community_and_society from '../../data/categories/community-and-society'
import finance from '../../data/categories/finance'
import gambling from '../../data/categories/gambling'
import games from '../../data/categories/games'
import health from '../../data/categories/health'
import news_and_media from '../../data/categories/news-and-media'
import shopping from '../../data/categories/shopping'
import social_media from '../../data/categories/social-media'
import sports from '../../data/categories/sports'


function Categories() {

  const [categories, setCategories] = useState<TCategories[]>([])
  const [popup, setPopup] = useState<boolean>(false)
  const [currentCategory, setCurrentCategory] = useState<string>("")
  const [currentCategoryArray, setCurrentCategoryArray] = useState<string[]>([])

  useEffect(() => {
    chrome.storage.sync.get(["categoriesData"], (result: any) => {
      const categoriesData: TCategories[] = result["categoriesData"]
      setCategories(categoriesData)
    })
  }, [])

  useEffect(() => {
    chrome.storage.sync.set({ "categoriesData": categories })
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
    setCurrentCategoryPopupState(true)
    setCurrentCategory(category)
    switch (category) {
      case "Adult":
        setCurrentCategoryArray(adult)
        break;
      case "Social":
        setCurrentCategoryArray(social_media)
        break;
      case "Shopping":
        setCurrentCategoryArray(shopping)
        break;
      case "News":
        setCurrentCategoryArray(news_and_media)
        break;
      case "Sports":
        setCurrentCategoryArray(sports)
        break;
      case "Gambling":
        setCurrentCategoryArray(gambling)
        break;
      case "Health":
        setCurrentCategoryArray(health)
        break;
      case "Games":
        setCurrentCategoryArray(games)
        break;
      case "Finance":
        setCurrentCategoryArray(finance)
        break;
      case "Community and Society Website":
        setCurrentCategoryArray(community_and_society)
        break;
      case "Arts & Entertainment":
        setCurrentCategoryArray(arts_and_entertainment)
        break;
      default:
        console.log('%c Invalid Category ', 'background: red; color: white; font-size:16px;');
    }

  }

  return (
    <>
      {
        popup &&
        <Popup
          title={currentCategory}
          array={currentCategoryArray}
          setCurrentCategoryPopupState={setCurrentCategoryPopupState}
        />
      }
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
