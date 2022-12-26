
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
