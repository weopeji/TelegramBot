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
const mammoth                       = require("mammoth");
const puppeteer                     = require('puppeteer');


const models                        = require('./models');
const config                        = require('./config.json');
const _data                         = require('./data.js');

const User                          = mongoose.model('User');
const Project                       = mongoose.model('Project');
const InvDoc                        = mongoose.model('InvDoc');
const MsgDB                         = mongoose.model('Msg');

var bot                             = null;
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
                console.log(`Занят на сервере ${config.appPort} порт...`);
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
            Project: Project,
        });
    }
    if(investor_page == null) 
    {
        investor_page = require('./types/investor');
        investor_page.init({
            bot: bot,
            helper_functions: helper_functions,
            User: User,
            InvDoc: InvDoc,
            main_page: main_page,
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
            InvDoc: InvDoc,
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
            InvDoc: InvDoc,
            MsgDB: MsgDB,
        });
    };
}

bot.on("polling_error", console.log);

bot.on("callback_query", function(callbackQuery) 
{
    const action_linker =
    {
        "not_active": business_page.not_active_callback,
        "investing": investor_page.startInvestingMsgSecond,
        "contact": investor_page.startInvestingMsgOld,
        "investing_money": investor_page.investing_money,
        "save_investing": investor_page.save_investing,
        "drafts": investor_page.drafts_block,
        "viplati": business_page.viplati_call,
    }

    if(typeof action_linker[helper_functions._GET(callbackQuery.data, "place")] != "undefined") {
        action_linker[helper_functions._GET(callbackQuery.data, "place")](callbackQuery);   
    }
});

bot.onText(/\/start (.+)/, async (msg, match) => 
{
    const resp      = match[1];
    var _idProject  = resp.split('_')[1];
    var _array      = [];

    if(resp.split('_')[0] == "member") 
    {
        var html = `Чтобы рекомендовать проект и закрепить за собой инвестора\nВам нужно поделится личной ссылкой:\nИли переслать сообщение ниже`;

        var fat = await bot.sendMessage(msg.chat.id, html, 
        {
            parse_mode: "HTML",
            "reply_markup": {
                "resize_keyboard": true,
                "keyboard": [["💰 Мои инвестиции", "📈 Инвестировать", "💳 Реквезиты"], ["👨‍💼 Рекомендовать","🔁 Сменить роль"]],
            }
        });
        _array.push(fat.message_id);

        var needProject = await Project.findOne({_id: _idProject});
        //var html        = `<strong>Инвестиция в проект: ${_idProject}</strong>\n\nСледуйте инструкциям и отправляйте в чат нужные документы и сведения. Вы в любой момент можете вернуться и изменить любые данные.`;
        var html = `[Профиль компании](${helper_functions.getURL()}html/project/profil/#${needProject._id})\n[Презентация](${helper_functions.getURL()}/projects/${needProject._id}/${needProject.data["file+7"]})\n[Видео презентация](${helper_functions.getURL()}/projects/${needProject._id}/${needProject.data["file+8"]})`;
        const stream    = fs.createReadStream(`../projects/${_idProject}/logo.png`);
    
        var _url = `https://t.me/investER_localhost_bot?start=adder_${needProject._id}_user_${msg.from.id}`;

        var fat = await bot.sendPhoto(msg.chat.id, stream, {
            "caption": html,
            "parse_mode": "MarkdownV2",
            "reply_markup": {
                "inline_keyboard": [
                    [
                        {
                            text: "Инвестровать",
                            url: _url,
                        }
                    ]
                ],
            }
        });
        _array.push(fat.message_id);
    
        await h.DMA(msg, _array);
    } else if(resp.split('_')[0] == "adder") 
    {
        await User.findOneAndUpdate({user: msg.from.id}, {member: resp.split('_')[3]});
        helper_functions.alertBot(msg, "Attracted_by_me");
        main_page._CreatorFUN(msg)
    }else if(resp.split('_')[0] == "setSignaturePro") {
        investor_page.payerInvester(msg);
    } else 
    {
        defaultShowProject();
    }

    async function defaultShowProject()
    {
        var _urlImgProject = `${h.getURL()}html/project/cover/?id=${_idProject}`;
        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();
        await page.goto(_urlImgProject);
        await page.emulateMedia('screen');
        const element = await page.$('.cover_block');   
        await element.screenshot({path: `../projects/${_idProject}/logo.png`});
        await browser.close();

        var needProject = await Project.findOne({_id: _idProject});
        //var html        = `<strong>Инвестиция в проект: ${_idProject}</strong>\n\nСледуйте инструкциям и отправляйте в чат нужные документы и сведения. Вы в любой момент можете вернуться и изменить любые данные.`;
        var html = `Выбран проект: ${_idProject}\n[Профиль компании](${helper_functions.getURL()}html/project/profil/#${needProject._id})\n[Презентация](${helper_functions.getURL()}/projects/${needProject._id}/${needProject.data["file+7"]})\n[Видео презентация](${helper_functions.getURL()}/projects/${needProject._id}/${needProject.data["file+8"]})`;
        const stream    = fs.createReadStream(`../projects/${_idProject}/logo.png`);
    
        var fat = await bot.sendPhoto(msg.chat.id, stream, {
            "caption": html,
            "parse_mode": "MarkdownV2",
            "reply_markup": {
                "resize_keyboard": true,
                "keyboard": [["💰 Мои инвестиции", "📈 Инвестировать", "💳 Реквезиты"], ["👨‍💼 Рекомендовать","🔁 Сменить роль"]],
            }
        });
        _array.push(fat.message_id);
    
        await helper_functions.DMA(msg, _array);
    
        await User.findOneAndUpdate({user: msg.from.id}, {putProject: _idProject});
    }
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
        "💰 Мои инвестиции": investor_page.my_investment,
        "💰 Мои инвестиции ♦️": investor_page.my_investment,
        "🧮 Активные проекты": investor_page.active_projects,
        "🧮 Активные проекты ♦️": investor_page.active_projects,
        "📈 Инвестировать": investor_page.goInvesting,
        "👨‍💼 Рекомендовать": investor_page.recomendations,
        "👨‍💼 Рекомендовать ♦️": investor_page.recomendations,
        "⌛ В процессе": investor_page.inProcess,
        "📜 Статус получения денег бизнесом": investor_page.active_projects,
        "Вознаграждение по проектам": investor_page.payerBonus,
        "🙋‍♂️ Мной привлечено": investor_page.myPeoples,
        "🙋‍♂️ Мной привлечено ♦️": investor_page.myPeoples,
        "💼 Статистика": investor_page.active_statistik,
        "Проекты": investor_page.active_projects_stat,
        "Оплатил": investor_page.payerInBissness,
        "Черновики": investor_page.drafts,
        // БИЗНЕС =============================================
        "✅ Активные проекты": business_page.active,
        "❓ Как добавить проект": business_page.how_add,
        "✍ Добавить проект": business_page.addProject,
        "❌ Неактивные проекты": business_page.not_active,
        "❌ Неактивные проекты ♦️": business_page.not_active,
        "🧹 Очистить проект": business_page.clean_project,
        "✅ Подать на модерацию": business_page.put_project,
        "💸 Получение денег от инвестора": business_page.getMoney,
        "🏦 Выплаты": business_page.viplati,
        // ПРИВЛЕЧЕНИЕ ========================================
        "🔗 Моя реферальная ссылка": attraction_page.url,
        "🙋‍♂️ Мною привлечено": investor_page.myPeoples,
        "💳 Реквезиты": attraction_page.requisites,
    }

    if(typeof action_linker[msg.text] != "undefined") 
    {
        action_linker[msg.text](msg);
        await h.DM(msg, 1);
    } else 
    {
        var _User = await User.findOne({user: msg.from.id});
        if(_User.where) 
        {
            const action_where = {
                "investor": investor_page.actionWhere,
                "document_load": investor_page.document_load,
                "payerInBissness": investor_page.payerInBissnessDocument,
                "attraction": attraction_page.reqezits,
            }
            action_where[_User.where.type](msg);
            await helper_functions.DM(msg, 1);
        } else {
            await helper_functions.DM(msg, 1);
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
        mammoth.convertToHtml({path: `/var/www/projects/${_data._id}/signature_document.${_data._pts.split('/')[1]}`})
            .then(async function(result) {
                var html = result.value;
                var need_html = html.replace(/ /g,"&nbsp;");

                var _project = await Project.findOneAndUpdate({_id: _data._id}, {type: "correction",signature_document: {
                    status: "wait",
                    document: `signature_document.${_data._pts}`,
                    document_html: need_html,
                }});
                res.json({
                    status: 'ok',
                });
            })
            .done();
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
