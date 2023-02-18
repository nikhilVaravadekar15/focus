/*global chrome*/

import { TFocus, TFocusSectionInput } from "../src/types/types"
import { createAlarm, showNotification, validateCurrentOrigin } from "./utility/utility";
import { categoriesData, focusSectionInput, scheduleData, settingsData } from "./data/Data";


chrome.runtime.onInstalled.addListener(() => {
  /**
   * https://developer.chrome.com/docs/extensions/reference/runtime/#event-onInstalled
   * https://developer.chrome.com/docs/extensions/reference/extension/#method-isAllowedIncognitoAccess
   * https://developer.chrome.com/docs/extensions/reference/storage/#property-sync
   */
  chrome.extension.isAllowedIncognitoAccess((status) => {
    if (!status) {
      chrome.tabs.create({
        url: "/allow-in-incognito.html"
      });
    }
  })
  chrome.storage.sync.set({
    "mainActive": true,
    "navigation": 0,
    "redirectUrl": "redirect.html",
    "focusMode": {
      "status": false,
      "tempStatus": false,
      "current": 1,
      "focusArray": focusSectionInput
    },
    "scheduleData": scheduleData,
    "categoriesData": categoriesData,
    "settingsData": settingsData,
    "blockByWords": [],
    "blockedWebsites": [],
    "focusBlockList": []
  });
  console.log('%c allow-in-incognito ', 'background: black; color: white; font-size:16px;');
})


chrome.runtime.onStartup.addListener(() => {
  /**
   * https://developer.chrome.com/docs/extensions/reference/runtime/#event-onStartup
   */
  chrome.storage.sync.get(["mainActive", "navigation", "redirectUrl", "focusMode", "scheduleData", "categoriesData", "settingsData", "blockByWords", "blockedWebsites"], (result) => {
    if (result === undefined || result == null) {
      chrome.storage.sync.set({
        "mainActive": true,
        "navigation": 0,
        "redirectUrl": "redirect.html",
        "focusMode": {
          "status": false,
          "tempStatus": false,
          "current": 1,
          "focusArray": focusSectionInput
        },
        "scheduleData": scheduleData,
        "categoriesData": categoriesData,
        "settingsData": settingsData,
        "blockByWords": [],
        "blockedWebsites": [],
        "focusBlockList": []
      });
    }
  });
  console.log('%c Chrome onStartup ', 'background: black; color: yellow; font-size:16px;');
})

// chrome runtime => onMessage event listener
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request["type"] === "notification-validate-url") {
    validateCurrentOrigin(request["message"]["origin"])
  }
  if (request["type"] === "notification-start-focus-mode") {

    chrome.storage.sync.get(["focusMode"], (result: any) => {
      const status: boolean = result["focusMode"]["status"]
      const current: number = result["focusMode"]["current"]
      const focusItem: TFocusSectionInput = result["focusMode"]["focusArray"][0]
      if (focusItem["name"] === "focus-time" && status) {
        createAlarm(focusItem["name"], focusItem["value"])
        showNotification(focusItem["title"], "basic", "Stay focued! Sites in your focus mode list will be blocked.", false)
      }
    })

  }
  sendResponse();
});

chrome.alarms.onAlarm.addListener((alarm: any) => {
  if (alarm["name"] === "focus-time") {
    console.log("focus-time alarm cleared")
    chrome.alarms.clear("focus-time")
  }
  chrome.storage.sync.get(["focusMode"], (result: any) => {
    console.log(result)
    let status: boolean = result["focusMode"]["status"]
    let tempStatus: boolean = result["focusMode"]["tempStatus"]
    let current: number = result["focusMode"]["current"]
    const breakItem: TFocusSectionInput = result["focusMode"]["focusArray"][1]
    const numberOfCyclesItem: TFocusSectionInput = result["focusMode"]["focusArray"][2]

    if (breakItem["name"] === "break-time" && status) {

      console.log("break-time0")

      if (numberOfCyclesItem["value"] >= current && tempStatus) {

        console.log("numberOfCyclesItem . break-time1")

        current = current + 1
        tempStatus = !tempStatus
        createAlarm(breakItem["name"], breakItem["value"])
        showNotification(breakItem["title"], "basic", "Take a break!!", false)

      } else {
        status = !status
        current = 1
      }
    }

    chrome.storage.sync.set({
      "focusMode": {
        "status": status,
        "tempStatus": tempStatus,
        "current": current,
        "focusArray": focusSectionInput
      }
    })

  })
})

