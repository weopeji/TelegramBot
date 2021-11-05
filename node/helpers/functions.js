var bot     = null;
var User    = null;

let {PythonShell}       = require('python-shell')

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
    DM,
    DMA,
    MA,
    alertBot,
    alertUser,
}

function privateInit(initPlagins) {
    bot     = initPlagins.bot;
    User    = initPlagins.User;
    config  = initPlagins.config;
}

async function alertUser(msg, text) 
{
    var _User       = await User.findOne({user: msg.from.id});

    let options = 
    {
        mode: 'text',
        scriptPath: '../python/system_alerts_user',
        args: [_User.username, text]
    };

    await PythonShell.run('main.py', options, function (err, results) {
        if (err) throw err;
    })
}

async function DM(msg, how) 
{
    for(var i = 0; i < how; i++) { 
        try {
            await bot.deleteMessage(msg.chat.id, msg.message_id - i); 
        } catch (e) {
            console.log('Не удалилось');
        }
        
    };
    return;
} 

async function MA(msg, array)
{
    var _User       = await User.findOne({user: msg.from.id});
    var deleteMsgs  = _User.deleteMsgs;

    array.forEach(function(element)
    {
        deleteMsgs.push(element);
    });

    await User.findOneAndUpdate({user: msg.from.id}, {deleteMsgs: deleteMsgs});

    return;
}

async function DMA(msg, array) 
{

    var _User = await User.findOne({user: msg.from.id});

    var deleteMsgs = _User.deleteMsgs;

    if(deleteMsgs.length != 0) {
        for(var i = 0; i < deleteMsgs.length; i++) { 
            try {
                await bot.deleteMessage(msg.from.id, deleteMsgs[i]); 
            } catch (e) {
                console.log('Не удалилось');
            }
        };
    }

    await User.findOneAndUpdate({user: msg.from.id}, {deleteMsgs: []});

    var _array = [];

    array.forEach(function(element)
    {
        _array.push(element);
    });

    await User.findOneAndUpdate({user: msg.from.id}, {deleteMsgs: _array});
    
    return;
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

async function alertBot(msg, type) 
{
    var _User   = await User.findOne({user: msg.from.id});
    var alerts  = _User.alerts;

    if(!alerts) {
        alerts = [
            {
                type: type
            }
        ];
    } else {
        alerts.push({
            type: type
        })
    }

    await User.findOneAndUpdate({user: msg.from.id}, { alerts: alerts });
}