var bot     = null;
var User    = null;
var h       = null;

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
}

const MF =
{
    find_user: function(msg) {
        return User.findOne({user: msg.from.id});
    },
    create_user: function(msg) 
    {
        return User.create({
            user: msg.from.id, 
            first_name: msg.from.first_name, 
            last_name: msg.from.last_name,
            username: msg.from.username,
            language_code: msg.from.language_code,
            is_bot: msg.from.is_bot,
            type: null,
            where: null,
            new_project: {
                name: null,
                target: null,
                attraction_amount: null,
                date: null,
                minimal_amount: null,
                rate: null,
                date_payments: null,
                collection_period: null,
                organization: "1",
            },
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
        investor: function(msg) {
            var html = `<strong>${msg.from.first_name} ${msg.from.last_name}</strong>\nВы можете ознакомится с предложениями на данной платформе.`;
            bot.sendMessage(msg.chat.id, html, {
                parse_mode: "HTML",
                reply_markup: {
                    "inline_keyboard": [
                        [
                            {
                                text: "ОЗНАКОМИТСЯ С ПРЕДЛОЖЕНИЯМИ",
                                url: "https://google.com",
                            }
                        ]
                    ],
                }
            });
            var html = `Вы <strong>Инвестор</strong>`;
            bot.sendMessage(msg.chat.id, html, {
                parse_mode: "HTML",
                reply_markup: {
                    "keyboard": [["МОИ ИНВЕСТИЦИИ", "ИНВЕСТИРОВАТЬ", "РЕКВЕЗИТЫ"], ["РЕКОМЕНДОВАТЬ","🔁 Сменить роль"]],
                    "one_time_keyboard": true,
                }
            });
        },
        business: function(msg) {
            var html = `<strong>${msg.from.first_name} ${msg.from.last_name}</strong>\nдля того, чтобы разместить свое предложение для привлечения инвестиций, необходимо заполнить заявку и прикрепить документы на <strong>investER.</strong>`;
            bot.sendMessage(msg.chat.id, html, {
                parse_mode: "HTML",
            });
            var html = `Вы <strong>бизнес</strong>`;
            bot.sendMessage(msg.chat.id, html, {
                parse_mode: "HTML",
                reply_markup: {
                    "keyboard": [["❓ Как добавить проект", "✍ Добавить проект"], ["✔️ Активные проекты","❌ Неактивные проекты"], ['🔁 Сменить роль']],
                    "one_time_keyboard": true,
                }
            });
        },
        attraction: function(msg) {
            var html = `Вы <strong>привлечение</strong>`;
            bot.sendMessage(msg.chat.id, html, {
                parse_mode: "HTML",
                reply_markup: {
                    "keyboard": [["МОИ ИНВЕСТИЦИИ", "ИНВЕСТИРОВАТЬ", "РЕКВЕЗИТЫ"], ["РЕКОМЕНДОВАТЬ","СМЕНИТЬ РОЛЬ"]],
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