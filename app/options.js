// Declare global variables
let host, user, url, hostInput, userInput

// Load opts from local storage
// TODO: Refactor
function loadOpts() {
    host = localStorage.getItem('host') // load data
    if (!host) { // set default for null or undefined
        host = "https://localhost/tt-rss" 
    }

    user = localStorage.getItem('user')
    if (!user) {
        user = "admin" 
    }

    url = host + "/public.php?op=getUnread&login=" + user // reset url
}

// Save opts to local storage on click event
// TODO: Refactor
function saveOpts() {
    if (hostInput.value != '') { // ignore null or undefined
        host = hostInput.value
    }
    localStorage.setItem('host', host)

    if (userInput.value != '') {
        user = userInput.value
    }
    localStorage.setItem('user', user)

    url = host + "/public.php?op=getUnread&login=" + user // reset url
    localStorage.setItem('url', url) // store data
}

window.onload = function main() {
    // load opts from local storage
    loadOpts()

    // get input elements
    hostInput = document.querySelector("input#opt-host")
    userInput = document.querySelector("input#opt-user")
    
    // update placeholders
    hostInput.placeholder = host
    userInput.placeholder = user

    // monitor click event
    document.querySelector('input#opt-save').onclick = saveOpts
}

// TODO: Upgrade to Manifest v3
// - Use chrome.storage and sync to save settings
