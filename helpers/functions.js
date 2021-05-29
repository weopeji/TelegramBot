var bot     = null;

module.exports = {
    init:function(initPlagins)
    {
        privateInit(initPlagins);
    },
    send_html,
}

function privateInit(initPlagins) {
    bot     = initPlagins.bot;
}

function send_html(id, html, data)
{
    if(!data) data = {};
    return bot.sendMessage(id, html, 
        {
            parse_mode: "HTML",
            reply_markup: data,
        });
}