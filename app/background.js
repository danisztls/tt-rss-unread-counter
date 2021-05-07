/* global chrome */

// LIB
// Update UI to display count
function updateIcon(count) {
    // set color
    if (count == 'error') { // red on error 
        chrome.browserAction.setBadgeBackgroundColor({color:"#ef3b3b"})
    } else { // blue otherwise
        chrome.browserAction.setBadgeBackgroundColor({color:"#3b86ef"})

        // replace 1000 with K
        if (count.length >= 4) {
            count = count.slice(0,-3) + "K"
        } else {
            // hide label if zero
            if (count == '0') {
                count = ""
            }
        }

    // update badge
    chrome.browserAction.setBadgeText({text:count})
    chrome.browserAction.setTitle({title:"" + count + " bookmarks (click to refresh)"})
}

// Update count of unread items
function getCount() {
    fetch(getUrl())
        .then(req => req.text())
        .then(updateIcon)
        .catch(updateIcon('error')) 
}

// Get URL
function getUrl() {
    // get stored opts
    let host = localStorage.getItem('host')
    let user = localStorage.getItem('user')
    let url  = host + "/public.php?op=getUnread&login=" + user // reset url

    // use default host or user is null
    if (host & user) {
        url = "https://localhost/tt-rss/public.php?op=getUnread&login=admin"
    }
    return url
}

// MAIN
// update on start
getCount()

// Update
// update on click
chrome.browserAction.onClicked.addListener(getCount)

// update every 15 minutes (in ms)
const updateClock = setInterval(getCount, 900000)
