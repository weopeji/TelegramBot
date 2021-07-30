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
    clean_project,
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

    await h.send_html(msg.chat.id, "Неактивные проекты", {
        "resize_keyboard": true,
        "keyboard": [["⬅️ Назад"]],
    });

    var keyboard = [];

    if(_moderation.length > 0) {
        keyboard.unshift([{
            text: "Ожидают модерации",
            callback_data: `place=not_active&type=moderation&data=first`,
        }]);
    }
    if(_correction.length > 0) {
        keyboard.unshift([{
            text: "Ожидают исправления",
            callback_data: `place=not_active&type=correction&data=first`,
        }]);
    }

    var html = `У вас ${_moderation.length + _correction.length} неактивных проектов\n\n<strong>Ожидают модерацию: ${_moderation.length}</strong>\n<strong>Ожидают исправления: ${_correction.length}</strong>\n\nВыберите группу проектов:`;
    await h.send_html(msg.chat.id, html, {
        "inline_keyboard": keyboard,
    });
};

async function not_active_callback(msg) 
{
    var _projects   = await Project.find({user: msg.from.id});
    var _data       = msg.data;
    var _type       = h._GET(_data, 'type');
    var btnData     = h._GET(_data, 'data');

    h.send_html(msg.from.id, "*", {
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
                needProject = _moderation[btnData];
                if((btnData + 1) >= _moderation.length) {
                    needNextProject = "first";
                } else {
                    needNextProject = needNextProject + 1;
                }
            }
            if(_moderation.length > 1) 
            {
                _keyboard.push([
                    {
                        text: "Далее",
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
                needProject = _correction[btnData];
                if((btnData + 1) >= _correction.length) {
                    needNextProject = "first";
                } else {
                    needNextProject = needNextProject + 1;
                }
            }

            _keyboard.push([
                {
                    text: "Перейти",
                    url: `${h.getURL()}html/project/creating/#${needProject._id}`,
                }
            ])

            if(_correction.length > 1) 
            {
                _keyboard.push([
                    {
                        text: "Далее",
                        callback_data: `place=not_active&type=correction&data=${needNextProject}`,
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

async function addProject(msg) 
{
    var html = "*";
    await h.send_html(msg.from.id, html, {
        "resize_keyboard": true,
        "keyboard": [
            ["⬅️ Назад"]
        ],
    });

    var html = `Вам нужно заполнить данные, чтобы создать проект, нажмите кнопку "Заполнить данные", чтобы продолжить когда будите готовы`;
    var _url = `${h.getURL()}html/project/creating/#${msg.from.id}`;

    await h.send_html(msg.from.id, html, {
        "inline_keyboard": [
            [
                {
                    text: "Заполнить данные",
                    url: _url
                }
            ]
        ],
    });
}