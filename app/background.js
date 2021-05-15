/* global chrome */

/* SETTINGS
   -------- */
// defaults
const opts = {
  host: 'https://localhost/tt-rss',
  user: 'admin',
  mode: 0,
  interval: 5,
  url: null
}

// invoke once
getOpts().catch(setErrorBadge)

// GET from chrome.storage
function getOpts () {
  const storage = new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.get(opts, resolve)
    } catch (e) {
      reject(e)
    }
  })
  return storage
    .then(setOpts)
    .then(getCount)
    .catch(setErrorBadge)
}

// SET from chrome.storage
function setOpts (data) {
  opts.host = data.host
  opts.interval = data.interval
  opts.mode = data.mode
  opts.url = data.host + '/public.php?op=getUnread&fresh=1&login=' + data.user // set url

  isListening = addListeners()

  // check if opts are valid
  try {
    if (opts.host.slice(0, 4) !== 'http') {
      throw new Error('Host is invalid.')
    }

    if (opts.interval < 1) {
      throw new Error('Interval is less than a minute and thus invalid.')
    }

    if (Number.isInteger(opts.mode) === false) {
      throw new Error('Article mode is invalid.')
    }
  } catch (e) {
    removeListeners()
    chrome.runtime.openOptionsPage()
    setErrorBadge(e, true)
    throw e // rethrow error so to catch it on promise chain
  }
}
/* LISTENERS
   --------- */

/* const listen = {
  opts: null,
  alarm: null,
  click: null,
  cmds: null
} */

let listenAlarm, listenClick, listenCmds
let isListening = false

/* listenOpts is set by init() and remain till the end
 * the others are set by setOpts() and cleared in case of invalid opts */

const listenOpts = (changes) => {
  const data = opts
  for (const [key, { oldValue, newValue }] of Object.entries(changes)) { // eslint-disable-line no-unused-vars
    data[key] = newValue
  }
  setOpts(data)
}

// listen for changes in chrome.storage
chrome.storage.onChanged.addListener(listenOpts)

// usage: isListening = addListeners()
function addListeners () {
  if (isListening === false) {
    // create an alarm with interval as period
    chrome.alarms.create('periodic-update', { delayInMinutes: opts.interval, periodInMinutes: opts.interval })

    // listen for alarm event to update badge
    listenAlarm = chrome.alarms.onAlarm.addListener(getCount)

    // listen for badge clicks and open feed page
    listenClick = chrome.action.onClicked.addListener(openFeed)

    // listen for commands from chrome shortcuts
    listenCmds = chrome.commands.onCommand.addListener((command) => {
      if (command === 'update') {
        getCount()
      } else if (command === 'open') {
        openFeed()
      }
    })
    return true
  }
  return false
}

// usage: isListening = removeListeners()
function removeListeners () {
  if (isListening === true) {
    chrome.alarms.clear('periodic-update')
    chrome.alarms.onAlarm.removeListener(listenAlarm)
    chrome.action.onClicked.removeListener(listenClick)
    chrome.commands.onCommand.removeListener(listenCmds)
  }
  return false
}

/* UPDATE
   ------ */
// GET count from TT-RSS
function getCount () {
  fetch(opts.url)
    .then(y => y.text())
    .then(y => y.split(';'))
    .then(updateUI) // args: [All, Fresh]
    .catch(setErrorBadge)
}

/* UI
   -- */
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

      chrome.action.setBadgeBackgroundColor({ color: '#3b86ef' }) // blue
    } else {
      throw new Error('Invalid count.')
    }
  } catch (e) {
    setErrorBadge(e, true)
  }

  // construct date string
  const updateTime = new Date().toTimeString().slice(0, 8) // hh:mm:ss (local time)

  // update badge
  if (count === '0') { // hide badge if zero
    chrome.action.setBadgeText({ text: '' })
    chrome.action.setTitle({ title: 'No unread articles. Updated at ' + updateTime })
  } else {
    chrome.action.setBadgeText({ text: count })
    chrome.action.setTitle({ title: count + ' unread articles. Updated at ' + updateTime })
  }
}

// Open TT-RSS feed page
function openFeed () {
  let feedURL
  if (opts.mode === 1) {
    feedURL = opts.host + '/#f=-3&c=0' // -3 is fresh
  } else {
    feedURL = opts.host + '/#f=-4&c=0' // -4 is all
  }
  chrome.tabs.create({ url: feedURL })
}

/* ERROR
   ----- */
// Display error state on badge
// usage: setErrorBadge(error, setTitle?)
function setErrorBadge (e, shouldSetTitle) {
  console.error(e)
  chrome.action.setBadgeBackgroundColor({ color: '#ef3b3b' }) // red
  chrome.action.setBadgeText({ text: 'e' })
  if (shouldSetTitle === true) {
    chrome.action.setTitle({ title: e.message })
  }
}
