/* global chrome */
// TODO: Use Service Worker to migrate to manifest v3

// Update count of unread items
function getCount() {
    fetch(url)
        .then(y => y.text())
        .then(y => y.split(';')) 
        .then(updateIcon) // args: [All, Fresh]
        .catch(updateIcon('error')) 
}

// Getter for chrome.storage
let url, interval, mode
chrome.storage.sync.get({ // fill nulls with defaults
    host:     "https://localhost/tt-rss",
    user:     "admin",
    mode:     "all",
    interval: 15,
}, function(opts) {
    url = opts.host + "/public.php?op=getUnread&fresh=1&login=" + opts.user // reset url
    interval = opts.interval
    mode = opts.mode
})

// TODO: Create a listener

// Update UI to display count
function updateIcon(count) {
    // count is [unreadAll];[unreadFresh]
    if (mode == 'fresh') {
      count = count[1]
    } else {
      count = count[0]
    }

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
}

// MAIN
// update on start
getCount()

// Update
// update on click
chrome.browserAction.onClicked.addListener(getCount)

// update every 15 minutes (in ms)
const updateClock = setInterval(getCount, interval * 60000 )
