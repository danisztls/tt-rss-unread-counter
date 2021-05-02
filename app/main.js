// Update UI to display count
async function updateCount() {
    let response = await fetch(url)
    let count = response.text()
    chrome.browserAction.setBadgeText({text:count})
    chrome.browserAction.setTitle({title:"" + count + " bookmarks (click to refresh)"})
}

const host = "https://localhost/tt-rss"
const user = "admin"
const url = host + "/public.php?op=getUnread&login=" + user

chrome.browserAction.onClicked.addListener(updateCount)
chrome.browserAction.setBadgeText({text:"."})
updateCount()
