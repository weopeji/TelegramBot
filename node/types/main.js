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
}

const MF =
{
    find_user: function(msg) {
        return User.findOne({user: msg.from.id});
    },
    create_user: async function(msg) 
    {
        var _patch = `../users/${msg.from.id}`;
        fs.stat(_patch, async function(err) {
            if (!err) {}
            else if (err.code === 'ENOENT') {
                await fs.mkdir(_patch);
            }

            var _path_profile = `../users_profile/${msg.from.id}`;

            fs.stat(_path_profile, async function(err) {
                if (!err) {}
                else if (err.code === 'ENOENT') {
                    await fs.mkdir(_path_profile);
                }

                var user_profile    = await bot.getUserProfilePhotos(msg.from.id);
                var file_id         = user_profile.photos[0][0].file_id;
                var file            = await bot.getFile(file_id);
                var file_path       = file.file_path;
                var photo_url       = `https://api.telegram.org/file/bot${config.token}/${file_path}`;
                var name_photo      = `avatar-${file_path.split('/')[1]}`;
    
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
            })
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
    var html =`Приветствуем <strong>${msg.from.first_name} ${msg.from.last_name}</strong> на инвестиционной платфоме <strong>investER</strong>. Выбери свой профиль:\n\n<strong>ИНВЕСТОР</strong> - Инвестирую в компании/проекты\n\n<strong>БИЗНЕС</strong> - Привлекая инвестиции в свой бизнес/проект\n\n<strong>ПРИВЛЕЧЕНИЕ</strong> - Хочу стать партнером по привличению инвесторов\n\n`;
    h.send_html(msg.chat.id, html, {
        "resize_keyboard": true,
        "keyboard": [["💰 Инвестор", "🏭 Бизнес", "🤝 Привлечение"]],
        "one_time_keyboard": true,
    });
} 

async function _MainMenu(msg)
{
    var infoTypes = {
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
            var _User = await MF.find_user(msg);

            var html = `<strong>${msg.from.first_name} ${msg.from.last_name}</strong>\nдля того, чтобы разместить свое предложение для привлечения инвестиций, необходимо заполнить заявку и прикрепить документы на <strong>investER.</strong>\n\n`;

            await bot.sendMessage(msg.chat.id, html, {
                parse_mode: "HTML",
                reply_markup: {
                    "keyboard": [["❓ Как добавить проект", "✍ Добавить проект"], ["✔️ Активные проекты","❌ Неактивные проекты"], ['🔁 Сменить роль']],
                    "one_time_keyboard": true,
                }
            });

            if(!_User.googleAuth) 
            {
                var _html = `Вы можете защитить свой аккаунт двойной аунтификацией <strong>googleAuth</strong>\n\nЖмите на кнопку <strong>Защитить</strong>`;
                bot.sendMessage(msg.chat.id, _html, {
                    parse_mode: "HTML",
                    reply_markup: {
                        "inline_keyboard": [
                            [
                                {
                                    text: "Защитить",
                                    url: "https://t.me/testPut",
                                }
                            ]
                        ],
                    }
                });
            }
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

    var _User = await MF.find_user(msg);
    infoTypes[_User.type](msg);
}

async function change_type(msg)
{
    const MF_DATA = 
    {
        "💰 инвестор": "investor",
        "🏭 бизнес": "business",
        "🤝 привлечение": "attraction",
    }
    await MF.Update_Type(msg, MF_DATA[msg.text.toLowerCase()]);
    _MainMenu(msg);
}

async function close(msg)
{
    _MainMenu(msg);
    await User.findOneAndUpdate({user: msg.from.id}, {where: null});
}