from telethon import TelegramClient
import sys

app_id = "6174597"
secret = '810dcd724873e9f09a6fe684fe43ba83'
session_name = 'session_name'

i = 0

for param in sys.argv:
    # if(param == "../python/app.py"):
    #     continue

    if(i == 0):
        i += 1
        continue

    client = TelegramClient(session_name, app_id, secret)
    client.start()
    client.send_message("meopeji", param)

    i += 1