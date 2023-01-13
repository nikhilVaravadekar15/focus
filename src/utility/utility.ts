import { toast } from "react-toastify";
import { TBlockedWebsite, TData } from "../types/types";

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

export function validateCurrentOrigin(currentTabUrl: string) {
    chrome.storage.sync.get(["data"], (result: any) => {
        let flag: boolean = false
        let data: TData = result["data"]

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
