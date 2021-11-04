var bot     = null;
var User    = null;
var h       = null;

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
}

async function startFunMore(msg)
{
    await User.findOneAndUpdate({user: msg.from.id}, {attractType: 2});

    var _array          = [];

    var html = `<strong>${msg.from.first_name} ${msg.from.last_name}</strong> добро пожаловать на investER. Вы можете стать нашим партнером по привлечению бизнес-проектов.`;
    html += "\n\nПерешлите вашу индивидуальную ссылку БИЗНЕСУ на добавление нового проекта. Если проект окажется перспективным и на встрече с собственниками проекта нам все понравится, проект будет размещен на investER, закреплен за ВАМИ и вы получите от 0,5% до 2,5% с привлеченных в проект средств на нашей платформе.";
    html += "\n\nКак только предложение будет размещено на платформе, вы сможете отслеживать прогресс по сбору средств в проект на канале, в личном кабинете, а также мы будем присылать вам оповещения об изменении собранной суммы и вашем бонусе.";
    html += "\n\nЧтобы бонус пришел к вам на карту, заполните данные реквизитов, нажав кнопку реквизиты";

    var fat = await bot.sendMessage(msg.chat.id, html, {
        parse_mode: "HTML",
        reply_markup: {
            "resize_keyboard": true,
            "keyboard": [["🔗 Моя реферальная ссылка", "🙋‍♂️ Мною привлечено"], ["💳 Реквезиты","🔁 Сменить роль"]],
        }
    });
    _array.push(fat.message_id);
    await h.DMA(msg, _array);
}

async function startFun(msg)
{
    await User.findOneAndUpdate({user: msg.from.id}, {attractType: 1});
    
    var _array          = [];
    var html = `<strong>${msg.from.first_name} ${msg.from.last_name}</strong> добро пожаловать на investER. Вы можете стать нашим партнером по привлечению инвесторов.\n\nПриглашайте инвесторов на investER либо отправляйте инвестиционное предложения из канала (в слово зашита ссылка) или вашу личную ссылку. И зарабатывайте с каждой их инвестиции. Приглашенный Вами инвестор будет за вами закреплен навсегда и за каждую инвестицию в любые проекты вы будете получать бонус.\n\nПредусмотренный бонус в каждом инвестиционном предложении разный, от 0,5 - до 10% от суммы инвестиций приглашенного инвестора. Как только приглашенный Вами инвестор проинвестирует, вам придет сообщение с датой, (именем пользователя), суммой инвестиций и бонусом для вас.\n\nЧтоб бонус пришел к вам на карту, заполните данные реквизитов, нажав кнопку реквизиты`;
    var fat = await bot.sendMessage(msg.chat.id, html, {
        parse_mode: "HTML",
        reply_markup: {
            "resize_keyboard": true,
            "keyboard": [["🔗 Моя реферальная ссылка", "🙋‍♂️ Мною привлечено"], ["💳 Реквезиты","🔁 Сменить роль"]],
        }
    });
    _array.push(fat.message_id);
    await h.DMA(msg, _array);
}

function howmany(msg) {
    var html = `<strong>${msg.from.first_name} ${msg.from.last_name}</strong>\n\nВы еще не привели ни одного пользователя`;
    h.send_html(msg.chat.id, html, 
    {
        "resize_keyboard": true,
        "keyboard": [["⬅️ Назад"]],
    });
}

async function url(msg) 
{
    var _User = await User.findOne({user: msg.from.id});

    if(_User.attractType == 1)
    {
        var _array  = [];
        var _url = `https://t.me/invester_official_bot?start=adder_${msg.from.id}`;
        var html = `<strong>${msg.from.first_name} ${msg.from.last_name}</strong> делитесь с друзьями вашей реферальной ссылкой\n\n${_url}`;
        var fat = await h.send_html(msg.chat.id, html, 
        {
            "resize_keyboard": true,
            "keyboard": [["⬅️ Назад"]],
        });
        _array.push(fat.message_id);
        await h.DMA(msg, _array);
    } else 
    {
        var _array  = [];
        var _User   = await User.findOne({user: msg.from.id});
    
        var html = "Делитесь с бизнес-проектами вашей реферальной ссылкой. Все проекты, прошедшие проверку и размещенные на канале investER, будут закреплены за вами";
        var fat = await h.send_html(msg.from.id, html, {
            "resize_keyboard": true,
            "keyboard": [
                ["⬅️ Назад"]
            ],
        });
    
        _array.push(fat.message_id)
    
        var html = `При добавлении проекта по этой ссылке все проекты в админке маркируются как поступившие от бизнес-брокера и закрепляются за конкретным человеком.`;
        var _url = `${h.getURL()}?user=${_User._id}&page=ref_url`;
    
        var fat = await h.send_html(msg.from.id, html, {
            "inline_keyboard": [
                [
                    {
                        text: "Получить ссылку 📝",
                        url: _url
                    }
                ]
            ],
        });
        _array.push(fat.message_id)
    
        await h.DMA(msg, _array);
    }
}

var reqezitsType = 
{
    "Юр.лицо": 
    [
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

async function actionReqezits(msg) 
{
    var _User                       = await User.findOne({user: msg.from.id});
    var _array                      = _User.reqezits_data;
    if(!_array) _array              = {};
    _array[_User.where.type_more]   = msg.text;
    await User.findOneAndUpdate({user: msg.from.id}, {reqezits_data: _array});
    var index = reqezitsType[_User.reqezits_data.type].indexOf(el => {el.id == _User.where.type_more});
    start_reqezits(msg, index);
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
                },
                {
                    text: '➡️',
                    callback_data: `place=attraction_reqezits_more`,
                }
            ]
        ],
    });
    _array.push(fat.message_id);

    console.log(_buttons[need_button]);
    console.log(need_button);

    _where.type         = 'actionReqezits';
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

    if(!_User.reqvesits)
    {
        var _User = await User.findOne({ user: msg.from.id });
        var _array  = [];
        var html = `<strong>${msg.from.first_name} ${msg.from.last_name}</strong> Заполните данные для заключения агентского договора и реквизиты для перечислений. Обращаем ваше внимание, что подписание договора и перечисление бонуса осуществляется только с лицами, имеющими статус самозанятый, ИП или юр.лицо.`;
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
    } else
    {
        var html = `Инвестор ${_User.first_name}\nВы находитесь в меню "РЕКВИЗИТЫ"`;
        var fat = await bot.sendMessage(msg.chat.id, toEscapeMSg(html), {
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