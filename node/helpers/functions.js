var bot     = null;
var User    = null;

module.exports = {
    init:function(initPlagins)
    {
        privateInit(initPlagins);
    },
    send_html,
    _GET,
    _User,
    R_Where,
    getURL,
}

function privateInit(initPlagins) {
    bot     = initPlagins.bot;
    User    = initPlagins.User;
    config  = initPlagins.config;
}

function getURL() 
{
    if (config.secure) {
        return config.host_url_server;
    } else {
        return config.host_url;
    }
}

function R_Where(msg, data) {
    return User.findOneAndUpdate({user: msg.from.id}, { where: data });
}

function _User(msg) {
    return User.findOne({user: msg.from.id});
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