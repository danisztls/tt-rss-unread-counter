// input elements
const hostInput = document.querySelector("input#opt-host")
const userInput = document.querySelector("input#opt-user")

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
    hostInput.placeholder = opts.host
    userInput.placeholder = opts.user
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

// Save opts to local storage on click event
// TODO: Refactor into a class
function saveOpts() {
    if (hostInput.value != '') { // ignore null or undefined
        opts.host = hostInput.value
        hostInput.value = ""
    }
    localStorage.setItem('host', opts.host)

    if (userInput.value != '') {
        opts.user = userInput.value
        userInput.value = ""
    }
    localStorage.setItem('user', opts.user)

    opts.url = opts.host + defaults.roteSubString  + opts.user // reset url
    localStorage.setItem('url', opts.url) // store data

    updatePlaceholders()
}

function resetOpts() {
// TODO: Refactor into a class
    opts.host = defaults.host
    localStorage.setItem('host', opts.host)
    opts.user = defaults.user
    localStorage.setItem('user', opts.user)
    updatePlaceholders()
}

window.onload = function main() {
    // load opts from local storage
    loadOpts()

    // get input elements
    //const hostInput = document.querySelector("input#opt-host")
    //const userInput = document.querySelector("input#opt-user")
    
    // update placeholders
    updatePlaceholders()

    // monitor click event
    document.querySelector('input#opt-save').onclick = saveOpts
    document.querySelector('input#opt-reset').onclick = resetOpts
}

// Migration to Manifest v3
// TODO:"Use chrome.storage.sync
// https://developer.chrome.com/docs/extensions/mv3/options/
