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
            callback_data: `place=not_active&msg_id=${msg.message_id + 2}&type=moderation`,
        }]);
    }
    if(_correction.length > 0) {
        keyboard.unshift([{
            text: "Ожидают исправления",
            callback_data: `place=not_active&msg_id=${msg.message_id + 2}&type=correction`,
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
    var _id         = h._GET(_data, 'msg_id');
    var _type       = h._GET(_data, 'type');

    console.log(_id);

    const FUN = 
    {
        editMSG: function (html, _id, keyboard) {
            bot.editMessageText(html, {
                chat_id: msg.from.id,
                message_id: _id,
                reply_markup: {
                    "inline_keyboard": keyboard,
                }
            });
        },
        "moderation": function() 
        {
            var _moderation = _projects.filter(el => el.type == "moderation");
            var _keyboard   = [];
            _moderation.forEach(element => {
                var _array = [];
                _array.push({
                    text: `Открыть проект под номером ${element._id}`,
                    url: `localhost.ru/tbot/html/project/creating/#${element._id}`,
                })
                _keyboard.push(_array);
            });
            this.editMSG('Выберите проект для правки:', _id, _keyboard);
        },
        "correction": function()
        {
            var _correction = _projects.filter(el => el.type == "correction");
            var _keyboard   = [];
            _correction.forEach(element => {
                var _array = [];
                _array.push({
                    text: `Открыть проект под номером ${element._id}`,
                    url: `localhost.ru/tbot/html/project/creating/#${element._id}`,
                })
                _keyboard.push(_array);
            });
            this.editMSG('Выберите проект для правки:', _id, _keyboard);
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
    var _url = `${config.host_url}html/project/creating/#${msg.from.id}`;

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