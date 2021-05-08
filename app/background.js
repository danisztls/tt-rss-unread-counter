/* global chrome */
// TODO: Use Service Worker to migrate to manifest v3

// Defaults
const opts = {
  url: null,
  host: 'https://localhost/tt-rss',
  user: 'admin',
  mode: 'all',
  interval: 15
}

init()

function init () {
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

function listen () {
  // TODO: Create a listener for chrome.storage

  // update on click
  chrome.browserAction.onClicked.addListener(getCount)

  // update every x (in ms)
  setInterval(getCount, opts.interval)
}

function setOpts (stored) {
  opts.url = stored.host + '/public.php?op=getUnread&fresh=1&login=' + stored.user // set url
  opts.interval = stored.interval * 60000 // convert min to ms
  opts.mode = stored.mode
}

function getCount () {
  fetch(opts.url)
    .then(y => y.text())
    .then(y => y.split(';'))
    .then(updateUI) // args: [All, Fresh]
    .catch(console.log)
}

function updateUI (count) {
  try {
    if (count.length === 2) { // count is [unreadAll];[unreadFresh]
      if (opts.mode === 'fresh') {
        count = count[1]
      } else {
        count = count[0]
      }

      // replace 1000 with K
      if (count.length >= 4) {
        count = count.slice(0, -3) + 'K'
      } else {
        // hide label if zero
        if (count === '0') {
          count = null
        }
      }

      chrome.browserAction.setBadgeBackgroundColor({ color: '#3b86ef' }) // blue
    } else {
      count = 'error'
      throw (count)
    }
  } catch (e) {
    console.log(e)
    chrome.browserAction.setBadgeBackgroundColor({ color: '#ef3b3b' }) // red
  }

  // update badge
  chrome.browserAction.setBadgeText({ text: count })
  chrome.browserAction.setTitle({ title: '' + count + ' bookmarks (click to refresh)' })
}
