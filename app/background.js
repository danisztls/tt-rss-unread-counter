// Lib
// Update UI to display count
function updateIcon(count) {
    chrome.browserAction.setBadgeText({text:count})
    chrome.browserAction.setTitle({title:"" + count + " bookmarks (click to refresh)"})
}

// Update count of unread items
function getCount() {
    fetch(getUrl())
        .then(req => req.text())
        .then(updateIcon)
        .catch(console.log) 
}

// Get URL
function getUrl() {
    // get stored url
    let url = localStorage.getItem('url')

    // use default if null
    if (!url) {
        url = "https://localhost/tt-rss/public.php?op=getUnread&login=admin"
    }
    return url
}

// Init
// create badge
chrome.browserAction.setBadgeText({text:"."})

// update on start
getCount()

// Update
// update on click
chrome.browserAction.onClicked.addListener(getCount)

// update every 15 minutes (in ms)
const updateClock = setInterval(getCount, 900000)
