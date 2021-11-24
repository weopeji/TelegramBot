from instabot import Bot

bot = Bot()

bot.login(username="_opeji",
          password="135315Ab135315www")

file = open('./logo.png', 'r')

bot.upload_photo(file, caption="your post caption")