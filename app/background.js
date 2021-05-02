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

// settings
const host = "https://localhost/tt-rss"
const user = "admin"
const url = host + "/public.php?op=getUnread&login=" + user

// create badge
chrome.browserAction.setBadgeText({text:"."})

// update on start
getCount()

// update on click
chrome.browserAction.onClicked.addListener(getCount)

// update every 15 minutes (in ms)
const updateClock = setInterval(getCount, 900000)
