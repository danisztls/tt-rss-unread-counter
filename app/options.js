class Setting {
    constructor(name, defaults) {
        this.name = name
        this.defaults = defaults
        this.input = document.querySelector("input#opt-" + this.name)
        this.value = this.load()
    }

    load() {
        console.log(this.name) //print
        let value = localStorage.getItem(this.name) // load data
        if (!value) { // set default for null or undefined
            value = this.defaults
        }
        console.log(this.value) //print
        return value
    }

    save() {
        if (this.input.value != "") { // ignore null
            this.value = this.input.value // assign input to opt
            this.input.value = "" // clear input
        }
        localStorage.setItem(this.name, this.value) // store opt
    }

    reset() {
        this.value = this.defaults
        localStorage.setItem(this.name, this.value)
        this.input.value = "" // clear input
    }
}
    
let host = new Setting('host', "https://localhost/tt-rss")
let user = new Setting('user', "admin")

// Update input placeholders
function updatePlaceholders() {
    host.input.placeholder = host.value
    user.input.placeholder = user.value
}

// Save opts to local storage on click event
function saveOpts() {
    host.save()
    user.save()
    updatePlaceholders()
}

// Reset opts
function resetOpts() {
    host.reset()
    user.reset()
    updatePlaceholders()
}

window.onload = function main() {
    // update placeholders
    updatePlaceholders()

    // monitor click event
    document.querySelector("input#opt-save").onclick = saveOpts
    document.querySelector("input#opt-reset").onclick = resetOpts
}

// Migration to Manifest v3
// TODO: Use chrome.storage.sync
// https://developer.chrome.com/docs/extensions/mv3/options/
