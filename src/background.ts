/*global chrome*/

import { data } from "./data/Data";
import { TFocusModeDetails } from "./types/types";
import { createAlarm, showNotification, validateCurrentOrigin } from "./utility/utility";


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
  chrome.storage.sync.set({ ...data });
  console.log('%c allow-in-incognito ', 'background: black; color: white; font-size:16px;');
})


chrome.runtime.onStartup.addListener(() => {
  /**
   * https://developer.chrome.com/docs/extensions/reference/runtime/#event-onStartup
   */
  chrome.storage.sync.get(["mainActive", "navigation", "redirectUrl", "focusMode", "scheduleData", "categoriesData", "settingsData", "blockByWords", "blockedWebsites"], (result) => {
    if (result === undefined || result == null) {
      chrome.storage.sync.set({ ...data });
    }
  });
  console.log('%c Chrome onStartup ', 'background: black; color: yellow; font-size:16px;');
})

// chrome runtime => onMessage event listener
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request["type"] === "notification-validate-url") {
    validateCurrentOrigin(request["message"]["origin"])
  }
  sendResponse();
});

chrome.alarms.onAlarm.addListener((alarm: any) => {
  if (alarm["name"] === "focus-time") {
    chrome.alarms.clear("focus-time")
    console.log("focus-time alarm cleared")
  }
  chrome.storage.sync.get(["focusModeStatus", "focusModeCurrent", "focusModeDetails"], (result: any) => {
    let status: boolean = result["focusModeStatus"]
    let current: number = result["focusModeCurrent"]
    const details: TFocusModeDetails = result["focusModeDetails"]
    if (status && current <= details["breakTime"]) {
      console.log(`break-time ${current}`)

      current = current + 1
      createAlarm(Object.keys(details)[1], details["breakTime"])
      showNotification(Object.keys(details)[1], "basic", "Take a break!!", false)
    } else {
      status = !status
      current = 1
    }
  })
})

