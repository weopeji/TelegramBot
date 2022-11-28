var bot     = null;
var User    = null;
var h       = null;

const fetch             = require("node-fetch");


function privateInit(initPlagins) {
    bot     = initPlagins.bot;
    User    = initPlagins.User;
    h       = initPlagins.helper_functions;
}

module.exports = {
    init:function(initPlagins)
    {
        privateInit(initPlagins);
    },
    url,
    howmany,
    requisites,
    reqezits,
    startFun,
    startFunMore,
    start_reqezits,
    actionReqezits,
    cheackUserStatus,
    startReqezitsData,
    startReqezitsDataMore,
    acceptReqezitsData,
    startReqezitsData_need,
    videoInfo,
}

async function videoInfo(msg) 
{
    var _User           = await User.findOne({user: msg.from.id});
    var _array          = [];
    var stream          = fs.createReadStream(`./assets/videos/GIF.mp4`);
    var buttonPush      = "⬅️ Назад";

    if(_User.type == "investor")
    {
        buttonPush = "⬅️ Назадᅠ";
    };

    var fat = await bot.sendMessage(msg.chat.id, 'ᅠ', {
        parse_mode: "HTML",
        reply_markup: {
            "resize_keyboard": true,
            "keyboard": [[buttonPush]],
        }
    });
    _array.push(fat.message_id);

    var fat             = await await bot.sendAnimation(msg.from.id, stream, {
        width: 900,
        height: 1920,
    });

    _array.push(fat.message_id);
    await h.DMA(msg, _array);
}

async function startFunMore(msg)
{
    var _User       = await User.findOneAndUpdate({user: msg.from.id}, {attractType: 2});
    var UserName    = msg.from.first_name;
    var _array      = [];
    var buttonPush  = "🔁 Сменить роль";

    if(typeof UserName == "undefined") {
        UserName = msg.from.last_name;
    };

    var html        = `<strong>${UserName}</strong> добро пожаловать на investiR. Вы можете стать нашим партнером по привлечению бизнес-проектов.`;
    html            += "\n\nПерешлите вашу индивидуальную ссылку БИЗНЕСУ на добавление нового проекта. Если проект окажется перспективным и на встрече с собственниками проекта нам все понравится, проект будет размещен на investiR, закреплен за ВАМИ и вы получите от 0,5% до 1% с привлеченных в проект средств на нашей платформе.";
    html            += "\n\nКак только предложение будет размещено в сервисе, вы сможете отслеживать прогресс по сбору средств в проект на канале, в личном кабинете, а также мы будем присылать вам оповещения об изменении собранной суммы и вашем бонусе.";
    html            += "\n\nЧтобы бонус пришел к вам на карту, заполните данные для договора, нажав кнопку запросить выплату";

    if(_User.type == "investor")
    {
        buttonPush = "⬅️ Нaзад";
    };

    var fat = await bot.sendMessage(msg.chat.id, html, {
        parse_mode: "HTML",
        reply_markup: {
            "resize_keyboard": true,
            "keyboard": [["🔗 Моя реферальная ссылка", "🙋‍♂️ Личный кабинет"], [buttonPush]],
        }
    });
    _array.push(fat.message_id);
    await h.DMA(msg, _array);
}

async function startFun(msg)
{
    var _User       = await User.findOneAndUpdate({user: msg.from.id}, {attractType: 1});
    var UserName    = msg.from.first_name;

    if(typeof UserName == "undefined") {
        UserName = msg.from.last_name;
    };
    
    var _array          = [];
    var html            = `<strong>${UserName}</strong> добро пожаловать в партенрскую сеть investiR.\n\nОтправьте инвестору приглашение в канал с предложением или вашу реферальную ссылку и он всегда будет закреплен за вами в любых его инвестициях в бизнес-проекты сервиса investiR.\n\nбонус в каждом предложении от 0.5% до 1% от всех сумм инвестций инвестора.\nВам придет сообщение в телеграм о начислении сразу после участия инвесторов в бизнес проектах.\n\nДля получения бонуса запросите выплату в личном кабинете investiR.`;
    var buttonPush      = "🔁 Сменить роль";

    if(_User.type == "investor")
    {
        buttonPush = "⬅️ Нaзад";
    }

    var fat = await bot.sendMessage(msg.chat.id, html, {
        parse_mode: "HTML",
        reply_markup: {
            "resize_keyboard": true,
            "keyboard": [["🔗 Моя реферальная ссылка", "🙋‍♂️ Личный кабинет"], [buttonPush]],
        }
    });
    _array.push(fat.message_id);
    await h.DMA(msg, _array);
}

function howmany(msg) {
    var html = `<strong>${msg.from.first_name}</strong>\n\nВы еще не привели ни одного пользователя`;
    h.send_html(msg.chat.id, html, 
    {
        "resize_keyboard": true,
        "keyboard": [["⬅️ Назад"]],
    });
}

async function url(msg) 
{
    var _User       = await User.findOne({user: msg.from.id});
    var first_name  = _User.first_name;

    if(typeof first_name == "undefined")
    {
        first_name = _User.last_name;
    };

    if(_User.attractType == 1)
    {
        var _array  = [];

        // 1 ===
        var html = `<strong>${first_name}</strong> Чтобы закрепить за собой инвестора\nВам нужно поделится личной ссылкой\nИли переслать сообщение ниже`;

        var buttonPush = "⬅️ Назад";

        if(_User.type == "investor")
        {
            buttonPush = "⬅️ Haзaд";
        };

        var fat = await h.send_html(msg.chat.id, html, 
        {
            "resize_keyboard": true,
            "keyboard": [
                ["📼 Видео инструкция"],
                [buttonPush]
            ],
        });
        _array.push(fat.message_id);

        // 2 ===
        var stream = fs.createReadStream(`../html/assets/images/2.0.0/logo_print.jpg`);
        var fat = await await bot.sendPhoto(msg.from.id, stream, {
            "parse_mode": "html",
            "reply_markup": {
                "inline_keyboard": [
                    [
                        {
                            text: "🏦 Инвестиционные предложения",
                            login_url: {
                                'url': `https://cashflo.ru/?page=telegram_authorization&type=recomendation_push&userId=${msg.from.id}`,
                                'request_write_access': true,
                            },
                        }
                    ]
                ],
            }
        });
        _array.push(fat.message_id);

        // 3 ===
        var html = "Или отправьте ссылку в любой месенджер друзьям для регистрации в реферальной программе\n\n`https://t.me/investir_official_bot?start=adder_" + msg.from.id.toString() + "`";
        var fat = await bot.sendMessage(msg.from.id, html, 
        {
            parse_mode: "Markdown",
        });
        _array.push(fat.message_id);

     

        await h.DMA(msg, _array);
    } else 
    {
        var _array  = [];

        // 1 ===
        var html = `<strong>${first_name}</strong> Чтобы закрепить за собой проект Вам нужно поделится личной сссылкой или переслать сообщеноие ниже`;

        var buttonPush = "⬅️ Назад"; 

        if(_User.type == "investor")
        {
            buttonPush = "⬅️ Hазaд";
        };

        var fat = await h.send_html(msg.chat.id, html, 
        {
            "resize_keyboard": true,
            "keyboard": [
                ["📼 Видео инструкция"],
                [buttonPush]
            ],
        });
        _array.push(fat.message_id);

        // 2 ===
        var stream = fs.createReadStream(`../html/assets/images/logo_print.jpeg`);
        var fat = await await bot.sendPhoto(msg.from.id, stream, {
            "parse_mode": "html",
            "reply_markup": {
                "inline_keyboard": [
                    [
                        {
                            text: "Получить финансирование",
                            login_url: {
                                'url': `https://cashflo.ru/?page=telegram_authorization&type=recomendation_push_b&userId=${msg.from.id}`,
                                'request_write_access': true,
                            },
                        }
                    ]
                ],
            }
        });
        _array.push(fat.message_id);

        // 3
        var html = "Либо нажмите на ссылку чтобы скопировать и отпрватье ее бизнесу\n\n`https://t.me/investir_official_bot?start=adder-b_" + msg.from.id.toString() + "`";
        var fat = await bot.sendMessage(msg.from.id, html, 
        {
            parse_mode: "Markdown",
        });
        _array.push(fat.message_id);

        await h.DMA(msg, _array);
    }
}

var reqezitsType = 
{
    "Юр.лицо": 
    [
        {
            id: "inn",
            name: "ИНН"
        },
        {
            id: "name",
            name: "Наименование юр.лица"
        },
        {
            id: "fio",
            name: "ФИО ответственного лица"
        },
    ],
    "ИП": 
    [
        {
            id: "inn",
            name: "ИНН"
        },
        {
            id: "fio",
            name: "ФИО"
        },
    ],
    "Самозанятый": 
    [
        {
            id: "inn",
            name: "ИНН"
        },
        {
            id: "fio",
            name: "ФИО"
        },
        {
            id: "data",
            name: "Дата рождения"
        },
        {
            id: "passport",
            name: "Серия и номер паспорта"
        }
    ],
}

function checkStatus(inn, date) {
    if (!date) {
        date = new Date();
    }
    const dateStr = date.toISOString().substring(0, 10);
    const url = "https://statusnpd.nalog.ru/api/v1/tracker/taxpayer_status";
    const data = {
        inn: inn,
        requestDate: dateStr,
    };
    resp = fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return resp;
}

var ReqezitsData = 
[
    {
        id: "bank",
        name: "Банк-получатель"
    },
    {
        id: "cor",
        name: "Корр. счет"
    },
    {
        id: "bik",
        name: "БИК"
    },
    {
        id: "user",
        name: "Получатель"
    },
    {
        id: "res_user",
        name: "Счет получателя"
    },
    {
        id: "inn",
        name: "ИНН"
    },
    {
        id: "kpp",
        name: "КПП"
    },
];

async function acceptReqezitsData(msg)
{
    var _User                       = await User.findOne({user: msg.from.id});
    var _error                      = false;

    ReqezitsData.forEach(el => {
        if(!_User.reqvesits[el.id]) _error = true;
    });

    if(!_error)
    {
        var _array                      = _User.reqvesits;
        _array["status"]                = true;
        await User.findOneAndUpdate({user: msg.from.id}, {reqvesits: _array});
        h.alertUser(msg, "💳 Вы изменили свои реквезиты")
        startFunMore(msg);
    }
}

async function startReqezitsDataMore(msg)
{
    var _User                       = await User.findOne({user: msg.from.id});
    var _array                      = _User.reqvesits;
    if(!_array) _array              = {};
    _array[_User.where.type_more]   = msg.text;
    await User.findOneAndUpdate({user: msg.from.id}, {reqvesits: _array});
    startReqezitsData(msg, _User.where.need_button);
}

async function startReqezitsData_need(msg) 
{
    await User.findOneAndUpdate({user: msg.from.id}, { where: {
        type: "attraction",
    }});
    var _array  = [];
    var html    = `<strong>${msg.from.first_name} ${msg.from.last_name}</strong> Заполните данные для заключения агентского договора и реквизиты для перечислений. Обращаем ваше внимание, что подписание договора и перечисление бонуса осуществляется только с лицами, имеющими статус самозанятый, ИП или юр.лицо.`;
    var fat     = await h.send_html(msg.chat.id, html, {
        "resize_keyboard": true,
        "keyboard": [ 
            ["✔️ Принять реквезиты"],
            ["⬅️ Назад"]
        ],
    });
    _array.push(fat.message_id);
    await h.DMA(msg, _array);
    var html    = `*`;
    var fat     = await h.send_html(msg.chat.id, html);
    _array.push(fat.message_id);
    await h.MA(msg, _array);
    var _User           = await User.findOne({user: msg.from.id});
    var _where          = _User.where;
    _where.msg          = fat.message_id;
    await User.findOneAndUpdate({user: msg.from.id}, {where: _where})
    startReqezitsData(msg, 0);
}

async function startReqezitsData(msg, _need_button)
{
    var _array                      = [];
    var _User                       = await User.findOne({user: msg.from.id});
    var _buttons                    = ReqezitsData;
    var _reqezits_data              = {};

    if(_User.reqvesits)
    {
        _reqezits_data = _User.reqvesits;
    }

    var need_button                 = 0;
    var _where                      = _User.where;

    if(_User.where.msg)
    {
        await bot.deleteMessage(msg.from.id, _User.where.msg); 
    }

    if(_need_button || _need_button == 0) 
    {
        need_button                 = _need_button
    } else {
        need_button                 = h._GET(msg.data, "data");
        need_button = Number(need_button);
        if(need_button < 0) {
            need_button = 0;
        }
        if(need_button >= _buttons.length) {
            need_button = _buttons.length - 1;
        }
    }
    var html        = `<strong>Реквезиты</strong>\n\n`;
    html            += `Заполните реквезиты для перечисления вознаграждений.\n\n`;

    _buttons.forEach((element, i) => 
    {
        var strong          = '';
        var strong_second   = '';
        var dataBlock       = '[Не задано]';
        var smile           = '❌';

        if(i == need_button) {
            strong          = '<strong>*';
            strong_second   = '*</strong>\n';
        }

        if(_reqezits_data[element.id]) {
            dataBlock = _reqezits_data[element.id];
            smile = '✅';
        }
        
        html = html + `${smile} ${strong} ${element.name}:   ${dataBlock} ${strong_second}\n`;
    })

    var fat = await h.send_html(msg.from.id, html, {
        "inline_keyboard": [
            [
                {
                    text: '⬇️',
                    callback_data: `place=startReqezitsData&type=button&data=${need_button + 1}`,
                },
                {
                    text: '⬆️',
                    callback_data: `place=startReqezitsData&type=button&data=${need_button - 1}`,
                },
            ]
        ],
    });
    _array.push(fat.message_id);

    _where.type         = 'startReqezitsData';
    _where.need_button  = need_button;
    _where.msg          = fat.message_id;
    _where.type_more    = _buttons[need_button].id;

    await User.findOneAndUpdate({user: msg.from.id}, {where: _where})

    await h.MA(msg, _array);
}

async function cheackUserStatus(msg)
{
    var _array                      = [];
    var _User                       = await User.findOne({user: msg.from.id});

    var funs = 
    {
        "error": async function(msgText)
        {
            var html    = msgText;
            var fat     = await h.send_html(msg.chat.id, html);
            _array.push(fat.message_id);
            await h.MA(msg, _array);
        },
        "success": async function()
        {
            var html    = `<strong>${msg.from.first_name}</strong> Заполните данные для заключения агентского договора и реквизиты для перечислений. Обращаем ваше внимание, что подписание договора и перечисление бонуса осуществляется только с лицами, имеющими статус самозанятый, ИП или юр.лицо.`;
            var fat     = await h.send_html(msg.chat.id, html, {
                "resize_keyboard": true,
                "keyboard": [ 
                    ["✔️ Принять реквезиты"],
                    ["⬅️ Назад"]
                ],
            });
            _array.push(fat.message_id);
            await h.DMA(msg, _array);
            var html    = `*`;
            var fat     = await h.send_html(msg.chat.id, html);
            _array.push(fat.message_id);
            await h.MA(msg, _array);
            var _User           = await User.findOne({user: msg.from.id});
            var _where          = _User.where;
            _where.msg          = fat.message_id;
            await User.findOneAndUpdate({user: msg.from.id}, {where: _where})
            startReqezitsData(msg, 0);
        },
        "first": async function() 
        {
            checkStatus(_User.reqezits_data.inn)
            .then((response) => {
                return response.json();
            })
            .then((response) => 
            {
                var _data = response;

                if(!_data.status)
                {
                    funs["error"](_data.message);
                } else {
                    if(!_data.status)
                    {
                        funs["error"](_data.message);
                    } else {
                        funs["success"]();
                    }
                }

            });
        },
        "second": async function() 
        {
            var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";
            var token = "cd3a829357362fec55fc201c3f761002def9906f";
            var query = _User.reqezits_data.inn;
            
            var options = {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Token " + token
                },
                body: JSON.stringify({query: query})
            }
            
            fetch(url, options)
            .then(response => response.json())
            .then(result => {
                var _data = result.suggestions;
                if(_data.length > 0) {
                    funs["success"]();
                } else {
                    funs["error"]("Инн не верен, попробуйте еще раз...");
                }
            })
            .catch(error => console.log("error", error));
        }
    }

    if(_User.reqezits_data.inn)
    {
        if(_User.reqezits_data.type == "Самозанятый")
        {
            funs["first"]();
        } else {
            funs["second"]();
        }
    }
}

async function actionReqezits(msg) 
{
    var _User                       = await User.findOne({user: msg.from.id});
    var _array                      = _User.reqezits_data;
    if(!_array) _array              = {};
    _array[_User.where.type_more]   = msg.text;
    await User.findOneAndUpdate({user: msg.from.id}, {reqezits_data: _array});
    start_reqezits(msg, _User.where.need_button);
}

async function start_reqezits(msg, _need_button)
{
    var _array                      = [];
    var _User                       = await User.findOne({user: msg.from.id});
    var _buttons                    = reqezitsType[_User.reqezits_data.type];
    var _reqezits_data              = _User.reqezits_data;
    var need_button                 = 0;
    var _where                      = _User.where;

    if(_User.where.msg)
    {
        await bot.deleteMessage(msg.from.id, _User.where.msg); 
    }

    if(_need_button || _need_button == 0) 
    {
        need_button                 = _need_button
    } else {
        need_button                 = h._GET(msg.data, "data");
        need_button = Number(need_button);
        if(need_button < 0) {
            need_button = 0;
        }
        if(need_button >= _buttons.length) {
            need_button = _buttons.length - 1;
        }
    }

    var html        = `Для <strong>${_User.reqezits_data.type}</strong> нужно заполнить данные:\n\n`;

    _buttons.forEach((element, i) => 
    {
        var strong          = '';
        var strong_second   = '';
        var dataBlock       = '[Не задано]';
        var smile           = '❌';

        if(i == need_button) {
            strong          = '<strong>*';
            strong_second   = '*</strong>\n';
        }

        if(_reqezits_data[element.id]) {
            dataBlock = _reqezits_data[element.id];
            smile = '✅';
        }
        
        html = html + `${smile} ${strong} ${element.name}:   ${dataBlock} ${strong_second}\n`;
    })

    var fat = await h.send_html(msg.from.id, html, {
        "inline_keyboard": [
            [
                {
                    text: '⬇️',
                    callback_data: `place=attraction_reqezits&type=button&data=${need_button + 1}`,
                },
                {
                    text: '⬆️',
                    callback_data: `place=attraction_reqezits&type=button&data=${need_button - 1}`,
                }
            ]
        ],
    });
    _array.push(fat.message_id);

    console.log(_buttons[need_button]);
    console.log(need_button);

    _where.type         = 'actionReqezits';
    _where.need_button  = need_button;
    _where.msg          = fat.message_id;
    _where.type_more    = _buttons[need_button].id;

    await User.findOneAndUpdate({user: msg.from.id}, {where: _where})

    await h.MA(msg, _array);
}

async function reqezits(msg)
{
    var _array          = [];
    var _User           = await User.findOne({user: msg.from.id});
    var _reqezits_data  = {};

    if(_User.reqezits_data)
    {
        _reqezits_data = _User.reqezits_data;
    }

    var html    = `<strong>${msg.from.first_name} ${msg.from.last_name}</strong> Заполните данные для заключения агентского договора и реквизиты для перечислений. Обращаем ваше внимание, что подписание договора и перечисление бонуса осуществляется только с лицами, имеющими статус самозанятый, ИП или юр.лицо.`;
    var fat     = await h.send_html(msg.chat.id, html, 
    {
        "resize_keyboard": true,
        "keyboard": [ 
            ["✔️ Проверить статус"],
            ["⬅️ Назад"]
        ],
    });
    _array.push(fat.message_id);
    await h.DMA(msg, _array);

    _reqezits_data.type = msg.text;

    await User.findOneAndUpdate({user: msg.from.id}, { where: {
        type: "attraction",
        msg: fat._id,
    },
        reqezits_data: _reqezits_data,
    });

    start_reqezits(msg, 0);
}

async function requisites(msg) 
{
    var _array  = [];
    var _User   = await User.findOne({user: msg.from.id});

    async function defaultStart_requisites()
    {
        var html = `<strong>${msg.from.first_name}</strong> Заполните данные для заключения агентского договора и реквизиты для перечислений. Обращаем ваше внимание, что подписание договора и перечисление бонуса осуществляется только с лицами, имеющими статус самозанятый, ИП или юр.лицо.`;
        var fat = await h.send_html(msg.chat.id, html, 
        {
            "resize_keyboard": true,
            "keyboard": [ 
                ['Юр.лицо', 'ИП', "Самозанятый"],
                ["⬅️ Назад"]
            ],
        });
        _array.push(fat.message_id);
        var html = `Выберите свой тип:`;
        var fat = await h.send_html(msg.chat.id, html);
        _array.push(fat.message_id);
        await h.DMA(msg, _array);
    
        await User.findOneAndUpdate({user: msg.from.id}, { where: {
            type: "attraction",
        }});
    }

    if(!_User.reqvesits)
    {
        defaultStart_requisites();
    } else
    {
        if(!_User.reqvesits.status)
        {
            defaultStart_requisites();
        } else {
            var _reqezits_data = _User.reqvesits;

            var html = `Инвестор ${_User.first_name} Ваши "РЕКВИЗИТЫ":\n\n`;

            ReqezitsData.forEach(el => {
                html += `${el.name}: ${_reqezits_data[el.id]}\n`;
            })

            var fat = await bot.sendMessage(msg.chat.id, html, {
                parse_mode: "html",
                reply_markup: {  
                    "resize_keyboard": true, 
                    "keyboard": [
                        ["✔️ Принять реквезиты", "✏️ Заменить реквизиты"],
                        ["⬅️ Назад"]
                    ],                                                                   
                }
            });
            _array.push(fat.message_id);
        
            await h.DMA(msg, _array);
        }
    }
}