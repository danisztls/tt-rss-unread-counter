/* global chrome */

// DATA
const defaults = {
  host: 'https://localhost/tt-rss',
  user: 'admin',
  mode: 'all',
  interval: 15
}

let settings = [] // array of 'Setting' objects

// init 'Setting' objects
for (const opt of Object.entries(defaults)) {
  settings.push(new Setting(opt[0], opt[1]))
}

// MAIN
// Get settings from chrome.storage (use default when missing)
getOpts(defaults)

// Monitor click events
window.onload = () => {
    document.querySelector("#opt-save").onclick = saveOpts
    document.querySelector("#opt-reset").onclick = resetOpts
}

// LIB
class Setting {
    constructor(name, value) {
        this.name = name
        this.value = value
        this.input = document.querySelector("#opt-" + this.name)
    }

    // set value
    set(value) {
      this.value = value
    }

    // update placeholder and clear input field
    clear() {
      this.input.placeholder = this.value
      this.input.value = "" // clear input
    }

    // read value from input field
    read() {
        if (this.input.value != null) { // ignore null
            this.set(this.input.value)
            this.clear()
        }
        return this.name, this.value
    }
    
    // reset to default value
    reset() {
      this.value = defaults[this.name]
      this.clear()
    }
}

// Load settings from chrome.storage
function getOpts(query) {
  const data = new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.get(query, resolve)
    } catch (e) {
      reject(e)
    }
  })
  data.then(setOpt)
}

// Set value for each option
async function setOpt(data) {
  for (let opt of settings) {
    opt.set(data[opt.name])
  }
}

// Save settings to chrome.storage
function saveOpts() {
  let payload = new Object()
  for (let opt of settings) {
    let name, value = opt.read()
    payload[name] = value
  }
  chrome.storage.sync.set(payload) // store opt
}

// Reset settings to default values
async function resetOpts() {
  for (let opt of settings) {
    opt.reset()
  }
  chrome.storage.sync.set(defaults)
}
