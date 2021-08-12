from telethon import TelegramClient, events, sync
import sys

app_id = "6174597"
secret = '810dcd724873e9f09a6fe684fe43ba83'
session_name = 'session_name'

for param in sys.argv:
    if(param == "../python/app.py"):
        continue

    client = TelegramClient(session_name, app_id, secret)
    client.start()
    client.send_message("meopeji", param)







