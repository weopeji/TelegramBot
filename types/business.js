var bot     = null;
var h       = null;

module.exports = {
    init:function(initPlagins)
    {
        privateInit(initPlagins);
    },
    how_add,
}

function privateInit(initPlagins) {
    bot     = initPlagins.bot;
    h       = initPlagins.helper_functions;
}

function how_add(msg)
{
    var html = "Как добавить проект!................";
    h.send_html(msg.chat.id, html);
}