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
    user: "",
    url: ""
}

const defaults = {
    host: "https://localhost/tt-rss",
    user: "admin",
    url: "https://localhost/tt-rss/public.php?op=getUnread&login=admin",
    roteSubString: "/public.php?op=getUnread&login="
}

// Update input placeholders
function updatePlaceholders() {
    inputs.host.placeholder = opts.host
    inputs.user.placeholder = opts.user
}

// Load opts from local storage
// TODO: Refactor into a class
function loadOpts() {
    opts.host = localStorage.getItem('host') // load data
    if (!opts.host) { // set default for null or undefined
        opts.host = defaults.host 
    }

    opts.user = localStorage.getItem('user')
    if (!opts.user) {
        opts.user = defaults.user
    }

    opts.url = opts.host + defaults.roteSubString + opts.user // reset url
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

function resetOpts() {
// TODO: Refactor into a class
    opts.host = defaults.host
    localStorage.setItem('host', opts.host)
    inputs.host.value = "" // clear input
    opts.user = defaults.user
    localStorage.setItem('user', opts.user)
    inputs.user.value = "" // clear input
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
