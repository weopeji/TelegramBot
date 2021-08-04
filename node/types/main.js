var bot     = null;
var User    = null;
var h       = null;
var fs      = null;

module.exports = {
    init:function(initPlagins)
    {
        privateInit(initPlagins);
    },
    _CreatorFUN,
    notType,
    change_type,
    close,
}

function privateInit(initPlagins) {
    bot     = initPlagins.bot;
    User    = initPlagins.User;
    h       = initPlagins.helper_functions;
    fs      = initPlagins.fs;
    _data   = initPlagins._data;
    config  = initPlagins.config;
    https   = initPlagins.https;
    Project = initPlagins.Project;
}

const MF =
{
    find_user: function(msg) {
        return User.findOne({user: msg.from.id});
    },
    create_user: async function(msg) 
    {
        var _patch = `../users/${msg.from.id}`;

        async function _start() {
            var _path_profile = `../users_profile/${msg.from.id}`;

            async function _start_profil() 
            {
                var user_profile    = await bot.getUserProfilePhotos(msg.from.id);
                var file_id         = null;
                var file            = null;
                var file_path       = null;
                var photo_url       = null;
                var name_photo      = null;
                if(typeof user_profile.photos[0] != 'undefined') {
                    file_id = user_profile.photos[0][0].file_id;
                    file            = await bot.getFile(file_id);
                    file_path       = file.file_path;
                    photo_url       = `https://api.telegram.org/file/bot${config.token}/${file_path}`;
                    name_photo      = `avatar-${file_path.split('/')[1]}`;
                    const _file      = fs.createWriteStream(`../users_profile/${msg.from.id}/${name_photo}`);
                    const request   = https.get(photo_url, async function(response) {
                        response.pipe(_file);
        
                        return User.create({
                            user: msg.from.id, 
                            first_name: msg.from.first_name, 
                            last_name: msg.from.last_name,
                            username: msg.from.username,
                            language_code: msg.from.language_code,
                            is_bot: msg.from.is_bot,
                            type: null,
                            img: name_photo,
                            googleAuth: null,
                        });
                    });
                } else {
                    return User.create({
                        user: msg.from.id, 
                        first_name: msg.from.first_name, 
                        last_name: msg.from.last_name,
                        username: msg.from.username,
                        language_code: msg.from.language_code,
                        is_bot: msg.from.is_bot,
                        type: null,
                        img: null,
                        googleAuth: null,
                    });
                }
    
            }

            fs.stat(_path_profile, async function(err) {
                if (!err) {_start_profil();}
                else if (err.code === 'ENOENT') {
                    await fs.mkdir(_path_profile, function() {
                        _start_profil();
                    });
                }
            })
        }

        fs.stat(_patch, async function(err) {
            if (!err) {
                _start();
            }
            else if (err.code === 'ENOENT') {
                await fs.mkdir(_patch, function() {
                    _start();
                });
            }
        });
    },
    Update_Type: function(msg, data) {
        return User.findOneAndUpdate({user: msg.from.id}, {type: data});
    },
}

async function _CreatorFUN(msg)
{
    var _user = await MF.find_user(msg);

    if(!_user)
    {
        await MF.create_user(msg);
        notType(msg);
    } else
    {
        if(!_user.type) { notType(msg); } else { _MainMenu(msg); };
    }
    
}

async function notType(msg)
{
    var html =`Приветствуем <strong>${msg.from.first_name} ${msg.from.last_name}</strong> на инвестиционной платформе <strong>investER</strong>. Выбери свой профиль:\n\n<strong>ИНВЕСТОР</strong>💰 - Инвестирую в компании/проекты\n\n<strong>БИЗНЕС</strong>💼 - Привлекаю инвестиции в свой бизнес/проект\n\n<strong>ПРИВЛЕЧЕНИЕ</strong>📣 - Хочу стать партнером по привлечению инвесторов\n\n`;
    await h.send_html(msg.chat.id, html, {
        "resize_keyboard": true,
        "keyboard": [["💰 Инвестор", "💼 Бизнес", "📣 Привлечение"]],
    });
    await h.DM(msg, 2);
} 

async function _MainMenu(msg)
{
    var _User = await MF.find_user(msg);
    var _projects = await Project.find({user: msg.from.id});

    var infoTypes = 
    {
        investor: async function(msg) {
            var html = `Вы <strong>Инвестор</strong>`;
            await bot.sendMessage(msg.chat.id, html, {
                parse_mode: "HTML",
                reply_markup: { 
                    "keyboard": [["💰 Мои инвестиции", "📈 Инвестировать", "💳 Реквезиты"], ["👨‍💼 Рекомендовать","🔁 Сменить роль"]],
                    "one_time_keyboard": true,
                }
            });
            var html = `<strong>${msg.from.first_name} ${msg.from.last_name}</strong>\nВы можете ознакомится с предложениями на данной платформе.`;
            bot.sendMessage(msg.chat.id, html, {
                parse_mode: "HTML",
                reply_markup: {
                    "inline_keyboard": [
                        [
                            {
                                text: "ОЗНАКОМИТСЯ С ПРЕДЛОЖЕНИЯМИ",
                                url: "https://t.me/testPut",
                            }
                        ]
                    ],
                }
            });
        },
        business: async function(msg) 
        {
            var html = `<strong>${msg.from.first_name} ${msg.from.last_name}</strong>\nдля того, чтобы разместить свое предложение для привлечения инвестиций, необходимо заполнить заявку и прикрепить документы на <strong>investER.</strong>\n\n`;

            var notActiveBlock = "❌ Неактивные проекты";

            var _moderation     = _projects.filter(el => el.type == "moderation");
            var _correction = _projects.filter(el => el.type == "correction");

            if(_moderation.length > 0) {
                notActiveBlock = "❌ Неактивные проекты 🔶";
            }

            if(_correction.length > 0) {
                notActiveBlock = "❌ Неактивные проекты 🔶";
            }
            await h.send_html(msg.chat.id, html, {
                "resize_keyboard": true,
                "keyboard": [["❓ Как добавить проект", "✍ Добавить проект"], [ "✔️ Активные проекты",notActiveBlock], ['🔁 Сменить роль']]
            });

            return;
        },
        attraction: function(msg) {
            var html = `<strong>${msg.from.first_name} ${msg.from.last_name}</strong> добро пожаловать на investER. Вы можете стать нашим партнером по привлечению инвесторов.\n\nПриглашайте инвесторов на investER либо отправляйте инвестиционное предложения из канала (в слово зашита ссылка) или вашу личную ссылку. И зарабатывайте с каждой их инвестиции. Приглашенный Вами инвестор будет за вами закреплен навсегда и за каждую инвестицию в любые проекты вы будете получать бонус.\n\nПредусмотренный бонус в каждом инвестиционном предложении разный, от 0,5 - до 10% от суммы инвестиций приглашенного инвестора. Как только приглашенный Вами инвестор проинвестирует, вам придет сообщение с датой, (именем пользователя), суммой инвестиций и бонусом для вас.\n\nЧтоб бонус пришел к вам на карту, заполните данные реквизитов, нажав кнопку реквизиты`;
            bot.sendMessage(msg.chat.id, html, {
                parse_mode: "HTML",
                reply_markup: {
                    "keyboard": [["🔗 Моя реферальная ссылка", "🙋‍♂️ Мною привлечено"], ["💳 Реквезиты","🔁 Сменить роль"]],
                    "one_time_keyboard": true,
                }
            });
        },
    };

    await infoTypes[_User.type](msg);
    await h.DM(msg, 5);
}

async function change_type(msg)
{
    const MF_DATA = 
    {
        "💰 инвестор": "investor",
        "💼 бизнес": "business",
        "📣 привлечение": "attraction",
    }
    await MF.Update_Type(msg, MF_DATA[msg.text.toLowerCase()]);
    _MainMenu(msg);
}

async function close(msg)
{
    _MainMenu(msg);
}