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
    statusProjects,
    payerBonus,
    myPeoples,
    active_statistik,
    active_projects_stat,
    payerInBissness,
    payerInBissnessDocument,
    drafts,
    drafts_block,
    investShow,
}

async function investShow(msg)
{
    var _array      = [];
    var html = `Вы находитесь в меню "Инвестиционные предложения"`;
    var fat = await bot.sendMessage(msg.chat.id, html, {
        parse_mode: "HTML",
        reply_markup: {
            "resize_keyboard": true, 
            "keyboard": [["⬅️ Назад"]],
            "one_time_keyboard": true,
        }
    });
    _array.push(fat.message_id);

    var html = `<strong>${msg.from.first_name}</strong>\nВы можете ознакомится с предложениями на данной платформе.`;
    var fat = await bot.sendMessage(msg.chat.id, html, {
        parse_mode: "HTML",
        reply_markup: {
            "inline_keyboard": [
                [
                    {
                        text: "ОЗНАКОМИТСЯ С ПРЕДЛОЖЕНИЯМИ",
                        url: "https://t.me/invester_official",
                    }
                ]
            ],
        }
    });
    _array.push(fat.message_id);
    await h.DMA(msg, _array);
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
            // "keyboard": [
            //     ["⬅️ Hазад"]
            // ],    
            "keyboard": [
                [{
                    text: "⬅️ Назад"
                }]
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
                        login_url: {
                            'url': `${h.getURL()}?user=${_User.id}&page=activ_projects`,
                        },
                    },
                ]
            ],
        }
    });
    _array.push(fat.message_id);

    await h.DMA(msg, _array);

    await User.findOneAndUpdate({user: msg.from.id}, {alerts: null});
}

async function myPeoples(msg) 
{
    var _array  = [];
    var _User   = await User.findOne({user: msg.from.id});
    var buttonPush = "⬅️ Назад"; 

    if(_User.type == "investor")
    {
        if(_User.attractType == "1")
        {
            buttonPush = "⬅️ Haзaд";
        }
        else
        {
            buttonPush = "⬅️ Hазaд";
        }
    }

    var html = `Инвестор ${_User.first_name}\nВы находитесь в меню "Мной привлечено"`;
    var fat = await bot.sendMessage(msg.chat.id, toEscapeMSg(html), {
        parse_mode: "html",
        reply_markup: {  
            "resize_keyboard": true, 
            "keyboard": [
                [buttonPush]
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

async function statusProjects(msg) 
{
    var _array  = [];
    var _User   = await User.findOne({user: msg.from.id});

    var html = `Инвестор ${_User.first_name}\nВы находитесь в меню "Ожидают подтверждения"`;
    var fat = await bot.sendMessage(msg.chat.id, toEscapeMSg(html), {
        parse_mode: "html",
        reply_markup: {  
            "resize_keyboard": true, 
            "keyboard": [
                ["⬅️ Hазад"]
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
                        login_url: {
                            'url': `${h.getURL()}?user=${_User.id}&page=wait_projects`,
                        },
                    },
                ]
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

    var html = _User.first_name + '\nВы можете стать нашим партнером по привлечению инвесторов';
    var fat = await h.send_html(msg.from.id, html, {
        "resize_keyboard": true,
        "keyboard": [["📊 Привлечь инвесторов", "👔 Привлечь бизнес"], ["⬅️ Назад"]],
    });
    _array.push(fat.message_id);

    await h.DMA(msg, _array);
}

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
    var _User       = User.findOne({user: msg.from.id});
    var first_parse = {};

    if(typeof _User.first_parse != "undefined") {
        first_parse = _User.first_parse;
    };

    if(typeof msg.contact !== "undefined") {
        first_parse.phone = msg.contact.phone_number;
        await User.findOneAndUpdate({user: msg.from.id}, {first_parse: first_parse});
        await startInvestingMsg(msg);
        return;
    };
}

async function startInvestingMsg(msg)
{
    var _User       = await User.findOneAndUpdate({user: msg.from.id}, {where: {type: "investor"}});
    var first_parse = {};
    var _array      = [];

    if(typeof _User.first_parse != "undefined") {
        first_parse = _User.first_parse;
    };

    if(typeof first_parse.phone == "undefined") {
        var fat = await h.send_html(msg.from.id, `<strong>Перед использованием сервиса, оставьте контактные данные Телеграм</strong>\n\n<i>Нажимая кнопку подтвердить, вы соглашаетесь с офертой, политикой конфиденциальности и согласитесь на обработку персональных данных.</i>\n\n<i><a href="https://googl.com">Договор оферты</a>\n<a href="https://googl.com">Политика конфиденциальности</a>\n<a href="https://googl.com">Согласие на обработку персональных данных</a>\n</i>`, {
            "resize_keyboard": true,
            "keyboard": [
                [
                    {
                        text: "Подтвердить",
                        request_contact: true,
                    },
                ],
                ["⬅️ Назад"]
            ],
        });
        _array.push(fat.message_id)
        await h.DMA(msg, _array);
    } 
    else {
        var fat = await h.send_html(msg.from.id, `Инвестор ${_User.first_name}\nВы находитесь в меню "Инвестиционные предложения"`, {
            "resize_keyboard": true,
            "keyboard": [["⬅️ Назад"]],
        });
        _array.push(fat.message_id);
        var fat = await h.send_html(msg.from.id, `Перейдите и оставьте заявку`, {
            "resize_keyboard": true,
            "inline_keyboard": [
                [
                    {
                        text: "Перейти",
                        login_url: {
                            'url': `https://investir.one/?page=telegram_authorization&type=setInvestingPage&idUser=${_User._id}`,
                            'request_write_access': true,
                        }, 
                    }
                ]
            ],
        });
        _array.push(fat.message_id);
        await h.DMA(msg, _array);
    };
};

async function goInvesting(msg)
{
    var _array      = [];
    var _User       = await User.findOne({user: msg.from.id});

    var defaultMsg = async () => 
    {
        var fat = await h.send_html(msg.from.id, `*`, {
            "resize_keyboard": true,
            "keyboard": [["⬅️ Назад"]],
        });
        _array.push(fat.message_id);
    
        var fat = await h.send_html(msg.from.id, `<strong>${_User.first_name}</strong>\nВыберите инвестиционное предложение в которое хотели бы проинвестировать`, {
            "inline_keyboard": [
                [
                    {
                        text: 'ВЫБРАТЬ ПРЕДЛОЖЕНИЕ',
                        url: `https://t.me/invester_official`,
                    }
                ]
            ],
        });
        _array.push(fat.message_id);
    
        await h.DMA(msg, _array);
    }

    if(typeof _User.first_parse == 'undefined') {
        if(typeof _User.putProject != 'undefined') {
            startInvestingMsg(msg);
        } else {
            defaultMsg();
        };
    } else {
        defaultMsg();
    };
}

async function my_investment(msg)
{
    active_projects(msg)
    // var _array  = [];
    // var _User   = await User.findOne({user: msg.from.id});

    // var activeProjects = "🧮 Активные проекты";

    // if(_User.alerts)
    // {
    //     _User.alerts.forEach(function(el) {
    //         if(el.type == "acceptInvestor") activeProjects = "🧮 Активные проекты ♦️";
    //     });
    // }

    // var html = "Вы находитесь в меню:\n<strong>Мои инвестиции</strong>";
    // var fat = await h.send_html(msg.chat.id, html, {
    //     "resize_keyboard": true,
    //     "keyboard": [[activeProjects, "⌛ Ожидают подтверждения"], ["⬅️ Назад"]],
    //     "one_time_keyboard": true,
    // });

    // _array.push(fat.message_id);

    // await h.DMA(msg, _array);
}