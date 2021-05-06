// input elements
const inputs = {
    host:  document.querySelector("input#opt-host"),
    user:  document.querySelector("input#opt-user"),
    save:  document.querySelector("input#opt-save"),
    reset: document.querySelector("input#opt-reset")
}

// settings objects
const opts = {
    host: "",
    user: ""
}

const defaults = {
    host: "https://localhost/tt-rss",
    user: "admin"
}

// Update input placeholders
function updatePlaceholders() {
    inputs.host.placeholder = opts.host
    inputs.user.placeholder = opts.user
}

// Load opts from local storage
function loadOpt(opt) {
    opts[opt] = localStorage.getItem(opt) // load data
    if (!opts[opt]) { // set default for null or undefined
        opts[opt] = defaults[opt] 
    }
}

function loadOpts() {
    loadOpt('host')
    loadOpt('user')
}

// Save opts to local storage on click event:w
function readInput(opt) {
    if (inputs[opt].value != "") { // ignore null
        opts[opt] = inputs[opt].value // assign input to opt
        inputs[opt].value = "" // clear input
    }
    localStorage.setItem(opt, opts[opt]) // store opt
}

function saveOpts() {
    readInput('host')
    readInput('user')
    updatePlaceholders()
}

// Reset opts
function resetOpt(opt) {
    opts[opt] = defaults[opt]
    localStorage.setItem(opt, opts[opt])
    inputs[opt].value = "" // clear input
}

function resetOpts() {
    resetOpt('host')
    resetOpt('user')
    updatePlaceholders()
}

window.onload = function main() {
    // load opts from local storage
    loadOpts()
    
    // update placeholders
    updatePlaceholders()

    // monitor click event
    inputs.save.onclick = saveOpts
    inputs.reset.onclick = resetOpts
}

// Migration to Manifest v3
// TODO:"Use chrome.storage.sync
// https://developer.chrome.com/docs/extensions/mv3/options/
