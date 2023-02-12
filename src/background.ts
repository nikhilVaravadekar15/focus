/*global chrome*/

import { categoriesData, scheduleData, settingsData } from "./data/Data";
import { validateCurrentOrigin } from "./utility/utility";


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
      "focusModeStatus": false,
      "details": {
        "focusTime": 25,
        "breakTime": 5,
        "numberOfCycles": 2
      }
    },
    "scheduleData": scheduleData,
    "categoriesData": categoriesData,
    "settingsData": settingsData,
    "blockByWords": [],
    "blockedWebsites": []
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
          "focusModeStatus": false,
          "details": {
            "focusTime": 25,
            "breakTime": 5,
            "numberOfCycles": 2
          }
        },
        "scheduleData": scheduleData,
        "categoriesData": categoriesData,
        "settingsData": settingsData,
        "blockByWords": [],
        "blockedWebsites": []
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
  sendResponse();
});

