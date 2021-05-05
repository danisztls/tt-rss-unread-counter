// Declare global variables
let host, user, url, hostInput, userInput

const defaults = {
    host: "https://localhost/tt-rss",
    user: "admin",
    roteSubString: "/public.php?op=getUnread&login="
}

// Update input placeholders
function updatePlaceholders() {
    hostInput.placeholder = host
    userInput.placeholder = user
}

// Load opts from local storage
// TODO: Refactor into a class
function loadOpts() {
    host = localStorage.getItem('host') // load data
    if (!host) { // set default for null or undefined
        host = defaults.host 
    }

    user = localStorage.getItem('user')
    if (!user) {
        user = defaults.user
    }

    url = host + defaults.roteSubString + user // reset url
}

// Save opts to local storage on click event
// TODO: Refactor into a class
function saveOpts() {
    if (hostInput.value != '') { // ignore null or undefined
        host = hostInput.value
        hostInput.value = ""
    }
    localStorage.setItem('host', host)

    if (userInput.value != '') {
        user = userInput.value
        userInput.value = ""
    }
    localStorage.setItem('user', user)

    url = host + defaults.roteSubString  + user // reset url
    localStorage.setItem('url', url) // store data

    updatePlaceholders()
}

function resetOpts() {
// TODO: Refactor into a class
    host = defaults.host
    localStorage.setItem('host', host)
    user = defaults.user
    localStorage.setItem('user', user)
    updatePlaceholders()
}

window.onload = function main() {
    // load opts from local storage
    loadOpts()

    // get input elements
    hostInput = document.querySelector("input#opt-host")
    userInput = document.querySelector("input#opt-user")
    
    // update placeholders
    updatePlaceholders()

    // monitor click event
    document.querySelector('input#opt-save').onclick = saveOpts
    document.querySelector('input#opt-reset').onclick = resetOpts
}

// Migration to Manifest v3
// TODO:"Use chrome.storage.sync
// https://developer.chrome.com/docs/extensions/mv3/options/
