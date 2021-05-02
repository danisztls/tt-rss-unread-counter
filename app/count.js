// Get count of unread itens

// Update UI to display count
const getUnread = () => {
    fetch(url)
        .then(count => response.text())
    updateUnread(count)
}

function updateUnread(count) {
    chrome.browserAction.setBadgeText({text:count})
    chrome.browserAction.setTitle({title:"" + count + " bookmarks (click to refresh)"})
}

const host="https://localhost/tt-rss"
const user="admin"
const url = host + "/public.php?op=getUnread&login=" + user

chrome.browserAction.onClicked.addListener(getUnread)
chrome.browserAction.setBadgeText({text:"."})
getUnread()
