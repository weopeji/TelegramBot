var bot     = null;
var User    = null;
var h       = null;

function privateInit(initPlagins) {
    bot     = initPlagins.bot;
    User    = initPlagins.User;
    h       = initPlagins.helper_functions;
}

module.exports = {
    init:function(initPlagins)
    {
        privateInit(initPlagins);
    },
    url,
    howmany,
    requisites,
    reqezits,
    startFun,
}

async function startFun(start,data,callback)
{
    await h.DMA(msg, _array);
    var _array          = [];
    var html = `<strong>${msg.from.first_name} ${msg.from.last_name}</strong> добро пожаловать на investER. Вы можете стать нашим партнером по привлечению инвесторов.\n\nПриглашайте инвесторов на investER либо отправляйте инвестиционное предложения из канала (в слово зашита ссылка) или вашу личную ссылку. И зарабатывайте с каждой их инвестиции. Приглашенный Вами инвестор будет за вами закреплен навсегда и за каждую инвестицию в любые проекты вы будете получать бонус.\n\nПредусмотренный бонус в каждом инвестиционном предложении разный, от 0,5 - до 10% от суммы инвестиций приглашенного инвестора. Как только приглашенный Вами инвестор проинвестирует, вам придет сообщение с датой, (именем пользователя), суммой инвестиций и бонусом для вас.\n\nЧтоб бонус пришел к вам на карту, заполните данные реквизитов, нажав кнопку реквизиты`;
    var fat = await bot.sendMessage(msg.chat.id, html, {
        parse_mode: "HTML",
        reply_markup: {
            "resize_keyboard": true,
            "keyboard": [["🔗 Моя реферальная ссылка", "🙋‍♂️ Мною привлечено"], ["💳 Реквезиты","🔁 Сменить роль"]],
        }
    });
    _array.push(fat.message_id);
    await h.DMA(msg, _array);
}

function howmany(msg) {
    var html = `<strong>${msg.from.first_name} ${msg.from.last_name}</strong>\n\nВы еще не привели ни одного пользователя`;
    h.send_html(msg.chat.id, html, 
    {
        "resize_keyboard": true,
        "keyboard": [["⬅️ Назад"]],
    });
}

async function url(msg) 
{
    var _array  = [];
    var _url = `https://t.me/investER_localhost_bot?start=user_${msg.from.id}`;
    var html = `<strong>${msg.from.first_name} ${msg.from.last_name}</strong> делитесь с друзьями вашей реферальной ссылкой\n\n${_url}`;
    var fat = await h.send_html(msg.chat.id, html, 
    {
        "resize_keyboard": true,
        "keyboard": [["⬅️ Назад"]],
    });
    _array.push(fat.message_id);
    await h.DMA(msg, _array);
}

async function reqezits(msg)
{
    var _array  = [];
    var html = `<strong>${msg.from.first_name} ${msg.from.last_name}</strong> Заполните данные для заключения агентского договора и реквизиты для перечислений. Обращаем ваше внимание, что подписание договора и перечисление бонуса осуществляется только с лицами, имеющими статус самозанятый, ИП или юр.лицо.`;
    var fat = await h.send_html(msg.chat.id, html, 
    {
        "resize_keyboard": true,
        "keyboard": [ 
            ["⬅️ Назад"]
        ],
    });
    _array.push(fat.message_id);
    var html = `Введите свой инн:`;
    var fat = await h.send_html(msg.chat.id, html);
    _array.push(fat.message_id);
    await h.DMA(msg, _array);

    await User.findOneAndUpdate({user: msg.from.id}, { where: {
        type: "attraction",
        more: true,
    }});
}

async function requisites(msg) 
{
    var _User = await User.findOne({ user: msg.from.id });
    var _array  = [];
    var html = `<strong>${msg.from.first_name} ${msg.from.last_name}</strong> Заполните данные для заключения агентского договора и реквизиты для перечислений. Обращаем ваше внимание, что подписание договора и перечисление бонуса осуществляется только с лицами, имеющими статус самозанятый, ИП или юр.лицо.`;
    var fat = await h.send_html(msg.chat.id, html, 
    {
        "resize_keyboard": true,
        "keyboard": [ 
            ['Юр.лицо', 'ИП', "Физ.лицо"],
            ["⬅️ Назад"]
        ],
    });
    _array.push(fat.message_id);
    var html = `Выберите свой тип:`;
    var fat = await h.send_html(msg.chat.id, html);
    _array.push(fat.message_id);
    await h.DMA(msg, _array);

    await User.findOneAndUpdate({user: msg.from.id}, { where: {
        type: "attraction",
    }});
}