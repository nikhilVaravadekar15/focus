/*global chrome*/

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
        url: "/options.html"
        // url: "/options.html/incognito"
      });
    }
  })
  chrome.storage.sync.set({ "data": data });

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

})

