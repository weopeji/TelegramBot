var bot     = null;
var User    = null;
var h       = null;
var fs      = null;
var puppeteer                       = require('puppeteer');

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

        async function _start() 
        {
            var _path_profile = `../users_profile/${msg.from.id}`;

            async function _start_profil() 
            {
                var user_profile    = await bot.getUserProfilePhotos(msg.from.id);
                var file_id         = null;
                var file            = null;
                var file_path       = null;
                var photo_url       = null;
                var name_photo      = null;

                // if(typeof user_profile.photos[0] != 'undefined') {
                //     file_id = user_profile.photos[0][0].file_id;
                //     file            = await bot.getFile(file_id);
                //     file_path       = file.file_path;
                //     photo_url       = `https://api.telegram.org/file/bot${config.token}/${file_path}`;
                //     name_photo      = `avatar-${file_path.split('/')[1]}`;
                //     const _file      = fs.createWriteStream(`../users_profile/${msg.from.id}/${name_photo}`);
                //     const request   = https.get(photo_url, async function(response) {
                //         response.pipe(_file);
        
                //         return User.create({
                //             user: msg.from.id, 
                //             first_name: msg.from.first_name, 
                //             last_name: msg.from.last_name,
                //             username: msg.from.username,
                //             language_code: msg.from.language_code,
                //             is_bot: msg.from.is_bot,
                //             type: null,
                //             img: name_photo,
                //             googleAuth: null,
                //             alerts: null,
                //         });
                //     });
                // } else {
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
                    alerts: null,
                    investor_data: null,
                    where: null,
                });
                // }
    
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

    console.log(_user);

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
    var _User = await User.findOne({user: msg.from.id});
    if(_User)
    {
        var _array = [];
        var html =`Приветствуем <strong>${msg.from.first_name} ${msg.from.last_name}</strong>на <strong>investER</strong>. Выбери свой профиль:\n\n<strong>ИНВЕСТОР</strong>💰 - Инвестирую в компании/проекты\n\n<strong>БИЗНЕС</strong>💼 - Привлекаю инвестиции в свой бизнес/проект\n\n<strong>ПРИВЛЕЧЕНИЕ</strong>📣 - Хочу стать партнером по привлечению инвесторов\n\n`;
        var fat = await h.send_html(msg.chat.id, html, {
            "resize_keyboard": true,
            "keyboard": [["💰 Инвестор", "💼 Бизнес", "📣 Привлечение"]],
        });
        _array.push(fat.message_id);
        await h.DMA(msg, _array);
    }
} 

async function startAlertsMain(msg)
{
    var _array      = [];
    var _User       = await MF.find_user(msg);
    var alertsMain  = _User.alerts_main;

    if(alertsMain)
    {
        var html =`Оповещения: ⠀ `;
        var fat = await h.send_html(msg.chat.id, html);
        _array.push(fat.message_id);
        await h.DMA(msg, _array);
        // var html =`⠀`;
        // var fat = await h.send_html(msg.chat.id, html);
        // _array.push(fat.message_id);
        // await h.DMA(msg, _array);

        for(const element in alertsMain)
        {
            var html =`⠀`;
            var fat = await h.send_html(msg.chat.id, html);
            _array.push(fat.message_id);
            await h.DMA(msg, _array);
        }
    } else 
    {
        var html =`Оповещения: ⠀ `;
        var fat = await h.send_html(msg.chat.id, html);
        _array.push(fat.message_id);
        var html =`⠀`;
        var fat = await h.send_html(msg.chat.id, html);
        _array.push(fat.message_id);
        await h.DMA(msg, _array);
    }

    return true;
}

async function _MainMenu(msg, close)
{
    var _User = await MF.find_user(msg);
    var _projects = await Project.find({user: msg.from.id});
    var _array = [];

    await startAlertsMain(msg);

    var infoTypes = 
    {
        investor: async function(msg) 
        {
            var myInvestingText     = "💰 Мои инвестиции";
            var InvestingText       = "📈 Инвестировать";
            var rekvexitionText     = "💳 Реквезиты";
            var rekomendationText   = "👨‍💼 Рекомендовать";

            if(_User.alerts) {
                _User.alerts.forEach(function(el) {
                    if(el.type == "Attracted_by_me") rekomendationText = "👨‍💼 Рекомендовать ♦️";
                    if(el.type == "acceptInvestor") myInvestingText = "💰 Мои инвестиции ♦️";
                });
            }

            if(_User.putProject) 
            {
                var needProject = await Project.findOne({_id: _User.putProject});
                var needInv = await InvDoc.findOne({projectId: _User.putProject, invester: msg.from.id});

                var _idProject = needProject._id;

                var html = `Выбран проект: ${_User.putProject}\n[Профиль компании](${h.getURL()}html/project/profil/#${needProject._id})\n[Презентация](${h.getURL()}/projects/${needProject._id}/${needProject.data["file+7"]})\n[Видео презентация](${h.getURL()}/projects/${needProject._id}/${needProject.data["file+8"]})\n\n`;
                const stream    = fs.createReadStream(`../projects/${_User.putProject}/logo.png`);
            
                var fat = await bot.sendPhoto(msg.from.id, stream, {
                    "caption": html,
                    "parse_mode": "MarkdownV2",
                    "reply_markup": {
                        "resize_keyboard": true,
                        "keyboard": [[myInvestingText, InvestingText, "💳 Реквезиты"], [rekomendationText,"🔁 Сменить роль"]],
                    }
                });
                _array.push(fat.message_id);

                if(needInv) {
                    if(needInv.receipt) 
                    {
                        var html = `<strong>Вы инвестировали в проект!</strong>\n\nВы можете написать бизнесу по ссылке ниже`;
                        var fat = await bot.sendMessage(msg.chat.id, html, {
                            parse_mode: "HTML",
                            reply_markup: {
                                "inline_keyboard": [
                                    [
                                        {
                                            text: 'Написать бизнесу',
                                            url: `${h.getURL()}?user=${_User.id}&page=chats&id=${_User.putProject}`,
                                        },
                                    ]
                                ],
                            }
                        });
                        _array.push(fat.message_id);
                    }
                }
        
            } else {
                var html = `Вы <strong>Инвестор</strong>`;
                var fat = await bot.sendMessage(msg.chat.id, html, {
                    parse_mode: "HTML",
                    reply_markup: {
                        "resize_keyboard": true, 
                        "keyboard": [["💰 Мои инвестиции", "📈 Инвестировать", "💳 Реквезиты"], ["👨‍💼 Рекомендовать","🔁 Сменить роль"]],
                        "one_time_keyboard": true,
                    }
                });
                _array.push(fat.message_id);
    
                var html = `<strong>${msg.from.first_name} ${msg.from.last_name}</strong>\nВы можете ознакомится с предложениями на данной платформе.`;
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
            }

            await h.DMA(msg, _array);
        },
        business: async function(msg) 
        {
            var html = `<strong>${msg.from.first_name} ${msg.from.last_name}</strong>\nдля того, чтобы разместить свое предложение для привлечения инвестиций, необходимо заполнить заявку и прикрепить документы на <strong>investER.</strong>\n\n`;

            var notActiveBlock = "❌ Неактивные проекты";

            if(_User.alerts) 
            {
                if(typeof _User.alerts.NA_First != "undefined") 
                {
                    notActiveBlock = "❌ Неактивные проекты ♦️";
                }
            }
            
            var fat = await h.send_html(msg.chat.id, html, {
                "resize_keyboard": true,
                "keyboard": [["❓ Как добавить проект"], ["✍ Добавить проект", "✅ Активные проекты"], [notActiveBlock, '🔁 Сменить роль']]
            });

            _array.push(fat.message_id);

            await h.DMA(msg, _array);
        },
        attraction: async function(msg) {
            if(!close)
            {
                var _array          = [];
                var html = `<strong>${msg.from.first_name} ${msg.from.last_name}</strong> добро пожаловать на investER. Вы можете стать нашим партнером по привлечению инвесторов`;
                var fat = await bot.sendMessage(msg.chat.id, html, {
                    parse_mode: "HTML",
                    reply_markup: {
                        "resize_keyboard": true,
                        "keyboard": [["📊 Привлечь инвесторов", "👔 Привлечь бизнес"],["🔁 Сменить роль"]],
                    }
                });
                _array.push(fat.message_id);
                await h.DMA(msg, _array);
            } else {
                var reqAttraction = require("./attraction");

                var funs = {
                    "1": function() {
                        reqAttraction.startFun(msg);
                    },
                    "2": function() {
                        reqAttraction.startFunMore(msg);
                    }
                }

                funs[_User.attractType]();
            }
        },
    };

    if(_User)
    {
        await infoTypes[_User.type](msg);
    }
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
    await User.findOneAndUpdate({user: msg.from.id}, {where: null})
    _MainMenu(msg, true);
}