from telethon import TelegramClient, events
import sys
import asyncio

app_id = "6174597"
secret = '810dcd724873e9f09a6fe684fe43ba83'
session_name = 'session_name'


async def main_start():
  async with TelegramClient(session_name, app_id, secret) as client:
    client.start()

    channel = client.get_entity("@spark_ar_dtsstudio")

    c = client.get_participants(channel, limit=5);

    x = 0
    while x < 5:
      print(c[x])
      x += 1


def main():
  loop = asyncio.get_event_loop()
  loop.run_until_complete(main_start())
  loop.close()


main()


