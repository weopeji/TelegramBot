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

function my_investment(msg)
{
    var html = "Мои инвестиции";
    h.send_html(msg.chat.id, html, {
        "keyboard": [["АКТИВНЫЕ ПРОЕКТЫ"], ["В ПРОЦЕССЕ"], ["НАЗАД"]],
        "one_time_keyboard": true,
    });
}

function active_projects(msg)
{
    var html = "Активные проекты";
    h.send_html(msg.chat.id, html, {
        "keyboard": [["СТАТИСТИКА"], ["ПРОЕКТЫ"], ["НАЗАД"]],
        "one_time_keyboard": true,
    });
}