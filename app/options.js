class Setting {
    constructor(name, defaults) {
        this.name = name
        this.defaults = defaults
        this.input = document.querySelector("#opt-" + this.name)
        this.value = this.load()
    }

    load() {
        let value = localStorage.getItem(this.name) // load data
        if (!value) { // set default for null or undefined
            value = this.defaults
        }
        return value
    }

    save() {
        if (this.input.value != "") { // ignore null
            this.value = this.input.value.toString() // assign input to opt
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
let mode = new Setting('mode', "all")
let interval = new Setting('interval', "15")

function updatePlaceholders() {
    host.input.placeholder = host.value
    user.input.placeholder = user.value
}
function saveOpts() {
    host.save()
    user.save()
    mode.save()
    interval.save()
    updatePlaceholders()
}

function resetOpts() {
    host.reset()
    user.reset()
    mode.reset()
    interval.reset()
    updatePlaceholders()
}

window.onload = function main() {
    updatePlaceholders()

    // monitor click event
    document.querySelector("#opt-save").onclick = saveOpts
    document.querySelector("#opt-reset").onclick = resetOpts
}

// Migration to Manifest v3
// TODO: Use chrome.storage.sync
// https://developer.chrome.com/docs/extensions/mv3/options/
