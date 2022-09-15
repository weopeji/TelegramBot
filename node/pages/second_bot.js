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

    startSecondBot();
}

async function startSecondBot() 
{
    var bot = new TelegramBot(config.second_bot_token, { polling: true });
    
    bot.on('message', async (msg) => 
    {
        await bot.sendMessage(msg.from.id, "Новое оповещение");
    });
}