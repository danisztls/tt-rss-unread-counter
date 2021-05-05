# TT-RSS Unread Count

Display the count of unread articles in [Tiny Tiny RSS](https://tt-rss.org/). A plugin for Chromium browsers.

![Main Page](https://raw.githubusercontent.com/danisztls/tt-rss-unread-counter-plugin/main/img/main-page.png)

![Options Page](https://raw.githubusercontent.com/danisztls/tt-rss-unread-counter-plugin/main/img/options-page.png)

<!-- TOC GFM -->

* [Install](#install)
  * [Chrome Store](#chrome-store)
  * [Manually](#manually)
* [Config](#config)
* [Usage](#usage)

<!-- /TOC -->

## Install
### Chrome Store
*Awaiting approval.*

### Manually
Enable developer mode and drag-and-drop `app` folder to `chrome://extensions`. 

## Config
Edit **host** and **user** to fit your case.

Query URL is: `https://<host>/tt-rss/public.php?op=getUnread&login=<user>`

And defaults are:

- **host**: localhost
- **user**: admin

## Usage
Counter will automatically update every 15 minutes or whenever you click on the icon.
