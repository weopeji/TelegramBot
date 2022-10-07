var bot     = null;
var User    = null;
var h       = null;
var fs      = null;
var puppeteer                       = require('puppeteer');

module.exports = {
    init:function(initPlagins)
    {
        privateInit(initPlagins);
    },
    _CreatorFUN,
    notType,
    change_type,
    close,
    help_user,
    onlyCreate,
}

function privateInit(initPlagins) {
    bot     = initPlagins.bot;
    User    = initPlagins.User;
    h       = initPlagins.helper_functions;
    fs      = initPlagins.fs;
    _data   = initPlagins._data;
    config  = initPlagins.config;
    https   = initPlagins.https;
    Project = initPlagins.Project;
}

const MF =
{
    find_user: function(msg) {
        return User.findOne({user: msg.from.id});
    },
    create_user: async function(msg, ttp, callback) 
    {
        var _patch = `../users/${msg.from.id}`;
        async function _start() 
        {
            var _path_profile = `../users_profile/${msg.from.id}`;

            async function _start_profil() 
            {
                var ttpL = null;

                if(ttp) {
                    {
                        if(ttp == "not")
                        {
                            ttpL = "investor";
                        } else {
                            ttpL = "business";
                        }
                    }
                    
                }

                await User.create({
                    user: msg.from.id, 
                    first_name: msg.from.first_name, 
                    last_name: msg.from.last_name,
                    username: msg.from.username,
                    language_code: msg.from.language_code,
                    is_bot: msg.from.is_bot,
                    type: ttpL,
                    img: null,
                    googleAuth: null,
                    alerts: null,
                    investor_data: null,
                    where: null,
                });

                if(callback) {callback();};    
            }

            fs.stat(_path_profile, async function(err) {
                if (!err) {_start_profil();}
                else if (err.code === 'ENOENT') {
                    await fs.mkdir(_path_profile, function() {
                        _start_profil();
                    });
                }
            })
        }

        fs.stat(_patch, async function(err) {
            if (!err) {
                _start();
            }
            else if (err.code === 'ENOENT') {
                await fs.mkdir(_patch, function() {
                    _start();
                });
            }
        });
    },
    Update_Type: function(msg, data) {
        return User.findOneAndUpdate({user: msg.from.id}, {type: data});
    },
}

async function onlyCreate(msg, businessType)
{
    return new Promise(async (resolve,reject) =>
    {
        MF.create_user(msg, businessType, function() {
            resolve();
        })
    })
}

async function help_user(msg) 
{
    var _array  = [];
    var _User   = await User.findOne({user: msg.from.id});

    var html = `${_User.first_name}\nВы находитесь в меню "Написать тех поддержке"`;
    var fat = await bot.sendMessage(msg.chat.id, html, {
        parse_mode: "html",
        reply_markup: {  
            "resize_keyboard": true, 
            "keyboard": [
                ["⬅️ Назад"]
            ],                                                                   
        }
    });
    _array.push(fat.message_id);

    var html = `Перейдите в личный кабинет, чтобы посмотреть Написать тех поддержке`;
    var fat = await bot.sendMessage(msg.chat.id, html, {
        parse_mode: "html",
        reply_markup: {                                                                     
            "inline_keyboard": [
                [
                    {
                        text: 'Перейти',
                        login_url: {
                            'url': `${h.getURL()}?user=${_User.id}&page=chats&owner=true`,
                        },
                    },
                ]
            ],
        }
    });
    _array.push(fat.message_id);

    await h.DMA(msg, _array);
}

async function _CreatorFUN(msg)
{
    var _user = await MF.find_user(msg);

    if(!_user)
    {
        await MF.create_user(msg);
        notType(msg);
    } else
    {
        if(!_user.type) { await notType(msg); } else { await _MainMenu(msg); };
    }
    
    return;
}

async function notType(msg)
{
    var _array = [];
    var html =`Приветствуем <strong>${msg.from.first_name}</strong> на <strong>investER</strong>. Выбери свой профиль:\n\n<strong>ИНВЕСТОР</strong>💰 - Инвестирую в компании/проекты\n\n<strong>БИЗНЕС</strong>💼 - Привлекаю инвестиции в свой бизнес/проект\n\n<strong>ПРИВЛЕЧЕНИЕ</strong>📣 - Хочу стать партнером по привлечению инвесторов/бизнесов\n\n`;
    var fat = await h.send_html(msg.chat.id, html, {
        "resize_keyboard": true,
        "keyboard": [["💰 Инвестор", "💼 Бизнес", "📣 Привлечение"]],
    });
    _array.push(fat.message_id);
    await h.DMA(msg, _array); 
} 

async function _MainMenu(msg, close)
{
    var _User       = await MF.find_user(msg);
    var _array      = [];

    if(_User.type != "attraction")
    {
        if(typeof _User.alerts_main != "undefined")
        {
            if(_User.alerts_main.length > 0)
            {
                var html =`Оповещения:\n\n`;
    
                for(var element of _User.alerts_main)
                {
                    html += `<code>${h.DateFormatted(element.date)}</code>\n<i><b>${element.text}</b></i>\n\n`;
                };
                
                var fat = await h.send_html(msg.chat.id, html);
                _array.push(fat.message_id);
            }
        }
    }

    var infoTypes = 
    {
        investor: async function(msg) 
        {   
            var myInvestingText     = "💰 Мои инвестиции";
            var InvestingText       = "📈 Инвестировать";
            var rekvexitionText     = "💳 Реквезиты";
            var rekomendationText   = "👨‍💼 Рекомендовать";

            if(typeof _User.alerts_main != "undefined") 
            {
                if(_User.alerts_main.length > 0)
                {
                    var mainAlertButton = 0;

                    _User.alerts_main.forEach(function(el) {
                        if(el.type == "pay_of_invNotFullPay") mainAlertButton = mainAlertButton + 1;
                        if(el.type == "pay_of_invNotFullPay_acceptBusiness") mainAlertButton = mainAlertButton + 1;
                        if(el.type == "removePayInvestor") mainAlertButton = mainAlertButton + 1;
                        if(el.type == "new_msg") mainAlertButton = mainAlertButton + 1;
                        if(el.type == "accept_business_investring") mainAlertButton = mainAlertButton + 1;
                    });
    
                    if(mainAlertButton != 0)
                    {
                        myInvestingText = `💰 Мои инвестиции ♦️ ${mainAlertButton}`;
                    };
                }
            };

            var html = `Вы <strong>Инвестор</strong>`;
            var fat = await bot.sendMessage(msg.chat.id, html, {
                parse_mode: "HTML",
                reply_markup: {
                    "resize_keyboard": true, 
                    "keyboard": [[myInvestingText, "👨‍💼 Рекомендовать"], ["💁🏻 Написать в Поддержку","🔁 Сменить роль"]],
                    "one_time_keyboard": true,
                }
            });
            _array.push(fat.message_id); 

            var html = `<strong>${_User.first_name}</strong>\nВы можете выбрать бизнес-проект для ивестирования здесь.`;
            var fat = await bot.sendMessage(msg.chat.id, html, {
                parse_mode: "HTML",
                reply_markup: {
                    "inline_keyboard": [
                        [
                            {
                                text: "ОЗНАКОМИТСЯ С ПРЕДЛОЖЕНИЯМИ",
                                url: "https://t.me/investir_official",
                            }
                        ]
                    ],
                }
            });
            _array.push(fat.message_id);
            await h.DMA(msg, _array);
        },
        business: async function(msg) 
        {
            var html = `<strong>${_User.first_name}</strong>\nдля того, чтобы разместить свое предложение для привлечения инвестиций, необходимо заполнить заявку. Нажмите кнопку "Добавить проект"\n\n`;
            if(typeof _User.business_msgPut != "undefined") { html = `<strong>${_User.first_name}</strong>\nВы находитесь в главном меню бизнеса!`; } else { await User.findOneAndUpdate({_id: _User._id}, {business_msgPut: "true"}); };
            
            var allBusinesButtons =
            {
                "active_projects": "✅ Активные проекты",
                "not_active": "❌ Неактивные проекты",
            };

            if(typeof _User.alerts_main != "undefined")
            {
                if(_User.alerts_main.length > 0)
                {
                    var button_not_active = 0;

                    for(alertUser of _User.alerts_main)
                    {
                        if(
                            alertUser.type == "project_redacting"       ||
                            alertUser.type == "file_urist"              ||
                            alertUser.type == "correction_signature"    ||
                            alertUser.type == "moreInvesterDocument"
                        )
                        {
                            button_not_active++;
                        };
                    };

                    if(button_not_active > 0)
                    {
                        allBusinesButtons["not_active"] = `❌ Неактивные проекты ♦️ ${button_not_active}`;
                    };
                };
            };

            var fat = await h.send_html(msg.chat.id, html, {
                "resize_keyboard": true,
                "keyboard": [
                    ["💁🏻 Написать в Поддержку"], 
                    ["✍ Добавить проект", allBusinesButtons["active_projects"]], 
                    [allBusinesButtons["not_active"], '🔁 Сменить роль']
                ]
            });

            _array.push(fat.message_id);

            await h.DMA(msg, _array);
        },
        attraction: async function(msg) 
        {
            if(!close)
            {
                var _array          = [];
                var html = `<strong>${_User.first_name}</strong> добро пожаловать на investER. Вы можете стать нашим партнером по привлечению инвесторов`;
                var fat = await bot.sendMessage(msg.chat.id, html, {
                    parse_mode: "HTML",
                    reply_markup: {
                        "resize_keyboard": true,
                        "keyboard": [['💁🏻 Написать в Поддержку'], ["📊 Привлечь инвесторов", "👔 Привлечь бизнес"],["🔁 Сменить роль"]],
                    }
                });
                _array.push(fat.message_id);
                await h.DMA(msg, _array);
            } else 
            {
                var _array          = [];
                var reqAttraction = require("./attraction");

                var funs = {
                    "1": function() {
                        reqAttraction.startFun(msg);
                    },
                    "2": function() {
                        reqAttraction.startFunMore(msg);
                    }
                }

                funs[_User.attractType]();
            }
        },
    };

    if(_User)
    {
        await infoTypes[_User.type](msg);
    }
}

async function change_type(msg)
{
    const MF_DATA = 
    {
        "💰 инвестор": "investor",
        "💼 бизнес": "business",
        "📣 привлечение": "attraction",
    }
    await MF.Update_Type(msg, MF_DATA[msg.text.toLowerCase()]);
    _MainMenu(msg);
}

async function close(msg)
{
    await User.findOneAndUpdate({user: msg.from.id}, {where: null})
    _MainMenu(msg, true);
}