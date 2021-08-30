from telethon import TelegramClient, events, sync
import sys

app_id = "6174597"
secret = '810dcd724873e9f09a6fe684fe43ba83'
session_name = 'session_name'

client = TelegramClient(session_name, app_id, secret)
client.start()
client.send_file(sys.argv[1], sys.argv[3])
client.send_message(sys.argv[1], sys.argv[2])

