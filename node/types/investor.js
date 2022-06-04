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
    startInvestingMsgOld,
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
            "keyboard": [
                ["⬅️ Hазад"]
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
    var _User       = await User.findOne({user: msg.from.id});

    if(msg.text == "Принять данные")
    {
        if(
            _User.investor_data.phone &&
            _User.investor_data.watsapp &&
            _User.investor_data.mail
        ) {
            await User.findOneAndUpdate({user: msg.from.id}, {first_parse: {
                phone: _User.investor_data.phone,
                watsapp: _User.investor_data.watsapp,
                mail: _User.investor_data.mail,
            }, investor_data: null});
            goInvesting(msg);
        };
    } else 
    {
        var _array              = _User.investor_data;
        var _Where              = _User.where;
        if(!_array) _array      = {};  
        _array[buttons_2[_User.where.page.button].id] = msg.text;
        _Where.page.button = _Where.page.button + 1;
        if(_Where.page.button == 3)
        {
            _Where.page.button = 0;
        }
        await User.findOneAndUpdate({user: msg.from.id}, {investor_data: _array, where: _Where});
        startInvestingMsgOld(msg, _User.where.page.button);

        var _User = await User.findOne({user: msg.from.id});

        if(
            _User.investor_data.phone &&
            _User.investor_data.watsapp &&
            _User.investor_data.mail
        ) {
            var _array = [];
            var html = `Если не видите меню ниже, нажмите на микшер "🎛" `;
            var fat = await h.send_html(msg.from.id, html, {
                "resize_keyboard": true,
                "keyboard": [["Принять данные"], ["⬅️ Назад"]],
            });
            _array.push(fat.message_id);
            await h.MA(msg, _array);
        }
    }
}

async function startInvestingMsgOld(msg, button, first) 
{
    var _array          = [];
    var _User           = await User.findOne({user: msg.from.id});
    var _where          = _User.where;

    if(first)
    {
        var html = `*`;
        var fat = await h.send_html(msg.from.id, html, {
            "resize_keyboard": true,
            "keyboard": [["Принять данные"], ["⬅️ Назад"]],
        });
        _array.push(fat.message_id);
    }

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

    var text1       = `Перед тем как использовать платформу вы должны\n\n`;
    var text2       = `<strong>Внести Контактные данные</strong>\n\n`;
    var html        = text1 + text2;

    var need_button = _where.page.button;

    buttons_2.forEach((element, i) => 
    {
        var strong          = '';
        var strong_second   = '';
        var dataBlock       = '[Не задано]';
        var smile           = '❌';

        if(i == need_button) {
            strong          = '\n<strong> »';
            strong_second   = '« </strong>\n';
        }

        if(_User.investor_data)
        {
            if(_User.investor_data[element.id]) {
                dataBlock = _User.investor_data[element.id];
                smile = '✅';
            }
        }

        html = html + `${strong} ${smile} ${element.name}:   ${dataBlock} ${strong_second}\n`;
    })

    if(first)
    {
        var fat = await h.send_html(msg.from.id, html, {
            "inline_keyboard": [
                [
                    {
                        text: '⬇️',
                        callback_data: `place=contact&type=button&data=${need_button + 1}`,
                    },
                    {
                        text: '⬆️',
                        callback_data: `place=contact&type=button&data=${need_button - 1}`,
                    }
                ]
            ],
        });
        _array.push(fat.message_id);

        _where.msgGoNow = fat.message_id;
        await h.DMA(msg, _array);
    } else 
    {
        await bot.editMessageText(html, {
            chat_id: msg.from.id,
            message_id: _where.msgGoNow,
            parse_mode: "html",
            reply_markup: {
                "inline_keyboard": [
                    [
                        {
                            text: '⬇️',
                            callback_data: `place=contact&type=button&data=${need_button + 1}`,
                        },
                        {
                            text: '⬆️',
                            callback_data: `place=contact&type=button&data=${need_button - 1}`,
                        }
                    ]
                ],
            }
        });
    }

    await User.findOneAndUpdate({user: msg.from.id}, {where: _where})
}

async function startInvestingMsg(msg, num, array, more, project)
{
    await User.findOneAndUpdate({user: msg.from.id}, {where: {
        type: "investor",
        page: {
            global: 1,
        },
        project: project,
    }})

    startInvestingMsgOld(msg, 1, true);
}

async function goInvesting(msg)
{
    var _array      = [];
    var _User       = await User.findOne({user: msg.from.id});
    var _project    = await Project.findOne({_id: _User.putProject});

    var defaultMsg = async () => 
    {
        var html = `*`;
        var fat = await h.send_html(msg.from.id, html, {
            "resize_keyboard": true,
            "keyboard": [["⬅️ Назад"]],
        });
        _array.push(fat.message_id);
    
        var html = `<strong>${_User.first_name}</strong>\nВыберите инвестиционное предложение в которое хотели бы проинвестировать`;
        var fat = await h.send_html(msg.from.id, html, {
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

    if(!_User.putProject)
    {
        if(typeof _User.lastProject != "undefined")
        {
            if(_User.lastProject)
            {
                var _project    = await Project.findOne({_id: _User.lastProject});

                if(typeof _User.first_parse != 'undefined')
                {
                    var html = `Инвестор ${_User.first_name}\nВы находитесь в меню "Инвестиции в проект"\n Вы уже инвестировали в этот проект, вы можете проинвестировать еще раз`;
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
                    
                    var needUrl = "https://invester-relocation.site/";

                    if(typeof _project.urlLocation != "undefined")
                    {
                        if(_project.urlLocation)
                        {
                            needUrl = `https://${_project.urlLocation}/`;
                        }
                    }
                
                    var html = `Нажмите на кнопку "Перейти", чтобы проинвестировать`;
                    var fat = await bot.sendMessage(msg.chat.id, toEscapeMSg(html), {
                        parse_mode: "html",
                        reply_markup: {                                                                     
                            "inline_keyboard": [
                                [
                                    {
                                        text: 'Перейти',
                                        url: `${needUrl}?user=${_User.id}&page=invester_data`,
                                    },
                                ]
                            ],
                        }
                    });
                    _array.push(fat.message_id);
                
                    await h.DMA(msg, _array);

                    await User.findOneAndUpdate({user: _User.user}, {lastProject: null})
                } else {
                    startInvestingMsg(msg, 1, _array, "1", _User.putProject);
                }
            } else 
            {
                defaultMsg();
            }
        } else
        {
            defaultMsg();
        }
        
    } else 
    {
        if(typeof _User.first_parse != 'undefined')
        {
            var html = `Инвестор ${_User.first_name}\nВы находитесь в меню "Инвестиции в проект"`;
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
            
            var needUrl = "https://invester-relocation.site/";
        
            if(typeof _project.urlLocation != "undefined")
            {
                if(_project.urlLocation)
                {
                    needUrl = `https://${_project.urlLocation}/`;
                }
            }
            
        
            var html = `Нажмите на кнопку "Перейти", чтобы проинвестировать`;
            var fat = await bot.sendMessage(msg.chat.id, toEscapeMSg(html), {
                parse_mode: "html",
                reply_markup: {                                                                     
                    "inline_keyboard": [
                        [
                            {
                                text: 'Перейти',
                                url: `${needUrl}?user=${_User.id}&page=invester_data`,
                            },
                        ]
                    ],
                }
            });
            _array.push(fat.message_id);
        
            await h.DMA(msg, _array);
        } else {
            startInvestingMsg(msg, 1, _array, "1", _User.putProject);
        }
    }
}

async function my_investment(msg)
{
    active_projects(msg);
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