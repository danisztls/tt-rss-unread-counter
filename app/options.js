// host, user and url variables are declared in background.js

// LIB
// Get opts from SessionStorage and modify input boxes placeholders on window load
function getOpts() {
    // load data
    try {
        host = localStorage.getItem('host')
        user = localStorage.getItem('user')
    } catch (e) {
        console.error(e)
    }

    // update placeholders
    hostInputElement.setAttribute("placeholder", host)
    userInputElement.setAttribute("placeholder", user)
}

// Save opts to local storage on click event
function saveOpts() {
    // get data
    // FIXME: Check if non empty
    host = hostInputElement.value
    user = userInputElement.value
    url  = host + "/public.php?op=getUnread&login=" + user
    
    // save data
    localStorage.setItem('host', host)
    localStorage.setItem('user', user)
    localStorage.setItem('url', url)
}

// MAIN
window.onload = function main() {
    // get input elements
    const hostInputElement = document.querySelector("opt-host")
    const userInputElement = document.querySelector("opt-user")

    // load stored data
    getOpts()

    // monitor click event
    document.querySelector('#opt-save').onclick = saveOpts
}

// TODO: Upgrade to Manifest v3
// - Use chrome.storage and sync to save settings
