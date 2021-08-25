var bot     = null;
var h       = null;

module.exports = {
    init:function(initPlagins)
    {
        privateInit(initPlagins);
    },
    my_investment,
    active_projects,
}

function privateInit(initPlagins) {
    bot     = initPlagins.bot;
    h       = initPlagins.helper_functions;
}

async function my_investment(msg)
{
    var _array = [];

    var html = "Вы находитесь в меню:\n<strong>Мои инвестиции</strong>";
    var fat = h.send_html(msg.chat.id, html, {
        "resize_keyboard": true,
        "keyboard": [["Активные проекты", "В процессе"], ["⬅️ Назад"]],
        "one_time_keyboard": true,
    });

    _array.push(fat.message_id);

    await h.DMA(msg, _array);
}

async function active_projects(msg)
{
    var _array = [];

    var html = "Вы находитесь в меню:\n<strong>Активные проекты</strong>";
    var fat = h.send_html(msg.chat.id, html, {
        "resize_keyboard": true,
        "keyboard": [["СТАТИСТИКА"], ["ПРОЕКТЫ"], ["⬅️ Назад"]],
        "one_time_keyboard": true,
    });
    _array.push(fat.message_id);

    await h.DMA(msg, _array);
}