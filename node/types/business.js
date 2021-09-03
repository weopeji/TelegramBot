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

    var alertNull = await User.findOneAndUpdate({user: msg.from.id}, {alerts: null});

    h.send_html(msg.from.id, "Проекты:", {
        "resize_keyboard": true,
        "keyboard": [
            ["⬅️ Назад"]
        ],
    });


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
                        needNextProject = needNextProject + 1;
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
            bot.sendPhoto(msg.from.id, stream, {
                "caption": html,
                "parse_mode": "MarkdownV2",
                "reply_markup": {
                    "inline_keyboard": _keyboard,
                }
            });
            
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
                        url: `${h.getURL()}html/project/creating/#${needProject._id}`,
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
                        url: `${h.getURL()}html/project/creating/#${needProject._id}`,
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
            bot.sendPhoto(msg.from.id, stream, {
                "caption": html,
                "parse_mode": "MarkdownV2",
                "reply_markup": {
                    "inline_keyboard": _keyboard,
                }
            });
        },
    }

    FUN[_type]();
}

async function active(msg) 
{
    var _projects   = await Project.find({user: msg.from.id});
    var _active     = _projects.filter(el => el.type == "active");
    var _array      = [];

    var html = `У вас ${_active.length} активных проектов\n\nВы можете вернутьсь назад и добавьте проект`;
    var _msg = h.send_html(msg.chat.id, html, {
        "resize_keyboard": true,
        "keyboard": [
            ["Получение денег от инвестора", "Выплаты"],
            ["Статистика","⬅️ Назад"]
        ],
    });

    console.log(_msg.message_id);

    _array.push(_msg.message_id);

    await h.DMA(msg, _array);
}

async function addProject(msg) 
{
    var html = "Заполнить данные:";
    let del_msg = await h.send_html(msg.from.id, html, {
        "resize_keyboard": true,
        "keyboard": [
            ["⬅️ Назад"]
        ],
    });

    await h.DMA(msg, [del_msg.message_id]);

    var html = `Нажмите кнопку <strong>"Заполнить данные"</strong>, чтобы создать проект и подать его на модерацию`;
    var _url = `${h.getURL()}html/project/creating/#${msg.from.id}`;

    var _msg = await h.send_html(msg.from.id, html, {
        "inline_keyboard": [
            [
                {
                    text: "Заполнить данные 📝",
                    url: _url
                }
            ]
        ],
    });

    await h.DMA(msg, [_msg.message_id]);
}