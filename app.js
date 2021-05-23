process.env.NTBA_FIX_319            = 1;
const express                       = require('express');
const app                           = express();
const mongoose                      = require('mongoose');
const models                        = require('./models');
const User                          = mongoose.model('User');
const config                        = require('./config.json');
const TelegramBot                   = require('node-telegram-bot-api');
const bot                           = new TelegramBot(config.token, { polling: true });

var investor_page                   = require('./types/investor');
var business_page                   = null;
var attraction_page                 = null;

// MongoDB Connect =========================================================================
mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then( function() { documentReadyRequire(); })
    .catch(err => console.error(`Error connection to mogoDB: ${config.mongoUri}`, err));


var documentReadyRequire = function() 
{
    if(investor_page == null) 
    {
        investor_page = require('./types/investor');
        investor_page.init({
            bot: bot,
        });
    }

    bot.on('message', (msg) => 
    {
        var alertText = msg.text.toLowerCase();
        if(typeof action_linker[alertText] != "undefined") {action_linker[alertText](msg)};
    });
}

const action_linker =
{
    "инвестор": change_type,
    "бизнес": change_type,
    "привлечение": change_type,
    "сменить роль": Change_Role,
}

async function Change_Role(msg)
{
    var html =`Приветствуем <strong>${msg.from.first_name} ${msg.from.last_name}</strong> на инвестиционной платфоме <strong>STRATOSPHERE</strong>. Выбери свой профиль:\n\n<strong>ИНВЕСТОР</strong> - Даю компаниям/проектам инвестиции\n\n<strong>БИЗНЕС</strong> - Привлекая инвестиции в свой бизнес/проект\n\n<strong>ПРИВЛЕЧЕНИЕ</strong> - Хочу стать партнером по привличению инвесторов\n\n`;    
    bot.sendMessage(msg.chat.id, html, {
        parse_mode: "HTML",
        reply_markup: {
            "keyboard": [["ИНВЕСТОР"], ["БИЗНЕС"], ["ПРИВЛЕЧЕНИЕ"]],
            "one_time_keyboard": true,
        }
    });
}

async function _CreatorFUN(msg)
{
    const MF =
    {
        find_user: function() {
            return User.findOne({user: msg.from.id});
        },
        create_user: function() {
            return User.create({
                user: msg.from.id, 
                first_name: msg.from.first_name, 
                last_name: msg.from.last_name,
                username: msg.from.username,
                language_code: msg.from.language_code,
                is_bot: msg.from.is_bot,
                type: null,
            });
        },
    }; 
    var _user = await MF.find_user();
    if(!_user){
        await MF.create_user();
        notType(msg);
    } else
    {
        if(!_user.type) { notType(msg); } else { _MainMenu(msg); };
    }
}

function _MainMenu(msg)
{
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

    var pages = {
        investor: function(message) {
            investor_page.MainInvestorMenu(message);
        },
    };

    User.findOne({user: msg.from.id}).then(_User =>
    {
        pages[_User.type](msg);
    });
}

async function change_type(msg)
{
    const MF =
    {
        Update: function(data) {
            return User.findOneAndUpdate({user: msg.from.id}, {type: data});
        },
    }
    const MF_DATA = 
    {
        "инвестор": "investor",
        "бизнес": "business",
        "привлечение": "attraction",
    }
    await MF.Update(MF_DATA[msg.text.toLowerCase()]);
    _MainMenu(msg);
}