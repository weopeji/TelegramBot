var bot         = null;
var h           = null;
var User        = null;
var https       = null;
var config      = null;
var _data       = null;
var Project     = null;
var puppeteer   = require('puppeteer');

module.exports = {
    init:function(initPlagins)
    {
        privateInit(initPlagins);
    },
    how_add,
    not_active,
    active,
    addProject,
    not_active_callback,
    getMoney,
    viplati,
    viplati_call,
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
    InvDoc      = initPlagins.InvDoc;
}

async function viplati_call(msg) {
  
    var _data           = msg.data;
    var _idData         = h._GET(_data, 'id');
    var needProject     = await Project.findOne({_id: _idData});
    var _array          = [];
    var _User           = await User.findOne({user: msg.from.id});

    var html = `Выбран проект: ${needProject._id}`;

    var fat = await h.send_html(msg.from.id, html, {
        "resize_keyboard": true,
        "keyboard": [["⬅️ Назад"]],
    });
    _array.push(fat.message_id);

    var html = `Перейдите в личный кабинет для продолжения`;
    const stream = fs.createReadStream(`../projects/${needProject._id}/logo.png`);
    var fat = await bot.sendPhoto(msg.from.id, stream, {
        "caption": html,
        "parse_mode": "html",
        "reply_markup": {
            "inline_keyboard": [
                [
                    {
                        text: "Платежи инвесторам",
                        url: `${h.getURL()}?user=${_User._id}&page=pay_investors&id=${needProject._id}`,
                    }
                ]
            ],
        }
    });

    _array.push(fat.message_id);
    await h.DMA(msg, _array);
}

async function viplati(msg) {
    var _array          = [];
    var _Projects       = await Project.find({user: msg.from.id});
    var needProject     = _Projects[0];

    var html = `Выберите проект:`;

    var fat = await h.send_html(msg.chat.id, html, {
        "resize_keyboard": true,
        "keyboard": [["⬅️ Назад"]],
    });
    _array.push(fat.message_id);

    var html = ``;
    const stream = fs.createReadStream(`../projects/${needProject._id}/logo.png`);
    var fat = await bot.sendPhoto(msg.from.id, stream, {
        "caption": html,
        "parse_mode": "html",
        "reply_markup": {
            "inline_keyboard": [
                [
                    {
                        text: "Выбрать",
                        callback_data: `place=viplati&id=${needProject._id}`,
                    }
                ]
            ],
        }
    });

    _array.push(fat.message_id);
    await h.DMA(msg, _array);
}

async function getMoney(msg) 
{
    var _array          = [];
    var _User           = await User.findOne({user: msg.from.id});
    var allProjects     = await Project.find({user: msg.from.id});
    var notPays         = 0;
    var allPays         = 0;
    var falseInvs       = [];

    var html = `Вы находитесь в меню: "Получение денег от инвестора"`;

    var fat = await h.send_html(msg.chat.id, html, {
        "resize_keyboard": true,
        "keyboard": [["⬅️ Назад"]],
    });
    _array.push(fat.message_id);

    for(var _project of allProjects)
    {
        var AllInvOfProject = await InvDoc.find({projectId: _project._id});
        for(_Inv of AllInvOfProject)
        {
            if(_Inv.status == "wait")
            {
                notPays = notPays + 1;
                falseInvs.push(_Inv);
            }

            allPays = allPays + 1;
        }
    }

    var html = `Бизнес ${_User.first_name}\n\nОплачено инвесторами ${allPays}\nНе подтверждено получение денег Бизнесом ${notPays}\n\n`;
    
    falseInvs.forEach((el, i) => {
        html = html + `№${el.projectId}/${i + 1}  `;
    })

    var fat = await h.send_html(msg.chat.id, html, {
        "resize_keyboard": true,
        "inline_keyboard": [
            [
                {
                    text: "Перейти в личный кабинет",
                    login_url: {
                        'url': `${h.getURL()}?user=${_User._id}&page=acceptPays`,
                    },
                }
            ]
        ],
    });
    _array.push(fat.message_id);

    await h.DMA(msg, _array);
  
}

async function how_add(msg)
{
    var _array = [];

    const stream = fs.createReadStream('assets/videos/video.mp4');
    var sendVideo = await bot.sendVideo(msg.chat.id, stream, {
        reply_markup: {
            "resize_keyboard": true,
            "keyboard": [["⬅️ Назад"]],
            "one_time_keyboard": true,
        }
    });

    _array.push(sendVideo.message_id);

    await h.DMA(msg, _array);
}

async function not_active(msg) 
{
    var _array = [];

    var _projects   = await Project.find({user: msg.from.id});
    var _moderation = _projects.filter(el => el.type == "moderation");
    var _correction = _projects.filter(el => el.type == "correction");
    var _User = await User.findOne({user: msg.from.id});
    var htmlInfo = "Неактивные проекты";

    var textButton = "Ожидают модерации";
    var textButton2 = "Ожидают исправления";

    var romb1 = "";
    var romb2 = "";

    if(_User.alerts) {
        if(typeof _User.alerts.NA_First != "undefined")  
        {
            if(_moderation.length > 0) {
                textButton = "Ожидают модерации ♦️"
                romb1 = "♦️ ";
            }
            if(_correction.length > 0) {
                textButton2 = "Ожидают исправления ♦️";
                romb2 = "♦️ ";
            }
        }
    }

    var _again = await h.send_html(msg.chat.id, htmlInfo, {
        "resize_keyboard": true,
        "keyboard": [["⬅️ Назад"]],
    });
    _array.push(_again.message_id);


    var keyboard = [];

    if(_moderation.length > 0) {
        keyboard.unshift([{
            text: textButton,
            callback_data: `place=not_active&type=moderation&data=first`,
        }]);
    }
    if(_correction.length > 0) {
        keyboard.unshift([{
            text: textButton2,
            callback_data: `place=not_active&type=correction&data=first`,
        }]);
    }

    var html = `У вас ${_moderation.length + _correction.length} неактивных проектов\n\n<strong>Ожидают модерацию: ${_moderation.length} ${romb1}</strong>\n<strong>Ожидают исправления: ${_correction.length} ${romb2}</strong>\n\nВыберите группу проектов:`;
    var globalMsg = await h.send_html(msg.chat.id, html, {
        "inline_keyboard": keyboard,
    });
    _array.push(globalMsg.message_id);

    await h.DMA(msg, _array);
};

async function not_active_callback(msg) 
{
    var _projects   = await Project.find({user: msg.from.id});
    var _data       = msg.data;
    var _type       = h._GET(_data, 'type');
    var btnData     = h._GET(_data, 'data');
    var _array      = [];

    await User.findOneAndUpdate({user: msg.from.id}, {alerts: null});

    var fat = await h.send_html(msg.from.id, "Проекты:", {
        "resize_keyboard": true,
        "keyboard": [
            ["⬅️ Назад"]
        ],
    });

    _array.push(fat.message_id);


    const FUN = 
    {
        "moderation": async function() 
        {
            var _moderation     = _projects.filter(el => el.type == "moderation");
            var _keyboard       = [];
            var needProject     = null;
            var needNextProject = null;

            for(var i = 0; i < 3; i++) { 
                try {
                    await bot.deleteMessage(msg.from.id, msg.message.message_id - i);
                } catch(err) {

                }
            }; 

            if(btnData == "first") 
            {
                needProject = _moderation[0];
                needNextProject = 1;
            } else 
            {
                if(btnData <= 0) {
                    needProject = _moderation[0];
                    needNextProject = 1;
                } else {
                    needProject = _moderation[btnData];
                    if((btnData + 1) >= _moderation.length) {
                        needNextProject = "first";
                    } else {
                        needNextProject = btnData + 1;
                    }
                }
            }

            if(_moderation.length > 1) 
            {
                _keyboard.push([
                    {
                        text: "⬅️",
                        callback_data: `place=not_active&type=moderation&data=${needNextProject - 2}`,
                    },
                    {
                        text: "➡️",
                        callback_data: `place=not_active&type=moderation&data=${needNextProject}`,
                    }
                ])
            }

            var html = `[Профиль компании](${h.getURL()}html/project/profil/#${needProject._id})\n[Презентация](${h.getURL()}/projects/${needProject._id}/${needProject.data["file+7"]})\n[Видео презентация](${h.getURL()}/projects/${needProject._id}/${needProject.data["file+8"]})`;
            const stream = fs.createReadStream(`../projects/${needProject._id}/logo.png`);
            var fat = await bot.sendPhoto(msg.from.id, stream, {
                "caption": html,
                "parse_mode": "MarkdownV2",
                "reply_markup": {
                    "inline_keyboard": _keyboard,
                }
            });

            _array.push(fat.message_id);
            await h.DMA(msg, _array);
            
        },
        "correction": async function()
        {
            var _correction = _projects.filter(el => el.type == "correction");
            var _keyboard       = [];
            var needProject     = null;
            var needNextProject = null;

            for(var i = 0; i < 3; i++) { 
                try {
                    await bot.deleteMessage(msg.from.id, msg.message.message_id - i);
                } catch(err) {

                }
            }; 

            if(btnData == "first") 
            {
                needProject = _correction[0];
                needNextProject = 1;
            } else 
            {
                if(btnData <= 0) {
                    needProject = _correction[0];
                    needNextProject = 1;
                } else {
                    needProject = _correction[btnData];
                    if((btnData + 1) >= _correction.length) {
                        needNextProject = "first";
                    } else {
                        needNextProject = needNextProject + 1;
                    }
                }
            }

            if(_correction.length > 1) 
            {
                _keyboard.push([
                    {
                        text: "⬅️",
                        callback_data: `place=not_active&type=correction&data=${needNextProject - 2}`,
                    },
                    {
                        text: `№${needProject._id}`,
                        login_url: {
                            'url': `${h.getURL()}html/project/creating/#${needProject._id}`,
                        },
                    },
                    {
                        text: "➡️",
                        callback_data: `place=not_active&type=correction&data=${needNextProject}`,
                    }
                ])
            } else {
                _keyboard.push([
                    {
                        text: "Перейти",
                        login_url: {
                            'url': `${h.getURL()}html/project/creating/#${needProject._id}`,
                        },
                    }
                ])
            }

            var _urlImgProject = `${h.getURL()}html/project/cover/?id=${needProject._id}`;
            const browser = await puppeteer.launch({
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
            });

            const page = await browser.newPage();
            await page.goto(_urlImgProject);
            await page.emulateMedia('screen');
            const element = await page.$('.cover_block');   
            await element.screenshot({path: `../projects/${needProject._id}/logo.png`});
            await browser.close();

            var html = `[Профиль компании](${h.getURL()}html/project/profil/#${needProject._id})\n[Презентация](${h.getURL()}/projects/${needProject._id}/${needProject.data["file+7"]})\n[Видео презентация](${h.getURL()}/projects/${needProject._id}/${needProject.data["file+8"]})`;
            const stream = fs.createReadStream(`../projects/${needProject._id}/logo.png`);
            var fat = await bot.sendPhoto(msg.from.id, stream, {
                "caption": html,
                "parse_mode": "MarkdownV2",
                "reply_markup": {
                    "inline_keyboard": _keyboard,
                }
            });

            _array.push(fat.message_id);
            await h.DMA(msg, _array);
        },
    }

    FUN[_type]();
}

async function active(msg) 
{
    var _projects   = await Project.find({user: msg.from.id});
    var _active     = _projects.filter(el => el.type == "active");
    var _array      = [];

    var html = `📝 У вас ${_active.length} активных проектов\n\nВы можете вернутьсь <strong>назад</strong> и <strong>добавить</strong> проект`;
    var _msg = await h.send_html(msg.chat.id, html, {
        "resize_keyboard": true,
        "keyboard": [
            ["💸 Получение денег от инвестора", "🏦 Выплаты"],
            ["💼 Статистика","⬅️ Назад"]
        ],
    });

    _array.push(_msg.message_id);

    await h.DMA(msg, _array);
}

async function addProject(msg) 
{
    var _array  = [];
    var _User   = await User.findOne({user: msg.from.id});

    var html = "Вы находитесь в меню: Добавить проект";
    var fat = await h.send_html(msg.from.id, html, {
        "resize_keyboard": true,
        "keyboard": [
            ["⬅️ Назад"]
        ],
    });

    _array.push(fat.message_id)

    var html = `Нажмите кнопку <strong>"Заполнить данные"</strong>, чтобы создать проект и подать его на модерацию`;
    var _url = `${h.getURL()}?user=${_User._id}&page=creating`;

    var fat = await h.send_html(msg.from.id, html, {
        "inline_keyboard": [
            [
                {
                    text: "Заполнить данные 📝",
                    login_url: {
                        'url': _url,
                    },
                }
            ]
        ],
    });
    _array.push(fat.message_id)

    await h.DMA(msg, _array);
}