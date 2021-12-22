var bot         = null;
var h           = null;
var puppeteer   = require('puppeteer');
const { spawn, exec } = require('child_process');

function privateInit(initPlagins) {
    bot         = initPlagins.bot;
    h           = initPlagins.helper_functions;
    User        = initPlagins.User;
    InvDoc      = initPlagins.InvDoc;
    main_page   = initPlagins.main_page;
}

module.exports = {
    init:function(initPlagins)
    {
        privateInit(initPlagins);
    },
    my_investment,
    active_projects,
    goInvesting,
    startInvestingMsg,
    recomendations,
    actionWhere,
    startInvestingMsgSecond,
    startInvestingMsgOld,
    investing_money,
    save_investing,
    inProcess,
    statusProjects,
    payerBonus,
    myPeoples,
    active_statistik,
    active_projects_stat,
    document_load,
    payerInBissness,
    payerInBissnessDocument,
    drafts,
    drafts_block,
    payerInvester,
}

async function drafts_block(msg) 
{
    var _idProject = h._GET(msg.data, "id");
    await User.findOneAndUpdate({user: msg.from.id}, {putProject: _idProject});
    goInvesting(msg);
}

async function drafts(msg) 
{
    var _InvDocs    = await InvDoc.find({invester: msg.from.id, receipt: null});
    var _array      = [];

    if(_InvDocs.length > 0) 
    {
        var needProject = await Project.findOne({_id: _InvDocs[0].projectId});
        var _doc = _InvDocs[0]

        var html = `Выбран проект: ${_doc.projectId}\n[Профиль компании](${h.getURL()}html/project/profil/#${needProject._id})\n[Презентация](${h.getURL()}/projects/${needProject._id}/${needProject.data["file+7"]})\n[Видео презентация](${h.getURL()}/projects/${needProject._id}/${needProject.data["file+8"]})\n\n`;
        const stream    = fs.createReadStream(`../projects/${_doc.projectId}/logo.png`);
    
        var fat = await bot.sendPhoto(msg.from.id, stream, {
            "caption": html,
            "parse_mode": "MarkdownV2",
            "reply_markup": {
                "inline_keyboard": [
                    [
                        {
                            text: 'Продолжить',
                            callback_data: `place=drafts&id=${_doc.projectId}`,
                        },
                    ]
                ],
            }
        });
        _array.push(fat.message_id);

        await h.DMA(msg, _array);

    } else {
        var html = `У вас нет черновиков!`;

        var fat = await h.send_html(msg.from.id, html, {
            "resize_keyboard": true,
            "keyboard": [ 
                ["⬅️ Назад"]
            ],
        });
        _array.push(fat.message_id);

        await h.DMA(msg, _array);
    }
    console.log(InvDocs);
}

async function payerInBissnessDocument(msg) 
{
    var _User   = await User.findOne({user: msg.from.id});
    if(msg.document) 
    {
        var _file       = await bot.getFile(msg.document.file_id);
        var file_url    = `https://api.telegram.org/file/bot${config.token}/${_file.file_path}`;
        const file      = fs.createWriteStream(`../projects/receipt_${_User._id}.${file_url.split('.').pop()}`);
        const request = https.get(file_url, async function(response) 
        {
            response.pipe(file);
            
            await InvDoc.findOneAndUpdate({
                projectId: _User.putProject, 
                invester: msg.from.id
            }, {
                receipt: `receipt_${_User._id}.${file_url.split('.').pop()}`
            });
            
            main_page.close(msg);

            h.savePuppeter(_User.putProject);
        });
    }
}

async function payerInBissness(msg) 
{
    var _array      = [];

    var html = `<strong>3. Прикрепить чек об оплате</strong>\n\nСейчас вам необходимо загрузить чек об оплате. При отсутствии чека, бизнес не подтвердит получение денежных средств, Инвестиция не будет засчитана и деньги будут возвращены вам на расчетный счет`;

    var fat = await h.send_html(msg.from.id, html, {
        "resize_keyboard": true,
        "keyboard": [ 
            ["⬅️ Назад"]
        ],
    });
    _array.push(fat.message_id);

    await h.DMA(msg, _array);

    await User.findOneAndUpdate({user: msg.from.id}, {where: {
        type: "payerInBissness",
    }})
}

async function active_projects_stat(msg) {
    var _array  = [];
    var _User   = await User.findOne({user: msg.from.id});

    var html = `Инвестор ${_User.first_name}\nВы находитесь в меню "Проекты"`;
    var fat = await bot.sendMessage(msg.chat.id, toEscapeMSg(html), {
        parse_mode: "html",
        reply_markup: {  
            "resize_keyboard": true, 
            "keyboard": [
                ["⬅️ Назад"]
            ],                                                                   
        }
    });
    _array.push(fat.message_id);

    var html = `Перейдите в личный кабинет, чтобы посмотреть Активные Проекты`;
    var fat = await bot.sendMessage(msg.chat.id, toEscapeMSg(html), {
        parse_mode: "html",
        reply_markup: {                                                                     
            "inline_keyboard": [
                [
                    {
                        text: 'Перейти',
                        url: `${h.getURL()}?user=${_User.id}&page=activ_projects`,
                    },
                ]
            ],
        }
    });
    _array.push(fat.message_id);

    await h.DMA(msg, _array);
}

async function active_statistik(msg) 
{
    var _array  = [];
    var _User   = await User.findOne({user: msg.from.id});

    var html = `Инвестор ${_User.first_name}\nВы находитесь в меню "Статистика"`;
    var fat = await bot.sendMessage(msg.chat.id, toEscapeMSg(html), {
        parse_mode: "html",
        reply_markup: {  
            "resize_keyboard": true, 
            "keyboard": [
                ["⬅️ Назад"]
            ],                                                                   
        }
    });
    _array.push(fat.message_id);

    var html = `Перейдите в личный кабинет, чтобы посмотреть Статистика активных проектов`;
    var fat = await bot.sendMessage(msg.chat.id, toEscapeMSg(html), {
        parse_mode: "html",
        reply_markup: {                                                                     
            "inline_keyboard": [
                [
                    {
                        text: 'Перейти',
                        url: `${h.getURL()}?user=${_User.id}&page=myProjects`,
                    },
                ]
            ],
        }
    });
    _array.push(fat.message_id);

    await h.DMA(msg, _array);
}

async function active_projects(msg)
{
    var _array  = [];
    var _User   = await User.findOne({user: msg.from.id});

    var html = `Инвестор ${_User.first_name}\nВы находитесь в меню "Активные проекты"`;
    var fat = await bot.sendMessage(msg.chat.id, toEscapeMSg(html), {
        parse_mode: "html",
        reply_markup: {  
            "resize_keyboard": true, 
            "keyboard": [
                ["⬅️ Назад"]
            ],                                                                   
        }
    });
    _array.push(fat.message_id);

    var html = `Перейдите в личный кабинет, чтобы посмотреть Активные проекты и их статистику`;
    var fat = await bot.sendMessage(msg.chat.id, toEscapeMSg(html), {
        parse_mode: "html",
        reply_markup: {                                                                     
            "inline_keyboard": [
                [
                    {
                        text: 'Перейти',
                        url: `${h.getURL()}?user=${_User.id}&page=activ_projects`,
                    },
                ]
            ],
        }
    });
    _array.push(fat.message_id);

    await h.DMA(msg, _array);

    await User.findOneAndUpdate({user: msg.from.id}, {alerts: null});
}

async function myPeoples(msg) {
    var _array  = [];
    var _User   = await User.findOne({user: msg.from.id});

    var html = `Инвестор ${_User.first_name}\nВы находитесь в меню "Мной привлечено"`;
    var fat = await bot.sendMessage(msg.chat.id, toEscapeMSg(html), {
        parse_mode: "html",
        reply_markup: {  
            "resize_keyboard": true, 
            "keyboard": [
                ["⬅️ Назад"]
            ],                                                                   
        }
    });
    _array.push(fat.message_id);

    var html = `Перейдите в личный кабинет, чтобы посмотреть статус вами привлеченных`;
    var fat = await bot.sendMessage(msg.chat.id, toEscapeMSg(html), {
        parse_mode: "html",
        reply_markup: {                                                                     
            "inline_keyboard": [
                [
                    {
                        text: 'Перейти',
                        url: `${h.getURL()}?user=${_User.id}&page=Attracted_by_me`,
                    },
                ]
            ],
        }
    });
    _array.push(fat.message_id);

    await h.DMA(msg, _array);

    await User.findOneAndUpdate({user: msg.from.id}, {alerts: null});
}

async function payerBonus(msg) {
    var _array  = [];
    var _User   = await User.findOne({user: msg.from.id});

    var html = `Инвестор ${_User.first_name}\nВы находитесь в меню "Вознаграждение по проектам"`;
    var fat = await bot.sendMessage(msg.chat.id, toEscapeMSg(html), {
        parse_mode: "html",
        reply_markup: {  
            "resize_keyboard": true, 
            "keyboard": [
                ["⬅️ Назад"]
            ],                                                                   
        }
    });
    _array.push(fat.message_id);

    var html = `Перейдите в личный кабинет, чтобы посмотреть статус вознаграждений`;
    var fat = await bot.sendMessage(msg.chat.id, toEscapeMSg(html), {
        parse_mode: "html",
        reply_markup: {                                                                     
            "inline_keyboard": [
                [
                    {
                        text: 'Перейти',
                        url: `${h.getURL()}?user=${_User.id}&page=process_status`,
                    },
                ]
            ],
        }
    });
    _array.push(fat.message_id);

    await h.DMA(msg, _array);
}

async function statusProjects(msg) {
    var _array  = [];
    var _User   = await User.findOne({user: msg.from.id});

    var html = `Инвестор ${_User.first_name}\nВы находитесь в меню "Статус получения денег бизнесом"`;
    var fat = await bot.sendMessage(msg.chat.id, toEscapeMSg(html), {
        parse_mode: "html",
        reply_markup: {  
            "resize_keyboard": true, 
            "keyboard": [
                ["⬅️ Назад"]
            ],                                                                   
        }
    });
    _array.push(fat.message_id);

    var html = `Перейдите в личный кабинет, чтобы посмотреть статус всех проектов`;
    var fat = await bot.sendMessage(msg.chat.id, toEscapeMSg(html), {
        parse_mode: "html",
        reply_markup: {                                                                     
            "inline_keyboard": [
                [
                    {
                        text: 'Перейти',
                        url: `${h.getURL()}?user=${_User.id}&page=process_status`,
                    },
                ]
            ],
        }
    });
    _array.push(fat.message_id);

    await h.DMA(msg, _array);
}

async function inProcess(msg) 
{
    var _array  = [];
    var _User   = await User.findOne({user: msg.from.id});

    var html = `Инвестор ${_User.first_name}\nВы находитесь в меню "В процессе"`;
    var fat = await bot.sendMessage(msg.chat.id, toEscapeMSg(html), {
        parse_mode: "html",
        reply_markup: {                                                                     
            "resize_keyboard": true, 
            "keyboard": [
                ["📜 Статус получения денег бизнесом"],
                ["Черновики", "⬅️ Назад"]
            ],
        }
    });
    _array.push(fat.message_id);

    await h.DMA(msg, _array);
}

function toEscapeMSg(str) {
    return str
        .replace(/_/gi, "\\_")
        .replace(/-/gi, "\\-")
        .replace("~", "\\~")
        .replace(/`/gi, "\\`")
        .replace(/\./g, "\\.")
        .replace(/\</g, "\\<")
        .replace(/\>/g, "\\>");
}

async function recomendations(msg) 
{
    var _array  = [];
    var _User   = await User.findOne({user: msg.from.id});

    var html = _User.first_name + '\nВы можете рекомендовать как конкретное предложение так и наш канал в целом\n\nДля вас будет предусмотрен бонус от от суммы инвестиций инвестора пришедшего от вас Как только приглашенный вами инвестор проинвестирует вам придет сообщение с датой, именем пользователя суммой инвестиций суммой бонуса для вас Все инвесторы пришедшие от вас закрепляются за вами НАВСЕГДА и от любой их инвестиции в любое предложение вы будете пожизненно получать бонус Это еще один пассивный доход для Вас\n\nВАЖНО: бонус перечисляется только лицам со статусом самозанятый ИП или юр.лицо\n\nОчень важно правильно указывать свои реквизиты и вовремя их заменять\n\n';
    var fat = await bot.sendMessage(msg.chat.id, html, {
        parse_mode: "Markdown"
    });
    _array.push(fat.message_id);

    var myAdders = "🙋‍♂️ Мной привлечено";

    if(_User.alerts)
    {
        _User.alerts.forEach(function(el) {
            if(el.type == "Attracted_by_me") myAdders = "🙋‍♂️ Мной привлечено ♦️";
        });
    }
    
    var html = '\nДля это просто перешлите любое предложение из [КАНАЛА](https://t.me/invester_official_bot) или  вашу [ПЕРСОНАЛЬНУЮ ССЫЛКУ](https://t.me/invester_official_bot) вашему другу\n\nВаша ПЕРСОНАЛЬНАЯ ссылка ⬇️';
    var fat = await bot.sendMessage(msg.chat.id, html, {
        parse_mode: "Markdown",
        reply_markup: {                                                                     
            "resize_keyboard": true, 
            "keyboard": [[myAdders, "Вознаграждение по проектам"],["⬅️ Назад"]],
        }
    });
    _array.push(fat.message_id);

    var html = `https://t.me/invester_official_bot?start=user_${_User.user}`;
    
    var fat = await bot.sendMessage(msg.chat.id, html, {
        parse_mode: "HTML",
    });
    _array.push(fat.message_id);

    await h.DMA(msg, _array);
}

var buttons3 = [
    {
        name: "Фио полностью",
        id: "fio_fiz",
    },
    {
        name: "Номер паспорта",
        id: "passport_number",
    },
    {
        name: "Банк получателя",
        id: "bank",
    },
    {
        name: "БИК",
        id: "bik",
    },
    {
        name: "Номер расчетного счета",
        id: "nomer",
    },
    {
        name: "Номер корреспондентского  счета",
        id: "nomer_kor",
    },
]

var buttons2 = [
    {
        name: "ИНН",
        id: "inn",
    },
    {
        name: "КПП",
        id: "kpp",
    },
    {
        name: "ОГРН",
        id: "ogrn",
    },
    {
        name: "Должность",
        id: "dolgnost",
    },
    {
        name: "ФИО должностного лица",
        id: "dolgnost_fio",
    },
    {
        name: "Юридический адрес",
        id: "addr_qr",
    },
    {
        name: "Банк получателя",
        id: "bank",
    },
    {
        name: "БИК",
        id: "bik",
    },
    {
        name: "Номер расчетного счета",
        id: "nomer",
    },
    {
        name: "Номер корреспондентского  счета",
        id: "nomer_kor",
    },
]

var buttons = [
    {
        name: "ФИО",
        id: "fio",
    },
    {
        name: "ИНН",
        id: "inn",
    },
    {
        name: "ОГРНИП",
        id: "ogrnip",
    },
    {
        name: "адрес",
        id: "addr",
    },
    {
        name: "Банк получателя",
        id: "bank",
    },
    {
        name: "БИК",
        id: "bik",
    },
    {
        name: "Номер расчетного счета",
        id: "nomer",
    },
    {
        name: "Номер корреспондентского  счета",
        id: "nomer_kor",
    },
];

var buttons_2 = [
    {
        name: "Телефон",
        id: "phone",
    },
    {
        name: "Ватсап",
        id: "watsapp",
    },
    {
        name: "Эл.почта",
        id: "mail",
    },
];

async function actionWhere(msg) 
{
    var _User       = await User.findOne({user: msg.from.id});
    var _Project    = await Project.findOne({_id: _User.putProject});
    var _array = _User.investor_data;
    if(!_array) _array = {};

    var _dataFuns = {
        "1": {
            "1": async function() 
            {
                _array.type = msg.text;
                await User.findOneAndUpdate({user: msg.from.id}, {investor_data: _array});
                startInvestingMsg(msg, 1, null, 2);
            },
            "2": async function() 
            {
                var _Where = _User.where;
                _Where.page.button = _Where.page.button + 1;
                _array[_User.where.type_more] = msg.text;
                await User.findOneAndUpdate({user: msg.from.id}, {investor_data: _array, where: _Where});
                startInvestingMsgSecond(msg, null, _User.where.page.button);
            },
            "3": async function() 
            {
                _array[buttons_2[_User.where.page.button].id] = msg.text;
                await User.findOneAndUpdate({user: msg.from.id}, {investor_data: _array});
                startInvestingMsgOld(msg, _User.where.page.button);
            },
            "4": async function() 
            {
                if(msg.text < _Project.data.minimal_amount)
                {
                    var _arrayA = [];
                    var html = `Указанная сумма меньше минимального входа`;
                    var fat = await h.send_html(msg.chat.id, html);
                    _arrayA.push(fat.message_id);
                    h.MA(msg, _arrayA);
                } else {
                    _array.pay = msg.text;
                    await User.findOneAndUpdate({user: msg.from.id}, {investor_data: _array});
                    investing_money(msg);
                }
            }
        },
    }

    _dataFuns[_User.where.page.global][_User.where.page.more]();
}

async function startInvestingMsgSecond(msg, html, button)
{
    var _array      = [];
    var _User       = await User.findOne({user: msg.from.id});

    await bot.deleteMessage(msg.from.id, _User.where.msg); 

    if(html) {
        var fat = await h.send_html(msg.chat.id, html, {
            "resize_keyboard": true,
            "keyboard": [ 
                ["⬅️ Назад"]
            ],
        });
        _array.push(fat.message_id);
    }

    var _buttons;

    var types = 
    {
        "ИП": async function() 
        {
            _buttons = buttons;
        },
        "Юр.лицо": async function() 
        {
            _buttons = buttons2;
        },
        "Физ.лицо": async function() 
        {
            _buttons = buttons3;
        },
    }

    types[_User.investor_data.type]();

    var _where          = _User.where;
    _where.page.more    = 2;

    if(typeof _where.page.button != 'number' && typeof _where.page.button != "string")
    {
        _where.page.button = 0
    } else {
        var _data = null;

        if(button || button == 0) {
            _data = button;
        } else {
            _data = h._GET(msg.data, "data");
        }

        _data = Number(_data);

        console.log(_data);
        
        if(_data < 0) {
            _data = 0;
        }
        if(_data >= _buttons.length) {
            _data = _buttons.length - 1;
        }
        _where.page.button = _data;
    }

    var html   = `Для <strong>${_User.investor_data.type}</strong> нужно заполнить данные:\n\n`;

    var need_button = _where.page.button;

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

        if(_User.investor_data[element.id]) {
            dataBlock = _User.investor_data[element.id];
            smile = '✅';
        }
        
        html = html + `${smile} ${strong} ${element.name}:   ${dataBlock} ${strong_second}\n`;
    })

    var fat = await h.send_html(msg.from.id, html, {
        "inline_keyboard": [
            [
                {
                    text: '⬇️',
                    callback_data: `place=investing&type=button&data=${need_button + 1}`,
                },
                {
                    text: '⬆️',
                    callback_data: `place=investing&type=button&data=${need_button - 1}`,
                },
                {
                    text: '➡️',
                    callback_data: `place=contact`,
                }
            ]
        ],
    });
    _array.push(fat.message_id);

    _where.msg = fat.message_id;
    _where.type_more = _buttons[need_button].id;

    await User.findOneAndUpdate({user: msg.from.id}, {where: _where})

    await h.MA(msg, _array);
}

async function startInvestingMsgOld(msg, button) 
{
    var _array      = [];
    var _User       = await User.findOne({user: msg.from.id});

    await bot.deleteMessage(msg.from.id, _User.where.msg); 

    var _where          = _User.where;

    _where.page.more    = 3;

    if(typeof _where.page.button != 'number' && typeof _where.page.button != "string")
    {
        _where.page.button = 0
    } else {
        var _data = null

        if(button || button == 0) {
            _data = button;
        } else {
            _data = h._GET(msg.data, "data");
        }
        
        _data = Number(_data);
        
        if(_data < 0) {
            _data = 0;
        }
        if(_data >= buttons_2.length) {
            _data = buttons_2.length - 1;
        }
        _where.page.button = _data;
    }

    var html   = `Контактные данные:\n\n`;

    var need_button = _where.page.button;

    buttons_2.forEach((element, i) => 
    {
        var strong          = '';
        var strong_second   = '';
        var dataBlock       = '[Не задано]';
        var smile           = '❌';

        if(i == need_button) {
            strong          = '<strong>*';
            strong_second   = '*</strong>\n';
        }

        if(_User.investor_data[element.id]) {
            dataBlock = _User.investor_data[element.id];
            smile = '✅';
        }
        
        html = html + `${smile} ${strong} ${element.name}:   ${dataBlock} ${strong_second}\n`;
    })

    var fat = await h.send_html(msg.from.id, html, {
        "inline_keyboard": [
            [
                {
                    text: '⬅️',
                    callback_data: `place=investing&type=button&data=0`,
                },
                {
                    text: '⬇️',
                    callback_data: `place=contact&type=button&data=${need_button + 1}`,
                },
                {
                    text: '⬆️',
                    callback_data: `place=contact&type=button&data=${need_button - 1}`,
                },
                {
                    text: '➡️',
                    callback_data: `place=investing_money`,
                }
            ]
        ],
    });
    _array.push(fat.message_id);

    _where.msg = fat.message_id;

    await User.findOneAndUpdate({user: msg.from.id}, {where: _where})

    await h.MA(msg, _array);
}

async function payerInvester(msg) 
{
    var _User       = await User.findOne({user: msg.from.id});
    var _Project    = await Project.findOne({_id: _User.putProject});
    var _array      = [];

    var html = `<strong>2.оплатить</strong>\n\nЗдесь вам необходимо произвести оплату инвестиций согласно банковским реквизитам, будьте очень внимательны и проверяйте несколько раз вводимые вами данные.\n\n`;
    html = html + `Банк-получатель: ${_Project.data.bank}\n`;
    html = html + `Корр. счёт: ${_Project.data.account_correct}\n`;
    html = html + `БИК: ${_Project.data.bik}\n`;
    html = html + `Получатель: ${_Project.data.recipient}\n`;
    html = html + `Счёт получателя: ${_Project.data.account_get}\n`;
    html = html + `ИНН: ${_Project.data.inn}\n`;
    html = html + `КПП: ${_Project.data.kpp}\n`;

    var fat = await h.send_html(msg.from.id, html, {
        "resize_keyboard": true,
        "keyboard": [
            ["Оплатил", "⬅️ Назад"]
        ],
    });
    _array.push(fat.message_id);

    await h.DMA(msg, _array);
}

async function document_load(msg) 
{
    var _User   = await User.findOne({user: msg.from.id});

    if(msg.document) 
    {
        var _file       = await bot.getFile(msg.document.file_id);
        var file_url    = `https://api.telegram.org/file/bot${config.token}/${_file.file_path}`;
        const file      = fs.createWriteStream(`../projects/${_User._id}.${file_url.split('.').pop()}`);
        const request = https.get(file_url, async function(response) 
        {
            response.pipe(file);

            var _arrayData = _User.investor_data;
            _arrayData.document = _User._id + "." + file_url.split('.').pop();

            await InvDoc.create({
                projectId: _User.putProject,
                invester: msg.from.id,
                status: "wait",
                data: _arrayData,
                receipt: null,
                pays: null,
            });

            _arrayData.document = null;

            await User.findOneAndUpdate({user: msg.from.id}, {investor_data: _arrayData});

            payerInvester(msg);
        });
    }
}

async function save_investing(msg) {

    var _array      = [];
    var _User       = await User.findOne({user: msg.from.id});

    
    var html = `Вы должны ознакомится с договором, подписать его и отправить ответным сообщением в бот!`;

    var fat = await h.send_html(msg.from.id, html, {
        "resize_keyboard": true,
        "keyboard": [ 
            ["⬅️ Назад"]
        ],
    });
    _array.push(fat.message_id);

    var _urlImgProject = `${h.getURL()}html/project/document/#${_User.putProject}`;
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto(_urlImgProject);
    await page.emulateMedia('screen');
    await page.waitForSelector('.all_good');
    await page.pdf({path: `../projects/${_User.putProject}/pdf_document.pdf`, format: 'a4'});
    await browser.close();

    const stream = fs.createReadStream(`../projects/${_User.putProject}/pdf_document.pdf`);
    var fat = await bot.sendDocument(msg.from.id, stream, {
        reply_markup: {
            "inline_keyboard": [
                [
                    {
                        text: 'Подписать факсимильно',
                        url: `https://invester-relocation.site/?user=${_User._id}&page=signature&id=${_User.putProject}`,
                    }
                ]
            ],
        },
    });
    _array.push(fat.message_id);

    await h.DMA(msg, _array);

    await User.findOneAndUpdate({user: msg.from.id}, {where: {
        type: "document_load",
    }})
}

async function investing_money(msg) 
{
    var _array      = [];
    var _User       = await User.findOne({user: msg.from.id});
    var _Project    = await Project.findOne({_id: _User.putProject})

    await bot.deleteMessage(msg.from.id, _User.where.msg); 

    var _where          = _User.where;

    _where.page.more    = 4;

    var html   = `Введите сумму инвестирования:\n\nМинимальная сумма входа от ${_Project.data.minimal_amount} руб\n\n`;

    if(_User.investor_data.pay) {
        html = html + `✅ Выбранна сумма: ${_User.investor_data.pay} руб`;
    }

    var keyboard = [
        {
            text: '⬅️',
            callback_data: `place=contact&type=button&data=0`,
        }
    ]

    var cheackAndStartButton = 
    {
        "ИП": async function() 
        {
            var error = false;

            buttons.forEach(element => {
                if(!_User.investor_data[element.id])
                {
                    error = true;
                }
            })

            buttons_2.forEach(element => {
                if(!_User.investor_data[element.id])
                {
                    error = true;
                }
            })

            if(!_User.investor_data.pay) {
                error = true;
            }

            return error;
        },
        "Юр.лицо": async function() 
        {
            var error = false;

            buttons2.forEach(element => {
                if(!_User.investor_data[element.id])
                {
                    error = true;
                }
            })

            buttons_2.forEach(element => {
                if(!_User.investor_data[element.id])
                {
                    error = true;
                }
            })

            if(!_User.investor_data.pay) {
                error = true;
            }

            return error;
        },
        "Физ.лицо": async function() 
        {
            var error = false;

            buttons3.forEach(element => {
                if(!_User.investor_data[element.id])
                {
                    error = true;
                }
            })

            buttons_2.forEach(element => {
                if(!_User.investor_data[element.id])
                {
                    error = true;
                }
            })

            if(!_User.investor_data.pay) {
                error = true;
            }

            return error;
        },
    }

    var errorKeyboard = await cheackAndStartButton[_User.investor_data.type]();

    if(!errorKeyboard) {
        keyboard.push( 
        {
            text: '✅ Сохранить',
            callback_data: `place=save_investing`,
        })
    }

    var fat = await h.send_html(msg.from.id, html, {
        "inline_keyboard": [
            keyboard
        ],
    });
    _array.push(fat.message_id);

    _where.msg = fat.message_id;

    await User.findOneAndUpdate({user: msg.from.id}, {where: _where})

    await h.MA(msg, _array);
}

async function startInvestingMsg(msg, num, array, more, project)
{
    var _array      = [];
    if(array) _array = array;

    var pages = 
    {
        "1": async function() 
        {
            var text1       = `❌ Еще не заполненны пункты\n\n`;
            var text2       = `<strong>1.Внести данные</strong>\n\n`;
            var text3       = `На этом этапе вам необходимо  ознакомится с договором и внести данные для договора. Заполните данные, выберите нужный пункт и введите значение\n\n`;
            var html        = text1 + text2 + text3;

            var funs = 
            {
                "1": async function() 
                {
                    var text4   = `<strong>1. Юридическая форма инвестора, как то вы будете подписывать договор</strong>`;
                    html        = html + text4;
                    var fat = await h.send_html(msg.chat.id, html, {
                        "resize_keyboard": true,
                        "keyboard": [ 
                            ['Юр.лицо', 'ИП', "Физ.лицо"],
                            ["⬅️ Назад"]
                        ],
                    });
                    _array.push(fat.message_id);

                    await User.findOneAndUpdate({user: msg.from.id}, {where: {
                        type: "investor",
                        page: {
                            global: 1,
                            more: 1,
                        },
                        msg: fat.message_id,
                        project: project,
                    }})

                    await h.MA(msg, _array);
                },
                "2": async function() 
                {    
                    startInvestingMsgSecond(msg, html);
                },
            }

            if(!more) {
                funs["1"]();
            } else {
                funs[more]();
            }
        }
    }

    pages[num]();
}

async function goInvesting(msg)
{
    var _array      = [];
    var _User       = await User.findOne({user: msg.from.id});
    var _project    = await Project.findOne({_id: _User.putProject});

    if(!_User.putProject)
    {
        defaultMsg();
    } else 
    {
    //     var html = `Инвестор ${_User.first_name}\nВы находитесь в меню "Инвестиции в проект"`;
    //     var fat = await bot.sendMessage(msg.chat.id, toEscapeMSg(html), {
    //         parse_mode: "html",
    //         reply_markup: {  
    //             "resize_keyboard": true, 
    //             "keyboard": [
    //                 ["⬅️ Назад"]
    //             ],                                                                   
    //         }
    //     });
    //     _array.push(fat.message_id);
        
    //     var needUrl = "https://invester-relocation.site/";
    
    //     if(_project.urlLocation)
    //     {
    //         needUrl = `https://${_project.urlLocation}/`;
    //     }
    
    //     var html = `Перейдите в личный кабинет, чтобы произвести иевестицию`;
    //     var fat = await bot.sendMessage(msg.chat.id, toEscapeMSg(html), {
    //         parse_mode: "html",
    //         reply_markup: {                                                                     
    //             "inline_keyboard": [
    //                 [
    //                     {
    //                         text: 'Перейти',
    //                         url: `${needUrl}?user=${_User.id}&page=invester_data`,
    //                     },
    //                 ]
    //             ],
    //         }
    //     });
    //     _array.push(fat.message_id);
    
    //     await h.DMA(msg, _array);
    
    //     let defaultMsg = async () => {
    //         var html = `*`;
    //         var fat = await h.send_html(msg.from.id, html, {
    //             "resize_keyboard": true,
    //             "keyboard": [["⬅️ Назад"]],
    //         });
    //         _array.push(fat.message_id);
        
    //         var html = `<strong>${_User.first_name}</strong>\nВыберите инвестиционное предложение в которое хотели бы проинвестировать`;
    //         var fat = await h.send_html(msg.from.id, html, {
    //             "inline_keyboard": [
    //                 [
    //                     {
    //                         text: 'ВЫБРАТЬ ПРЕДЛОЖЕНИЕ',
    //                         url: `https://t.me/invester_official`,
    //                     }
    //                 ]
    //             ],
    //         });
    //         _array.push(fat.message_id);
        
    //         await h.DMA(msg, _array);
    //     }
    // }
        var investingBlock = await InvDoc.findOne({projectId: _User.putProject, invester: msg.from.id});

        if(!investingBlock) 
        {
            startInvestingMsg(msg, 1, _array, "1", _User.putProject);
        } else {
            if(investingBlock.receipt) {
                defaultMsg();
            } else {
                payerInvester(msg);
            }
            
        }
        
    }
}

async function my_investment(msg)
{
    var _array  = [];
    var _User   = await User.findOne({user: msg.from.id});

    var activeProjects = "🧮 Активные проекты";

    if(_User.alerts)
    {
        _User.alerts.forEach(function(el) {
            if(el.type == "acceptInvestor") activeProjects = "🧮 Активные проекты ♦️";
        });
    }

    var html = "Вы находитесь в меню:\n<strong>Мои инвестиции</strong>";
    var fat = await h.send_html(msg.chat.id, html, {
        "resize_keyboard": true,
        "keyboard": [[activeProjects, "⌛ В процессе"], ["⬅️ Назад"]],
        "one_time_keyboard": true,
    });

    _array.push(fat.message_id);

    await h.DMA(msg, _array);
}