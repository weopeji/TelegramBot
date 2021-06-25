process.env.NTBA_FIX_319            = 1;
const express                       = require('express');
const app                           = express();
const mongoose                      = require('mongoose');
const TelegramBot                   = require('node-telegram-bot-api');
const fs                            = require("fs");
const https                         = require('https');

const models                        = require('./models');
const config                        = require('./config.json');
const _data                         = require('./data.js');

const bot                           = new TelegramBot(config.token, { polling: true });

var helper_functions                = null;

var main_page                       = null;
var investor_page                   = null;
var business_page                   = null;
var attraction_page                 = null;
var components_html                 = null;

const User                          = mongoose.model('User');
const Project                       = mongoose.model('Project');

var server                          = null;
var io                              = null;

// cheach OS ==============================================================================
if(process.platform == 'win32') {config.secure = false} else {config.secure = true};

// creating server =========================================================================
if (config.secure)
{
    console.log('Server now!');
    var options = {
        key: fs.readFileSync('/etc/letsencrypt/live/skin-win.ru/privkey.pem', 'utf8'),
        cert: fs.readFileSync('/etc/letsencrypt/live/skin-win.ru/cert.pem', 'utf8'),
        ca: fs.readFileSync('/etc/letsencrypt/live/skin-win.ru/chain.pem', 'utf8')
    };
    server = require('http').createServer(options, app);
    params = {
        path: '/socket.io'
    }
    io = require("socket.io")(server, params);
} else
{
    console.log('localhost now!');
    params = {
        cors: {
            origin: "http://localhost",
            methods: ["GET", "POST"]
        }
    }
    server = require('http').createServer(app);
    io = require("socket.io")(server, params);
}

// MongoDB Connect =========================================================================
mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then( function() { 
        console.log(`Mongo Db Connect to ${config.mongoUri}`);
        server.listen(config.appPort,
            () => {
                console.log(`Занят на сервере${config.appPort} порт...`);
                load_helpers(); 
            }
        );
    })
    .catch(err => console.error(`Error connection to mogoDB: ${config.mongoUri}`, err));

var load_helpers = () =>
{
    if(helper_functions == null) 
    {
        helper_functions = require('./helpers/functions');
        helper_functions.init({
            bot: bot,
            User: User,
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
            fs: fs,
            _data : _data,
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
            fs: fs,
            https: https,
            config: config,
            _data : _data,
            Project: Project,
        });
    }
    if(attraction_page == null) 
    {
        attraction_page = require('./types/attraction');
        attraction_page.init({
            bot: bot,
            User: User,
            helper_functions: helper_functions,
        });
    }
    if(components_html == null) {
        components_html = require('./pages/components');
        components_html.init({
            Project: Project,
        });
    };
}

bot.on("polling_error", console.log);

bot.on("callback_query", function(callbackQuery) 
{
    const action_linker =
    {
        "new_project": business_page.addProject
    }

    if(typeof action_linker[helper_functions._GET(callbackQuery.data, "place")] != "undefined") {
        action_linker[helper_functions._GET(callbackQuery.data, "place")](callbackQuery);   
    }
});

bot.onText(/\/start (.+)/, async (msg, match) => 
{
    for(var i = 0; i < 5; i++) { bot.deleteMessage(msg.chat.id, msg.message_id - i); };
    const chatId = msg.chat.id;
    const resp = match[1];
    var _idProject = resp.split('_')[1];
    console.log(_idProject);
    var html = `Открыт проект под номером: ${_idProject}`;
    await helper_functions.send_html(msg.chat.id, html, {
        "resize_keyboard": true,
        "keyboard": [["⬅️ Назад"]],
    });
    var html = `Вам нужно выполнить действия:`;
    helper_functions.send_html(msg.chat.id, html, {
        "inline_keyboard": [
            [
                {
                    text: "Внести данные",
                    url: 'google.ru',
                }
            ],
            [
                {
                    text: "Оплатить",
                    url: 'google.ru',
                }
            ],
            [
                {
                    text: "Прикрепить чек об оплате",
                    url: 'google.ru',
                }
            ]
        ],
    });
});

bot.on('message', async (msg) => 
{
    console.log(msg);
    
    const action_linker =
    {
        // ГЛАВНЫЕ ФУНКЦИИ =====================================
        "/start": main_page._CreatorFUN,
        "💰 Инвестор": main_page.change_type,
        "🏭 Бизнес": main_page.change_type,
        "🤝 Привлечение": main_page.change_type,
        "🔁 Сменить роль": main_page.notType,
        "⬅️ Назад": main_page.close,
        // ИНВЕСТОР ===========================================
        "МОИ ИНВЕСТИЦИИ": investor_page.my_investment,
        "Активные проекты": investor_page.active_projects,
        // БИЗНЕС =============================================
        "✔️ Активные проекты": business_page.active,
        "❓ Как добавить проект": business_page.how_add,
        "✍ Добавить проект": business_page.addProject,
        "❌ Неактивные проекты": business_page.not_active,
        "🧹 Очистить проект": business_page.clean_project,
        "✅ Подать на модерацию": business_page.put_project,
        // ПРИВЛЕЧЕНИЕ ========================================
        "🔗 Моя реферальная ссылка": attraction_page.url,
        "🙋‍♂️ Мною привлечено": attraction_page.howmany,
        "💳 Реквезиты": attraction_page.requisites,
    }

    if(typeof action_linker[msg.text] != "undefined") 
    {
        action_linker[msg.text](msg);  
        for(var i = 0; i < 3; i++) { bot.deleteMessage(msg.chat.id, msg.message_id - i); }; 
        await User.findOneAndUpdate({user: msg.from.id}, {where: null});
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



var components_page = function components_page(socket,data,callback)
{
    if(components_html)
    {
        components_html.components_page(socket,data,callback);
    }
}

io.on('connection', function(socket) {
    
    console.log('Conneting, socket: ' + socket.id);

    socket.on('components', function(data, callback) {
        components_page(this, data, callback);
    });

});