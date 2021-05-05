# TT-RSS Unread Count

Display the count of unread articles in [Tiny Tiny RSS](https://tt-rss.org/). A plugin for Chromium browsers.

<!-- TOC GFM -->

* [Install](#install)
  * [Chrome Store](#chrome-store)
  * [Manually](#manually)
* [Config](#config)
* [Usage](#usage)
* [Screenshots](#screenshots)
* [Alternatives](#alternatives)
* [Contributing](#contributing)
* [License](#license)

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

## Screenshots
![Main Page](https://raw.githubusercontent.com/danisztls/tt-rss-unread-counter-plugin/main/img/main-page.png)

![Options Page](https://raw.githubusercontent.com/danisztls/tt-rss-unread-counter-plugin/main/img/options-page.png)

## Alternatives
- [moneytoo/tt-rss-checker-chrome](https://github.com/moneytoo/tt-rss-checker-chrome)
- [fox/tt-rss-notifier-chrome](https://git.tt-rss.org/fox/tt-rss-notifier-chrome)
- [synonym24/tiny-tiny-rss-guardian](https://bitbucket.org/synonym24/tiny-tiny-rss-guardian/src/master/): for firefox 57+

## Contributing
Found a typo in the documentation or interested in fixing a bug? Then by all means submit an issue or a pull request. If this is your first pull request, it may be helpful to read up on the [GitHub Flow](https://guides.github.com/introduction/flow/).

## License
Licensed under the [MIT License](https://github.com/danisztls/tt-rss-unread-counter-plugin/main/blob/main/LICENSE).
