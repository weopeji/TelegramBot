module.exports = {
    init:function(initPlagins)
    {
        privateInit(initPlagins);
    },
    components_page: function(socket,data,callback) {
        privat_index_page(socket,data,callback);
    },
};

function privateInit(initPlagins) 
{
    TelegramBot     = initPlagins.TelegramBot;
    config          = initPlagins.config;
    secondBotUser   = initPlagins.secondBotUser;
    bot             = new TelegramBot(config.second_bot_token, { polling: true });
    
    
    startSecondBot();
}

async function startSecondBot() 
{
    bot.on('message', async (msg, match) => 
    {
        var Bot2User = await secondBotUser.findOne({user: msg.from.id});

        if(!Bot2User) {
            var resp     = match[1];
            await bot.sendMessage(msg.from.id, resp);
        }
    });
};