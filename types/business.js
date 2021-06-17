const e = require("express");

var bot         = null;
var h           = null;
var User        = null;

module.exports = {
    init:function(initPlagins)
    {
        privateInit(initPlagins);
    },
    how_add,
    add_new_project,
    add_new_project_data,
    project,
    not_active,
}

function privateInit(initPlagins) {
    bot         = initPlagins.bot;
    h           = initPlagins.helper_functions;
    User        = initPlagins.User;
}

function how_add(msg)
{
    var html = "<strong>Как добавить новый проект</strong>\n\nДля того чтобы разместить свое предложение для привлечения инвестицый, необходимо заполнить заявку и прикрепить документы на данной платформе investER.\n\n Каждое предложение состоит из описания предложения, описания компании, видео презентации. Все предложения проверяются командой инвестиционной платформы investER";
    h.send_html(msg.chat.id, html, {
        "resize_keyboard": true,
        "keyboard": [["НАЗАД"]],
    });
}

function not_active(msg) {
    var html = "У вас 0 неактивных проектов\n\n<strong>Ожидают модерацию: 0</strong>\n<strong>Ожидают исправления: 0</strong>\n\nВыберите группу проектов:";
    h.send_html(msg.chat.id, html, {
        "resize_keyboard": true,
        "keyboard": [["НАЗАД"]],
    });
}

async function project(msg) 
{
    var _User           = await User.findOne({user: msg.from.id});
    var need_button     = null;

    var pages = {
        "right": async function() {
            page_need = _User.where.page + 1;
            await User.findOneAndUpdate({user: msg.from.id}, { where: 
            {
                "name": "add_new_project",
                "msg_id": _User.where.msg_id,
                "page": page_need,
                "button": 1
            }});
        },
        "left": async function() {
            page_need = _User.where.page - 1;
            await User.findOneAndUpdate({user: msg.from.id}, { where: 
            {
                "name": "add_new_project",
                "msg_id": _User.where.msg_id,
                "page": page_need,
                "button": 1
            }});
        },
        "take": async function() {
            var need_project = _User.new_project;
            need_project.organization = _User.where.button;
            await User.findOneAndUpdate({user: msg.from.id}, { new_project: need_project});
        },
        1: async function(param) {
            if(param == "down") {
                if(need_button == 8) {
                    need_button = 1;
                } else {
                    need_button = need_button + 1;
                }
            }
            if(param == "up") {
                if(need_button == 1) {
                    need_button = 8;
                } else {
                    need_button = need_button - 1;
                }
            }
            await User.findOneAndUpdate({user: msg.from.id}, { where: 
            {
                "name": "add_new_project",
                "msg_id": _User.where.msg_id,
                "page": 1,
                "button": need_button
            }});
        },
        2: async function(param) {
            if(param == "down") {
                if(need_button == 3) {
                    need_button = 1;
                } else {
                    need_button = need_button + 1;
                }
            }
            if(param == "up") {
                if(need_button == 1) {
                    need_button = 3;
                } else {
                    need_button = need_button - 1;
                }
            }
            await User.findOneAndUpdate({user: msg.from.id}, { where: 
            {
                "name": "add_new_project",
                "msg_id": _User.where.msg_id,
                "page": 2,
                "button": need_button
            }});
        },
        3: async function(param) {
            if(param == "down") {
                if(need_button == 5) {
                    need_button = 1;
                } else {
                    need_button = need_button + 1;
                }
            }
            if(param == "up") {
                if(need_button == 1) {
                    need_button = 5;
                } else {
                    need_button = need_button - 1;
                }
            }
            await User.findOneAndUpdate({user: msg.from.id}, { where: 
            {
                "name": "add_new_project",
                "msg_id": _User.where.msg_id,
                "page": 3,
                "button": need_button
            }});
        }
    }

    if(_User.where == null) 
    {
        await h.send_html(msg.chat.id,
            "<strong>Новый проект</strong>\n\nСледуйте инструкциям и отправляйте в чат нужные документы и сведения. Вы в любой момент можете вернуться и изменить любые данные.", 
            {
            "resize_keyboard": true,
            "keyboard": [["НАЗАД"]],
        });

        var need_msg = await h.send_html(msg.chat.id, "*");

        await User.findOneAndUpdate({user: msg.from.id}, { where: 
        {
            "name": "add_new_project",
            "msg_id": need_msg.message_id,
            "page": 1,
            "button": 1
        }});
        
        await add_new_project(msg);
    } else 
    {
        if(h._GET(msg.data, "button_type") == "right") 
        {
            await pages["right"]();
        }
        else if(h._GET(msg.data, "button_type") == "left") 
        {
            await pages["left"]();
        } 
        else if(h._GET(msg.data, "button_type") == "take") {
            await pages["take"]();
        } 
        else {
            var _page = _User.where.page;
            need_button = Number(h._GET(msg.data, "number"));
            await pages[_page](h._GET(msg.data, "button_type"));
        }
        
        var _User = await User.findOne({user: msg.from.id});
        var page_content = {
            1: function(data) {
                add_new_project(data)
            },
            2: function(data) {
                add_new_project_second(data);
            },
            3: function(data) {
                add_new_project_third(data);
            },
            4: function(data) {
                add_new_project_discharge(data);
            }
        }

        page_content[_User.where.page](msg);
    } 

}

async function add_new_project(callbackQuery) 
{
    var _chatId         = callbackQuery.from.id;
    var _User           = await User.findOne({user: _chatId});
    var _msgId          = _User.where.msg_id;
    var not_filled      = 0;
    var need_button     = _User.where.button;

    for (var key in _User.new_project) {
        if(_User.new_project[key] == null) not_filled = not_filled + 1;
    }

    var first_html  = `❌ Еще не заполнено пунктов: ${not_filled}\n\n`;
    var body_html   = "❗ <strong>Описание предложения</strong>\n\nЗдесь мы сформируем описание предложения для инвестора. С помощью стрелок ⬇️ и ⬆️ выберите нужный пункт и введите значение\n\n\n";

    var strong, _strong, data_put, smyle;

    if(need_button == 1) {
        strong  = "<strong>";
        _strong = "</strong>";
    } else {
        strong = "";
        _strong = "";
    }

    if(_User.new_project.name) {
        data_put = _User.new_project.name;
        smyle = "✅";
    } else {
        data_put = "[Не задано]";
        smyle = "❗";
    }

    var button1 = `${smyle} ${strong}Название проекта:${_strong} ${data_put}\n`;

    if(need_button == 2) {
        strong  = "<strong>";
        _strong = "</strong>";
    } else {
        strong = "";
        _strong = "";
    }

    if(_User.new_project.target) {
        data_put = _User.new_project.target;
        smyle = "✅";
    } else {
        data_put = "[Не задано]";
        smyle = "❗";
    }

    var button2 = `${smyle} ${strong}Цель привлечения средств:${_strong} ${data_put}\n`;

    if(need_button == 3) {
        strong  = "<strong>";
        _strong = "</strong>";
    } else {
        strong = "";
        _strong = "";
    }

    if(_User.new_project.attraction_amount) {
        data_put = _User.new_project.attraction_amount;
        smyle = "✅";
    } else {
        data_put = "[Не задано]";
        smyle = "❗";
    }

    var button3 = `${smyle} ${strong}Общая сумма привлечения:${_strong} ${data_put}\n`;

    if(need_button == 4) {
        strong  = "<strong>";
        _strong = "</strong>";
    } else {
        strong = "";
        _strong = "";
    }

    if(_User.new_project.date) {
        data_put = _User.new_project.date;
        smyle = "✅";
    } else {
        data_put = "[Не задано]";
        smyle = "❗";
    }

    var button4 = `${smyle} ${strong}Срок инвестирования:${_strong} ${data_put}\n`;

    if(need_button == 5) {
        strong  = "<strong>";
        _strong = "</strong>";
    } else {
        strong = "";
        _strong = "";
    }

    if(_User.new_project.minimal_amount) {
        data_put = _User.new_project.minimal_amount;
        smyle = "✅";
    } else {
        data_put = "[Не задано]";
        smyle = "❗";
    }

    var button5 = `${smyle} ${strong}Минимальная сумма:${_strong} ${data_put}\n`;

    if(need_button == 6) {
        strong  = "<strong>";
        _strong = "</strong>";
    } else {
        strong = "";
        _strong = "";
    }

    if(_User.new_project.rate) {
        data_put = _User.new_project.rate;
        smyle = "✅";
    } else {
        data_put = "[Не задано]";
        smyle = "❗";
    }

    var button6 = `${smyle} ${strong}Ставка % в месяц:${_strong} ${data_put}}\n`;

    if(need_button == 7) {
        strong  = "<strong>";
        _strong = "</strong>";
    } else {
        strong = "";
        _strong = "";
    }

    if(_User.new_project.date_payments) {
        data_put = _User.new_project.date_payments;
        smyle = "✅";
    } else {
        data_put = "[Не задано]";
        smyle = "❗";
    }

    var button7 = `${smyle} ${strong}Выплата процентов:${_strong} ${data_put}\n`;

    if(need_button == 8) {
        strong  = "<strong>";
        _strong = "</strong>";
    } else {
        strong = "";
        _strong = "";
    }

    if(_User.new_project.collection_period) {
        data_put = _User.new_project.collection_period;
        smyle = "✅";
    } else {
        data_put = "[Не задано]";
        smyle = "❗";
    }

    var button8 = `${smyle} ${strong}Период сбора:${_strong} ${data_put}`;

    var html = first_html + body_html + button1 + button2 + button3 + button4 + button5 + button6 + button7 + button8;

    bot.editMessageText(html, {
        chat_id: _chatId,
        message_id: _msgId,
        parse_mode: "HTML",
        reply_markup: {
            "inline_keyboard": [
                [
                    {
                        text: "⬇️",
                        callback_data: `place=new_project&button_type=down&number=${need_button}`,
                    },
                    {
                        text: "⬆️",
                        callback_data: `place=new_project&button_type=up&number=${need_button}`,
                    },
                    {
                        text: "➡️",
                        callback_data: `place=new_project&button_type=right&number=${need_button}`,
                    }
                ]
            ],
        }
    });
}

async function add_new_project_second(callbackQuery) {
    var _chatId         = callbackQuery.from.id;
    var _User           = await User.findOne({user: _chatId});
    var _msgId          = _User.where.msg_id;
    var need_button     = _User.where.button;

    var first_html  = `Выберите юридический статус лица, привлекающего инвестиции:\n\n`;
    var body_html   = `❗ С помощью стрелок ⬇️ и ⬆️ выберите нужный пункт и нажмите "Выбрать"\n\n\n`;

    var strong, _strong, smyle;

    if(need_button == 1) {
        strong  = "<strong>";
        _strong = "</strong>";
    } else {
        strong = "";
        _strong = "";
    }

    if(_User.new_project.organization == "1") {
        smyle = "✅";
    } else {
        smyle = "❗";
    }

    var button1 = `${smyle} ${strong}Юридическое лицо ООО,ОАО и т.д${_strong}\n`;

    if(need_button == 2) {
        strong  = "<strong>";
        _strong = "</strong>";
    } else {
        strong = "";
        _strong = "";
    }

    if(_User.new_project.organization == "2") {
        smyle = "✅";
    } else {
        smyle = "❗";
    }

    var button2 = `${smyle} ${strong}Индивидуальный предприниматель${_strong}\n`;

    if(need_button == 3) {
        strong  = "<strong>";
        _strong = "</strong>";
    } else {
        strong = "";
        _strong = "";
    }

    if(_User.new_project.organization == "3") {
        smyle = "✅";
    } else {
        smyle = "❗";
    }

    var button3 = `${smyle} ${strong}Физическое лицо${_strong}\n`;

    var html = first_html + body_html + button1 + button2 + button3;

    bot.editMessageText(html, {
        chat_id: _chatId,
        message_id: _msgId,
        parse_mode: "HTML",
        reply_markup: {
            "inline_keyboard": [
                [
                    {
                        text: "Выбрать",
                        callback_data: `place=new_project&button_type=take&number=${need_button}`,
                    }
                ],
                [
                    {
                        text: "⬅️",
                        callback_data: `place=new_project&button_type=left&number=${need_button}`,
                    },
                    {
                        text: "⬇️",
                        callback_data: `place=new_project&button_type=down&number=${need_button}`,
                    },
                    {
                        text: "⬆️",
                        callback_data: `place=new_project&button_type=up&number=${need_button}`,
                    },
                    {
                        text: "➡️",
                        callback_data: `place=new_project&button_type=right&number=${need_button}`,
                    }
                ]
            ],
        }
    });
}

async function add_new_project_third(callbackQuery) {
    var _chatId         = callbackQuery.from.id;
    var _User           = await User.findOne({user: _chatId});
    var _msgId          = _User.where.msg_id;
    var need_button     = _User.where.button;
    var not_filled      = 0;

    for (var key in _User.new_project) {
        if(_User.new_project[key] == null) not_filled = not_filled + 1;
    }

    var project_class = {
        1: function() 
        {
            var first_html  = `❌ Еще не заполнено пунктов: ${not_filled}\n\n`;
            var body_html   = `❗ С помощью стрелок ⬇️ и ⬆️ выберите нужный пункт и нажмите "Выбрать"\n\n\n`;
        
            var strong, _strong, smyle;

            if(need_button == 1) {
                strong  = "<strong>";
                _strong = "</strong>";
            } else {
                strong = "";
                _strong = "";
            }
        
            if(_User.new_project.name) {
                data_put = _User.new_project.name;
                smyle = "✅";
            } else {
                data_put = "[Не задано]";
                smyle = "❗";
            }
        
            var button1 = `${smyle} ${strong}Название компании:${_strong} ${data_put}\n`;
        
            if(need_button == 2) {
                strong  = "<strong>";
                _strong = "</strong>";
            } else {
                strong = "";
                _strong = "";
            }
        
            if(_User.new_project.target) {
                data_put = _User.new_project.target;
                smyle = "✅";
            } else {
                data_put = "[Не задано]";
                smyle = "❗";
            }
        
            var button2 = `${smyle} ${strong}ИНН:${_strong} ${data_put}\n`;
        
            if(need_button == 3) {
                strong  = "<strong>";
                _strong = "</strong>";
            } else {
                strong = "";
                _strong = "";
            }
        
            if(_User.new_project.attraction_amount) {
                data_put = _User.new_project.attraction_amount;
                smyle = "✅";
            } else {
                data_put = "[Не задано]";
                smyle = "❗";
            }
        
            var button3 = `${smyle} ${strong}ОГРН:${_strong} ${data_put}\n`;
        
            if(need_button == 4) {
                strong  = "<strong>";
                _strong = "</strong>";
            } else {
                strong = "";
                _strong = "";
            }
        
            if(_User.new_project.date) {
                data_put = _User.new_project.date;
                smyle = "✅";
            } else {
                data_put = "[Не задано]";
                smyle = "❗";
            }
        
            var button4 = `${smyle} ${strong}Фактический адрес:${_strong} ${data_put}\n`;
        
            if(need_button == 5) {
                strong  = "<strong>";
                _strong = "</strong>";
            } else {
                strong = "";
                _strong = "";
            }
        
            if(_User.new_project.minimal_amount) {
                data_put = _User.new_project.minimal_amount;
                smyle = "✅";
            } else {
                data_put = "[Не задано]";
                smyle = "❗";
            }
        
            var button5 = `${smyle} ${strong}Сайт:${_strong} ${data_put}\n`;

            var html = first_html + body_html + button1 + button2 + button3 + button4 + button5;
        
            bot.editMessageText(html, {
                chat_id: _chatId,
                message_id: _msgId,
                parse_mode: "HTML",
                reply_markup: {
                    "inline_keyboard": [
                        [
                            {
                                text: "⬅️",
                                callback_data: `place=new_project&button_type=left&number=${need_button}`,
                            },
                            {
                                text: "⬇️",
                                callback_data: `place=new_project&button_type=down&number=${need_button}`,
                            },
                            {
                                text: "⬆️",
                                callback_data: `place=new_project&button_type=up&number=${need_button}`,
                            },
                            {
                                text: "➡️",
                                callback_data: `place=new_project&button_type=right&number=${need_button}`,
                            }
                        ]
                    ],
                }
            });
        },
        2: function() 
        {

        }
    }

    if(_User.new_project.organization == "1" || _User.new_project.organization == "2") {
        project_class[1]();
    } else {
        project_class[2]();
    }
}

async function add_new_project_data(msg) {

    var _User = await User.findOne({user: msg.from.id}),
        _Array = _User.new_project,
        buttons = {
            1: function() {
                _Array.name = msg.text;
            },
            2: function() {
                _Array.target = msg.text;
            },
            3: function() {
                _Array.attraction_amount = msg.text;
            },
            4: function() {
                _Array.date = msg.text;
            },
            5: function() {
                _Array.minimal_amount = msg.text;
            },
            6: function() {
                _Array.rate = msg.text;
            },
            7: function() {
                _Array.date_payments = msg.text;
            },
            8: function() {
                _Array.collection_period = msg.text;
            }
        }
        
    await buttons[_User.where.button](); 
    await User.update({user: msg.from.id}, {new_project: _Array});
    add_new_project(msg);
}

async function add_new_project_discharge(callbackQuery) 
{
    var _chatId         = callbackQuery.from.id;
    var _User           = await User.findOne({user: _chatId});
    var _msgId          = _User.where.msg_id;
    var need_button     = _User.where.button;
    var not_filled      = 0;

    for (var key in _User.new_project) {
        if(_User.new_project[key] == null) not_filled = not_filled + 1;
    }

    var first_html  = `❌ Еще не заполнено пунктов: ${not_filled}\n\n`;
    var body_html   = `<strong>Выписка из банка</strong>\n\nЗагрузите вашу выписку из банка за 8 месяцев\n\nВыберите <strong>Загрузить выписку</strong>, когда будите готовы ее отправить`;


    var html = first_html + body_html

    bot.editMessageText(html, {
        chat_id: _chatId,
        message_id: _msgId,
        parse_mode: "HTML",
        reply_markup: {
            "inline_keyboard": [
                [
                    {
                        text: "Загрузить выписку",
                        callback_data: `place=new_project&button_type=left&number=${need_button}`,
                    }
                ],
                [
                    {
                        text: "⬅️",
                        callback_data: `place=new_project&button_type=left&number=${need_button}`,
                    },
                    {
                        text: "➡️",
                        callback_data: `place=new_project&button_type=right&number=${need_button}`,
                    }
                ]
            ],
        }
    });
}