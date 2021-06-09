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
        business_page = require('./types/investor');
        business_page.init({
            bot: bot,
            helper_functions: helper_functions,
        });
    }
}

bot.on("polling_error", console.log);

bot.on('message', (msg) => 
{

    const action_linker =
    {
        // ГЛАВНЫЕ ФУНКЦИИ =====================================
        "/start": main_page._CreatorFUN,
        "ИНВЕСТОР": main_page.change_type,
        "БИЗНЕС": main_page.change_type,
        "ПРИВЛЕЧЕНИЕ": main_page.change_type,
        "СМЕНИТЬ РОЛЬ": main_page.notType,
        "НАЗАД": main_page.close,
        // ИНВЕСТОР ===========================================
        "МОИ ИНВЕСТИЦИИ": investor_page.my_investment,
        "АКТИВНЫЕ ПРОЕКТЫ": investor_page.active_projects,
        // БИЗНЕС =============================================
        "КАК ДОБАВИТЬ ПРОЕКТ": business_page.how_add
    }

    if(typeof action_linker[msg.text] != "undefined") {
        action_linker[msg.text](msg);   
    }

    for(var i = 0; i < 3; i++) { bot.deleteMessage(msg.chat.id, msg.message_id - i); };
    
});