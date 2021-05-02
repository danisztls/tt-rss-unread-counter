// Update UI to display count
async function updateIcon(count) {
    chrome.browserAction.setBadgeText({text:count})
    chrome.browserAction.setTitle({title:"" + count + " bookmarks (click to refresh)"})
}

// Update count of unread items
async function getCount() {
    let response = await fetch(url)
    let count = await response.text()
    await updateIcon(count)
}

const host = "https://localhost/tt-rss"
const user = "admin"
const url = host + "/public.php?op=getUnread&login=" + user

chrome.browserAction.onClicked.addListener(getCount)
chrome.browserAction.setBadgeText({text:"."})
getCount
