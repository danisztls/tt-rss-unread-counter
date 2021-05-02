# TT-RSS Unread Count
## Todo
The code for showing the icon is fine but I will have to:

- Implement a counter
- Implement working code to update counter (CORS problems)
- Implement config UI
- ~~Update icon~~
- ~~Update manifest~~ 

## Get Data
Route to get number of unred itens:

https://<host>/public.php?op=getUnread&login=<user>

eg.

https://localhost/tt-rss/public.php?op=getUnread&login=admin

The fetch() function can be used to GET and POSt data from/to an URL. It's a modern replacement for XMLHttpRequest.

Due to CORS policy the request should be made from the same domain. Create a new tab if needed. Plugins API have a way to do that (looks like create new tab).

https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
