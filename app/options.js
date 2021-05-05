let settings, hostInput, userInput

// Save opts to local storage on click event
function saveOpts() {
    // get data
    if (hostInput.value != '') {
        settings.host = hostInput.value
    }
    if (userInput.value != '') {
        settings.user = userInput.value
    }
    
    if (settings.user + settings.host) {
        settings.url  = settings.host + "/public.php?op=getUnread&login=" + settings.user
    }

    // store data
    localStorage.setItem('settings', settings)
}

window.onload = function main() {
    // init object with defaults
    settings = {
        host: "https://localhost/tt-rss",
        user: "admin",
        url: "https://localhost/tt-rss/public.php?op=getUnread&login=admin"
    }

    // get input elements
    hostInput = document.querySelector("input#opt-host")
    userInput = document.querySelector("input#opt-user")

    // load stored data
    // FIXME: It's overwriting defaults with blank when no opts are stored
    settings = localStorage.getItem('settings')
    
    // update placeholders
    hostInput.placeholder = settings.host
    userInput.placeholder = settings.user

    // monitor click event
    document.querySelector('input#opt-save').onclick = saveOpts
}

// TODO: Use a class for settings

// TODO: Upgrade to Manifest v3
// - Use chrome.storage and sync to save settings
