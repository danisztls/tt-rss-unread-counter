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

function setOpts (data) {
  opts.url = data.host + '/public.php?op=getUnread&fresh=1&login=' + data.user // set url
  opts.interval = data.interval * 60000 // convert min to ms
  opts.mode = data.mode

  // check if opts are valid
  if (opts.url.slice(0, 4) !== 'http') {
    throw new Error('URL is invalid.')
  }

  if (opts.interval < 60000) {
    throw new Error('Interval is less than a minute and thus invalid.')
  }

  if (opts.mode !== 'fresh' & opts.mode !== 'all') {
    throw new Error('Article mode is invalid.')
  }
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
  if (count === '0') { // hide label if zero
    chrome.browserAction.setBadgeText({ text: null })
    chrome.browserAction.setTitle({ title: 'No unread articles. Click to refresh.' })
  } else {
    chrome.browserAction.setBadgeText({ text: count })
    chrome.browserAction.setTitle({ title: count + ' unread articles. Click to refresh.' })
  }
}
