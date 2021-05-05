// Declare global variables
let settings = {
    host: "",
    user: "",
    url:  ""
}
let hostInput, userInput

// Load opts from local storage
function loadOpts() {
    // load data
    // FIXME: Object need to be serialized
    let _settings = localStorage.getItem('settings')
    if (_settings) {
        settings = _settings
    }

    // set defaults for null or undefined
    if (!settings.host) {
        settings.host = "https://localhost/tt-rss" 
    }
    if (!settings.user) {
        settings.user = "admin" 
    }
    // reset url
    settings.url = settings.host + "/public.php?op=getUnread&login=" + settings.user
}

// Save opts to local storage on click event
function saveOpts() {
    // get data
    // ignore null or undefined
    if (hostInput.value != '') {
        settings.host = hostInput.value
    }
    if (userInput.value != '') {
        settings.user = userInput.value
    }
    // reset url
    settings.url  = settings.host + "/public.php?op=getUnread&login=" + settings.user

    // store data
    localStorage.setItem('settings', settings)
}

window.onload = function main() {
    // load opts from local storage
    loadOpts()

    // get input elements
    hostInput = document.querySelector("input#opt-host")
    userInput = document.querySelector("input#opt-user")
    
    // update placeholders
    hostInput.placeholder = settings.host
    userInput.placeholder = settings.user

    // monitor click event
    document.querySelector('input#opt-save').onclick = saveOpts
}

// TODO: Upgrade to Manifest v3
// - Use chrome.storage and sync to save settings
