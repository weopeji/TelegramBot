var bot         = null;
var h           = null;
var User        = null;
var https       = null;
var config      = null;
var _data       = null;
var Project     = null;

module.exports = {
    init:function(initPlagins)
    {
        privateInit(initPlagins);
    },
    how_add,
    add_new_project_data,
    not_active,
    active,
    addProject,
    clean_project,
    put_project,
}

function privateInit(initPlagins) {
    bot         = initPlagins.bot;
    h           = initPlagins.helper_functions;
    User        = initPlagins.User;
    fs          = initPlagins.fs;
    https       = initPlagins.https;
    config      = initPlagins.config;
    _data       = initPlagins._data;
    Project     = initPlagins.Project;
}

function how_add(msg)
{
    const stream = fs.createReadStream('assets/videos/video.mp4');
    bot.sendVideo(msg.chat.id, stream, {
        reply_markup: {
            "resize_keyboard": true,
            "keyboard": [["⬅️ Назад"]],
            "one_time_keyboard": true,
        }
    });
}

async function not_active(msg) 
{
    var _projects   = await Project.find({user: msg.from.id});
    var _moderation = _projects.filter(el => el.type == "moderation");
    var _correction = _projects.filter(el => el.type == "correction");

    var html = `У вас ${_moderation.length + _correction.length} неактивных проектов\n\n<strong>Ожидают модерацию: ${_moderation.length}</strong>\n<strong>Ожидают исправления: ${_correction.length}</strong>\n\nВыберите группу проектов:`;
    h.send_html(msg.chat.id, html, {
        "resize_keyboard": true,
        "keyboard": [
            ["⬅️ Назад"]
        ],
    });
};

async function active(msg) 
{
    var _projects   = await Project.find({user: msg.from.id});
    var _active     = _projects.filter(el => el.type == "active");

    var html = `У вас ${_active.length} активных проектов\n\nВы можете вернутьсь назад и добавьте проект`;
    h.send_html(msg.chat.id, html, {
        "resize_keyboard": true,
        "keyboard": [
            ["Получение денег от инвестора", "Выплаты"],
            ["Статистика","⬅️ Назад"]
        ],
    });

}

async function clean_project(msg) {
    await User.findOneAndUpdate({user: msg.from.id}, {new_project: _data.new_project});
    var html = "🧹 Проект очищен, вернитесь назад";
    h.send_html(msg.chat.id, html, {
        "resize_keyboard": true,
        "keyboard": [["⬅️ Назад"]],
    });
}

async function put_project(msg) {
    var _User       = await h._User(msg);
    var _project    = await Project.create({
        user: msg.from.id,
        type: "moderation",
        data: _User.new_project,
    });
    await User.findOneAndUpdate({user: msg.from.id}, {new_project: _data.new_project});
    var html = "🔶 Проект успешно отправлен намодерацию, Вы получите уведомление о ее результатах\n\nВернитесь <strong>назад</strong>";
    h.send_html(msg.chat.id, html, {
        "resize_keyboard": true,
        "keyboard": [["⬅️ Назад"]],
    });

    reportProject(_project);
}

function reportProject(project) {
    var html = `Проект ${project.data[1].name}\n\nДоступен для инвестирования`;
    var _url = `https://t.me/TestTalegrammBot?start=project_${project._id}`;
    h.send_html(config._idChannel, html, {
        "inline_keyboard": [
            [
                {
                    text: "Инвестровать",
                    url: _url,
                }
            ]
        ],
    })
}

async function addProject(msg) 
{
    var html = `Вам нужно заполнить данные, чтобы создать проект, нажмите кнопку "Заполнить данные", чтобы продолжить когда будите готовы`;
    var _url = `${config.host_url}html/project/creating/#${msg.from.id}`;

    h.send_html(msg.from.id, html, {
        "inline_keyboard": [
            [
                {
                    text: "Заполнить данные",
                    url: _url
                }
            ]
        ],
    });

    // var _User           = await h._User(msg);

    // var need_button     = null;
    // var need_button_key = [8, 3, 5];

    // var _BT_Funs = {
    //     "right": async function() 
    //     {
    //         page_need = _User.where.page + 1;
    //         if(_User.new_project[2].organization != 1) {
    //             if(page_need == 5) {
    //                 page_need = page_need + 3;
    //             }
    //         }
    //         await h.R_Where(msg, {
    //             name: "add_new_project",
    //             msg_id: _User.where.msg_id,
    //             page: page_need,
    //             button: 1
    //         });
    //     },
    //     "left": async function() 
    //     {
    //         page_need = _User.where.page - 1;
    //         if(_User.new_project[2].organization != 1) {
    //             if(page_need == 7) {
    //                 page_need = page_need - 3;
    //             }
    //         }
    //         await h.R_Where(msg, {
    //             name: "add_new_project",
    //             msg_id: _User.where.msg_id,
    //             page: page_need,
    //             button: 1
    //         });
    //     },
    //     "down": async function() 
    //     {
    //         need_button     = Number(h._GET(msg.data, "number"));
    //         if(need_button == need_button_key[_User.where.page - 1]) {
    //             need_button = 1;
    //         } else {
    //             need_button = need_button + 1;
    //         }
    //         await h.R_Where(msg, {
    //             name: "add_new_project",
    //             msg_id: _User.where.msg_id,
    //             page: _User.where.page,
    //             button: need_button
    //         });
    //     },
    //     "up": async function() 
    //     {
    //         need_button     = Number(h._GET(msg.data, "number"));
    //         if(need_button == 1) {
    //             need_button = need_button_key[_User.where.page - 1];
    //         } else {
    //             need_button = need_button - 1;
    //         }
    //         await h.R_Where(msg, {
    //             name: "add_new_project",
    //             msg_id: _User.where.msg_id,
    //             page: _User.where.page,
    //             button: need_button
    //         });
    //     },
    //     "take": async function() 
    //     {
    //         var _Array = _User.new_project;
    //         _Array[2].organization = _User.where.button;
    //         await User.updateOne({user: msg.from.id}, {new_project: _Array});
    //     }
    // }

    // if(_User.where == null) 
    // {
    //     await h.send_html(msg.chat.id,
    //         "<strong>Новый проект</strong>\n\nСледуйте инструкциям и отправляйте в чат нужные документы и сведения. Вы в любой момент можете вернуться и изменить любые данные.", 
    //         {
    //         "resize_keyboard": true,
    //         "keyboard": [
    //             ["🧹 Очистить проект", "✅ Подать на модерацию"],
    //             ["⬅️ Назад"]
    //         ],
    //     });

    //     var need_msg = await h.send_html(msg.chat.id, "Загрузка...");

    //     await h.R_Where(msg, {
    //         name: "add_new_project",
    //         msg_id: need_msg.message_id,
    //         page: 1,
    //         button: 1
    //     });

    // } else 
    // {
    //     if(h._GET(msg.data, "button_type")) {
    //         await _BT_Funs[h._GET(msg.data, "button_type")]();
    //     };
    // }

    // var _User = await h._User(msg);

    // projects_pages[_User.where.page](msg);
}

async function add_new_project_data(msg) {

    var _User       = await h._User(msg);
    var _Array      = _User.new_project;

    var buttons = {
        1: {
            1: function() {
                _Array[1].name = msg.text;
            },
            2: function() {
                _Array[1].target = msg.text;
            },
            3: function() {
                _Array[1].attraction_amount = msg.text;
            },
            4: function() {
                _Array[1].date = msg.text;
            },
            5: function() {
                _Array[1].minimal_amount = msg.text;
            },
            6: function() {
                _Array[1].rate = msg.text;
            },
            7: function() {
                _Array[1].date_payments = msg.text;
            },
            8: function() {
                _Array[1].collection_period = msg.text;
            }
        },
        3: {
            1: {
                1: function() {
                    _Array[3][1].name = msg.text;
                },
                2: function() {
                    _Array[3][1].inn = msg.text;
                },
                3: function() {
                    _Array[3][1].ogrn = msg.text;
                },
                4: function() {
                    _Array[3][1].addr = msg.text;
                },
                5: function() {
                    _Array[3][1].syte = msg.text;
                }
            },
            2: {
                1: function() {
                    _Array[3][2].registration = msg.text;
                },
                2: function() {
                    _Array[3][2].region = msg.text;
                },
                3: function() {
                    _Array[3][2].activity = msg.text;
                },
            }
        },
        4: {
            1: async function() {
                var _file = await bot.getFile(msg.document.file_id);
                var _patch = msg.document.mime_type.split('/')[1];
                var file = fs.createWriteStream("../users/"+msg.from.id+"/discharge."+_patch);
                var _url = `https://api.telegram.org/file/bot${config.token}/${_file.file_path}`;
                console.log(_url);
                var request = https.get(_url, function(response) {
                    response.pipe(file);
                });
                _Array[4].file_url = `discharge.${_patch}`;
            }
        },
        5: {
            1: async function() {
                var _file = await bot.getFile(msg.document.file_id);
                var _patch = msg.document.mime_type.split('/')[1];
                var file = fs.createWriteStream("../users/"+msg.from.id+"/discharge2."+_patch);
                var _url = `https://api.telegram.org/file/bot${config.token}/${_file.file_path}`;
                var request = https.get(_url, function(response) {
                    response.pipe(file);
                });
                _Array[5].file_url = `discharge2.${_patch}`;
            }
        },
        6: {
            1: async function() {
                var _file = await bot.getFile(msg.document.file_id);
                var _patch = msg.document.mime_type.split('/')[1];
                var file = fs.createWriteStream("../users/"+msg.from.id+"/discharge3."+_patch);
                var _url = `https://api.telegram.org/file/bot${config.token}/${_file.file_path}`;
                var request = https.get(_url, function(response) {
                    response.pipe(file);
                });
                _Array[6].file_url = `discharge3.${_patch}`;
            }
        },
        7: {
            1: async function() {
                var _file = await bot.getFile(msg.document.file_id);
                var _patch = msg.document.mime_type.split('/')[1];
                var file = fs.createWriteStream("../users/"+msg.from.id+"/discharge4."+_patch);
                var _url = `https://api.telegram.org/file/bot${config.token}/${_file.file_path}`;
                var request = https.get(_url, function(response) {
                    response.pipe(file);
                });
                _Array[7].file_url = `discharge4.${_patch}`;
            }
        },
        8: {
            1: async function() {
                var _file = await bot.getFile(msg.document.file_id);
                var _patch = msg.document.mime_type.split('/')[1];
                var file = fs.createWriteStream("../users/"+msg.from.id+"/discharge5."+_patch);
                var _url = `https://api.telegram.org/file/bot${config.token}/${_file.file_path}`;
                var request = https.get(_url, function(response) {
                    response.pipe(file);
                });
                _Array[8].file_url = `discharge5.${_patch}`;
            }
        }
    }
        
    if(_User.where.page == 3) {
        var _organization = _User.new_project[2].organization;
        if(_organization == 1 || _organization == 2) {
            await buttons[_User.where.page][1][_User.where.button](); 
        } else {
            await buttons[_User.where.page][2][_User.where.button](); 
        }
    } else {
        await buttons[_User.where.page][_User.where.button](); 
    }
    await User.updateOne({user: msg.from.id}, {new_project: _Array});

    projects_pages[_User.where.page](msg);
}

async function notFilled(msg) 
{
    var _User       = await h._User(msg);
    var data        = [];

    var _block = Object.values(_User.new_project[1]).indexOf(null);
    if(_block != -1) data.push(1);
    var _block = Object.values(_User.new_project[2]).indexOf(null);
    if(_block != -1) data.push(2);

    if(_User.new_project[2].organization == "1" || _User.new_project[2].organization == "2") {
        var _block = Object.values(_User.new_project[3][1]).indexOf(null);
        if(_block != -1) data.push(3);
    } else {
        var _block = Object.values(_User.new_project[3][2]).indexOf(null);
        if(_block != -1) data.push(3);
    }

    var _block = Object.values(_User.new_project[4]).indexOf(null);
    if(_block != -1) data.push(4);

    var _block = Object.values(_User.new_project[8]).indexOf(null);
    if(_block != -1) data.push(5);


    
    
    var needStr = "";

    data.forEach(element => {
        needStr = needStr + String(element + ", ");
    });

    return needStr.substring(0, needStr.length - 2);
}

var projects_pages = 
{
    1: async function(callbackQuery) // 1 ================================================================
    {
        
        var _chatId         = callbackQuery.from.id;
        var _User           = await User.findOne({user: _chatId});
        var _msgId          = _User.where.msg_id;
        var need_button     = _User.where.button;
    
    
        var first_html  = `❌ Еще не заполнены пункты: ${await notFilled(callbackQuery)}\n\n`;

        var _err = false;

        for (var key in _User.new_project[1]) {
            if(!_User.new_project[1][key]) _err = true;
        }

        var _smile = "❗";
        if(!_err) {
            _smile = "✅";
        }

        var body_html   = `${_smile} <strong>1. Описание предложения</strong>\n\nЗдесь мы сформируем описание предложения для инвестора. С помощью стрелок ⬇️ и ⬆️ выберите нужный пункт и введите значение\n\n\n`;
    
        var strong, _strong, data_put, smyle, _info;
    
        if(need_button == 1) {
            strong  = "<strong>";
            _strong = "</strong>";
            _info   = "      <em>[Введите название проекта латинскими буквами]</em>\n\n";
        } else {
            strong  = "";
            _strong = "";
            _info   = "";
        }
    
        if(_User.new_project[1].name) {
            data_put = _User.new_project[1].name;
            smyle = "✅";
        } else {
            data_put = "[Не задано]";
            smyle = "❗";
        }
    
        var button1 = `${smyle} ${strong}Название проекта:${_strong} ${data_put}\n${_info}`;
    
        if(need_button == 2) {
            strong  = "<strong>";
            _strong = "</strong>";
            _info   = "      <em>[Введите название проекта латинскими буквами]</em>\n\n";
        } else {
            strong  = "";
            _strong = "";
            _info   = "";
        }
    
        if(_User.new_project[1].target) {
            data_put = _User.new_project[1].target;
            smyle = "✅";
        } else {
            data_put = "[Не задано]";
            smyle = "❗";
        }
    
        var button2 = `${smyle} ${strong}Цель привлечения средств:${_strong} ${data_put}\n${_info}`;
    
        if(need_button == 3) {
            strong  = "<strong>";
            _strong = "</strong>";
            _info   = "      <em>[Введите целое значение суммы в рублях]</em>\n\n";
        } else {
            strong  = "";
            _strong = "";
            _info   = "";
        }
    
        if(_User.new_project[1].attraction_amount) {
            data_put = _User.new_project[1].attraction_amount;
            smyle = "✅";
        } else {
            data_put = "[Не задано]";
            smyle = "❗";
        }
    
        var button3 = `${smyle} ${strong}Общая сумма привлечения:${_strong} ${data_put}\n${_info}`;
    
        if(need_button == 4) {
            strong  = "<strong>";
            _strong = "</strong>";
            _info   = "      <em>[Укажите целое количество месяцев]</em>\n\n";
        } else {
            strong  = "";
            _strong = "";
            _info   = "";
        }
    
        if(_User.new_project[1].date) {
            data_put = _User.new_project[1].date;
            smyle = "✅";
        } else {
            data_put = "[Не задано]";
            smyle = "❗";
        }
    
        var button4 = `${smyle} ${strong}Срок инвестирования:${_strong} ${data_put}\n${_info}`;
    
        if(need_button == 5) {
            strong  = "<strong>";
            _strong = "</strong>";
            _info   = "      <em>[Введите целое значение суммы в рублях (от 50000)]</em>\n\n";
        } else {
            strong  = "";
            _strong = "";
            _info   = "";
        }
    
        if(_User.new_project[1].minimal_amount) {
            data_put = _User.new_project[1].minimal_amount;
            smyle = "✅";
        } else {
            data_put = "[Не задано]";
            smyle = "❗";
        }
    
        var button5 = `${smyle} ${strong}Минимальная сумма:${_strong} ${data_put}\n${_info}`;
    
        if(need_button == 6) {
            strong  = "<strong>";
            _strong = "</strong>";
            _info   = "      <em>[Введите целое или дробное значение в формате 1.15]</em>\n\n";
        } else {
            strong  = "";
            _strong = "";
            _info   = "";
        }
    
        if(_User.new_project[1].rate) {
            data_put = _User.new_project[1].rate;
            smyle = "✅";
        } else {
            data_put = "[Не задано]";
            smyle = "❗";
        }
    
        var button6 = `${smyle} ${strong}Ставка % в месяц:${_strong} ${data_put}\n${_info}`;
    
        if(need_button == 7) {
            strong  = "<strong>";
            _strong = "</strong>";
            _info   = "      <em>[Ежедневно, Ежемесячно, Ежеквартально, Ежегодно]</em>\n\n";
        } else {
            strong  = "";
            _strong = "";
            _info   = "";
        }
    
        if(_User.new_project[1].date_payments) {
            data_put = _User.new_project[1].date_payments;
            smyle = "✅";
        } else {
            data_put = "[Не задано]";
            smyle = "❗";
        }
    
        var button7 = `${smyle} ${strong}Выплата процентов:${_strong} ${data_put}\n${_info}`;
    
        if(need_button == 8) {
            strong  = "<strong>";
            _strong = "</strong>";
            _info   = "      <em>[Укажите целое количество месяцев либо Бессрочно]</em>\n\n";
        } else {
            strong  = "";
            _strong = "";
            _info   = "";
        }
    
        if(_User.new_project[1].collection_period) {
            data_put = _User.new_project[1].collection_period;
            smyle = "✅";
        } else {
            data_put = "[Не задано]";
            smyle = "❗";
        }
    
        var button8 = `${smyle} ${strong}Период сбора:${_strong} ${data_put}\n${_info}`;
    
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
    },
    2: async function(callbackQuery) // 2 ================================================================
    {
        var _chatId         = callbackQuery.from.id;
        var _User           = await User.findOne({user: _chatId});
        var _msgId          = _User.where.msg_id;
        var need_button     = _User.where.button;

        var first_html  = `Выберите юридический статус лица, привлекающего инвестиции:\n\n`;
        var body_html   = `✅ <strong>2. Тип собственника</strong>\n\nС помощью стрелок ⬇️ и ⬆️ выберите нужный пункт и нажмите "Выбрать"\n\n\n`;

        var strong, _strong, smyle;

        if(need_button == 1) {
            strong  = "<strong>";
            _strong = "</strong>";
        } else {
            strong = "";
            _strong = "";
        }

        if(_User.new_project[2].organization == "1") {
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

        if(_User.new_project[2].organization == "2") {
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

        if(_User.new_project[2].organization == "3") {
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
    },
    3: async function(callbackQuery) // 3 ================================================================ 
    {
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
                var _err = false;

                for (var key in _User.new_project[3][1]) {
                    if(!_User.new_project[3][1][key]) _err = true;
                }

                var _smile = "❗";
                if(!_err) {
                    _smile = "✅";
                }

                var first_html  = `❌ Еще не заполнено пунктов: ${not_filled}\n\n`;
                var body_html   = `${_smile} <strong>3. Данные о компании</strong>\n\nЗдесь мы сформируем данные о компании. С помощью стрелок ⬇️ и ⬆️ выберите нужный пункт и введите значение\n\n\n`;
            
                var strong, _strong, smyle;

                if(need_button == 1) {
                    strong  = "<strong>";
                    _strong = "</strong>";
                } else {
                    strong = "";
                    _strong = "";
                }
            
                if(_User.new_project[3][1].name) {
                    data_put = _User.new_project[3][1].name;
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
            
                if(_User.new_project[3][1].inn) {
                    data_put = _User.new_project[3][1].inn;
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
            
                if(_User.new_project[3][1].ogrn) {
                    data_put = _User.new_project[3][1].ogrn;
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
            
                if(_User.new_project[3][1].addr) {
                    data_put = _User.new_project[3][1].addr;
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
            
                if(_User.new_project[3][1].syte) {
                    data_put = _User.new_project[3][1].syte;
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
                var _err = false;

                for (var key in _User.new_project[3][2]) {
                    if(!_User.new_project[3][2][key]) _err = true;
                }

                var _smile = "❗";
                if(!_err) {
                    _smile = "✅";
                }

                var first_html  = `❌ Еще не заполнено пунктов: ${not_filled}\n\n`;
                var body_html   = `${_smile} <strong>3. Данные о компании (физ. лицо)</strong>\n\nЗдесь мы сформируем данные о компании. С помощью стрелок ⬇️ и ⬆️ выберите нужный пункт и введите значение\n\n\n`;
            
                var strong, _strong, smyle;

                if(need_button == 1) {
                    strong  = "<strong>";
                    _strong = "</strong>";
                } else {
                    strong = "";
                    _strong = "";
                }
            
                if(_User.new_project[3][2].registration) {
                    data_put = _User.new_project[3][2].registration;
                    smyle = "✅";
                } else {
                    data_put = "[Не задано]";
                    smyle = "❗";
                }
            
                var button1 = `${smyle} ${strong}Прописка как в паспорте:${_strong} ${data_put}\n`;
            
                if(need_button == 2) {
                    strong  = "<strong>";
                    _strong = "</strong>";
                } else {
                    strong = "";
                    _strong = "";
                }
            
                if(_User.new_project[3][2].region) {
                    data_put = _User.new_project[3][2].region;
                    smyle = "✅";
                } else {
                    data_put = "[Не задано]";
                    smyle = "❗";
                }
            
                var button2 = `${smyle} ${strong}Регион согласно паспорту:${_strong} ${data_put}\n`;
            
                if(need_button == 3) {
                    strong  = "<strong>";
                    _strong = "</strong>";
                } else {
                    strong = "";
                    _strong = "";
                }
            
                if(_User.new_project[3][2].activity) {
                    data_put = _User.new_project[3][2].activity;
                    smyle = "✅";
                } else {
                    data_put = "[Не задано]";
                    smyle = "❗";
                }
            
                var button3 = `${smyle} ${strong}Основанная деятельность:${_strong} ${data_put}\n`;

                var html = first_html + body_html + button1 + button2 + button3;
            
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
            }
        }

        if(_User.new_project[2].organization == "1" || _User.new_project[2].organization == "2") {
            project_class[1]();
        } else {
            project_class[2]();
        }
    },
    4: async function(callbackQuery) // 4 =============================================================================
    {
        var _chatId         = callbackQuery.from.id;
        var _User           = await User.findOne({user: _chatId});
        var _msgId          = _User.where.msg_id;
        var need_button     = _User.where.button;
        var not_filled      = 0;
    
        for (var key in _User.new_project) {
            if(_User.new_project[key] == null) not_filled = not_filled + 1;
        }

    
        var first_html      = `❌ Еще не заполнено пунктов: ${not_filled}\n\n`;

        var body_html       = `<strong>4. Выписка из банка</strong>\n\nЗагрузите вашу выписку из банка за 8 месяцев\n\nВыберите файл и <strong>Загрузить выписку</strong>, когда будите готовы`;
        var body_html_ok    = `<strong>4. Выписка из банка</strong>\n\nЗагрузите вашу выписку из банка за 8 месяцев\n\n📃 <strong>Выписка загружена</strong>\n\nДля управления файлом нажмите <strong>Посмотреть мою выписку</strong> или <strong>Удалить мою выписку</strong>`;
        var need_board;

        var document_url = `${config.host_url}users/${_chatId}/discharge.pdf`;

        if(_User.new_project[4].file_url) 
        {
            need_body_html = body_html_ok;
            need_board = [
                [
                    {
                        text: "🔍 Посмотреть мою выписку",
                        url: document_url,
                    }
                ],
                [
                    {
                        text: "❌ Удалить выписку",
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
            ];
        } else 
        {
            need_body_html = body_html;
            need_board = [[
                {
                    text: "⬅️",
                    callback_data: `place=new_project&button_type=left&number=${need_button}`,
                },
                {
                    text: "➡️",
                    callback_data: `place=new_project&button_type=right&number=${need_button}`,
                }
            ]];
        }
        
        var html = first_html + need_body_html;
    
        bot.editMessageText(html, {
            chat_id: _chatId,
            message_id: _msgId,
            parse_mode: "HTML",
            reply_markup: {
                "inline_keyboard": need_board,
            }
        });
    },
    5: async function(callbackQuery) // 5 =====================================================================
    {
        var _chatId         = callbackQuery.from.id;
        var _User           = await User.findOne({user: _chatId});
        var _msgId          = _User.where.msg_id;
        var need_button     = _User.where.button;
        var not_filled      = 0;
    
        for (var key in _User.new_project) {
            if(_User.new_project[key] == null) not_filled = not_filled + 1;
        }

    
        var first_html      = `❌ Еще не заполнено пунктов: ${not_filled}\n\n`;
        var body_html       = `<strong>Отчет о прибылях</strong>\n\nЗагрузите отчет о прибылях и убытках не менее чем за последние 6 месяцев.\n\nВыберите файл и <strong>Загрузить отчет</strong>, когда будите готовы`;
        var body_html_ok    = `<strong>Отчет о прибылях</strong>\n\nЗагрузите отчет о прибылях и убытках не менее чем за последние 6 месяцев.\n\n📃 <strong>Отчет загружен</strong>\n\nДля управления файлом нажмите <strong>Посмотреть мою выписку</strong> или <strong>Удалить мою выписку</strong>`;
        var need_board;

        var document_url = `${config.host_url}users/${_chatId}/discharge2.pdf`;

        if(_User.new_project[5].file_url) 
        {
            need_body_html = body_html_ok;
            need_board = [
                [
                    {
                        text: "🔍 Посмотреть мою отчет",
                        url: document_url,
                    }
                ],
                [
                    {
                        text: "❌ Удалить выписку",
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
            ];
        } else 
        {
            need_body_html = body_html;
            need_board = [[
                {
                    text: "⬅️",
                    callback_data: `place=new_project&button_type=left&number=${need_button}`,
                },
                {
                    text: "➡️",
                    callback_data: `place=new_project&button_type=right&number=${need_button}`,
                }
            ]];
        }
        
        var html = first_html + need_body_html;
    
        bot.editMessageText(html, {
            chat_id: _chatId,
            message_id: _msgId,
            parse_mode: "HTML",
            reply_markup: {
                "inline_keyboard": need_board,
            }
        });
    },
    6: async function(callbackQuery) // 6 =====================================================================
    {
        var _chatId         = callbackQuery.from.id;
        var _User           = await User.findOne({user: _chatId});
        var _msgId          = _User.where.msg_id;
        var need_button     = _User.where.button;
        var not_filled      = 0;
    
        for (var key in _User.new_project) {
            if(_User.new_project[key] == null) not_filled = not_filled + 1;
        }

    
        var first_html      = `❌ Еще не заполнено пунктов: ${not_filled}\n\n`;
        var body_html       = `<strong>Отчет о прибылях</strong>\n\nЗагрузите отчет о движении денежных средств не менее чем за последние 6 месяцев.\n\nВыберите файл и <strong>Загрузить отчет</strong>, когда будите готовы`;
        var body_html_ok    = `<strong>Отчет о движениях</strong>\n\nЗагрузите отчет о движении денежных средств не менее чем за последние 6 месяцев.\n\n📃 <strong>Отчет загружена</strong>\n\nДля управления файлом нажмите <strong>Посмотреть мою выписку</strong> или <strong>Удалить мою выписку</strong>`;
        var need_board;

        var document_url = `${config.host_url}users/${_chatId}/discharge3.pdf`;

        if(_User.new_project[6].file_url) 
        {
            need_body_html = body_html_ok;
            need_board = [
                [
                    {
                        text: "🔍 Посмотреть мою отчет",
                        url: document_url,
                    }
                ],
                [
                    {
                        text: "❌ Удалить выписку",
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
            ];
        } else 
        {
            need_body_html = body_html;
            need_board = [[
                {
                    text: "⬅️",
                    callback_data: `place=new_project&button_type=left&number=${need_button}`,
                },
                {
                    text: "➡️",
                    callback_data: `place=new_project&button_type=right&number=${need_button}`,
                }
            ]];
        }
        
        var html = first_html + need_body_html;
    
        bot.editMessageText(html, {
            chat_id: _chatId,
            message_id: _msgId,
            parse_mode: "HTML",
            reply_markup: {
                "inline_keyboard": need_board,
            }
        });
    },
    7: async function(callbackQuery) // 7 =====================================================================
    {
        var _chatId         = callbackQuery.from.id;
        var _User           = await User.findOne({user: _chatId});
        var _msgId          = _User.where.msg_id;
        var need_button     = _User.where.button;
        var not_filled      = 0;
    
        for (var key in _User.new_project) {
            if(_User.new_project[key] == null) not_filled = not_filled + 1;
        }

    
        var first_html      = `❌ Еще не заполнено пунктов: ${not_filled}\n\n`;
        var body_html       = `<strong>бухгалтерский баланс</strong>\n\nЗагрузите бухгалтерский баланс не старше 2 недель \n\nВыберите файл и <strong>Загрузить отчет</strong>, когда будите готовы`;
        var body_html_ok    = `<strong>бухгалтерский баланс</strong>\n\nЗагрузите бухгалтерский баланс не старше 2 недель \n\n📃 <strong>Отчет загружена</strong>\n\nДля управления файлом нажмите <strong>Посмотреть мою выписку</strong> или <strong>Удалить мою выписку</strong>`;
        var need_board;

        var document_url = `${config.host_url}users/${_chatId}/discharge4.pdf`;

        if(_User.new_project[7].file_url) 
        {
            need_body_html = body_html_ok;
            need_board = [
                [
                    {
                        text: "🔍 Посмотреть мою отчет",
                        url: document_url,
                    }
                ],
                [
                    {
                        text: "❌ Удалить выписку",
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
            ];
        } else 
        {
            need_body_html = body_html;
            need_board = [[
                {
                    text: "⬅️",
                    callback_data: `place=new_project&button_type=left&number=${need_button}`,
                },
                {
                    text: "➡️",
                    callback_data: `place=new_project&button_type=right&number=${need_button}`,
                }
            ]];
        }
        
        var html = first_html + need_body_html;
    
        bot.editMessageText(html, {
            chat_id: _chatId,
            message_id: _msgId,
            parse_mode: "HTML",
            reply_markup: {
                "inline_keyboard": need_board,
            }
        });
    },
    8: async function(callbackQuery) // 8 =================================================================================
    {
        var _chatId         = callbackQuery.from.id;
        var _User           = await User.findOne({user: _chatId});
        var _msgId          = _User.where.msg_id;
        var need_button     = _User.where.button;
        var not_filled      = 0;

        for (var key in _User.new_project) {
            if(_User.new_project[key] == null) not_filled = not_filled + 1;
        }

    
        var first_html      = `❌ Еще не заполнено пунктов: ${not_filled}\n\n`;
        var body_html       = `<strong>5. Скан паспорта</strong>\n\nЗагрузите скан паспорта всех страниц одним файлом в формате PDF\n\n<strong>Загрузите файл</strong>, когда будите готовы`;
        var body_html_ok    = `<strong>5. Скан паспорта</strong>\n\nЗагрузите скан паспорта всех страниц одним файлом в формате PDF\n\n📃 <strong>Файл загружен</strong>\n\nДля управления файлом нажмите <strong>Посмотреть мою выписку</strong> или <strong>Удалить мою выписку</strong>`;
        var need_board;

        var document_url = `${config.host_url}users/${_chatId}/discharge5.pdf`;

        if(_User.new_project[8].file_url) 
        {
            need_body_html = body_html_ok;
            need_board = [
                [
                    {
                        text: "🔍 Посмотреть мою отчет",
                        url: document_url,
                    }
                ],
                [
                    {
                        text: "❌ Удалить выписку",
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
            ];
        } else 
        {
            need_body_html = body_html;
            need_board = [[
                {
                    text: "⬅️",
                    callback_data: `place=new_project&button_type=left&number=${need_button}`,
                },
                {
                    text: "➡️",
                    callback_data: `place=new_project&button_type=right&number=${need_button}`,
                }
            ]];
        }
        
        var html = first_html + need_body_html;
    
        bot.editMessageText(html, {
            chat_id: _chatId,
            message_id: _msgId,
            parse_mode: "HTML",
            reply_markup: {
                "inline_keyboard": need_board,
            }
        });
    },
    9: async function(callbackQuery) { // 9 ===============================================================
        
        var _chatId         = callbackQuery.from.id;
        var _User           = await User.findOne({user: _chatId});
        var _msgId          = _User.where.msg_id;
        var need_button     = _User.where.button;
        var not_filled      = 0;

        for (var key in _User.new_project) {
            if(_User.new_project[key] == null) not_filled = not_filled + 1;
        }

        
        var first_html  = `❌ Еще не заполнено пунктов: ${not_filled}\n\n<strong>❗ 6. Контакты</strong>\n\n`;
        var body_html   = `С помощью стрелок ⬇️ и ⬆️ выберите нужный пункт и введите значение\n\n\n`;
    
        var strong, _strong, smyle;

        if(need_button == 1) {
            strong  = "<strong>";
            _strong = "</strong>";
        } else {
            strong = "";
            _strong = "";
        }
    
        if(_User.new_project[3][1].name) {
            data_put = _User.new_project[3][1].name;
            smyle = "✅";
        } else {
            data_put = "[Не задано]";
            smyle = "❗";
        }
    
        var button1 = `${smyle} ${strong}ФИО:${_strong} ${data_put}\n`;
    
        if(need_button == 2) {
            strong  = "<strong>";
            _strong = "</strong>";
        } else {
            strong = "";
            _strong = "";
        }
    
        if(_User.new_project[3][1].inn) {
            data_put = _User.new_project[3][1].inn;
            smyle = "✅";
        } else {
            data_put = "[Не задано]";
            smyle = "❗";
        }
    
        var button2 = `${smyle} ${strong}Компания/проект:${_strong} ${data_put}\n`;
    
        if(need_button == 3) {
            strong  = "<strong>";
            _strong = "</strong>";
        } else {
            strong = "";
            _strong = "";
        }
    
        if(_User.new_project[3][1].ogrn) {
            data_put = _User.new_project[3][1].ogrn;
            smyle = "✅";
        } else {
            data_put = "[Не задано]";
            smyle = "❗";
        }
    
        var button3 = `${smyle} ${strong}Должность:${_strong} ${data_put}\n`;
    
        if(need_button == 4) {
            strong  = "<strong>";
            _strong = "</strong>";
        } else {
            strong = "";
            _strong = "";
        }
    
        if(_User.new_project[3][1].addr) {
            data_put = _User.new_project[3][1].addr;
            smyle = "✅";
        } else {
            data_put = "[Не задано]";
            smyle = "❗";
        }
    
        var button4 = `${smyle} ${strong}Телефон:${_strong} ${data_put}\n`;
    
        if(need_button == 5) {
            strong  = "<strong>";
            _strong = "</strong>";
        } else {
            strong = "";
            _strong = "";
        }
    
        if(_User.new_project[3][1].syte) {
            data_put = _User.new_project[3][1].syte;
            smyle = "✅";
        } else {
            data_put = "[Не задано]";
            smyle = "❗";
        }
    
        var button5 = `${smyle} ${strong}WhatsApp:${_strong} ${data_put}\n`;

        if(need_button == 6) {
            strong  = "<strong>";
            _strong = "</strong>";
        } else {
            strong = "";
            _strong = "";
        }
    
        if(_User.new_project[3][1].syte) {
            data_put = _User.new_project[3][1].syte;
            smyle = "✅";
        } else {
            data_put = "[Не задано]";
            smyle = "❗";
        }
    
        var button6 = `${smyle} ${strong}Email:${_strong} ${data_put}\n`;

        var html = first_html + body_html + button1 + button2 + button3 + button4 + button5 + button6;
    
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
    10: async function(callbackQuery) { // 10 ===============================================================
        var _chatId         = callbackQuery.from.id;
        var _User           = await User.findOne({user: _chatId});
        var _msgId          = _User.where.msg_id;
        var need_button     = _User.where.button;
        var not_filled      = 0;

        for (var key in _User.new_project) {
            if(_User.new_project[key] == null) not_filled = not_filled + 1;
        }

        
        var first_html  = `❌ Еще не заполнено пунктов: ${not_filled}\n\n<strong>❗ 7. Реквезиты</strong>\n\n`;
        var body_html   = `С помощью стрелок ⬇️ и ⬆️ выберите нужный пункт и введите значение\n\n\n`;
    
        var strong, _strong, smyle;

        if(need_button == 1) {
            strong  = "<strong>";
            _strong = "</strong>";
        } else {
            strong = "";
            _strong = "";
        }
    
        if(_User.new_project[3][1].name) {
            data_put = _User.new_project[3][1].name;
            smyle = "✅";
        } else {
            data_put = "[Не задано]";
            smyle = "❗";
        }
    
        var button1 = `${smyle} ${strong}Банк-получатель:${_strong} ${data_put}\n`;
    
        if(need_button == 2) {
            strong  = "<strong>";
            _strong = "</strong>";
        } else {
            strong = "";
            _strong = "";
        }
    
        if(_User.new_project[3][1].inn) {
            data_put = _User.new_project[3][1].inn;
            smyle = "✅";
        } else {
            data_put = "[Не задано]";
            smyle = "❗";
        }
    
        var button2 = `${smyle} ${strong}Корр. счет:${_strong} ${data_put}\n`;
    
        if(need_button == 3) {
            strong  = "<strong>";
            _strong = "</strong>";
        } else {
            strong = "";
            _strong = "";
        }
    
        if(_User.new_project[3][1].ogrn) {
            data_put = _User.new_project[3][1].ogrn;
            smyle = "✅";
        } else {
            data_put = "[Не задано]";
            smyle = "❗";
        }
    
        var button3 = `${smyle} ${strong}БИК:${_strong} ${data_put}\n`;
    
        if(need_button == 4) {
            strong  = "<strong>";
            _strong = "</strong>";
        } else {
            strong = "";
            _strong = "";
        }
    
        if(_User.new_project[3][1].addr) {
            data_put = _User.new_project[3][1].addr;
            smyle = "✅";
        } else {
            data_put = "[Не задано]";
            smyle = "❗";
        }
    
        var button4 = `${smyle} ${strong}Получатель:${_strong} ${data_put}\n`;
    
        if(need_button == 5) {
            strong  = "<strong>";
            _strong = "</strong>";
        } else {
            strong = "";
            _strong = "";
        }
    
        if(_User.new_project[3][1].syte) {
            data_put = _User.new_project[3][1].syte;
            smyle = "✅";
        } else {
            data_put = "[Не задано]";
            smyle = "❗";
        }
    
        var button5 = `${smyle} ${strong}Счет получателя:${_strong} ${data_put}\n`;

        if(need_button == 6) {
            strong  = "<strong>";
            _strong = "</strong>";
        } else {
            strong = "";
            _strong = "";
        }
    
        if(_User.new_project[3][1].syte) {
            data_put = _User.new_project[3][1].syte;
            smyle = "✅";
        } else {
            data_put = "[Не задано]";
            smyle = "❗";
        }
    
        var button6 = `${smyle} ${strong}Назначение платежа:${_strong} ${data_put}\n`;

        if(need_button == 7) {
            strong  = "<strong>";
            _strong = "</strong>";
        } else {
            strong = "";
            _strong = "";
        }
    
        if(_User.new_project[3][1].syte) {
            data_put = _User.new_project[3][1].syte;
            smyle = "✅";
        } else {
            data_put = "[Не задано]";
            smyle = "❗";
        }
    
        var button7 = `${smyle} ${strong}ИНН:${_strong} ${data_put}\n`;

        if(need_button == 8) {
            strong  = "<strong>";
            _strong = "</strong>";
        } else {
            strong = "";
            _strong = "";
        }
    
        if(_User.new_project[3][1].syte) {
            data_put = _User.new_project[3][1].syte;
            smyle = "✅";
        } else {
            data_put = "[Не задано]";
            smyle = "❗";
        }
    
        var button8 = `${smyle} ${strong}КПП:${_strong} ${data_put}\n`;

        var html = first_html + body_html + button1 + button2 + button3 + button4 + button5 + button6 + button7 + button8;
    
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
    11: async function(callbackQuery) { // 11 ================================================================
        var _chatId         = callbackQuery.from.id;
        var _User           = await User.findOne({user: _chatId});
        var _msgId          = _User.where.msg_id;
        var need_button     = _User.where.button;
        var not_filled      = 0;

        for (var key in _User.new_project) {
            if(_User.new_project[key] == null) not_filled = not_filled + 1;
        }
    
        var first_html      = `❌ Еще не заполнено пунктов: ${not_filled}\n\n`;
        var body_html       = `<strong>8. Презентация</strong>\n\nЗагрузите скан паспорта всехстраниц одним файлом в формате PDF\n\nВыберите файл и <strong>Загрузить</strong>, когда будите готовы`;
        var body_html_ok    = `<strong>8. Презентация</strong>\n\nЗагрузите скан паспорта всехстраниц одним файлом в формате PDF\n\n📃 <strong>Файл загружен</strong>\n\nДля управления файлом нажмите <strong>Посмотреть мою выписку</strong> или <strong>Удалить мою выписку</strong>`;
        var need_board;

        var document_url = `${config.host_url}users/${_chatId}/discharge5.pdf`;

        if(_User.new_project[8].file_url) 
        {
            need_body_html = body_html_ok;
            need_board = [
                [
                    {
                        text: "🔍 Посмотреть мою отчет",
                        url: document_url,
                    }
                ],
                [
                    {
                        text: "❌ Удалить выписку",
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
            ];
        } else 
        {
            need_body_html = body_html;
            need_board = [[
                {
                    text: "⬅️",
                    callback_data: `place=new_project&button_type=left&number=${need_button}`,
                },
                {
                    text: "➡️",
                    callback_data: `place=new_project&button_type=right&number=${need_button}`,
                }
            ]];
        }
        
        var html = first_html + need_body_html;
    
        bot.editMessageText(html, {
            chat_id: _chatId,
            message_id: _msgId,
            parse_mode: "HTML",
            reply_markup: {
                "inline_keyboard": need_board,
            }
        });
    },
    12: async function(callbackQuery) {
        var _chatId         = callbackQuery.from.id;
        var _User           = await User.findOne({user: _chatId});
        var _msgId          = _User.where.msg_id;
        var need_button     = _User.where.button;
        var not_filled      = 0;

        for (var key in _User.new_project) {
            if(_User.new_project[key] == null) not_filled = not_filled + 1;
        }
    
        var first_html      = `❌ Еще не заполнено пунктов: ${not_filled}\n\n`;
        var body_html       = `<strong>9. Видео презентация</strong>\n\nЗагрузите вашу видео-презентацию (Внимание: без контактов!). Если видео-презентации нет, снимите видео с ответами на следующие вопросы:\n\n1. Поздоровайтесь и представтесь как ва зовут\n2. Кем вы являетесь в компании(проекте)\n3. Расскажите про ваш опыт чем и сколько по времени вы занимались ранее.\n4. Назовите название вашей компании(проекта)\n5. Сколько уже компания работает\n6. Расскажите о рынке на котором работает ваша компания\n7. Расскажите в кратце суть проекта\n8. Расскажите за счет чего формируется прибыль в компании(проекте)\n9. Расскажите о рисках\n10. Расскажите как вы решаете проблему с каждым риском\n\nВыберите файл и <strong>Загрузите</strong>, когда будите готовы`;
        var body_html_ok    = `<strong>9. Видео презентация</strong>\n\nЗагрузите скан паспорта всехстраниц одним файлом в формате PDF\n\n📃 <strong>Файл загружен</strong>\n\nДля управления файлом нажмите <strong>Посмотреть мою выписку</strong> или <strong>Удалить мою выписку</strong>`;
        var need_board;

        var document_url = `${config.host_url}users/${_chatId}/discharge5.pdf`;

        if(_User.new_project[9].file_url) 
        {
            need_body_html = body_html_ok;
            need_board = [
                [
                    {
                        text: "🔍 Посмотреть мою отчет",
                        url: document_url,
                    }
                ],
                [
                    {
                        text: "❌ Удалить выписку",
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
            ];
        } else 
        {
            need_body_html = body_html;
            need_board = [[
                {
                    text: "⬅️",
                    callback_data: `place=new_project&button_type=left&number=${need_button}`,
                },
                {
                    text: "➡️",
                    callback_data: `place=new_project&button_type=right&number=${need_button}`,
                }
            ]];
        }
        
        var html = first_html + need_body_html;
    
        bot.editMessageText(html, {
            chat_id: _chatId,
            message_id: _msgId,
            parse_mode: "HTML",
            reply_markup: {
                "inline_keyboard": need_board,
            }
        });
    }
}