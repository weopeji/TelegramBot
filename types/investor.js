var bot =       null;

module.exports = {
    init:function(initPlagins)
    {
        privateInit(initPlagins);
    },
    _investor: function(msg) 
    {
        private_page(msg);
    }
}

function privateInit(initPlagins) {
    bot     = initPlagins.bot;
}

var private_page = function(msg) {
    var action = msg;
    if(typeof action_linker[action] != "undefined") {
        action_linker[action]();   
    }
}

var action_linker = {
    "_MainINV": MainInvestorMenu,
}

function MainInvestorMenu(msg)
{
    var html = `Вы <strong>Инвестор</strong>`;
    bot.sendMessage(msg.chat.id, html, {
        parse_mode: "HTML",
        reply_markup: {
            "keyboard": [["МОИ ИНВЕСТИЦИИ", "ИНВЕСТИРОВАТЬ", "РЕКВЕЗИТЫ"], ["РЕКОМЕНДОВАТЬ","СМЕНИТЬ РОЛЬ"]],
            "one_time_keyboard": true,
        }
    });
}