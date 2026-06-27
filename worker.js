chrome.action.onClicked.addListener(() => {
    chrome.windows.create({url: chrome.runtime.getURL('popup/main/index.html'), type: "popup", height:500, width:500, focused: true})
})