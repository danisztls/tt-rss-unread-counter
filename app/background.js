/* global chrome */
// TODO: Use Service Worker to migrate to manifest v3

// Set defaults
const opts = {
  host: 'https://localhost/tt-rss',
  user: 'admin',
  mode: 0,
  interval: 5,
  url: null
}

// Initialize events
init()

function init () {
  // get data from chrome.storage
  const storageOpts = new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.get(opts, resolve)
    } catch (e) {
      reject(e)
    }
  })

  // set opts from data and get count
  storageOpts
    .then(getOpts)
    .then(getCount)
    .catch(showError)

  listenEvents()
}

// Listen for events
function listenEvents () {
  // TODO: Create a listener for chrome.storage
  // listen for changes in settings

  // listen for commands
  chrome.commands.onCommand.addListener(function (command) {
    if (command === 'update') {
      getCount()
    } else if (command === 'open') {
      openFeed()
    }
  })

  // listen for badge click
  chrome.browserAction.onClicked.addListener(openFeed)

  // update every x (in ms)
  setInterval(getCount, opts.interval)
}

// Display errors on badge
function showError (e) {
  console.error(e)
  chrome.runtime.openOptionsPage()
  chrome.browserAction.setBadgeBackgroundColor({ color: '#ef3b3b' }) // red
  chrome.browserAction.setBadgeText({ text: 'e' })
  chrome.browserAction.setTitle({ title: e })
}

// Get settings from chrome.storage
function getOpts (data) {
  opts.host = data.host
  opts.interval = data.interval * 60000 // convert min to ms
  opts.mode = data.mode
  opts.url = data.host + '/public.php?op=getUnread&fresh=1&login=' + data.user // set url

  // check if opts are valid
  try {
    if (opts.host.slice(0, 4) !== 'http') {
      throw new Error('Host is invalid.')
    }

    if (opts.interval < 60000) {
      throw new Error('Interval is less than a minute and thus invalid.')
    }

    if (Number.isInteger(opts.mode) === false) {
      throw new Error('Article mode is invalid.')
    }
  } catch (e) {
    showError(e)
  }
}

// Get count from TT-RSS
function getCount () {
  fetch(opts.url)
    .then(y => y.text())
    .then(y => y.split(';'))
    .then(updateUI) // args: [All, Fresh]
    .catch(showError)
}

// Update badge with count
function updateUI (count) {
  try {
    if (count.length === 2) { // count is [unreadAll];[unreadFresh]
      if (opts.mode === 1) { // 0 is all, 1 is fresh
        count = count[1]
      } else {
        count = count[0]
      }

      // replace 1000 with K
      if (count.length >= 4) {
        count = count.slice(0, -3) + 'K'
      }

      chrome.browserAction.setBadgeBackgroundColor({ color: '#3b86ef' }) // blue
    } else {
      throw new Error('Invalid count. Fetch problem.')
    }
  } catch (e) {
    showError(e)
  }

  // construct date string
  const updateTime = new Date().toTimeString().slice(0, 8) // hh:mm:ss (local time)

  // update badge
  if (count === '0') { // hide badge if zero
    chrome.browserAction.setBadgeText({ text: null })
    chrome.browserAction.setTitle({ title: 'No unread articles. Updated at ' + updateTime })
  } else {
    chrome.browserAction.setBadgeText({ text: count })
    chrome.browserAction.setTitle({ title: count + ' unread articles. Updated at ' + updateTime })
  }
}

// Open TT-RSS feed
function openFeed () {
  let feedURL
  if (opts.mode === 1) {
    feedURL = opts.host + '/#f=-3&c=0' // -3 is fresh
  } else {
    feedURL = opts.host + '/#f=-4&c=0' // -4 is all
  }
  chrome.tabs.create({ url: feedURL })
}
