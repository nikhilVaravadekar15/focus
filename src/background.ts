/*global chrome*/

import { TData, TBlockedWebsite } from "./types/types";
import { data } from "./data/Data";


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
  chrome.storage.sync.set({ "data": data });
  console.log('%c allow-in-incognito ', 'background: black; color: white; font-size:16px;');
})


chrome.runtime.onStartup.addListener(() => {
  /**
   * https://developer.chrome.com/docs/extensions/reference/runtime/#event-onStartup
   */
  chrome.storage.sync.get(["data"], (result) => {
    if (result === undefined || result == null) {
      chrome.storage.sync.set({ "data": data });
    }
  });
  console.log('%c Chrome onStartup ', 'background: black; color: yellow; font-size:16px;');
})

// chrome runtime => onMessage event listener
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // console.log(request)
  if (request["type"] === "notification-validate-url") {
    console.log(request)
    validateCurrentOrigin(request["message"]["origin"])
  }
  sendResponse();
});


function validateCurrentOrigin(currentTabUrl: string) {
  chrome.storage.sync.get(["data"], (result: any) => {
    let flag: boolean = false
    let data: TData = result["data"]

    console.log(data)

    for (let index = 0; index < data["blockedWebsites"].length; index++) {
      let item: TBlockedWebsite = data["blockedWebsites"][index]
      if (item["websiteOrigin"] === currentTabUrl && item["blockedStatus"]) {
        flag = true
        break
      }
    }

    if (flag) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.update({ url: chrome.runtime.getURL(`redirect.html#${currentTabUrl}`) });
        console.log('%c Blocked ', 'background: #222; color: #bada55; font-size: 16px;');
      })
    }

  });
}
