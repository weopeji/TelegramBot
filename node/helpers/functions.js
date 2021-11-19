var bot     = null;
var User    = null;

let {PythonShell}       = require('python-shell');
var puppeteer           = require('puppeteer');
var mkdirp              = require('mkdirp');

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
    savePuppeter,
    full_alert_user,
    alertAdmin,
}

function privateInit(initPlagins) {
    bot     = initPlagins.bot;
    User    = initPlagins.User;
    config  = initPlagins.config;
    fs      = initPlagins.fs;
}

var rand = function() 
{
    return Math.random().toString(36).substr(2);
};

var token = function() 
{
    return rand() + rand();
};

async function full_alert_user(_id, _text, _type) 
{
    var _User           = await User.findOne({user: _id});
    var _tokenAlert     = token();
    var _textDecoded    = encodeURIComponent(_text);
    var _path           = `../users_alerts/${_User.user}/${_tokenAlert}.png`;
    var _urlImgAlert    = `https://invester-relocation.site/html/project/alert/?text=${_textDecoded}`;
    var _Alerts         = _User.alerts_main;

    console.log(_urlImgAlert);

    if(!_Alerts)
    {
        _Alerts         = [];
    }

    _Alerts.unshift({
        type: _type,
        img: `${_tokenAlert}.png`,
    }) 

    var defaultCreate = async () => 
    {
        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();
        await page.goto(_urlImgAlert);
        await page.emulateMedia('screen');
        const element = await page.$('.alert');   
        await element.screenshot({path: _path});
        await browser.close(); 
        await User.findOneAndUpdate({user: _id}, {alerts_main: _Alerts});
    }

    mkdirp(`/var/www/users_alerts/${_User.user}`, err => {
        if(err) throw err; // не удалось создать папку
        defaultCreate();
    });
}

async function savePuppeter(putProject)
{
    var _urlImgProject = `${h.getURL()}html/project/cover/?id=${putProject}`;
    console.log(_urlImgProject);
    const browser = await puppeteer.launch({
        defaultViewport: {width: 1920, height: 1080},
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto(_urlImgProject); 
    await page.emulateMedia('screen');
    const element = await page.$('.cover_block');   
    await element.screenshot({path: `../projects/${putProject}/logo.png`});
    await browser.close();
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

async function alertAdmin(data) 
{
    var _funs = {
        "creating_project": function()
        {
            var _patch      = `/var/www/projects/${data.projectId}`;
            var html        = `${data.text}`;
            const stream    = fs.createReadStream(_patch);
            await bot.sendPhoto(-1001693050369, stream, {
                "caption": html,
                "parse_mode": "html",
                "reply_markup": {
                    "inline_keyboard": [
                        [
                            {
                                text: "Перейти к модерации",
                                url: `https://invester-relocation.site/settings/?page=moderations`,
                            }
                        ]
                    ],
                }
            });
        },
    };
    _funs[data.type]();
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

    var deleteMsgs = [];

    if(_User.deleteMsgs)
    {
        deleteMsgs = _User.deleteMsgs;
    }

    
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