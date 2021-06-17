var bot     = null;

module.exports = {
    init:function(initPlagins)
    {
        privateInit(initPlagins);
    },
    send_html,
    _GET,
}

function privateInit(initPlagins) {
    bot     = initPlagins.bot;
}

function send_html(id, html, data)
{
    if(!data) {
        return bot.sendMessage(id, html, 
            {
                parse_mode: "HTML",
            });
    } else {
        return bot.sendMessage(id, html, 
            {
                parse_mode: "HTML",
                reply_markup: data,
            });
    }
}

function _GET(line, key) {
    var s = line;
    s = s.match(new RegExp(key + '=([^&=]+)'));
    return s ? s[1] : false;
}