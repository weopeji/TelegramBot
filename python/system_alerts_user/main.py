from telethon import TelegramClient, events
import sys
import asyncio

app_id = "6174597"
secret = '810dcd724873e9f09a6fe684fe43ba83'
session_name = 'session_name'


async def main_start():
    async with TelegramClient(session_name, app_id, secret) as client:
        await client.send_message(sys.argv[1], sys.argv[2])


def main():
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main_start())
    loop.close()

main()