process.env.NTBA_FIX_319            = 1;
const express                       = require('express');
const app                           = express();
const mongoose                      = require('mongoose');
const TelegramBot                   = require('node-telegram-bot-api');

const models                        = require('./models');
const config                        = require('./config.json');

const bot                           = new TelegramBot(config.token, { polling: true });

var helper_functions                = null;

var main_page                       = null;
var investor_page                   = null;
var business_page                   = null;
var attraction_page                 = null;

const User                          = mongoose.model('User');

// MongoDB Connect =========================================================================
mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then( function() { load_helpers(); })
    .catch(err => console.error(`Error connection to mogoDB: ${config.mongoUri}`, err));

var load_helpers = () =>
{
    if(helper_functions == null) 
    {
        helper_functions = require('./helpers/functions');
        helper_functions.init({
            bot: bot,
        });
    }

    load_pages();
}

var load_pages = () => 
{
    if(main_page == null) 
    {
        main_page = require('./types/main');
        main_page.init({
            bot: bot,
            helper_functions: helper_functions,
            User: User,
        });
    }
    if(investor_page == null) 
    {
        investor_page = require('./types/investor');
        investor_page.init({
            bot: bot,
            helper_functions: helper_functions,
        });
    }
    if(business_page == null) 
    {
        business_page = require('./types/business');
        business_page.init({
            bot: bot,
            User: User,
            helper_functions: helper_functions,
        });
    }
}

bot.on("callback_query", function(callbackQuery) 
{
    const action_linker =
    {
        "new_project": business_page.project
    }

    if(typeof action_linker[helper_functions._GET(callbackQuery.data, "place")] != "undefined") {
        action_linker[helper_functions._GET(callbackQuery.data, "place")](callbackQuery);   
    }
});

bot.on('message', async (msg) => 
{
    await User.findOneAndUpdate({user: msg.from.id}, {where: null});

    const action_linker =
    {
        // ГЛАВНЫЕ ФУНКЦИИ =====================================
        "/start": main_page._CreatorFUN,
        "💰 Инвестор": main_page.change_type,
        "🏭 Бизнес": main_page.change_type,
        "🤝 Привлечение": main_page.change_type,
        "🔁 Сменить роль": main_page.notType,
        "НАЗАД": main_page.close,
        // ИНВЕСТОР ===========================================
        "МОИ ИНВЕСТИЦИИ": investor_page.my_investment,
        "✔️ Активные проекты": investor_page.active_projects,
        // БИЗНЕС =============================================
        "❓ Как добавить проект": business_page.how_add,
        "✍ Добавить проект": business_page.project,
        "❌ Неактивные проекты": business_page.not_active,
    }

    if(typeof action_linker[msg.text] != "undefined") 
    {
        action_linker[msg.text](msg);  
        for(var i = 0; i < 3; i++) { bot.deleteMessage(msg.chat.id, msg.message_id - i); }; 
    } else 
    {
        var _User = await User.findOne({user: msg.from.id});
        if(_User.where != null) {
            var _Funs = {
                "add_new_project": function(msg) {
                    for(var i = 0; i < 1; i++) { bot.deleteMessage(msg.chat.id, msg.message_id - i); };
                    business_page.add_new_project_data(msg);
                },
            }
            if(typeof _Funs[_User.where.name] != "undefined") {
                _Funs[_User.where.name](msg);
            }
        }
    } 
});