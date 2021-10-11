var Project     = null;
var User        = null;
var fs          = null;
var wrench      = null;
var path        = null;
var bot         = null;
var request     = require("request");
var cheerio     = require("cheerio");
var needle      = require('needle');
var puppeteer   = require('puppeteer');
var fetch       = require("node-fetch");
var readline    = require('readline');
var multer      = require("multer");
var Jimp        = require("jimp");
var uploader    = require('../helpers/uploader/upload');
const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const { spawn, exec } = require('child_process');

const Instagram = require('instagram-web-api');


module.exports = {
    init:function(initPlagins)
    {
        privateInit(initPlagins);
    },
    components_page: function(socket,data,callback) {
        privat_index_page(socket,data,callback);
    }
}


function privateInit(initPlagins) {
    Project     = initPlagins.Project;
    User        = initPlagins.User;
    fs          = initPlagins.fs;
    wrench      = initPlagins.wrench;
    path        = initPlagins.path;
    bot         = initPlagins.bot;
    h           = initPlagins.helper_functions;
    InvDoc      = initPlagins.InvDoc;
    MsgDB       = initPlagins.MsgDB;
}

var privat_index_page = function(socket,data,callback) {
    var action = data.action;
    if(typeof action_linker[action] != "undefined") {
        action_linker[action](socket,data.data,callback,data)   
    } else {
        callback({
            error: {
                code:0 //no action
            }
        });
    }
}

var action_linker = {
    "getModerations": getModerations,
    "getActive": getActive,
    "getProject": getProject,
    "getUser": getUser,
    "setProject": setProject,
    "getСorrection": getСorrection,
    "acceptProject": acceptProject,
    "setActive": setActive,
    "setSignature": setSignature,
    "getNewDataProjects": getNewDataProjects,
    "getProject_id": getProject_id,
    "not_acceptProject": not_acceptProject,
    "putRedacting": putRedacting,
    "getID": getID,
    "correct_signature": correct_signature,
    "putFile": putFile,
    "putFileSignature": putFileSignature,
    "setSignatureFile": setSignatureFile,
    "correct_signature_document": correct_signature_document,
    "getAddr": getAddr,
    "alertProject": alertProject,
    "invester_status_projects": invester_status_projects,
    "getInvestorsProject": getInvestorsProject,
    "notAcceptInvesting": notAcceptInvesting,
    "getUserForId": getUserForId,
    "acceptInvestor": acceptInvestor,
    "invester_status_project": invester_status_project,
    "getAllProjectsBusiness": getAllProjectsBusiness,
    "getPaysProject": getPaysProject,
    "removePayInvestor": removePayInvestor,
    "msgUP": msgUP,
    "all_msgs": all_msgs,
    "Attracted_by_me": Attracted_by_me,
    "Attracted_by_me_investing_pay": Attracted_by_me_investing_pay,
    "selectedMsgChats": selectedMsgChats,
    "getBussnes": getBussnes,
    "getInvestorDocument": getInvestorDocument,
    "setSignaturePro": setSignaturePro,
}

async function setSignaturePro(socket,data,callback)
{
    var _User   = await User.findOne({_id: data.user});
    var _arrayData = _User.investor_data;

    _arrayData.document = data.data;

    await InvDoc.create({
        projectId: _User.putProject,
        invester: _User.user,
        status: "wait",
        data: _arrayData,
        receipt: null,
        pays: null,
    });

    callback();
}

async function getInvestorDocument(socket,data,callback)
{
    var _Investor   = await User.findOne({_id: data.id});
    callback(_Investor);
}

async function getBussnes(socket,data,callback)
{
    var _Project = await Project.findOne({_id: data});
    callback(_Project);
}

async function selectedMsgChats(socket,data,callback)
{
    var _User = await User.findOne({_id: data});
    
    if(_User.type == "investor")
    {
        var AllMsgs = await MsgDB.find({investor: _User._id});

        callback(AllMsgs);
    }
}

async function Attracted_by_me_investing_pay(socket,data,callback)
{
    var _InvDocs        = await InvDoc.find({invester: data});
    var AllPays         = 0;
    var allMorePlays    = 0;

    for (const el of _InvDocs) {
        var _Project = await Project.findOne({_id: el.projectId});

        if(_Project.payerCent) 
        {
            var tPro = Number(el.data.pay.trim()) * 0.3 * (_Project.payerCent * 0.1);
            allMorePlays = allMorePlays + tPro;
        } else 
        {
            var tPro = Number(el.data.pay.trim()) * 0.3 * 0.5;
            allMorePlays = allMorePlays + tPro;
        }

        AllPays = AllPays + Number(el.data.pay.trim());
    }

    callback({
        AllPays: AllPays,
        allMorePlays: allMorePlays,
    });
}

async function Attracted_by_me(socket,data,callback)
{
    var _User               = await User.findOne({_id: data});
    var Attracted_by_me     = await User.find({member: _User.user});
    callback(Attracted_by_me);
}

async function all_msgs(socket,data,callback)
{
    var _MsgDB = await MsgDB.findOne({investor: data.user, business: data.to});
    callback(_MsgDB);
}

async function msgUP(socket,data,callback)
{
    var funs = {
        "investor": async function() 
        {
            var _MsgDB = await MsgDB.findOne({investor: data.user, business: data.to});

            if(!_MsgDB) {
                var _array  = [];
                _array.push({
                    text: data.msg,
                    type: data.type,
                })
                await MsgDB.create(
                    {
                        investor: data.user,
                        business: data.to,
                        msgs: _array,
                    });
            } else {
                var _array = _MsgDB.msgs;
                _array.push({
                    text: data.msg,
                    type: data.type,
                }) 
                await MsgDB.findOneAndUpdate({
                    _id: _MsgDB._id,
                },
                    {
                        msgs: _array,
                    });
            }
        }
    }

    funs[data.type]();
}

async function removePayInvestor(socket,data,callback)
{
    await InvDoc.deleteOne({invester: data});
    callback();
}

async function getPaysProject(socket,data,callback)
{
    var _InvDocs    = await InvDoc.find({projectId: data});

    var allPays = 0;

    _InvDocs.forEach(el => {
        allPays = allPays + Number(el.data.pay);
    });

    callback(allPays);
}

async function getAllProjectsBusiness(socket, data, callback)
{
    var _User       = await User.findOne({_id: data});
    var _Projects   = await Project.find({user: _User.user});

    callback(_Projects);
}

async function invester_status_project(socket,data,callback)
{
    var _InvDoc     = await InvDoc.findOne({invester: data.id, projectId: data.project});
    var _User       = await User.findOne({user: data.id});

    callback({
        invester: _User,
        InvDoc: _InvDoc,
    });
}

async function acceptInvestor(socket,data,callback) {
    var InvDocs = await InvDoc.findOneAndUpdate({invester: data.id, projectId: data.projectId}, {status: "accept"});
    var _User = User.findOne({user: data.id});
    if(!_User.alerts)
    {
        _User.alerts = [{
            type: "acceptInvestor",
        }];
    } else {
        _User.alerts.push({
            type: "acceptInvestor",
        })
    }
    await User.findOneAndUpdate({user: data}, {alerts: _User.alerts});
    callback(InvDocs);
}

async function getUserForId(socket,data,callback) {
    var _User = await User.findOne({_id: data});
    callback(_User);
}

async function notAcceptInvesting(socket,data,callback) 
{
    var _User           = await User.findOne({_id: data});
    var allProjects     = await Project.find({user: _User.user});

    var _arrayProjects  = [];
    var allInv          = [];
    var _arrayAllInvs   = [];
    var trueInvs        = [];

    allProjects.forEach(function(project) {
        _arrayProjects.push(project._id);
    });

    var bar = new Promise((resolve, reject) => {
        _arrayProjects.forEach(async (value, index, array) => {
            var InvDocs = await InvDoc.find({projectId: value});
            if(InvDocs.length > 0) {
                allInv.push(InvDocs);
            }
            if (index === array.length -1) {
                resolve();
            };
        })
    });
    
    bar.then(async () => {
        
        allInv.forEach(el => {
            el.forEach(el2 => {
                _arrayAllInvs.push(el2);
            })
        });

        _arrayAllInvs.forEach(element => {
            if(element.receipt) {
                if(element.status == "wait") {
                    trueInvs.push(element);
                }
            }
        });

        callback(trueInvs);
    });
}

async function getInvestorsProject(socket,data,callback) {
    var _InvDoc = await InvDoc.find({projectId: data});
    callback(_InvDoc);
}

async function invester_status_projects(socket,data,callback)
{
    var _User = await User.findOne({_id: data._id});
    var _InvDoc = await InvDoc.find({invester: _User.user});
    callback(_InvDoc)
}

function alertProject(socket,data,callback) 
{
    exec(`python "../python/app.py" "♦️ ${data}"`);
}   

async function getAddr(socket,data,callback) 
{
    var _url = "https://cleaner.dadata.ru/api/v1/clean/address";
    var token = "cd3a829357362fec55fc201c3f761002def9906f";
    var secret = "17df8cdd3e4ace2be6c66bd1ee208d26e54d9843";
    var query = data;

    var options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + token,
            "X-Secret": secret
        },
        body: JSON.stringify([query])
    }

    fetch(_url, options)
        .then(response => response.text())
        .then(result => callback(result))
        .catch(error => console.log("error", error));
}

async function correct_signature_document(socket,data,callback) {
    var _project = await Project.findOne({_id: data._id});
    var _array = _project.signature_document;
    _array.status = 'on';
    _array.img = data.img;
    await Project.findOneAndUpdate({_id: data}, {type: "moderation", signature_document: _array});
}

async function setSignatureFile(socket,data,callback) 
{
    var data = data.file;

    var _pts        = data._pts.split('/')[1];
    var _user_id    = data._id;
    var file_id     = data.file_id;

    fs.writeFile(`../projects/${_user_id}/signature_document.${_pts}`, data.files, async (err) => {
        if(err) throw err;
        var _project = await Project.findOneAndUpdate({_id: data._id}, {type: "correction",signature_document: {
            status: "wait",
            document: `signature_document.${_pts}`,
        }});
    });
}

async function putFileSignature(socket,data,callback) {
    var _pts        = data._pts.split('/')[1];
    var _user_id    = data._id;
    var file_id     = data.file_id;

    fs.writeFile(`../projects/${_user_id}/${file_id}.${_pts}`, data.files, (err) => {
        if(err) throw err;
        callback({
            file_name: `${file_id}.${_pts}`,
        });
    });
}

async function putFile(socket,data,callback) 
{
    var _pts        = data._pts.split('/')[1];
    var _user_id    = data._id;
    var file_id     = data.file_id;

    console.log(data.files);

    fs.writeFile(`../users/${_user_id}/${file_id}.${_pts}`, data.files, (err) => {
        if(err) throw err;
        callback({
            file_name: `${file_id}.${_pts}`,
        });
    });
}

async function correct_signature(socket,data,callback) {
    var _project = await Project.findOne({_id: data._id});
    var _array = _project.signature;
    _array.data = data.data;
    _array.status = "on";
    var need_string = `"♦️ Проект подписан №${_project._id} Название: ${_project.data.name} Сумма: ${_project.data.attraction_amount} Cтавка: ${_project.data.rate} Необходимо проевирть, опубликовать"`;
    console.log(need_string);
    await exec(`python "../python/app.py" ${need_string}`);
    await Project.findOneAndUpdate({_id: data}, {signature: _array, type: "moderation"});
}

async function getID(socket,data,callback) {
    var _project = await Project.findOne({_id: data});
    callback(_project.user);
}

async function putRedacting(socket,data,callback) {
    var _project = await Project.findOne({_id: data._id});
    var _data = _project.data;
    data.array.forEach(element => {
        for (var key in _data) {
            if(key == element.name) {
                _data[key] = element.val;
            }
        }
    });
    await Project.findOneAndUpdate({_id: data._id}, {data: _data, type: "moderation", redacting: null});
    var need_string = `"♦️ Проект исправлен №${_project._id} Название: ${_project.data.name} Сумма: ${_project.data.attraction_amount} Cтавка: ${_project.data.rate} Необходимо промодерировать"`;
    console.log(need_string);
    await exec(`python "../python/app.py" ${need_string}`);
    callback('ok');
}

async function not_acceptProject(socket,data,callback) 
{
    var _project = await Project.findOneAndUpdate({_id: data._id}, {type: "correction", redacting: data.data});
    callback(_project);
}

async function getProject_id(socket,data,callback) {
    var _project = await Project.findOne({_id: data});
    callback(_project);
}

async function getNewDataProjects(socket,data,callback) {
    var _project = await Project.findOneAndUpdate({_id: data._id}, {
        type: "correction",
        signature: {
            status: 'wait',
            type: data.data,
        }
    });
    callback('ok');
}

async function setSignature(socket,data,callback) 
{
    var base64Data = data.data.replace(/^data:image\/png;base64,/, "");
    const dataBuffer = new Buffer(base64Data,'base64'); 
    var _patch = `../projects/${data._id}/signature.png`;
    fs.writeFile(_patch, dataBuffer, (err) => {
        if(err) throw err;
        callback('ok');
    });
}

async function setActive(socket,data,callback) {
    var _project = await Project.findOneAndUpdate({_id: data}, {type: "active"});
    callback('ok');
}

async function acceptProject(socket,data,callback) 
{
    var _project = await Project.findOne({_id: data});

    var _urlImgProject = `${h.getURL()}html/project/cover/?id=${data}`;
    console.log(_urlImgProject);
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto(_urlImgProject);
    await page.emulateMedia('screen');
    const element = await page.$('.cover_block');   
    await element.screenshot({path: `../projects/${data}/logo.png`});
    await browser.close();

    var html = `[Профиль компании](${h.getURL()}html/project/profil/#${_project._id})\n[Презентация](${h.getURL()}/projects/${_project._id}/${_project.data["file+7"]})\n[Видео презентация](${h.getURL()}/projects/${_project._id}/${_project.data["file+8"]})`;
    
    const stream = fs.createReadStream(`../projects/${data}/logo.png`);
    bot.sendPhoto(-1001205415519, stream, {
        "caption": html,
        "parse_mode": "MarkdownV2",
        "reply_markup": {
            "inline_keyboard": [
                [
                    {
                        text: "Рекомендовать",
                        url: `https://t.me/investER_localhost_bot?start=member_${data}`,
                    }
                ],
                [
                    {
                        text: "Инвестровать",
                        url: `https://t.me/investER_localhost_bot?start=project_${data}`,
                    }
                ]
            ],
        }
    });

    // const client = new Instagram({ username: "investER_official", password: "e<<@H&_ArB~5ef7" });
 
    // ;(async () => {
    //     Jimp.read(`../projects/${data}/logo.png`, async function (err, image) {
    //         if (err) {
    //             console.log(err)
    //         } else {
    //             await image.write(`../projects/${data}/logo.jpg`);
    //             // URL or path of photo
    //             const photo = `${h.getURL()}projects/${data}/logo.jpg`;
            
    //             await client.login()

    //             var _caption = `
    //                 *
    //                 ${_project.data.name}
    //                 ${_project.data.target}
    //                 Ставка: ${_project.data.rate}
    //                 Выплаты: ${_project.data.date_payments}
    //                 Вход от: ${_project.data.minimal_amount}
    //                 Сбор до: ${_project.data.date}
    //             `;
            
    //             const { media } = await client.uploadPhoto({ photo: photo, caption: _caption, post: 'feed' })
    //             console.log(`https://www.instagram.com/p/${media.code}/`)
    //         }
    //     })
        
    // })();

    // (() => {
    //     uploader.uploadVideo('2314', '1245', 'investER', 'pp.mp4');
    // })()
}

async function parceProject(type, data, callback) 
{
    var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";
    var token = "cd3a829357362fec55fc201c3f761002def9906f";
    var query = data.inn;
    
    var options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify({query: query})
    }
    
    fetch(url, options)
    .then(response => response.text())
    .then(result => 
    {
        var _dataFirst = JSON.parse(result.toString());

        if(_dataFirst.suggestions.length == 0) 
        {
            callback('error');
            return;
        }
        var _data = _dataFirst.suggestions[0].data;

        if(type == "1")
        {
            var _conf = 
            {
                name: _data.name.full_with_opf,
                info: `https://www.rusprofile.ru/search?query=${query}&type=ul`,
                inn: _data.inn,
                ogrn: _data.ogrn,
                kpp: _data.kpp,
                addr: _data.address.value,
                do: null,
                founder: _data.management.name,
            }

            callback(_conf);
        }

        if(type == "2")
        {   
            var _conf = 
            {
                name: _data.name.full_with_opf,
                info: `https://www.rusprofile.ru/search?query=${query}&type=ul`,
                inn: _data.inn,
                ogrn: _data.ogrn,
                kpp: _data.kpp,
                addr: _data.address.value,
                do: null,
                founder: _data.management.name,
                credit_story: null,
                practic: null,
                production: null,
            };

            callback(_conf);
        }

    });
}

async function setProject(socket,data,callback) 
{
    var _User       = await User.findOne({user: data.user});

    var NA_First = await User.findOneAndUpdate({user: data.user}, {alerts: {
        NA_First: true,
    }});

    async function start_load(_parce) 
    {
        var _project    = await Project.create({
            user: data.user,
            type: "moderation",
            data: data.data,
            parce: _parce,
            redacting: null,
            signature: null,
            signature_document: null,
        });
        
        var _patch = `../projects/${_project._id}`;
        var user_path = `../users/${_User.user}`;
    
        await wrench.copyDirSyncRecursive(user_path, _patch);
    
        await fs.readdir(user_path, (err, files) => {
            if (err) throw err;
          
            for (const file of files) {
                fs.unlink(path.join(user_path, file), err => {
                    if (err) throw err;
                });
            }
        });

        exec(`python "../python/app.py" "♦️ Проект №${_project._id} подан на модерацию пользователем!"`);
    }

    if(data.data.organization == "3") {
        start_load();
        callback({status: "ok"});
    } else {
        parceProject(data.data.organization, data.data, async function(_parce) 
        {
            if(_parce == 'error') {
                callback('error');
                return;
            }
            start_load(_parce);
            callback({status: "ok"});
        });
    }
    
}

async function getUser(socket,data,callback) {
    var _user = await User.findOne({user: data});
    callback(_user);
}

async function getProject(socket,data,callback) {
    var _project = await Project.findOne({_id: data});
    callback(_project);
}

async function getActive(socket,data,callback) {
    var _projects   = await Project.find({type: "active"});
    callback(_projects);
}

async function getModerations(socket,data,callback) {
    var _projects   = await Project.find({type: "moderation"});
    callback(_projects);
}

async function getСorrection(socket,data,callback) {
    var _projects   = await Project.find({type: "correction"});
    callback(_projects);
}