from telethon import TelegramClient, events, sync

api_id = 6174597
api_hash = '810dcd724873e9f09a6fe684fe43ba83'

client = TelegramClient('session_name', api_id, api_hash)
client.start()

client.send_message('meopeji', 'Автоматичеки отправленное сообщение!')