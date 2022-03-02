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
const phantom                       = require('phantom');


const models                        = require('./models');
const config                        = require('./config.json');
const _data                         = require('./data.js');

const User                          = mongoose.model('User');
const Project                       = mongoose.model('Project');
const InvDoc                        = mongoose.model('InvDoc');
const MsgDB                         = mongoose.model('Msg');
const PaysAttract                   = mongoose.model('PaysAttract');
const bPays                         = mongoose.model('bPays');
const Payments                      = mongoose.model('Payments');
const bPaysAccept                   = mongoose.model('bPaysAccept');
const R_F                           = mongoose.model('R_F');
const project_key                   = mongoose.model('project_key');
const commission                    = mongoose.model('commission');
const authToken                     = mongoose.model('authToken');

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
            fs: fs,
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
            commission: commission,
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
            config: config,
            PaysAttract: PaysAttract,
            bPays: bPays,
            Payments: Payments,
            bPaysAccept: bPaysAccept,
            R_F: R_F,
            project_key: project_key,
            commission: commission,
            authToken: authToken,
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
        "attraction_reqezits": attraction_page.start_reqezits,
        "startReqezitsData": attraction_page.startReqezitsData,
    }

    if(typeof action_linker[helper_functions._GET(callbackQuery.data, "place")] != "undefined") {
        action_linker[helper_functions._GET(callbackQuery.data, "place")](callbackQuery);   
    }
});

bot.onText(/\/start (.+)/, async (msg, match) => 
{
    var _User       = await User.findOne({user: msg.from.id});
    const resp      = match[1];
    var _idProject  = resp.split('_')[1];
    var _array      = [];

    if(!_User) {
        var dataBusiness = "not";
        if(resp.split('_')[0] == "adder-b") 
        {
            dataBusiness = "yes";
        }
        await main_page.onlyCreate(msg, dataBusiness);
        _User = await User.findOne({user: msg.from.id});
    }

    if(resp.split('_')[resp.split('_').length - 2] == "auth")
    {
        await authToken.create({
            token: resp.split('_')[resp.split('_').length - 1],
            user: msg.from.id,
        });
    }

    if(resp.split('_')[0] == "member") 
    {
        components_page(null, {
            action: "telegram_auth_recomendation",
            data: {
                userId: msg.from.id,
                projectId: _idProject,
            },
        }, (() => {}));
    } 
    else if(resp.split('_')[0] == "adder") 
    {
        if(typeof _User.member == "undefined")
        {
            if(resp.split('_')[1] != _User.user)
            {
                await User.findOneAndUpdate({user: msg.from.id}, {member: resp.split('_')[1]});
            }
        }
        main_page._CreatorFUN(msg)
    }
    else if(resp.split('_')[0] == "adderBot") 
    {
        if(typeof _User.member == "undefined")
        {
            if(resp.split('_')[3] != _User.user)
            {
                await User.findOneAndUpdate({user: msg.from.id}, {member: resp.split('_')[3]});
            }
        }
        defaultShowProject(msg, _idProject);
    }
    else if(resp.split('_')[0] == "adder-b") 
    {
        if(typeof _User.member_b == "undefined")
        {
            if(resp.split('_')[1] != _User.user)
            {
                await User.findOneAndUpdate({user: msg.from.id}, {member_b: resp.split('_')[1], type: "business"});
            }
        }
        main_page._CreatorFUN(msg)
    }
    else if(resp.split('_')[0] == "setSignaturePro") 
    {
        investor_page.payerInvester(msg);
    } 
    else 
    {
        defaultShowProject(msg, _idProject);
    }
});

async function defaultShowProject(msg, _idProject)
{
    await investor_page.goInvesting(msg);
};

async function recomendationFunctionPush(msg, userId)
{
    await User.findOneAndUpdate({user: userId}, {type: "investor", attractType: "1"});
    await attraction_page.url(msg);
}

module.exports = {
    defaultShowProject,
    recomendationFunctionPush,
}

bot.on('message', async (msg) => 
{
    var _User = await User.findOne({user: msg.from.id});

    const action_linker = 
    {
        // ГЛАВНЫЕ ФУНКЦИИ =====================================
        "/start": main_page._CreatorFUN,
        "💰 Инвестор": main_page.change_type,
        "💼 Бизнес": main_page.change_type,
        "📣 Привлечение": main_page.change_type,
        "🔁 Сменить роль": main_page.notType,
        "⬅️ Назад": main_page.close,
        "💁🏻 Написать в Поддержку": main_page.help_user,
        // ИНВЕСТОР ===========================================
        "💰 Мои инвестиции": investor_page.my_investment,
        "💰 Мои инвестиции ♦️": investor_page.my_investment,
        "🧮 Активные проекты": investor_page.active_projects,
        "🧮 Активные проекты ♦️": investor_page.active_projects,
        "📈 Инвестировать": investor_page.goInvesting,
        "👨‍💼 Рекомендовать": investor_page.recomendations,
        "👨‍💼 Рекомендовать ♦️": investor_page.recomendations,
        "⌛ Ожидают подтверждения": investor_page.statusProjects,
        "Вознаграждение по проектам": investor_page.payerBonus,
        "🙋‍♂️ Мной привлечено": investor_page.myPeoples,
        "🙋‍♂️ Мной привлечено ♦️": investor_page.myPeoples,
        "💼 Статистика": investor_page.active_statistik,
        "Проекты": investor_page.active_projects_stat,
        "Оплатил": investor_page.payerInBissness,
        "Черновики": investor_page.drafts,
        "🏦 Инвестиционные предложения": investor_page.investShow,
        "⬅️ Hазад": investor_page.my_investment,
        // БИЗНЕС =============================================
        "✅ Активные проекты": business_page.getMoney,
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
        "📊 Привлечь инвесторов": attraction_page.startFun,
        "👔 Привлечь бизнес": attraction_page.startFunMore,
        "✔️ Проверить статус": attraction_page.cheackUserStatus,
        "✔️ Принять реквезиты": attraction_page.acceptReqezitsData,
        "✏️ Заменить реквизиты": attraction_page.startReqezitsData_need,
    }

    if(typeof action_linker[msg.text] != "undefined") 
    {
        if(_User)
        {
            if(msg.text != "📈 Инвестировать")
            {
                if(_User.type == "investor")
                {
                    if(_User.putProject)
                    {
                        await User.findOneAndUpdate({_id: _User._id}, {$unset: {putProject: 1}});
                    };
                };
            };
        };

        await action_linker[msg.text](msg);
        await h.DM(msg, 1);
    } else 
    {
        if(_User)
        {
            if(_User.where) 
            {
                const action_where = {
                    "investor": investor_page.actionWhere,
                    "document_load": investor_page.document_load,
                    "payerInBissness": investor_page.payerInBissnessDocument,
                    "attraction": attraction_page.reqezits,
                    "actionReqezits": attraction_page.actionReqezits,
                    "startReqezitsData": attraction_page.startReqezitsDataMore,
                }
                action_where[_User.where.type](msg);
                await helper_functions.DM(msg, 1);
            } else {
                await helper_functions.DM(msg, 1);
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

    var cheack_file = (_path) => 
    {
        try {
            if (fs.existsSync(_path)) { 
                console.log('Файл найден');
                if(fs.existsSync(`/var/www/projects/${_data._id}/signature_document.${_data._pts}`)) {
                    fs.unlinkSync(`/var/www/projects/${_data._id}/signature_document.${_data._pts}`);
                }
                fs.rename(_data.path, `/var/www/projects/${_data._id}/signature_document.${_data._pts}`, async function (err) {
                    if (err) throw err
                    console.log('Successfully renamed - AKA moved!');
                    
                    mammoth.convertToHtml({path: `/var/www/projects/${_data._id}/signature_document.${_data._pts}`})
                        .then(async function(result) 
                        {
                            var html = result.value;
                            var need_html = html.replace(/ /g,"&nbsp;");

                            var _project = await Project.findOneAndUpdate({_id: _data._id}, {signature_document: {
                                status: "wait",
                                document: `signature_document.${_data._pts}`,
                                document_html: need_html,
                            }});

                            const browser = await puppeteer.launch({
                                args: ['--no-sandbox', '--disable-setuid-sandbox'],
                            });
                            const page = await browser.newPage();
                            await page.goto(`https://invester-relocation.site/html/project/document/#${_project._id}`);
                            await page.emulateMedia('screen');
                            await page.waitForSelector('.all_good')
                            await page.pdf({path: `/var/www/projects/${_data._id}/signature_document.pdf`});
                            await browser.close();
                        })
                        .done();
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

app.post('/file_cheack_get.io/files', (req, res) => 
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

    var cheack_file = async (_path) => 
    {
        try 
        {
            if (fs.existsSync(_path)) 
            {
                var _User       = await User.findOne({_id: _data._User});
                var _Token      = null;
                var _arrayData  = _User.investor_data.inv;
                var _dateNeed   = _data._date;
                _arrayData.pay  = _data._pay;
                _arrayData.pts  = _data._pts;

                if(!_dateNeed || _dateNeed == "null")
                {
                    _dateNeed = new Date().getTime();
                };
                
                if(typeof _data.token != "undefined")
                {
                    var invCreate = await InvDoc.findOneAndUpdate({_id: _data.token}, {
                        data: _arrayData,
                        date: _dateNeed,
                    });

                    _Token = invCreate._id;
                }
                else
                {
                    var invCreate = await InvDoc.create({
                        projectId: _User.putProject,
                        invester: _User.user,
                        status: "not_accept",
                        data: _arrayData,
                        receipt: null,
                        pays: null,
                        date: _dateNeed,
                        date_append: new Date().getTime().toString(),
                    });

                    _Token = invCreate._id;
                };

                var pathToFile = `/var/www/projects/${_data._id}/${_Token}_investment.${_data._pts}`;
                
                if(fs.existsSync(pathToFile)) 
                {
                    fs.unlinkSync(pathToFile);
                };

                fs.rename(_data.path, pathToFile, async function (err) 
                {
                    if (err) throw err;

                    res.json({
                        status: 'ok',
                        inv: _Token,
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

app.post('/file_registration.io/files', (req, res) => {

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
                if(fs.existsSync(`/var/www/projects/${_data._id}/registration_document.${_data._pts}`)) {
                    fs.unlinkSync(`/var/www/projects/${_data._id}/registration_document.${_data._pts}`);
                }
                fs.rename(_data.path, `/var/www/projects/${_data._id}/registration_document.${_data._pts}`, async function (err) {
                    if (err) throw err
                    console.log('Successfully renamed - AKA moved!');
                    
                    var _project = await Project.findOneAndUpdate({_id: _data._id}, {type: "correction", registrationDocument: {
                        status: "wait_admin",
                        document: `registration_document.${_data._pts}`,
                    }});
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

app.post('/file_signature_document.io/files', (req, res) => {

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
                if(fs.existsSync(`/var/www/projects/${_data._id}/file_signature_document.${_data._pts.split('/')[1]}`)) {
                    fs.unlinkSync(`/var/www/projects/${_data._id}/file_signature_document.${_data._pts.split('/')[1]}`);
                }
                fs.rename(_data.path, `/var/www/projects/${_data._id}/file_signature_document.${_data._pts.split('/')[1]}`, async function (err) {
                    if (err) throw err
                    console.log('Successfully renamed - AKA moved!');
                    res.json({
                        status: 'ok',
                        file_name: `file_signature_document.${_data._pts.split('/')[1]}`,
                    });

                    var _project = await Project.findOne({_id: _data._id});

                    var sign = _project.signature_document;

                    sign.user_document = `file_signature_document.${_data._pts.split('/')[1]}`;
                    sign.status = "on";

                    await Project.findOneAndUpdate({_id: _data._id}, {type: "moderation", signature_document: sign});
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

app.post('/file_registration_document.io/files', (req, res) => {

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
                if(fs.existsSync(`/var/www/projects/${_data._id}/file_registration_document.${_data._pts.split('/')[1]}`)) {
                    fs.unlinkSync(`/var/www/projects/${_data._id}/file_registration_document.${_data._pts.split('/')[1]}`);
                }
                fs.rename(_data.path, `/var/www/projects/${_data._id}/file_registration_document.${_data._pts.split('/')[1]}`, async function (err) {
                    if (err) throw err
                    console.log('Successfully renamed - AKA moved!');
                    res.json({
                        status: 'ok',
                        file_name: `file_registration_document.${_data._pts.split('/')[1]}`,
                    });

                    var _project = await Project.findOne({_id: _data._id});

                    var sign = _project.registrationDocument;

                    sign.status = "on";
                    sign.user_document = `file_registration_document.${_data._pts.split('/')[1]}`;

                    await Project.findOneAndUpdate({_id: _data._id}, {type: "moderation", registrationDocument: sign});
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
});


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
            if (fs.existsSync(_path)) 
            { 
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


app.post('/file_chart.io/files', (req, res) => 
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

    var cheack_file = async (_path) => 
    {
        try {
            if (fs.existsSync(_path)) 
            { 
                var _InvDoc = await InvDoc.findOne({_id: _data._Inv});

                console.log('Файл найден');
                fs.rename(_data.path, `/var/www/projects/${_InvDoc.projectId}/${_InvDoc.invester}_${_data.file_id}.${_data._pts.split('/')[1]}`, async function (err) {
                    if (err) throw err
                    console.log('Successfully renamed - AKA moved!');

                    var _Pays = _InvDoc.pays;

                    _Pays[_data.file_id].status = "wait";
                    _Pays[_data.file_id].statusAccept = "push";
                    _Pays[_data.file_id].receipt = `${_InvDoc.invester}_${_data.file_id}.${_data._pts.split('/')[1]}`;

                    await InvDoc.findOneAndUpdate({_id: _InvDoc._id}, {pays: _Pays});

                    res.json({
                        status: 'ok',
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


app.post('/file_chart_more.io/files', (req, res) => 
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
            if (fs.existsSync(_path)) 
            { 
                console.log('Файл найден');
                fs.rename(_data.path, `/var/www/projects/${_data._project}/${_data.file_id}.${_data._pts.split('/')[1]}`, async function (err) {
                    if (err) throw err
                    console.log('Successfully renamed - AKA moved!');

                    // var _InvDoc = await InvDoc.findOne({invester: _data._user, projectId: _data._project});

                    // var _Pays = _InvDoc.pays;

                    // _Pays[_data.file_id].status = "accept";
                    // _Pays[_data.file_id].receipt = `${_data._user}_${_data.file_id}.${_data._pts.split('/')[1]}`;

                    // await InvDoc.findOneAndUpdate({invester: _data._user, projectId: _data._project}, {pays: _Pays});

                    var _bPaysAccept = await bPaysAccept.create({invId: _data.file_id, recipient: `${_data.file_id}.${_data._pts.split('/')[1]}`});

                    res.json({
                        status: 'ok',
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

app.post('/file_commission.io/files', (req, res) => {

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
                if(fs.existsSync(`/var/www/projects/${_data._id}/file_commission_${_data.invId}.${_data._pts.split('/')[1]}`)) {
                    fs.unlinkSync(`/var/www/projects/${_data._id}/file_commission_${_data.invId}.${_data._pts.split('/')[1]}`);
                }
                fs.rename(_data.path, `/var/www/projects/${_data._id}/file_commission_${_data.invId}.${_data._pts.split('/')[1]}`, async function (err) {
                    if (err) throw err
                    console.log('Successfully renamed - AKA moved!');
                    
                    await commission.create({
                        invId: _data.invId,
                        status: "wait_accept",
                        recipient: `file_commission_${_data.invId}.${_data._pts.split('/')[1]}`,
                    });

                    var _Projects = await Project.findOne({_id: _data._id});

                    h.alertAdmin({
                        type: "accpetCommissionByBusiness",
                        text: `Проект ${_Projects._id} "${_Projects.data.name}" произвел оплату комисиии в пользу invester`,
                        projectId: _Projects._id,
                    });

                    res.json({
                        status: 'ok',
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

