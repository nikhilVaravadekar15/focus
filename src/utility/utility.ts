import { toast } from "react-toastify";
import { TBlockedWebsite, TCategories } from "../types/types";

import adult from '../data/categories/adult'
import arts_and_entertainment from '../data/categories/arts-and-entertainment'
import community_and_society from '../data/categories/community-and-society'
import finance from '../data/categories/finance'
import gambling from '../data/categories/gambling'
import games from '../data/categories/games'
import health from '../data/categories/health'
import news_and_media from '../data/categories/news-and-media'
import shopping from '../data/categories/shopping'
import social_media from '../data/categories/social-media'
import sports from '../data/categories/sports'

export function validURL(url: string) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(url);
}

export function isAvailableInChromePaths(url: string) {
    // check if the current tab is in chrome-paths
    let chrome_paths = ["file://", "about:blank", "chrome://", "chrome-extension://"]
    for (var i = 0; i < chrome_paths.length; i++) {
        if (url.includes(chrome_paths[i])) {
            return true
        }
    }
    return false
}

export function openOptions() {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL("options.html"));
    }
}

export function setHref(location: string) {
    if (document.location.href.includes("#/")) {
        document.location.href = document.location.href.split("#")[0] + location
    } else {
        document.location.href = document.location.href + location
    }
}

function checkSubArray(currentTabUrl: string, array: string[]): boolean {
    for (let index = 0; index < array.length; index++) {
        if (currentTabUrl == array[index]) {
            return true
        }
    }
    return false
}

function checkBlockedByCategories(currentTabUrl: string, categoriesData: TCategories[]): boolean {
    let flag: boolean = false
    for (let index = 0; index < categoriesData.length; index++) {
        const category: TCategories = categoriesData[index];
        if (category["status"] && !flag) {
            switch (category["title"]) {
                case "Adult":
                    flag = checkSubArray(currentTabUrl, adult)
                    break;
                case "Social":
                    flag = checkSubArray(currentTabUrl, social_media)
                    break;
                case "Shopping":
                    flag = checkSubArray(currentTabUrl, shopping)
                    break;
                case "News":
                    flag = checkSubArray(currentTabUrl, news_and_media)
                    break;
                case "Sports":
                    flag = checkSubArray(currentTabUrl, sports)
                    break;
                case "Gambling":
                    flag = checkSubArray(currentTabUrl, gambling)
                    break;
                case "Health":
                    flag = checkSubArray(currentTabUrl, health)
                    break;
                case "Games":
                    flag = checkSubArray(currentTabUrl, games)
                    break;
                case "Finance":
                    flag = checkSubArray(currentTabUrl, finance)
                    break;
                case "Community and Society Website":
                    flag = checkSubArray(currentTabUrl, community_and_society)
                    break;
                case "Arts & Entertainment":
                    flag = checkSubArray(currentTabUrl, arts_and_entertainment)
                    break;
                default:
                    console.log('%c Invalid Category ', 'background: red; color: white; font-size:16px;');
            }
        }
    }
    return flag
}

export function validateCurrentOrigin(currentTabUrl: string) {
    const currentTabUrlOrigin = new URL(currentTabUrl).origin
    chrome.storage.sync.get(["mainActive", "redirectUrl", "categoriesData", "blockedWebsites"], (result: any) => {
        let flag: boolean = false
        const redirectUrl: string = result["redirectUrl"]
        const categoriesData: TCategories[] = result["categoriesData"]
        const blockedWebsites: TBlockedWebsite[] = result["blockedWebsites"]

        if (true) {
            // TODO: check if block-by-categories is enabled in settings 
            flag = checkBlockedByCategories(new URL(currentTabUrl).origin, categoriesData)
        }

        if (!flag) {
            for (let index = 0; index < blockedWebsites.length; index++) {
                let item: TBlockedWebsite = blockedWebsites[index]
                if (item["websiteOrigin"] === currentTabUrlOrigin && item["blockedStatus"] && result["mainActive"]) {
                    flag = true
                    break
                }
            }
        }

        if (flag) {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (redirectUrl === "redirect.html") {
                    chrome.tabs.update({ url: chrome.runtime.getURL(`redirect.html#href=${currentTabUrlOrigin}`) });
                } else {
                    chrome.tabs.update({ url: redirectUrl });
                }
                console.log('%c Blocked ', 'background: #222; color: #bada55; font-size: 16px;');
            })
        }
        else {
            validateBlockByWords(currentTabUrl)
        }

    });
}

export function validateBlockByWords(currentTabUrl: string) {
    chrome.storage.sync.get(["mainActive", "redirectUrl", "blockByWords"], (result: any) => {
        let flag: boolean = false
        const redirectUrl: string = result["redirectUrl"]

        for (let index = 0; index < result["blockByWords"].length; index++) {
            var item: string = result["blockByWords"][index]
            if (currentTabUrl.search(item) != -1 && result["mainActive"]) {
                flag = true
                break
            }
        }

        if (flag) {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (redirectUrl === "redirect.html") {
                    chrome.tabs.update({ url: chrome.runtime.getURL(`redirect.html#blocked-words=${item}`) });
                } else {
                    chrome.tabs.update({ url: redirectUrl });
                }
                console.log('%c Blocked ', 'background: #222; color: #bada55; font-size: 16px;');
            })
        }

    });
}

export function showToast(type: string, toastString: string, delay: number) {
    if (type === "error") {
        toast.error(toastString, {
            delay: delay,
            position: toast.POSITION.TOP_CENTER
        });
    }
    if (type === "success") {
        toast.success(toastString, {
            delay: delay,
            position: toast.POSITION.TOP_CENTER
        });
    }
    if (type === "info") {
        toast.info(toastString, {
            delay: delay,
            position: toast.POSITION.TOP_CENTER
        });
    }
    if (type === "warn") {
        toast.warn(toastString, {
            delay: delay,
            position: toast.POSITION.TOP_CENTER
        });
    }
}
