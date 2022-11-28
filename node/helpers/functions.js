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
    savePuppeter,
    full_alert_user,
    alertAdmin,
    alertDeleteOfUserOnbot,
    token,
    DateFormatted,
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

function DateFormatted(data)
{
    function pad(s, width, character) {
        return new Array(width - s.toString().length + 1).join(character) + s;
    }

    var maxDate             = new Date(Number(data.toString()));
    return pad(maxDate.getDate(), 2, '0') + '.' + pad(maxDate.getMonth() + 1, 2, '0') + '.' + maxDate.getFullYear();
}

async function full_alert_user(_id, _text, _type, moreId) 
{
    var _User           = await User.findOne({user: _id});
    var _textDecoded    = _text;
    var _Alerts         = _User.alerts_main;
    var AlertDataNew    = {
        type: _type,
        text: _text,
        date: new Date().getTime().toString(),
    };

    var defaultmore =
    {
        "new_msg": function() {
            if(moreId || moreId == 0)
            {
                AlertDataNew.idChat = moreId;
            };
        },
    };

    if(typeof defaultmore[_type] != "undefined")
    {
        await defaultmore[_type]();
    };

    if(!_Alerts)        { _Alerts = []; };

    _Alerts.push(AlertDataNew);

    if(_Alerts.length > 3)
    {
        _Alerts.shift();
    }

    var defaultCreate = async () => 
    {
        var _user = await User.findOneAndUpdate({user: _id}, {alerts_main: _Alerts});

        var _array      = [];

        var fat = await bot.sendMessage(_user.user, "Новое оповещение", 
        {
            parse_mode: "HTML",
            reply_markup: {
                "resize_keyboard": true,
                "keyboard": [["⬅️ Назад"]],
            },
        });

        _array.push(fat.message_id);

        var keyboardPush    = [];

        var funsForSecondMSG =
        {
            "project_redacting": function()
            {
                if(moreId || moreId == 0)
                {
                    keyboardPush.push([
                        {
                            text: "Перейти к редактированию",
                            login_url: {
                                'url': `https://cashflo.ru/html/project/creating/#${moreId}`,
                                'request_write_access': true,
                            },
                        },
                    ]);
                }
            },
            "file_urist": function()
            {
                if(moreId || moreId == 0)
                {
                    keyboardPush.push([
                        {
                            text: "Перейти к подписанию",
                            login_url: {
                                'url': `https://cashflo.ru/html/project/creating/#${moreId}`,
                                'request_write_access': true,
                            },
                        },
                    ]);
                }
            },
            "correction_signature": function()
            {
                if(moreId || moreId == 0)
                {
                    keyboardPush.push([
                        {
                            text: "Добавить документы",
                            login_url: {
                                'url': `https://cashflo.ru/html/project/creating/#${moreId}`,
                                'request_write_access': true,
                            },
                        },
                    ]);
                }
            },
            "moreInvesterDocument": function()
            {
                if(moreId || moreId == 0)
                {
                    keyboardPush.push([
                        {
                            text: "Перейти к подписанию",
                            login_url: {
                                'url': `https://cashflo.ru/html/project/creating/#${moreId}`,
                                'request_write_access': true,
                            },
                        },
                    ]);
                }
            },
            "acceptProject": function()
            {
                if(moreId || moreId == 0)
                {
                    keyboardPush.push([
                        {
                            text: "Посмотреть проект",
                            url: `https://t.me/investir_official/${moreId}`
                        },
                    ]);
                }
            },
            "put_investring": function()
            {
                keyboardPush.push([
                    {
                        text: "Посмотреть инвестиции",
                        login_url: {
                            'url': `https://cashflo.ru/?page=wait_projects`,
                            'request_write_access': true,
                        },
                    },
                ]);
            },
            "accept_investing": async function()
            {
                if(moreId || moreId == 0)
                {
                    keyboardPush.push([
                        {
                            text: "Перейти к инвестиции",
                            login_url: {
                                'url': `https://cashflo.ru/?page=activ_projects&idInv=${moreId}`,
                                'request_write_access': true,
                            },
                        },
                    ]);
                }
            },
            "accept_business_investring": async function()
            {
                if(moreId || moreId == 0)
                {
                    keyboardPush.push([
                        {
                            text: "Перейти к инвестиции",
                            login_url: {
                                'url': `https://cashflo.ru/?page=activ_projects&idInv=${moreId}`,
                                'request_write_access': true,
                            },
                        },
                    ]);
                }
            },
            "accept_commission_investring": function()
            {
                if(moreId || moreId == 0)
                {
                    keyboardPush.push([
                        {
                            text: "Посмотреть результаты",
                            login_url: {
                                'url': `https://cashflo.ru/?page=obligations&id=${moreId}`,
                                'request_write_access': true,
                            },
                        },
                    ]);
                }
            },
            "new_msg": function()
            {
                keyboardPush.push([
                    {
                        text: "Перейти",
                        login_url: {
                            'url': `https://cashflo.ru/?page=chats`,
                            'request_write_access': true,
                        },
                    },
                ]);
            },
            "payment_member": function()
            {
                keyboardPush.push([
                    {
                        text: "Перейти",
                        login_url: {
                            'url': `https://cashflo.ru/?page=Attracted_by_me`,
                            'request_write_access': true,
                        },
                    },
                ]);
            },
            "allert_of_invester": async function()
            {
                if(moreId || moreId == 0)
                {
                    keyboardPush.push([
                        {
                            text: "Оплатить долг",
                            login_url: {
                                'url': `https://cashflo.ru/?page=activ_projects&idInv=${moreId}`,
                                'request_write_access': true,
                            },
                        },
                    ]);
                }
            },
            "alertsOfWaitAcceptInvesting": async function()
            {
                keyboardPush.push([
                    {
                        text: "Поступления",
                        login_url: {
                            'url': `https://cashflo.ru/?page=acceptPays`,
                            'request_write_access': true,
                        },
                    },
                ]);
            },
            "alertOfCommissionBusines": async function()
            {
                keyboardPush.push([
                    {
                        text: "Перейти",
                        login_url: {
                            'url': `https://cashflo.ru/?page=obligations`,
                            'request_write_access': true,
                        },
                    },
                ]);
            },
            "alertOfWaitPaynBusines": async function()
            {
                keyboardPush.push([
                    {
                        text: "Перейти",
                        login_url: {
                            'url': `https://cashflo.ru/?page=myProjects`,
                            'request_write_access': true,
                        },
                    },
                ]);
            },
            "removePayInvestor": async function()
            {
                keyboardPush.push([
                    {
                        text: "Перейти",
                        login_url: {
                            'url': `https://cashflo.ru/?page=not_correct`,
                            'request_write_access': true,
                        },
                    },
                ]);
            },
            "removeInvOfComplaintAdministrator": async function()
            {
                keyboardPush.push([
                    {
                        text: "Перейти",
                        login_url: {
                            'url': `https://cashflo.ru/?page=not_correct`,
                            'request_write_access': true,
                        },
                    },
                ]);
            },
            "acceptInvOfComplaintAdministrator": async function()
            {
                if(moreId || moreId == 0)
                {
                    keyboardPush.push([
                        {
                            text: "Перейти",
                            login_url: {
                                'url': `https://cashflo.ru/?page=activ_projects&idInv=${moreId}`,
                                'request_write_access': true,
                            },
                        },
                    ]);
                }
            },
            "pushMoneyOfInvesting": async function()
            {
                if(moreId || moreId == 0)
                {
                    keyboardPush.push([
                        {
                            text: "Оплатить",
                            login_url: {
                                'url': `https://cashflo.ru/?page=activ_projects&idInv=${moreId}`,
                                'request_write_access': true,
                            },
                        },
                    ]);
                };
            },
            "pay_of_invNotFullPay": async function()
            {
                if(moreId || moreId == 0)
                {
                    keyboardPush.push([
                        {
                            text: "Перейти к оплате",
                            login_url: {
                                'url': `https://cashflo.ru/?page=put_file&action=investingNotFull&InvId=${moreId}`,
                                'request_write_access': true, 
                            },
                        },
                    ]);
                };
            },
            "pay_of_invNotFullPay_business": async function()
            {
                keyboardPush.push([
                    {
                        text: "Перейти к поступлениям",
                        login_url: {
                            'url': `https://cashflo.ru/?page=acceptPays`,
                            'request_write_access': true, 
                        },
                    },
                ]);
            },
            "pay_of_invNotFullPay_acceptBusiness": async function()
            {
                if(moreId || moreId == 0)
                {
                    keyboardPush.push([
                        {
                            text: "Перейти к инвестиции",
                            login_url: {
                                'url': `https://cashflo.ru/?page=activ_projects&idInv=${moreId}`,
                                'request_write_access': true, 
                            },
                        },
                    ]);
                }
            },
            "version2_businessAlertsInvestNotFullPay": async function()
            {
                return;
            },
        };

        if(typeof funsForSecondMSG[_type] != "undefined")
        {
            await funsForSecondMSG[_type]();
        };

        var fat = await bot.sendMessage(_user.user, `<code>${DateFormatted(new Date().getTime().toString())}</code>\n<i><b>${_textDecoded}</b></i>`, {
            parse_mode: "HTML",
            "reply_markup": {
                "inline_keyboard": keyboardPush,
            }
        });

        _array.push(fat.message_id);

        var msg     = {
            from: {id: _user.user},
            chat: {id: _user.user},
        };

        await MA(msg, _array);
    }

    mkdirp(`/var/www/users_alerts/${_User.user}`, err => {
        if(err) throw err; // не удалось создать папку
        defaultCreate();
    });
}

async function savePuppeter(putProject) // 
{
    var _urlImgProject  = `${h.getURL()}html/project/cover/?id=${putProject}&liner=true`;
    const browser       = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=3840,3840'],
        defaultViewport: null,
    });
    const page = await browser.newPage();   
    await page._client.send('Emulation.clearDeviceMetricsOverride');
    await page.goto(_urlImgProject);
    await page.emulateMedia('screen');
    const element = await page.$('.cover_block');
    await page.waitForSelector('.all_good');
    await element.screenshot({
        path: `/var/www/projects/${putProject}/logo.png`,
    });
    await browser.close();
}

async function alertAdmin(data) 
{
    var _project = await Project.findOne({_id: data.projectId});

    var _funs = 
    {
        "creating_project": async function()
        {
            var html = `<a href="https://cashflo.ru/html/project/profil/#${_project._id}">Профиль компании</a>\n<a href="https://cashflo.ru/projects/${_project._id}/${_project.data["file+7"]}">Презентация</a>\n<a href="https://cashflo.ru/projects/${_project._id}/${_project.data["file+8"]}">Видео презентация</a>\n\n`;
            html += data.text;
            const stream = fs.createReadStream(`/var/www/projects/${data.projectId}/logo.png`);
            await bot.sendPhoto(-1001894690362, stream, {
                "caption": html,
                "parse_mode": "html",
                "reply_markup": {
                    "inline_keyboard": [
                        [
                            {
                                text: "Перейти к модерации",
                                login_url: {
                                    'url': `https://cashflo.ru/settings/?page=block&id=${_project._id}&more=data`,
                                    'request_write_access': true,
                                },
                            }
                        ]
                    ],
                }
            });
        },
        "correct_signature": function()
        {
            var html = `<a href="https://cashflo.ru/html/project/profil/#${_project._id}">Профиль компании</a>\n<a href="https://cashflo.ru/projects/${_project._id}/${_project.data["file+7"]}">Презентация</a>\n<a href="https://cashflo.ru/projects/${_project._id}/${_project.data["file+8"]}">Видео презентация</a>\n\n`;
            html += data.text;
            const stream = fs.createReadStream(`/var/www/projects/${data.projectId}/logo.png`);
            bot.sendPhoto(-1001894690362, stream, {
                "caption": html,
                "parse_mode": "html",
                "reply_markup": {
                    "inline_keyboard": [
                        [
                            {
                                text: "Перейти к модерации",
                                login_url: {
                                    'url': `https://cashflo.ru/settings/?page=block&id=${_project._id}&more=more`,
                                    'request_write_access': true,
                                },
                            }
                        ]
                    ],
                }
            });
        },
        "correct_investerDocument": function()
        {
            var html = `<a href="https://cashflo.ru/html/project/profil/#${_project._id}">Профиль компании</a>\n<a href="https://cashflo.ru/projects/${_project._id}/${_project.data["file+7"]}">Презентация</a>\n<a href="https://cashflo.ru/projects/${_project._id}/${_project.data["file+8"]}">Видео презентация</a>\n\n`;
            html += data.text;
            const stream = fs.createReadStream(`/var/www/projects/${data.projectId}/logo.png`);
            bot.sendPhoto(-1001894690362, stream, {
                "caption": html,
                "parse_mode": "html",
                "reply_markup": {
                    "inline_keyboard": [
                        [
                            {
                                text: "Перейти к модерации",
                                login_url: {
                                    'url': `https://cashflo.ru/settings/?page=block&id=${_project._id}&more=more`,
                                    'request_write_access': true,
                                },
                            }
                        ]
                    ],
                }
            });
        },
        "correct_investerDocument_more": function() {
            var html = `<a href="https://cashflo.ru/html/project/profil/#${_project._id}">Профиль компании</a>\n<a href="https://cashflo.ru/projects/${_project._id}/${_project.data["file+7"]}">Презентация</a>\n<a href="https://cashflo.ru/projects/${_project._id}/${_project.data["file+8"]}">Видео презентация</a>\n\n`;
            html += data.text;
            const stream = fs.createReadStream(`/var/www/projects/${data.projectId}/logo.png`);
            bot.sendPhoto(-1001894690362, stream, {
                "caption": html,
                "parse_mode": "html",
                "reply_markup": {
                    "inline_keyboard": [
                        [
                            {
                                text: "Перейти к модерации",
                                login_url: {
                                    'url': `https://cashflo.ru/settings/?page=block&id=${_project._id}&more=redacting`,
                                    'request_write_access': true,
                                },
                            }
                        ]
                    ],
                }
            });
        },
        "video": function()
        {
            var html = `<a href="https://cashflo.ru/html/project/profil/#${_project._id}">Профиль компании</a>\n<a href="https://cashflo.ru/projects/${_project._id}/${_project.data["file+7"]}">Презентация</a>\n<a href="https://cashflo.ru/projects/${_project._id}/${_project.data["file+8"]}">Видео презентация</a>\n\n`;
            html += data.text;
            const stream = fs.createReadStream(`/var/www/projects/${data.projectId}/logo.png`);
            bot.sendPhoto(-1001894690362, stream, {
                "caption": html,
                "parse_mode": "html",
                "reply_markup": {
                    "inline_keyboard": [
                        [
                            {
                                text: "Посмотреть результаты",
                                login_url: {
                                    'url': `https://cashflo.ru/settings/?page=block&id=${_project._id}&more=settings`,
                                    'request_write_access': true,
                                },
                            }
                        ]
                    ],
                }
            });
        },
        "accpetCommissionByBusiness": function()
        {
            var html = `<a href="https://cashflo.ru/html/project/profil/#${_project._id}">Профиль компании</a>\n<a href="https://cashflo.ru/projects/${_project._id}/${_project.data["file+7"]}">Презентация</a>\n<a href="https://cashflo.ru/projects/${_project._id}/${_project.data["file+8"]}">Видео презентация</a>\n\n`;
            html += data.text;
            const stream = fs.createReadStream(`/var/www/projects/${data.projectId}/logo.png`);
            bot.sendPhoto(-1001894690362, stream, {
                "caption": html,
                "parse_mode": "html",
                "reply_markup": {
                    "inline_keyboard": [
                        [
                            {
                                text: "Посмотреть",
                                login_url: {
                                    'url': `https://cashflo.ru/settings/?page=commissions`,
                                    'request_write_access': true,
                                },
                            }
                        ]
                    ],
                }
            });
        },
        "not_correct_complaint": function()
        {
            var html = `<a href="https://cashflo.ru/html/project/profil/#${_project._id}">Профиль компании</a>\n<a href="https://cashflo.ru/projects/${_project._id}/${_project.data["file+7"]}">Презентация</a>\n<a href="https://cashflo.ru/projects/${_project._id}/${_project.data["file+8"]}">Видео презентация</a>\n\n`;
            html += data.text;
            const stream = fs.createReadStream(`/var/www/projects/${data.projectId}/logo.png`);
            bot.sendPhoto(-1001894690362, stream, {
                "caption": html,
                "parse_mode": "html",
                "reply_markup": {
                    "inline_keyboard": [
                        [
                            {
                                text: "Посмотреть",
                                login_url: {
                                    'url': `https://cashflo.ru/settings/?page=complaint`,
                                    'request_write_access': true,
                                },
                            }
                        ]
                    ],
                }
            });
        },
        "notFullPayMoneyPush": function()
        {
            var html = `<a href="https://cashflo.ru/html/project/profil/#${_project._id}">Профиль компании</a>\n<a href="https://cashflo.ru/projects/${_project._id}/${_project.data["file+7"]}">Презентация</a>\n<a href="https://cashflo.ru/projects/${_project._id}/${_project.data["file+8"]}">Видео презентация</a>\n\n`;
            html += data.text;
            const stream = fs.createReadStream(`/var/www/projects/${data.projectId}/logo.png`);
            bot.sendPhoto(-1001894690362, stream, {
                "caption": html,
                "parse_mode": "html",
                "reply_markup": {
                    "inline_keyboard": [
                        [
                            {
                                text: "Посмотреть",
                                url: `https://cashflo.ru/settings/?page=block&id=${_project._id}&more=redacting`,
                            }
                        ]
                    ],
                }
            });
        }
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

async function MA_U(_id, array)
{
    var _User       = await User.findOne({user: _id});
    var deleteMsgs  = _User.deleteMsgs;

    array.forEach(function(element)
    {
        deleteMsgs.push(element);
    });

    await User.findOneAndUpdate({user: _User.user}, {deleteMsgs: deleteMsgs});

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

async function alertDeleteOfUserOnbot(html, id)
{
    var _array  = [];
    var msg     = {
        from: {id: id},
        chat: {id: id},
    };

    var fat  = await h.send_html(id, html, {
        "resize_keyboard": true,
        "keyboard": [["⬅️ Назад"]],
    });

    _array.push(fat.message_id);
    await MA(msg, _array);
}