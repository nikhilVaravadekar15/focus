let currentTabUrl: string = document.location.href

chrome.runtime.sendMessage({
  type: "notification-validate-url",
  message: {
    origin: currentTabUrl
  }
})

export { }
