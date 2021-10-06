var bot     = null;
var User    = null;
var h       = null;

module.exports = {
    init:function(initPlagins)
    {
        privateInit(initPlagins);
    },
    url,
    howmany,
    requisites,
}

function privateInit(initPlagins) {
    bot     = initPlagins.bot;
    User    = initPlagins.User;
    h       = initPlagins.helper_functions;
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
    var _url = `https://t.me/TestTalegrammBot?start=user_${msg.from.id}`;
    var html = `<strong>${msg.from.first_name} ${msg.from.last_name}</strong> делитесь с друзьями вашей реферальной ссылкой\n\n${_url}`;
    var fat = await h.send_html(msg.chat.id, html, 
    {
        "resize_keyboard": true,
        "keyboard": [["⬅️ Назад"]],
    });
    _array.push(fat.message_id);
    await h.DMA(msg, _array);
}

async function requisites(msg) {
    var _array  = [];
    var html = `<strong>${msg.from.first_name} ${msg.from.last_name}</strong> Заполните данные для заключения агентского договора и реквизиты для перечислений. Обращаем ваше внимание, что подписание договора и перечисление бонуса осуществляется только с лицами, имеющими статус самозанятый, ИП или юр.лицо.\n\nС помощью стрелок ⬇️ и ⬆️ выберите нужный пункт и введите значение.`;
    var fat = await h.send_html(msg.chat.id, html, 
    {
        "resize_keyboard": true,
        "keyboard": [["⬅️ Назад"]],
    });
    _array.push(fat.message_id);
    await h.DMA(msg, _array);
}