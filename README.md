# TT-RSS Unread Count

This plugin display the count of unread articles for a [TT-RSS](https://tt-rss.org/) **host** and **user**.

Defaults are:
- host: localhost
- user: admin

## Development
### Todo
The code for showing the icon is fine but I will have to:

- ~~Write code to get counter~~
- ~~Write code to display count~~
- Implement config UI
- ~~Update icon~~
- ~~Update manifest~~ 

### TT-RSS API
`https://<host>/tt-rss/public.php?op=getUnread&login=<user>`

Returns the number of unread articles and does not require authentication.
