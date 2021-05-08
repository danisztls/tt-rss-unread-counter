/* global chrome */
// TODO: Use Service Worker to migrate to manifest v3

// Declare globals
const opts = { // fill nulls with defaults
  url:      null, 
  host:     "https://localhost/tt-rss",
  user:     "admin",
  mode:     "all",
  interval: 15,
}

init()

function init() {
  const storageOpts = new Promise((resolve, reject) => {
      try {
        chrome.storage.sync.get(opts, resolve)
      } catch (e) {
        reject(e)
      }
  })
  
  storageOpts
    .then(setOpts)
    .then(getCount)
    .then(listen)
    .catch(console.log)
}

function listen() {
  // TODO: Create a listener for chrome.storage
  
  // update on click
  chrome.browserAction.onClicked.addListener(getCount)

  // update every x (in ms)
  const updateClock = setInterval(getCount, opts.interval)
}

function setOpts(stored) {
  opts.url = stored.host + "/public.php?op=getUnread&fresh=1&login=" + stored.user // set url
  opts.interval = stored.interval * 60000 // convert min to ms
  opts.mode = stored.mode
}


// Update count
function getCount() {
    if (opts.url == null) {
      throw "URL is null"
    }
  
    fetch(opts.url)
        .then(y => y.text())
        .then(y => y.split(';')) 
        .then(updateIcon, updateIcon('error')) // args: [All, Fresh]
}

// Update UI
function updateIcon(count) {
  // FIXME: color is flicking on update
  // set color
  if (count == 'error') { // red on error 
        chrome.browserAction.setBadgeBackgroundColor({color:"#ef3b3b"})
    } else { // blue otherwise
        chrome.browserAction.setBadgeBackgroundColor({color:"#3b86ef"})
  
        // count is [unreadAll];[unreadFresh]
        if (opts.mode == 'fresh') {
          count = count[1]
        } else {
          count = count[0]
        }

        // replace 1000 with K
        if (count.length >= 4) {
            count = count.slice(0,-3) + "K"
        } else {
            // hide label if zero
            if (count == '0') {
                count = null
            }
        }

    // update badge
    chrome.browserAction.setBadgeText({text:count})
    chrome.browserAction.setTitle({title:"" + count + " bookmarks (click to refresh)"})
    }
}
