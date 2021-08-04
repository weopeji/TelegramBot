process.env.NTBA_FIX_319            = 1;
const express                       = require('express');
const app                           = express();
const mongoose                      = require('mongoose');
const TelegramBot                   = require('node-telegram-bot-api');
const fs                            = require("fs");
const https                         = require('https');
const multiparty                    = require('multiparty');
const fileUpload                    = require('express-fileupload');
const wrench                        = require('wrench');
const util                          = require('util');
const path                          = require('path');
const exec                          = require('child_process').exec;
const formidable                    = require('formidable');


const models                        = require('./models');
const config                        = require('./config.json');
const _data                         = require('./data.js');

const User                          = mongoose.model('User');
const Project                       = mongoose.model('Project');

var bot                           = null;
var helper_functions                = null;
var main_page                       = null;
var investor_page                   = null;
var business_page                   = null;
var attraction_page                 = null;
var components_html                 = null;
var server                          = null;
var io                              = null;
var mongoURl                        = config.mongoUri;

// platform ================================================================================

if(process.platform == 'win32') {config.secure = false} else {config.secure = true};

if (config.secure)
{
    console.log('Server now!');
    server = require('http').createServer(app);
    params = {
        transports: ['websocket', 'polling'],
    }
    io          = require("socket.io")(server, params);
    bot         = new TelegramBot(config.token, { polling: true });
} else
{
    console.log('localhost now!');
    params = {
        cors: {
            origin: "http://localhost",
            methods: ["GET", "POST"]
        }
    }
    server      = require('http').createServer(app);
    io          = require("socket.io")(server, params);
    bot         = new TelegramBot(config.token_host, { polling: true });
}

// MongoDB Connect =========================================================================

mongoose.connect(mongoURl, { useNewUrlParser: true, useUnifiedTopology: true })
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
            config: config,
        });
    }
    if(main_page == null) 
    {
        main_page = require('./types/main');
        main_page.init({
            bot: bot,
            helper_functions: helper_functions,
            User: User,
            fs: fs,
            _data : _data,
            config: config,
            https: https,
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
            User: User,
            fs: fs,
            wrench: wrench,
            path: path,
            bot: bot,
            helper_functions: helper_functions,
        });
    };
}

bot.on("polling_error", console.log);

bot.on("callback_query", function(callbackQuery) 
{
    const action_linker =
    {
        "not_active": business_page.not_active_callback,
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
    var html = `Открыт проект под номером: ${_idProject}`;
    const stream = fs.createReadStream(`../projects/${_idProject}/logo.png`);
    await bot.sendPhoto(msg.chat.id, stream, {
        "caption": html,
        "reply_markup": {
            "keyboard": [
                [
                    {
                        text: "Внести данные",
                        url: 'google.ru',
                    },
                    {
                        text: "Оплатить",
                        url: 'google.ru',
                    }
                ],
                [
                    {
                        text: "Прикрепить чек об оплате",
                        url: 'google.ru',
                    },
                    {
                        text: "⬅️ Назад",
                        url: 'google.ru',
                    }
                ],
            ],
        }
    });
});

bot.on('message', async (msg) => 
{
    const action_linker =
    {
        // ГЛАВНЫЕ ФУНКЦИИ =====================================
        "/start": main_page._CreatorFUN,
        "💰 Инвестор": main_page.change_type,
        "💼 Бизнес": main_page.change_type,
        "📣 Привлечение": main_page.change_type,
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
    } else {
        await h.DM(msg, 1);
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

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "POST, PUT, GET, OPTIONS");
    next();
});

app.post('/file_urist.io/files', (req, res) => {

    var form    = new multiparty.Form({
        maxFilesSize: 2 * 1024 * 1024 * 1024 
    });

    var _data   = {};

    form.on('error', function(err) {
        console.log('Error parsing form: ' + err.stack);
    });

    form.on('file', (name, file) => 
    {
        _data.path = file.path;
    });

    form.on('field', (name, value) => 
    {
        _data[name] = value;
    });

    var redactingDocument = async () => 
    {
        
        var _project = await Project.findOneAndUpdate({_id: _data._id}, {type: "correction",signature_document: {
            status: "wait",
            document: `signature_document.${_data._pts.split('/')[1]}`,
        }});
        res.json({
            status: 'ok',
            file_name: `signature_document.${_data._pts.split('/')[1]}`,
        });
    }

    var cheack_file = (_path) => 
    {
        try {
            if (fs.existsSync(_path)) { 
                console.log('Файл найден');
                if(fs.existsSync(`/var/www/projects/${_data._id}/signature_document.${_data._pts.split('/')[1]}`)) {
                    fs.unlinkSync(`/var/www/projects/${_data._id}/signature_document.${_data._pts.split('/')[1]}`);
                }
                fs.rename(_data.path, `/var/www/projects/${_data._id}/signature_document.${_data._pts.split('/')[1]}`, async function (err) {
                    if (err) throw err
                    console.log('Successfully renamed - AKA moved!');
                    redactingDocument();
                });
            } else {
                console.log('Файл не найден');
                cheack_file();
            }
        } catch(err) {
            console.error(err)
        }
    }

    form.on('close', function() 
    {
        console.log('Upload completed!');
        cheack_file(_data.path);
    });

    form.parse(req);
});

app.post('/file_signature.io/files', (req, res) => {

    var form    = new multiparty.Form({
        maxFilesSize: 2 * 1024 * 1024 * 1024 
    });

    var _data   = {};

    form.on('error', function(err) {
        console.log('Error parsing form: ' + err.stack);
    });

    form.on('file', (name, file) => 
    {
        _data.path = file.path;
    });

    form.on('field', (name, value) => 
    {
        _data[name] = value;
    });

    var cheack_file = (_path) => 
    {
        try {
            if (fs.existsSync(_path)) { 
                console.log('Файл найден');
                if(fs.existsSync(`/var/www/projects/${_data._id}/${_data.file_id}.${_data._pts.split('/')[1]}`)) {
                    fs.unlinkSync(`/var/www/projects/${_data._id}/${_data.file_id}.${_data._pts.split('/')[1]}`);
                }
                fs.rename(_data.path, `/var/www/projects/${_data._id}/${_data.file_id}.${_data._pts.split('/')[1]}`, function (err) {
                    if (err) throw err
                    console.log('Successfully renamed - AKA moved!');
                    res.json({
                        status: 'ok',
                        file_name: `${_data.file_id}.${_data._pts.split('/')[1]}`,
                    });
                });
            } else {
                console.log('Файл не найден');
                cheack_file();
            }
        } catch(err) {
            console.error(err)
        }
    }

    form.on('close', function() 
    {
        console.log('Upload completed!');
        cheack_file(_data.path);
    });

    form.parse(req);
});

app.post('/file_redacting.io/files', (req, res) => {

    var form    = new multiparty.Form({
        maxFilesSize: 2 * 1024 * 1024 * 1024 
    });

    var _data   = {};

    form.on('error', function(err) {
        console.log('Error parsing form: ' + err.stack);
    });

    form.on('file', (name, file) => 
    {
        _data.path = file.path;
    });

    form.on('field', (name, value) => 
    {
        _data[name] = value;
    });

    var cheack_file = (_path) => 
    {
        try {
            if (fs.existsSync(_path)) { 
                console.log('Файл найден');
                if(fs.existsSync(`/var/www/projects/${_data._id}/${_data.file_id}.${_data._pts.split('/')[1]}`)) {
                    fs.unlinkSync(`/var/www/projects/${_data._id}/${_data.file_id}.${_data._pts.split('/')[1]}`);
                }
                fs.rename(_data.path, `/var/www/projects/${_data._id}/${_data.file_id}.${_data._pts.split('/')[1]}`, function (err) {
                    if (err) throw err
                    console.log('Successfully renamed - AKA moved!');
                    res.json({
                        status: 'ok',
                        file_name: `${_data.file_id}.${_data._pts.split('/')[1]}`,
                    });
                });
            } else {
                console.log('Файл не найден');
                cheack_file();
            }
        } catch(err) {
            console.error(err)
        }
    }

    form.on('close', function() 
    {
        console.log('Upload completed!');
        cheack_file(_data.path);
    });

    form.parse(req);
})

app.post('/file.io/files', (req, res) => 
{
    var form    = new multiparty.Form({
        maxFilesSize: 2 * 1024 * 1024 * 1024
    });

    var _data   = {};

    form.on('error', function(err) {
        console.log('Error parsing form: ' + err.stack);
    });

    form.on('file', (name, file) => 
    {
        _data.path = file.path;
    });

    form.on('field', (name, value) => 
    {
        _data[name] = value;
    });

    var cheack_file = (_path) => 
    {
        try {
            if (fs.existsSync(_path)) { 
                console.log('Файл найден');
                if(fs.existsSync(`/var/www/users/${_data._id}/${_data.file_id}.${_data._pts.split('/')[1]}`)) {
                    fs.unlinkSync(`/var/www/users/${_data._id}/${_data.file_id}.${_data._pts.split('/')[1]}`);
                }
                fs.rename(_data.path, `/var/www/users/${_data._id}/${_data.file_id}.${_data._pts.split('/')[1]}`, function (err) {
                    if (err) throw err
                    console.log('Successfully renamed - AKA moved!');
                    res.json({
                        status: 'ok',
                        file_name: `${_data.file_id}.${_data._pts.split('/')[1]}`,
                    });
                });
            } else {
                console.log('Файл не найден');
                cheack_file();
            }
        } catch(err) {
            console.error(err)
        }
    }

    form.on('close', function() 
    {
        console.log('Upload completed!');
        cheack_file(_data.path);
    });

    form.parse(req);
});
